module.exports.XOShape = (function(document) {
    'use strict'

    function XOShape(el) {
        el = !el ? document.body : typeof el === "string" ? document.querySelector(el) : el;
        var obs = new MutationObserver(function() {
            el.querySelectorAll('*').forEach(_el => {
                Array.from(_el.attributes).forEach(at => {
                    const _ev = /@(\w+)(?!\w)/g.exec(at.name);
                    if (_ev && _ev[1]) {
                        var call = new Function(`return (event) => { ${at.value} }`)(event);
                        _el.addEventListener(_ev[1], call);
                        _el.removeAttribute(at.name);
                    }
                })
            });
        });
        return function() {
            obs.observe(el, {
                childList: true,
                subtree: true
            });
        }
    }

    return XOShape
})(document);

module.exports.XOSheet = (function(document) {
    'use strict';

    function XOSheet(obj) {
        const {
            Classes,
            Styles
        } = $PARSE(obj);

        return function() {
            new MutationObserver(function() {
                $CLEAN(Styles);
                $CSS(Styles);
            }).observe(document.body, {
                childList: true,
                subtree: true
            });
            return Classes;
        }
    }

    function $DECAMEL(str) {
        return str.replace(/\p{Lu}/gu, (wrd) => '-' + wrd.toLowerCase());
    }

    function $SASS(c) {
        var all = '';
        for (let name in c) {
            let vals = c[name],
                t = '',
                s = '';
            if (Array.isArray(vals)) {
                all += $ARR(vals, name);
            } else if (typeof vals === 'string') {
                all += `${$DECAMEL(name)}:${vals};`;
            } else {
                for (let sub in vals) {
                    let subVals = vals[sub],
                        NAME = $DECAMEL(sub);
                    if (Array.isArray(subVals)) {
                        t += $ARR(subVals, NAME);
                    } else if (typeof subVals !== "object") {
                        t += `${NAME}:${subVals};`;
                    } else {
                        NAME.split(',').forEach((Name) => {
                            let N = Name.trim().startsWith('&') ? Name.trim().slice(1) : ` ${Name}`,
                                Sn = name + N,
                                o = {};
                            o[Sn] = subVals;
                            s += $SASS(o);
                        });
                    }
                }
                if (t.length > 0) all += `${name}{${t}}`;
                if (s.length > 0) all += s;
            }
        }
        return all;
    }

    function $ARR(v, n) {
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

    function $GUID() {
        var str = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (str() + str() + '-' + Date.now());
    }

    function $PARSE(obj) {
        let Classes = {},
            Styles = {};
        Object.keys(obj).forEach(key => {
            Classes[key] = '_' + $GUID();
            Styles['.' + Classes[key]] = obj[key];
        });
        Styles = $SASS(Styles)
        return ({
            Classes,
            Styles
        })
    }

    function $CLEAN(styles) {
        document.querySelectorAll('style').forEach(s => {
            if (s.innerHTML === styles) s.remove();
        })
    }

    function $CSS(styles) {
        var css = document.createElement('style');
        css.type = 'text/css';
        css.id = 'xo-style-' + $GUID();
        if (css.styleSheet)
            css.styleSheet.cssText = styles;
        else
            css.appendChild(document.createTextNode(styles));
        document.getElementsByTagName('head')[0].appendChild(css);
        return css;
    }

    return XOSheet;

})(document);