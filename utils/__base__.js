module.exports = (function(document) {
    'use strict'

    /**
     * add event and remove attributes;
     */
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

    return { XOShape }
})(document);