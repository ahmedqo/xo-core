const blkExp = /{§block (.+?)§}((.|\n)*?){§\/block§}/g,
    jscExp = /{§([\s\S]+?)§}/g,
    ecoExp = /\{\{([\s\S]+?)\}\}/g,
    filExp = /(\w+:\[(.+?)\])/g;

function clean(str) {
    return (function() {
        return str.replace(/(\r\n|\n|\r)/gm, " ");
    })().replace(/  +/g, " ");
}

function parse(exp, html, parseAction) {
    var match,
        cursor = 0,
        code = "";
    while ((match = exp.exec(html))) {
        code += parseAction(html.slice(cursor, match.index));
        code += parseAction(match[1], true);
        cursor = match.index + match[0].length;
    }
    code += parseAction(html.substr(cursor, html.length - cursor));
    return code;
}

function conditions(line) {
    var data = line.trim().replace(/\s\s+/g, " ").split(" ");
    switch (data[0]) {
        case "if":
        case "for":
        case "while":
        case "switch":
            data.splice(1, 0, "(");
            data.splice(data.length, 0, "){");
            break;
        case "each":
            data.shift();
            data.splice(0, 0);
            data = [data[0], ".forEach((", data[data.length - 1], ",$i)=>{"];
            break;
        case "/each":
            data.shift();
            data.splice(data.length, 0, "});");
            break;
        case "loop":
            data.shift();
            data = [`for(var $i=0;$i<${data.join("")};$i++){`];
            break;
        case "/if":
        case "/for":
        case "/try":
        case "/loop":
        case "/while":
        case "/switch":
            data.shift();
            data.splice(data.length, 0, "}");
            break;
        case "elif":
            data.shift();
            data.splice(0, 0, "}");
            data.splice(1, 0, "else if(");
            data.splice(data.length, 0, "){");
            break;
        case "else":
            data.shift();
            data.splice(data.length, 0, "}else{");
            break;
        case "finally":
            data.shift();
            data.splice(data.length, 0, "}finally{");
            break;
        case "default":
        case "case":
            data[data.length - 1] = data[data.length - 1] + ":";
            break;
        case "break":
        case "continue":
            data[data.length - 1] = data[data.length - 1] + ";";
            break;
        case "try":
            data[data.length - 1] = data[data.length - 1] + "{";
            break;
        case "catch":
            data.splice(0, 0, "}");
            data.splice(2, 0, "(");
            data.splice(data.length, 0, ") {");
            break;
        case "set":
            data[0] = "var";
            data[data.length - 1] = data[data.length - 1] + ";";
            break;
        case "put":
            data[0] = "const";
            data[data.length - 1] = data[data.length - 1] + ";";
            break;
        case "log":
            data.shift();
            data.splice(0, 0, "console.log(");
            data[data.length - 1] = data[data.length - 1] + " );";
            break;
        default:
            data = [line, ";"];
    }
    return " " + data.join(" ");
}

function filter(v, f, c) {
    var res = '""';
    switch (f.toLowerCase().trim()) {
        case "upper":
            res = `${v}.toUpperCase()`;
            break;
        case "lower":
            res = `${v}.toLowerCase()`;
            break;
        case "cap":
            res = `${v}[0].toUpperCase() + ${v}.slice(1)`;
            break;
        case "camel":
            res = `${v}.trim().replace(/[-/_\s.]/g," ").split(" ").reduce((s,e,i)=>{if(i===0) return s + e.toLowerCase();return s + e[0].toUpperCase() + e.slice(1).toLowerCase();},"")`;
            break;
        case "decamel":
            var sep = c.length !== 0 ? c : " ";
            res = `${v}.replace(/[A-Z0-9]/g, s => "${sep}" + s.toLowerCase())`;
            break;
        case "reverse":
            res = `${v}.split("").reverse().join("")`;
            break;
        case "int":
            res = `parseInt(${v})`;
            break;
        case "real":
            res = `parseFloat(${v})`;
            break;
        case "num":
            res = `Number(${v})`;
            break;
        case "bool":
            res = `Boolean(${v})`;
            break;
        case "floor":
            res = `Math.floor(${v})`;
            break;
        case "round":
            res = `Math.round(${v})`;
            break;
        case "abs":
            res = `Math.abs(${v})`;
            break;
        case "str":
            res = `${v} instanceof Object ? JSON.stringify(${v}) : String(${v})`;
            break;
        case "trim":
            res = `${v}.trim()`;
            break;
        case "replace":
            res = `${v}.replace(${c
                .split(",")
                .reduce((a, i) => [...a, `"${i.trim()}"`], [])
                .join(",")})`;
            break;
        case "date":
            res = `new Date(${v})`;
            break;
        case "json":
            res = `JSON.parse(${v})`;
            break;
        case "count":
            res = `${v}.length`;
            break;
        case "first":
            res = `Array.isArray(${v}) ? ${v}[0] : ""`;
            break;
        case "last":
            res = `Array.isArray(${v}) ? ${v}[${v}.length - 1] : ""`;
        case "sum":
            res = `Array.isArray(${v}) ? ${v}.reduce((a, b) => a + b, 0) : ""`;
            break;
        case "max":
            res = `Array.isArray(${v}) ? Math.max.apply(Math,${v}) : ""`;
            break;
        case "min":
            res = `Array.isArray(${v}) ? Math.min.apply(Math,${v}) : ""`;
            break;
        case "unique":
            res = `[...new Set(${v})]`;
            break;
        case "sort":
            if (c.toLowerCase() === "desc") {
                res = `Array.isArray(${v}) ? ${v}.sort().reverse() : ""`;
            } else {
                res = `Array.isArray(${v}) ? ${v}.sort() : ""`;
            }
            break;
        case "split":
            res = `${v}.split("${c}")`;
            break;
        case "join":
            res = `Array.isArray(${v}) ? ${v}.join("${c}") : ""`;
            break;
        case "clean":
            res = `Array.isArray(${v}) ? ${v}.filter(${c}) : ""`;
            break;
        case "map":
            res = `Array.isArray(${v}) ? ${v}.map(${c}) : ""`;
            break;
        case "find":
            res = `Array.isArray(${v}) ? ${v}.find(${c}) : ""`;
            break;
        case "array":
            res = `Array(${v}).fill(0)`;
            break;
        default:
            res = v;
            break;
    }
    return `${v}=${res};`;
}

function addVariable (line, js) {
    var code = "";
    if (js) {
        line = line.trim();
        if (line.startsWith(">")) {
            const { type, data } = __def(line);
            const fun = data.shift();
            const par = data.length ? data.join() : "''";
            code = type ? `r.push("this.${fun}("+${par}+")");` : `r.push(this.${fun}(${par}));`;
        } else {
            const [_data, _line] = __fill(line);
            code = _data + "r.push(" + _line + ");";
        }
    } else if (line != "") {
        code = 'r.push("' + line + '");\n';
    }
    return code;
}

function __def (line) {
    const type = line.slice(1).startsWith(">") ? false : true;
    line = line.replaceAll(">", "").trim();
    const data = line.split(/[(),]/g).filter(Boolean);
    return { type, data };
}

function block (html) {
    var match,
        cursor,
        code = "", rep = [];
    html = clean(html);
    while (match = blkExp.exec(html)) {
        var s = `function ${match[1]}($e){
            return \`${match[2].replaceAll("{{", "${$e.").replaceAll("}}", "}")}\`;
        };`
        code += s;
        rep.push(match[0]);
        cursor = match.index + match[0].length;
    }
    rep.forEach(r => { html = html.replace(r, "") });
    return [html, clean(code)]
}

function add (line, js) {
    var code = "";
    if (js) {
        line = line.replace(/[\\]+/g, "");
        const [_data, _line] = __fill(line);
        line = conditions(_line);
        code += _data + line;
    } else {
        if (line.match(ecoExp)) {
            code += parse(ecoExp, line, addVariable);
        } else if (line !== "" && line !== " ") {
            code += 'r.push("' + line + '");\n';
        }
    }
    return code;
}

function __fill (line) {
    let match = filExp.exec(line);
    if (match) {
        const matches = match[1].split(":");
        const v = matches[0];
        const fs = /\[(.+?)\]/g.exec(match[1])[1];
        const _data = fs.split("|").reduce((s, i) => {
            const a = /\((.+?)\)/g.exec(i);
            const f = /[a-zA-z]+/g.exec(i)[0];
            const d = a ? a[1] : "";
            return s + filter(v, f, d);
        }, "");
        const _line = line.replace(match[1], matches[0]);
        return [_data, _line];
    }
    return ["", line];
}

function shape (html) {
    var code = "var r=[]; var __temp;";
    const [_html, _code] = block(html);
    html = clean(_html).replace(/["]+/g, '\\"');
    code += _code + parse(jscExp, html, add);
    code += 'return r.join("");';
    code = "with(obj || {}){" + code + "}";
    return code;
}

function render (html, data) {
    try {
        return new Function("obj", "ctx", clean(html)).call(data, data || {});
    } catch (e) {
        alert('there is an error in your code check the console.');
        throw e;
    }
}

module.exports = function (data, code) {
    code = shape(clean(code));
    return render(code, data);
};