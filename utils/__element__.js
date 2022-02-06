("use strict");

var ENG = require("./__elengine__");

JSON["name"] = "JSON";

function __atrobs(s) {
    return s.constructor.observedAttributes;
}

function __prodef(a, b, c) {
    Object.defineProperty(a, b, c);
}

function __props(s) {
    return s.constructor.properties;
}

function __attrs(s) {
    return s.constructor.attributes;
}

function __metds(s) {
    return s.constructor.methods;
}

function __array(e) {
    return Array.from(e);
}

function __keys(e) {
    return Object.keys(e);
}

function __cons(s) {
    return s.constructor;
}

class XOElement extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "closed" });
        __run(this);
        __cons(this).onCreated.bind(this)();
    }

    static get observedAttributes() {
        return [...__keys(this.attributes), "styles"];
    }

    static get attributes() {
        return {};
    }

    static get properties() {
        return {};
    }

    static get methods() {
        return {};
    }

    static get styles() {
        return {};
    }

    static onCreated() {
        return;
    }

    static onMounted() {
        return;
    }

    static onUpdated() {
        return;
    }

    static onRemoved() {
        return;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            if (name === "styles") {
                if (this.root.querySelector("style") && newVal !== null) {
                    var style = __sass(Object.assign({
                        mediaQueries: [],
                        keyFrames: [],
                        properties: []
                    }, new Function(`return ${JSON.parse(JSON.stringify(newVal))}`)()));
                    this.root.querySelector("style").innerHTML = __sass(__cons(this).styles) + style;
                    this.removeAttribute("styles");
                }
            }
            this.revive();
        }
        __cons(this).onUpdated.bind(this)(name, newVal, oldVal);
    }

    connectedCallback() {
        __array(this.attributes).forEach((a) => {
            let n = a.name.slice(1);
            if (a.name === "@load") {
                new Function(a.value).bind(this)();
                this.removeAttribute("@load");
            }
            if (a.name.startsWith("@")) {
                n = n.split("|");
                const _es = __evaction(n.slice(1));
                this.addEventListener(n[0], (e) => {
                    new Function(_es + a.value).bind(this)(e);
                });
                this.removeAttribute(a.name);
            }
        });
        __cons(this).onMounted.bind(this)();
    }

    disconnectedCallback() {
        __cons(this).onRemoved.bind(this)();
    }

    makeEvent(n, d, fn) {
        const e = new CustomEvent(n, {
            bubbles: true,
            cancelable: true,
            composed: true,
            isTrusted: true,
            detail: d,
        });
        this.dispatchEvent(e);
        if (!e.defaultPrevented && fn) {
            fn.bind(this)(e);
        }
    }

    render() {
        return "";
    }

    revive() {
        var code = ENG(__all(this), this.render());
        this.root.querySelectorAll("*").forEach((e) => (e.tagName !== "STYLE" ? e.remove() : ""));
        this.root.innerHTML += code;
        __ids(this);
        __observe(this);
    }
}

function __observe(s) {
    __array(s.root.querySelectorAll("*")).forEach((e) => {
        __array(e.attributes).forEach((a) => {
            if (a.name === "styles") {
                var obj = new Function(`return ${a.value}`)();
                for (var o in obj) {
                    e.style.setProperty(__decamel(o), obj[o]);
                }
                e.removeAttribute("styles");
            }
            let _ev = /\((.+?)\)/g.exec(a.name);
            if (_ev && _ev[1] && (!e.getEvent || !e.getEvent(_ev[1]))) {
                _ev = _ev[1].split("|");
                const _es = __evaction(_ev.slice(1));
                var call = new Function(`
                        return (event) => {
                            ${_es}
                            ${a.value} 
                        }
                    `).bind(s)(event);
                e.addEventListener(_ev[0], call);
                e.removeAttribute(a.name);
            }
        });
    });
}

function __evaction(ev) {
    return (ev.map(_e => {
        switch (_e) {
            case "prev":
                return "event.preventDefault();";
            case "stop":
                return "event.stopPropagation();";
            case "prop":
                return "event.stopImmediatePropagation();";
            default:
                return "";
        }
    }).join(""));
}

function __change(c, ot) {
    let nc = "";
    c.forEach((m) => {
        let o = {...m },
            v;
        switch (ot) {
            case -1:
                v = `@property ${o.name}{`;
                delete o.name;
                break;
            case 0:
                v = `@keyframes ${o.name}{`;
                delete o.name;
                break;
            case 1:
                v = `@media(${o.condition}){`;
                delete o.condition;
                break;
        }
        nc += v + __orgin(o);
        nc += `}`;
    });
    return nc;
}

function __style(e) {
    return function(c) {
        var s = document.createElement("style");
        s.appendChild(document.createTextNode(__sass(c, e)));
        return s;
    };
}

function __decamel(n) {
    return n.replace(/\p{Lu}/gu, (m) => "-" + m.toLowerCase());
}

function __orgin(c) {
    var all = "";
    for (let name in c) {
        let vals = c[name],
            t = "",
            s = "";
        if (Array.isArray(vals)) {
            all += __arr(vals, name);
        } else if (typeof vals === "string") {
            all += `${__decamel(name)}:${vals};`;
        } else {
            for (let sub in vals) {
                let subVals = vals[sub],
                    NAME = __decamel(sub);
                if (Array.isArray(subVals)) {
                    t += __arr(subVals, NAME);
                } else if (typeof subVals !== "object") {
                    t += `${NAME}:${subVals};`;
                } else {
                    NAME.split(",").forEach((Name) => {
                        let N = Name.trim().startsWith("&") ? Name.trim().slice(1) : ` ${Name}`,
                            Sn = name + N,
                            o = {};
                        o[Sn] = subVals;
                        s += __orgin(o);
                    });
                }
            }
            if (t.length > 0) all += `${name}{${t}}`;
            if (s.length > 0) all += s;
        }
    }
    return all;
}

function __arr(v, n) {
    let code,
        num = (nbr) => /\d/g.test(nbr);

    switch (v.length) {
        case 2:
            code = `${n}-top:${v[0] == null ? "unset" : num(v[0]) ? v[0] + "px" : v[0]};${n}-right:${v[1] == null ? "unset" : num(v[1]) ? v[1] + "px" : v[1]
                };${n}-bottom:${v[0] == null ? "unset" : num(v[0]) ? v[0] + "px" : v[0]};${n}-left:${v[1] == null ? "unset" : num(v[1]) ? v[1] + "px" : v[1]
                }; `;
            break;
        case 3:
            code = `${n}-top:${v[0] == null ? "unset" : num(v[0]) ? v[0] + v[2] : v[0]};${n}-right:${v[1] == null ? "unset" : num(v[1]) ? v[1] + v[2] : v[1]
                };${n}-bottom:${v[0] == null ? "unset" : num(v[0]) ? v[0] + v[2] : v[0]};${n}-left:${v[1] == null ? "unset" : num(v[1]) ? v[1] + v[2] : v[1]
                };`;
            break;
        case 4:
            code = `${n}-top:${v[0] == null ? "unset" : num(v[0]) ? v[0] + "px" : v[0]};${n}-right:${v[1] == null ? "unset" : num(v[1]) ? v[1] + "px" : v[1]
                };${n}-bottom:${v[2] == null ? "unset" : num(v[2]) ? v[2] + "px" : v[2]};${n}-left:${v[3] == null ? "unset" : num(v[3]) ? v[3] + "px" : v[3]
                };`;
            break;
        case 5:
            code = `${n}-top:${v[0] == null ? "unset" : num(v[0]) ? v[0] + v[4] : v[0]};${n}-right:${v[1] == null ? "unset" : num(v[1]) ? v[1] + v[4] : v[1]
                };${n}-bottom:${v[2] == null ? "unset" : num(v[2]) ? v[2] + v[4] : v[2]};${n}-left:${v[3] == null ? "unset" : num(v[3]) ? v[3] + v[4] : v[3]
                };`;
            break;
    }
    return code;
}

function __dom(E) {
    if (E.tagName === "STYLE") return;
    E.attrs = function() {
        let set = (n, v) => {
                this.setAttribute(n, v || "");
                return this;
            },
            del = (n) => {
                this.removeAttribute(n);
                return this;
            },
            get = (n) => {
                return this.getAttribute(n);
            },
            has = (n) => {
                return this.hasAttribute(n);
            },
            match = (n) => {
                return this.matches("[" + n + "]");
            },
            shift = (n) => {
                this.toggleAttribute(n);
                return this;
            };
        return {
            set,
            del,
            get,
            has,
            match,
            shift,
        };
    };
    E.class = function() {
        let add = (v) => {
                this.classList.add(v);
                return this;
            },
            del = (v) => {
                this.classList.remove(v);
                return this;
            };
        return {
            add,
            del,
        };
    };
    E.css = function(n, v) {
        if (n instanceof Object) {
            for (var k in n) {
                this.style.setProperty(k, n[k]);
            }
        } else {
            this.style.setProperty(n, v);
        }
        return this;
    };
    E.htm = function(v) {
        if (v || v === "") {
            this.innerHTML = v;
            return this;
        } else {
            return this.innerHTML;
        }
    };
    E.txt = function(v) {
        if (v || v === "") {
            this.innerText = v;
            return this;
        } else {
            return this.innerText;
        }
    };
    E.val = function(v) {
        if (v || v === "") {
            this.value = v;
            return this;
        } else {
            return this.value;
        }
    };
    E.on = function(ev, c) {
        this.addEventListener(ev, c);
        return this;
    };
    E.off = function(ev) {
        this.removeEventListener(ev, () => {});
        return this;
    };
    E.find = function(e) {
        e = __array(this.querySelectorAll(e));
        return e.length > 1 ? e : e[0];
    };
    E.each = function(n, fn) {
        this.querySelectorAll(n).forEach((e, i) => {
            fn(e, i);
        });
        return this;
    };
}

function __sass(c, e) {
    let o = (({ mediaQueries, keyFrames, properties, ...obj }) => obj)(c),
        m = c.mediaQueries ? [...c.mediaQueries] : [],
        p = c.properties ? [...c.properties] : [],
        k = c.keyFrames ? [...c.keyFrames] : [],
        ms = __keys(m).length ? __change(m, 1) : "",
        ks = __keys(k).length ? __change(k, 0) : "",
        ps = __keys(p).length ? __change(p, -1) : "";
    return __orgin(o) + ps + ks + ms;
}

function __type(n) {
    switch (n) {
        case "Array":
            return (e) => {
                if (e) {
                    if (Array.isArray(e)) return __array(e);
                    else return JSON.parse(e);
                }
                return e;
            };
        case "Object":
            return (e) => {
                if (e) {
                    if (typeof e === "object") return Object(e);
                    else return JSON.parse(e);
                }
                return e;
            };
        case "Date":
            return (e) => new Date(e);
        case "JSON":
            return JSON.parse;
        case "Boolean":
            return Boolean;
        case "String":
            return String;
        case "Number":
            return Number;
        case "parseInt":
            return parseInt;
        case "parseFloat":
            return parseFloat;
        default:
            return (e) => e;
    }
}

function __run(s) {
    __fns(s);
    var code = ENG(__all(s), s.render());
    s.root.append(__style(s)(__cons(s).styles));
    s.root.innerHTML += code;
    __ids(s);
    __observe(s);
}

function __ids(s) {
    s.$ = {};
    var ix = [];
    __array(s.root.querySelectorAll("*"))
        .filter((e) => {
            __dom(e);
            __evt(e);
            if (e.hasAttribute("id") && e.id.startsWith("xo-")) return e;
        })
        .forEach((e) => {
            e.setAttribute("part", "--" + e.id);
            ix.push("#" + e.id);
            ix = [...new Set(ix)];
        });
    ix.forEach((e) => {
        var i = __array(s.root.querySelectorAll(e));
        if (i.length > 1) s.$[e.slice(4)] = i;
        else s.$[e.slice(4)] = i[0];
    });
}

function __fns(s) {
    var PA = {};
    if (__keys(__props(s)).length) {
        __keys(__props(s)).forEach((k) => {
            PA[k] = __props(s)[k].default;
            PA[k + "Type"] = __props(s)[k].type;
            __prodef(s, k, {
                set(v) {
                    var o = PA[k];
                    PA[k] = __type(PA[k + "Type"].name)(v);
                    if (o !== PA[k]) s.revive();
                    __cons(s).onUpdated.bind(s)(k, PA[k], o);
                },
                get() {
                    return PA[k];
                },
            });
        });
    }
    if (__atrobs(s).length) {
        __atrobs(s).forEach((a) => {
            __prodef(s, a, {
                get() {
                    var t = __attrs(s)[a],
                        A = s.getAttribute(a);
                    if (t && t.name === "Boolean") {
                        if (s.hasAttribute(a) && s.getAttribute(a) !== "false") return true;
                        else return false;
                    } else if (A === undefined) return undefined;
                    else if (A === null) return null;
                    else return t && t.name ? __type(t.name)(A) : A;
                },
                set(v) {
                    s.setAttribute(a, JSON.stringify(v));
                },
            });
        });
    }
    if (__keys(__metds(s)).length) {
        __keys(__metds(s)).forEach((k) => {
            __prodef(s, k, {
                value: __metds(s)[k].bind(s),
            });
        });
    }
}

function __evt(s) {
    s._addEventListener = s.addEventListener;
    s._removeEventListener = s.removeEventListener;
    s.addEventListener = function(a, b, c) {
        s._addEventListener(a, b, c);
        if (!this.eventList) this.eventList = {};
        if (!this.eventList[a]) this.eventList[a] = [];
        this.eventList[a].push(b);
    };
    s.removeEventListener = function(a, b, c) {
        s._removeEventListener(a, b, c);
        if (this.eventList && this.eventList[a]) delete this.eventList[a];
    };
    s.getEvent = function(n) {
        return this.eventList && this.eventList[n] ? true : false;
    };
}

function __all(s) {
    var keys = [...__keys(__attrs(s)), ...__keys(__props(s)), ...__keys(__metds(s))],
        vals = {};
    keys.forEach((key) => {
        vals[key] = s[key];
    });
    return vals;
}

module.exports = XOElement;