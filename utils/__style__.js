module.exports = (function(document) {
    'use strict';

    function XOStyle(obj) {
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
            if (typeof vals === 'string') all += `${$DECAMEL(name)}:${vals};`;
            else {
                for (let sub in vals) {
                    let subVals = vals[sub],
                        NAME = $DECAMEL(sub);
                    if (typeof subVals !== "object") {
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

    return XOStyle;

})(document);