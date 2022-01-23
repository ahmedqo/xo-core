const jscExp = /\@\{\{([\s\S]+?)\}\}/g,
    comExp = /\#\{\{([\s\S]+?)\}\}/g,
    ecoExp = /\{\{([\s\S]+?)\}\}/g,
    filExp = /(\w+:\[(.+?)\])/g;

async function request(page, data) {
    if (Object.keys(data).includes(page)) page = data[page];
    var req = await fetch(page);
    if (req.status !== 200) {
        return "";
    }
    var res = await req.text();
    return res;
}

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
        case "/if":
        case "/for":
        case "/try":
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
    return data.join(" ");
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
        if (line.startsWith(">") || line.startsWith("~")) {
            const { type, data } = __def(line);
            const fun = data.shift();
            const par = data.length ? data.join() : "''";
            code = type ? `r.push("(function "+${fun}+")("+${par}+")");` : `r.push((${fun})(${par}));`;
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
    const type = line[0];
    line = line.slice(1, line.length - 1).trim();
    const data = line.split(/[(),]/g).filter(Boolean);
    return { type: type === ">" ? true : false, data };
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

async function shape (html, data) {
    var code = "var r=[]; var __temp;";
    code += `document.querySelectorAll("style").forEach(s => {if(s.hasAttribute("id")) s.remove();}); function useStyles(obj) { function $DECAMEL(str) { return str .replace(/([a-zd])([A-Z])/g, '$1' + "-" + '$2') .replace(/([A-Z]+)([A-Z][a-zd]+)/g, '$1' + "-" + '$2') .toLowerCase(); } function $SASS(c) { var all = ""; for (let name in c) { let vals = c[name], t = "", s = ""; if (typeof vals === "string") all += $DECAMEL(name) + ":" + vals + ";"; else { for (let sub in vals) { let subVals = vals[sub], NAME = $DECAMEL(sub); if (typeof subVals === "string") { t += NAME + ":" + subVals + ";"; } else { NAME.split(",").forEach((Name) => { let N = Name.trim().startsWith("&") ? Name.trim().slice(1) : " " + Name, Sn = name + N, o = {}; o[Sn] = subVals; s += $SASS(o); }); } } if (t.length > 0) all += name + "{" + t + "}"; if (s.length > 0) all += s; } } return all; } function $GUID() { var S4 = function() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); }; return ("_" + S4() + S4() + "-" + Date.now()); } function $PARSE(obj) { let Class = {}, Style = {}; Object.keys(obj).forEach(key => { Class[key] = $GUID(); Style["." + Class[key]] = obj[key]; }); Style = $SASS(Style); return ({ Class, Style }) } function $CLEAN(str) { return (function() { return str.replace(/(||)/gm, ""); })().replaceAll(/ +/g, "").trim(); } const { Class, Style } = $PARSE(obj); exist = false; document.querySelectorAll("style").forEach(s => { if ($CLEAN(s.innerHTML) === $CLEAN(Style)) exist = true; }); if (!exist) { document.querySelector('head').insertAdjacentHTML("beforeend", "<style id=\\"" + $GUID() + "\\">" + Style + "</style>") } return Class; }`;
    html = await include(html, data);
    html = clean(html).replace(/["]+/g, '\\"');
    html = comment(html);
    code += parse(jscExp, html, add);
    code += 'return r.join("");';
    code = "with(obj || {}){" + code + "}";
    return code;
}

function comment (html) {
    var match,
        cursor = 0,
        code = "";
    while ((match = comExp.exec(html))) {
        code += html.slice(cursor, match.index);
        code += `<!-- ${match[1].trim()} -->`;
        cursor = match.index + match[0].length;
    }
    code += html.substr(cursor, html.length - cursor);
    return code;
}

function render (html, data) {
    try {
        return new Function("obj", "ctx", clean(html)).call(data, data || {});
    } catch (e) {
        var arr = e.stack
            .split("at")
            .slice(5)
            .reduce((a, i) => {
                i = i.replace(location.origin, "").split(":");
                i = `${i[0].split(" ")[i[0].split(" ").length - 1].slice(1)} 
                <span>in line</span> ${i[1]}`;
                return [...a, i];
            }, [])
            .join("<br/><span>at</span> ");
        var template = `
            <style>
                body{
                    height: 100vh;
                    overflow: hidden;
                }
                .XO_Framework_Error {
                    background-color: #000000C9;
                    padding: 20px 40px;
                    z-index: 100000000;
                    position: fixed;
                    inset: 0;

                }
                .XO_Framework_Error h1 {
                    margin-bottom: 30px;
                    font-size: 50px;
                    color: tomato;
                }
                .XO_Framework_Error p {
                    margin-bottom: 10px;
                    letter-spacing: 1px;
                    line-height: 1.5;
                    font-size: 20px;
                    color: #FFFFFF;
                }
                .XO_Framework_Error p span {
                    letter-spacing: 1px;
                    line-height: 1.5;
                    font-size: 20px;
                    color: #FFFFFF;
                    font-weight: bolder;
                }
            </style>
            <div class="XO_Framework_Error">
                <h1>XO Error</h1>
                <p>${e.message}:</p>
                <p><span>at</span> ${arr}</p>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", template);
        throw e;
    }
}

async function include (html, _data) {
    var match,
        cursor,
        code = [];
    while ((match = jscExp.exec(html))) {
        if (match[1].trim().startsWith("include")) {
            match[1] = match[1].split(" ")[1].trim();
            code.push(match);
            cursor = match.index + match[0].length;
        }
    }
    for (var i = 0; i < code.length; i = i + 1) {
        var data = await request(code[i][1], _data);
        html = html.replace(code[i][0], data);
        html = await include(html, _data);
    }
    return html;
}

async function html (code, data) {
    code = await shape(clean(code), data);
    return render(code, data);
}

module.exports = function (data, vars) {
    if (Array.isArray(data)) {
        return (async (data, vars) => {
            vars = Array.isArray(vars) ? vars : [vars];
            data = Array.isArray(data) ? data.reduce((c, e, i) => [...c, e, vars[i] || ""], []).join("") : data;
            return await html(data);
        })(data, vars);
    } else {
        return function (code, vars) {
            return (async (code, vars, data) => {
                vars = Array.isArray(vars) ? vars : [vars];
                code = Array.isArray(code) ? code.reduce((c, e, i) => [...c, e, vars[i] || ""], []).join("") : code;
                return await html(code, data);
            })(code, vars, data);
        };
    }
};