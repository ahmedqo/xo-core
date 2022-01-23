module.exports = (function(window, document) {
    'use strict';

    let domReadyQueue = [];

    /**
     * check if dom loaded then run fn else push to array
     * @param {Function} fn 
     * @return Function|Array
     */
    const handleDOMReady = (fn) => {

        return document.readyState === "complete" ?
            fn.call(document) :
            domReadyQueue.push(fn);

    }

    document.addEventListener("DOMContentLoaded", function onDOMReady() {

        document.removeEventListener("DOMContentLoaded", onDOMReady);

        while (domReadyQueue.length) {
            domReadyQueue.shift().call(document);
        }

    })

    /**
     * XODom Constractor
     * @param {String|HTMLElement|NodeList} ele 
     * @return XODom
     */
    function XODom(ele) {

        if (ele instanceof XODom) {
            return ele;
        }

        if (!(this instanceof XODom)) {
            return new XODom(ele);
        }

        if (typeof ele === 'function') {
            return handleDOMReady(ele);
        }

        this._nodes = [];

        if (
            ele instanceof HTMLCollection ||
            ele instanceof HTMLElement ||
            ele instanceof NodeList ||
            ele instanceof Array ||
            ele === document ||
            ele === window
        ) {
            this._nodes = ele.length > 0 ? [].slice.call(ele) : [ele];
        } else if (
            typeof ele === "string"
        ) {
            if (
                ele[ele.length - 1] === ">" &&
                ele[0] === "<"
            ) {
                this._nodes = [createNode(ele)];
            } else {
                this._nodes = [].slice.call(document.querySelectorAll(ele));
            }
        }

        if (this._nodes.length) {
            this.length = this._nodes.length;
            for (let i = 0; i < this._nodes.length; i++) {
                this[i] = this._nodes[i];
            }
        }

    }

    /**
     * create an html element
     * @param {String} htm 
     * @return HTMLElement
     */
    function createNode(htm) {
        let div = document.createElement("div");
        div.innerHTML = htm;
        return div.firstChild;
    }

    XODom.fn = XODom.prototype;

    /**
     * execute fn to each node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.each = function(fn) {
        for (let i = 0; i < this.length; i++) {
            fn.call(this, this[i], i);
        }
        return this;
    }

    /**
     * if htm set html to each node list elements
     * get html of the first node list element
     * @param {String|Undefined|Array} htm 
     * @return XODom|String
     */
    XODom.fn.htm = function(htm) {
        if (htm == undefined) {
            return this[0] && this[0].innerHTML;
        }

        if (htm instanceof Array) {
            return this[0] && this[0].outerHTML;
        }

        this.each(e => {
            e.innerHTML = htm;
        });

        return this;
    }

    /**
     * set text to each node list elements
     * get text of the first node list element
     * @param {String} txt 
     * @return XODom|String
     */
    XODom.fn.txt = function(txt) {
        if (txt == undefined) {
            return this[0] && this[0].innerText;
        }

        this.each(e => {
            e.innerText = txt;
        });

        return this;
    }

    /**
     * set val to each node list elements if value in element
     * get value of the first node list element if value in element
     * @param {String} val 
     * @return XODom
     */
    XODom.fn.val = function(val) {
        if (val == undefined) {
            return this[0] && "value" in this[0] && this[0].value;
        }

        this.each(e => {
            if ("value" in this[0])
                e.value = val;
        });

        return this;
    }

    /**
     * get value length of the first node list element
     * @return Number
     */
    XODom.fn.len = function() {
        return this[0] && "value" in this[0] && this[0].value.trim().length;
    }

    /**
     * add html|node to each node list elements
     * @param {String|NodeList} htm 
     * @return XODom
     */
    XODom.fn.attach = function(...htm) {
        for (var n of htm) {
            if (typeof n === "string")
                this.each(function(e) {
                    e.innerHTML = e.innerHTML + n;
                });
            if (n instanceof HTMLElement)
                this.each(function(e) {
                    e.append(n)
                });
        }

        return this;
    }

    /**
     * append each node list element to target
     * @param {HTMLElement|String} el 
     * @return XODom
     */
    XODom.fn.attachTo = function(el) {
        if (el instanceof HTMLElement) {
            this.each(function(e) {
                el.append(e);
            });
        }
        if (typeof el === "string") {
            let _el = document.querySelector(el);
            this.each(function(e) {
                _el.append(e);
            });
        }

        return this
    }

    /**
     * pre-add html|node to each node list elements
     * @param {String|NodeList} htm 
     * @return XODom
     */
    XODom.fn.pretach = function(...htm) {
        for (var n of htm) {
            if (typeof n === "string")
                this.each(function(e) {
                    e.innerHTML = n + e.innerHTML;
                });
            if (n instanceof HTMLElement)
                this.each(function(e) {
                    e.prepend(n)
                });
        }

        return this;
    }

    /**
     * prepend each node list element to target
     * @param {HTMLElement|String} el 
     * @return XODom
     */
    XODom.fn.pretachTo = function(el) {
        if (el instanceof HTMLElement) {
            this.each(function(e) {
                el.prepend(e);
            });
        }
        if (typeof el === "string") {
            let _el = document.querySelector(el);
            this.each(function(e) {
                _el.prepend(e);
            });
        }

        return this
    }

    /**
     * wrap each node list element with htm
     * @param {String} htm 
     * @return XODom
     */
    XODom.fn.wrap = function(htm) {
        if (typeof htm === "string") {
            this.each(function(e) {
                let w = createNode(htm);
                e.parentElement.insertBefore(w, e);
                w.append(e)
            })
        }
        return this;
    }

    /**
     * remove parent of each node list element
     * @return XODom
     */
    XODom.fn.unwrap = function() {
        this.each(function(e) {
            let p = e.parentElement,
                g = p.parentElement;
            g.insertBefore(e, p)
            p.remove();
        });

        return this;
    }

    /**
     * get computed width of the first node list element if otr get bounding
     * @param {Boolean} otr
     * @return String
     */
    XODom.fn.width = function(otr) {
        return this[0] && otr ? this[0].getBoundingClientRect().width : getComputedStyle(this[0]).width
    }

    /**
     * get computed height of the first node list element if otr get bounding
     * @param {Boolean} otr
     * @return String
     */
    XODom.fn.height = function(otr) {
        return this[0] && otr ? this[0].getBoundingClientRect().height : getComputedStyle(this[0]).height
    }


    /**
     * add html|node after each node list elements
     * @param {String|NodeList} htm 
     * @return XODom
     */
    XODom.fn.after = function(...htm) {
        for (var n of htm) {
            if (typeof n === "string") {
                this.each(function(e) {
                    e.insertAdjacentHTML("afterEnd", n);
                });
            }
            if (n instanceof HTMLElement) {
                this.each(function(e) {
                    e.insertAdjacentElement("afterEnd", n);
                });
            }
        }

        return this;
    }

    /**
     * add html|node before each node list elements
     * @param {String|NodeList} htm 
     * @return XODom
     */
    XODom.fn.before = function(...htm) {
        for (var n of htm) {
            if (typeof n === "string")
                this.each(function(e) {
                    e.insertAdjacentHTML("beforeBegin", n);
                });
            if (n instanceof HTMLElement)
                this.each(function(e) {
                    e.insertAdjacentElement("beforeBegin", n);
                });
        }

        return this;
    }

    /**
     * remove ele node list or node list elements
     * @param {String} ele 
     * @return XODom
     */
    XODom.fn.remove = function(ele) {
        if (ele)
            this.each(function(e) {
                var chd = [].slice.call(e.querySelectorAll(ele));
                for (var c of chd) {
                    c.remove();
                }
            });
        else
            this.each(function(e, i) {
                this._nodes = [];
                delete this[i];
                e.remove();
            });

        return this;
    }

    /**
     * find element in each node list elements
     * @param {String} ele 
     * @return XODom
     */
    XODom.fn.find = function(ele) {
        if (ele) {
            var els = [].slice.call(document.querySelectorAll(ele));
            for (var i = 0, e = els[i]; i < els.length; i++) {
                if (!this._nodes.includes(e.parentElement)) {
                    els.splice(i, 1);
                }
            }
            return XODom(els);
        }

        return this;
    }

    /**
     * get children of each node list elements
     * @return XODom
     */
    XODom.fn.children = function() {
        let all = []
        this.each(function(e) {
            all = [].concat.call(all, [].slice.call(e.children));
        });

        return new XODom(all);
    }

    /**
     * get children of each node list elements
     * @return XODom
     */
    XODom.fn.nodes = function() {
        let all = []
        this.each(function(e) {
            all = [].concat.call(all, [].slice.call(e.childNodes));
        });

        return new XODom(all);
    }

    /**
     * clone each node list elements
     * @return XODom
     */
    XODom.fn.clone = function() {
        let all = []
        this.each(function(e) {
            all.push(e.cloneNode());
        });

        return new XODom(all);
    }

    /**
     * replce each node list elements with ele
     * @param {String|Node} ele 
     * @return XODom
     */
    XODom.fn.replace = function(ele) {
        if (ele) {
            let node = createNode(ele)
            this.each(el => {
                el.replaceWith(node);
            });
        }

        return this;
    }

    /**
     * add classes to each node list elements
     * @param  {...String} nms 
     * @return XODom
     */
    XODom.fn.addClass = function(...nms) {
        this.each(el => {
            el.classList.add(...nms);
        });

        return this;
    }

    /**
     * delete classes to each node list elements
     * @param  {...String} nms 
     * @return XODom
     */
    XODom.fn.delClass = function(...nms) {
        this.each(function(e) {
            e.classList.remove(...nms);
        });

        return this;
    }

    /**
     * toggle classes to each node list elements
     * @param  {...String} nms 
     * @return XODom
     */
    XODom.fn.togClass = function(...nms) {
        this.each(function(e) {
            for (var c of nms) {
                e.classList.toggle(c);
            }
        });

        return this;
    }

    /**
     * weather the first node list element has class or not
     * @param {String} nms 
     * @return Boolean
     */
    XODom.fn.hasClass = function(nms) {
        return this[0] && this[0].classList.contains(nms);
    }

    /**
     * replace old class name with new class name to each node list elements
     * @param {String} onm 
     * @param {String} nnm 
     * @return XODom
     */
    XODom.fn.putClass = function(onm, nnm) {
        this.each(function(e) {
            e.classList.replace(onm, nnm);
        });

        return this;
    }

    /**
     * if nam{String} and val{String} set attribute to each node list elements
     * if nam{String} get attribute of the first node list element
     * if nam{Object} set attributes to each node list elements
     * @param {String|Object} nam 
     * @param {String} val 
     * @return XODom|String
     */
    XODom.fn.attr = function(nam, val) {
        if (nam && val == undefined && typeof nam == "string") {
            return this[0] && this[0].getAttribute(nam);
        }
        if (nam && val != undefined && typeof nam == "string") {
            this.each(e => {
                e.setAttribute(nam, val);
            });
        }

        if (nam && val === undefined && typeof nam == "object") {
            this.each(e => {
                for (var key in nam) {
                    let dec = key.replace(/\p{Lu}/gu, m => "-" + m.toLowerCase());
                    e.setAttribute(dec, nam[key]);
                }
            });
        }

        return this;
    }

    /**
     * delete attributes to each node list elements
     * @param  {...String} nms 
     * @return XODom
     */
    XODom.fn.delAttr = function(...nms) {
        this.each(function(e) {
            for (var c of nms) {
                e.removeAttribute(c);
            }
        });

        return this;
    }

    /**
     * toggle attributes to each node list elements
     * @param  {...String} nms 
     * @return XODom
     */
    XODom.fn.togAttr = function(...nms) {
        this.each(function(e) {
            for (var c of nms) {
                e.toggleAttribute(c);
            }
        });

        return this;
    }

    /**
     * weather the first node list element has attribute or not
     * @param {String} nms 
     * @return Boolean
     */
    XODom.fn.hasAttr = function(nms) {
        return this[0] && this[0].hasAttribute(nms);
    }

    /**
     * replace old attribute name with new attribute name to each node list elements
     * @param {String} onm 
     * @param {String} nnm 
     * @return XODom
     */
    XODom.fn.putAttr = function(onm, nnm, val) {
        if (typeof onm === "string" && typeof nnm === "string") {
            this.setAttr(nnm, val);
            this.delAttr(onm);
        }

        return this;
    }

    /**
     * if nam{String} and val{String} set property to each node list elements
     * if nam{String} get property of the first node list element
     * if nam{Object} set properties to each node list elements
     * @param {String|Object} nam 
     * @param {String} val 
     * @return XODom|String
     */
    XODom.fn.prop = function(nam, val) {
        if (nam && val === undefined && typeof nam == "string") {
            return this[0] && this[0][nam];
        }

        if (nam && val !== undefined && typeof nam == "string") {
            this.each(e => {
                e[nam] = val;
            });
        }

        if (nam && val === undefined && typeof nam == "object") {
            this.each(e => {
                for (var key in nam) {
                    e[key] = nam[key];
                }
            });
        }

        return this;
    }

    /**
     * delete properties to each node list elements
     * @param  {...String} nms 
     * @return XODom
     */
    XODom.fn.delProp = function(...nms) {
        this.each(function(e) {
            for (var c of nms) {
                delete e[c];
            }
        });

        return this;
    }

    /**
     * weather the first node list element has property or not
     * @param {String} nms
     * @return Boolean
     */
    XODom.fn.hasProp = function(nm) {
        return this[0] && nm in this[0];
    }

    /**
     * get next node of the first node list element
     * @return XODom
     */
    XODom.fn.next = function() {
        return this[0] && new XODom(this[0].nextElementSibling);
    }

    /**
     * get previous node of the first node list element
     * @return XODom
     */
    XODom.fn.prev = function() {
        return this[0] && new XODom(this[0].previousElementSibling);
    }

    /**
     * get parent node of the first node list element
     * @return XODom
     */
    XODom.fn.parent = function() {
        return this[0] && new XODom(this[0].parentElement);
    }

    /**
     * get length of node list
     * @return Number
     */
    XODom.fn.size = function() {
        return this._nodes.length;
    }

    /**
     * if nam{String} and val{String} set style to each node list elements
     * if nam{String} get style of the first node list element
     * if nam{Object} set styles to each node list elements
     * @param {String|Object} nam 
     * @param {String} val 
     * @return XODom|String
     */
    XODom.fn.css = function(nam, val) {
        if (nam && val === undefined && typeof nam == "string") {
            return this[0] && getComputedStyle(this[0])[nam]
        }

        if (nam && val !== undefined && typeof nam == "string") {
            if (val.startsWith(":")) {
                return this[0] && getComputedStyle(this[0], val)[nam]
            }
            this.each(e => {
                e.style.setProperty(nam, val);
            });
        }

        if (nam && val === undefined && typeof nam == "object") {
            this.each(e => {
                for (var key in nam) {
                    let dec = key.replace(/\p{Lu}/gu, m => "-" + m.toLowerCase());
                    e.style.setProperty(dec, nam[key]);
                }
            });
        }

        return this;
    }

    /**
     * if nam{String} and val{String} set dataset val to each node list elements
     * if nam{String} get dataset val of the first node list element
     * if nam{Object} set dataset vals to each node list elements
     * @param {String|Object} nam 
     * @param {String} val 
     * @return XODom|String
     */
    XODom.fn.data = function(nam, val) {
        if (nam && val === undefined && typeof nam == "string") {
            return this[0] && this[0].dataset[nam];
        }

        if (nam && val !== undefined && typeof nam == "string") {
            this.each(e => {
                e.dataset[nam] = val;
            });
        }

        if (nam && val === undefined && typeof nam == "object") {
            this.each(e => {
                for (var key in nam) {
                    e.dataset[key] = nam[key];
                }
            });
        }

        return this;
    }

    /**
     * get node list element at pos n -1 last one as XODom
     * @param {Number} n 
     * @return XODom
     */
    XODom.fn.get = function(n) {
        if (typeof n === "number") {
            let el;
            if (n === -1) el = this._nodes[this._nodes.length - 1];
            else el = this._nodes[n];
            if (el) return new XODom(el);
        }
    }

    /**
     * validate value of the first node list element
     * @param  {...String} nms 
     * @return Boolean
     */
    XODom.fn.validate = function(...nms) {
        var regex = {
                email: /[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}/g,
                zipCode: /[0-9]{4,10}/g,
                upperCase: /[A-Z]/g,
                lowerCase: /[a-z]/g,
                numeric: /[0-9]/g,
                special: /\W/g,
            },
            keys = Object.keys(regex),
            arr = [];
        if (!this[0] && !("value" in this[0])) return null;
        for (var n of nms) {
            if (keys.indeXODomf(n) !== -1) {
                arr.push(regex[n].test(this[0].value.trim()));
            }
        }
        return arr.includes(false) ? false : true;
    }

    // Evenets

    /**
     * add event to node list elements
     * @param {String} nam 
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.on = function(nam, fn) {
        this.each(function(e) {
            e.addEventListener(nam, fn, false);
            if (!("eventList" in e)) e.eventList = {};
            if (!(nam in e.eventList)) e.eventList[nam] = [];
            e.eventList[nam].push(fn);
        });

        return this;
    }

    /**
     * del event to node list elements
     * @param {String} nam 
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.off = function(nam, fn) {
        this.each(function(e) {
            e.removeEventListener(nam, fn);
            if (!("eventList" in e)) e.eventList = {};
            if (!(nam in e.eventList)) e.eventList[nam] = [];
            if (e.eventList[nam].indeXODomf(fn) !== -1)
                e.eventList[nam].splice(e.eventList[nam].indeXODomf(fn), 1);
        });

        return this;
    }

    /**
     * run over on mouseover and run out on mouseout to each node list elements
     * @param {Function} over 
     * @param {Function} out 
     * @return XODom
     */
    XODom.fn.hover = function(over, out) {
        if (typeof over === "function" && typeof out === "function") {
            this.each(function(e) {
                e.onmouseover = over;
                if (!("eventList" in e)) e.eventList = {};
                if (!("mouseover" in e.eventList)) e.eventList.mouseover = [];
                e.eventList.mouseover.push(fn);
                e.onmouseout = out;
                if (!("eventList" in e)) e.eventList = {};
                if (!("mouseout" in e.eventList)) e.eventList.mouseout = [];
                e.eventList.mouseout.push(fn);
            });
        }

        return this;
    }


    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.afterprint = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("afterprint" in e.eventList)) e.eventList.afterprint = [];
                e.eventList.afterprint.push(fn);
                e.onafterprint = fn;
            });
        } else {
            this.each(function(e) {
                if ("afterprint" in e) e.afterprint();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.beforeprint = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("beforeprint" in e.eventList)) e.eventList.beforeprint = [];
                e.eventList.beforeprint.push(fn);
                e.onbeforeprint = fn;
            });
        } else {
            this.each(function(e) {
                if ("beforeprint" in e) e.beforeprint();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.beforeunload = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("beforeunload" in e.eventList)) e.eventList.beforeunload = [];
                e.eventList.beforeunload.push(fn);
                e.onbeforeunload = fn;
            });
        } else {
            this.each(function(e) {
                if ("beforeunload" in e) e.beforeunload();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.error = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("error" in e.eventList)) e.eventList.error = [];
                e.eventList.error.push(fn);
                e.onerror = fn;
            });
        } else {
            this.each(function(e) {
                if ("error" in e) e.error();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.hashchange = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("hashchange" in e.eventList)) e.eventList.hashchange = [];
                e.eventList.hashchange.push(fn);
                e.onhashchange = fn;
            });
        } else {
            this.each(function(e) {
                if ("hashchange" in e) e.hashchange();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.load = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("load" in e.eventList)) e.eventList.load = [];
                e.eventList.load.push(fn);
                e.onload = fn;
            });
        } else {
            this.each(function(e) {
                if ("load" in e) e.load();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.offline = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("offline" in e.eventList)) e.eventList.offline = [];
                e.eventList.offline.push(fn);
                e.onoffline = fn;
            });
        } else {
            this.each(function(e) {
                if ("offline" in e) e.offline();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.online = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("online" in e.eventList)) e.eventList.online = [];
                e.eventList.online.push(fn);
                e.ononline = fn;
            });
        } else {
            this.each(function(e) {
                if ("online" in e) e.online();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.pageshow = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("pageshow" in e.eventList)) e.eventList.pageshow = [];
                e.eventList.pageshow.push(fn);
                e.onpageshow = fn;
            });
        } else {
            this.each(function(e) {
                if ("pageshow" in e) e.pageshow();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.resize = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("resize" in e.eventList)) e.eventList.resize = [];
                e.eventList.resize.push(fn);
                e.onresize = fn;
            });
        } else {
            this.each(function(e) {
                if ("resize" in e) e.resize();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.unload = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("unload" in e.eventList)) e.eventList.unload = [];
                e.eventList.unload.push(fn);
                e.onunload = fn;
            });
        } else {
            this.each(function(e) {
                if ("unload" in e) e.unload();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.blur = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("blur" in e.eventList)) e.eventList.blur = [];
                e.eventList.blur.push(fn);
                e.onblur = fn;
            });
        } else {
            this.each(function(e) {
                if ("blur" in e) e.blur();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.change = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("change" in e.eventList)) e.eventList.change = [];
                e.eventList.change.push(fn);
                e.onchange = fn;
            });
        } else {
            this.each(function(e) {
                if ("change" in e) e.change();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.contextmenu = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("contextmenu" in e.eventList)) e.eventList.contextmenu = [];
                e.eventList.contextmenu.push(fn);
                e.oncontextmenu = fn;
            });
        } else {
            this.each(function(e) {
                if ("contextmenu" in e) e.contextmenu();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.focus = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("focus" in e.eventList)) e.eventList.focus = [];
                e.eventList.focus.push(fn);
                e.onfocus = fn;
            });
        } else {
            this.each(function(e) {
                if ("focus" in e) e.focus();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.input = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("input" in e.eventList)) e.eventList.input = [];
                e.eventList.input.push(fn);
                e.oninput = fn;
            });
        } else {
            this.each(function(e) {
                if ("input" in e) e.input();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.invalid = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("invalid" in e.eventList)) e.eventList.invalid = [];
                e.eventList.invalid.push(fn);
                e.oninvalid = fn;
            });
        } else {
            this.each(function(e) {
                if ("invalid" in e) e.invalid();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.reset = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("reset" in e.eventList)) e.eventList.reset = [];
                e.eventList.reset.push(fn);
                e.onreset = fn;
            });
        } else {
            this.each(function(e) {
                if ("reset" in e) e.reset();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.search = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("search" in e.eventList)) e.eventList.search = [];
                e.eventList.search.push(fn);
                e.onsearch = fn;
            });
        } else {
            this.each(function(e) {
                if ("search" in e) e.search();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.select = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("select" in e.eventList)) e.eventList.select = [];
                e.eventList.select.push(fn);
                e.onselect = fn;
            });
        } else {
            this.each(function(e) {
                if ("select" in e) e.select();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.submit = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("submit" in e.eventList)) e.eventList.submit = [];
                e.eventList.submit.push(fn);
                e.onsubmit = fn;
            });
        } else {
            this.each(function(e) {
                if ("submit" in e) e.submit();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.keydown = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("keydown" in e.eventList)) e.eventList.keydown = [];
                e.eventList.keydown.push(fn);
                e.onkeydown = fn;
            });
        } else {
            this.each(function(e) {
                if ("keydown" in e) e.keydown();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.keypress = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("keypress" in e.eventList)) e.eventList.keypress = [];
                e.eventList.keypress.push(fn);
                e.onkeypress = fn;
            });
        } else {
            this.each(function(e) {
                if ("keypress" in e) e.keypress();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.keyup = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("keyup" in e.eventList)) e.eventList.keyup = [];
                e.eventList.keyup.push(fn);
                e.onkeyup = fn;
            });
        } else {
            this.each(function(e) {
                if ("keyup" in e) e.keyup();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.click = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("click" in e.eventList)) e.eventList.click = [];
                e.eventList.click.push(fn);
                e.onclick = fn;
            });
        } else {
            this.each(function(e) {
                if ("click" in e) e.click();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.dblclick = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("dblclick" in e.eventList)) e.eventList.dblclick = [];
                e.eventList.dblclick.push(fn);
                e.ondblclick = fn;
            });
        } else {
            this.each(function(e) {
                if ("dblclick" in e) e.dblclick();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.mousedown = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("mousedown" in e.eventList)) e.eventList.mousedown = [];
                e.eventList.mousedown.push(fn);
                e.onmousedown = fn;
            });
        } else {
            this.each(function(e) {
                if ("mousedown" in e) e.mousedown();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.mousemove = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("mousemove" in e.eventList)) e.eventList.mousemove = [];
                e.eventList.mousemove.push(fn);
                e.onmousemove = fn;
            });
        } else {
            this.each(function(e) {
                if ("mousemove" in e) e.mousemove();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.mouseout = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("mouseout" in e.eventList)) e.eventList.mouseout = [];
                e.eventList.mouseout.push(fn);
                e.onmouseout = fn;
            });
        } else {
            this.each(function(e) {
                if ("mouseout" in e) e.mouseout();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.mouseover = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("mouseover" in e.eventList)) e.eventList.mouseover = [];
                e.eventList.mouseover.push(fn);
                e.onmouseover = fn;
            });
        } else {
            this.each(function(e) {
                if ("mouseover" in e) e.mouseover();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.mouseup = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("mouseup" in e.eventList)) e.eventList.mouseup = [];
                e.eventList.mouseup.push(fn);
                e.onmouseup = fn;
            });
        } else {
            this.each(function(e) {
                if ("mouseup" in e) e.mouseup();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.wheel = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("wheel" in e.eventList)) e.eventList.wheel = [];
                e.eventList.wheel.push(fn);
                e.onwheel = fn;
            });
        } else {
            this.each(function(e) {
                if ("wheel" in e) e.wheel();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.wheel = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("wheel" in e.eventList)) e.eventList.wheel = [];
                e.eventList.wheel.push(fn);
                e.onwheel = fn;
            });
        } else {
            this.each(function(e) {
                if ("wheel" in e) e.wheel();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.drag = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("drag" in e.eventList)) e.eventList.drag = [];
                e.eventList.drag.push(fn);
                e.ondrag = fn;
            });
        } else {
            this.each(function(e) {
                if ("drag" in e) e.drag();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.dragend = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("dragend" in e.eventList)) e.eventList.dragend = [];
                e.eventList.dragend.push(fn);
                e.ondragend = fn;
            });
        } else {
            this.each(function(e) {
                if ("dragend" in e) e.dragend();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.dragenter = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("dragenter" in e.eventList)) e.eventList.dragenter = [];
                e.eventList.dragenter.push(fn);
                e.ondragenter = fn;
            });
        } else {
            this.each(function(e) {
                if ("dragenter" in e) e.dragenter();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.dragleave = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("dragleave" in e.eventList)) e.eventList.dragleave = [];
                e.eventList.dragleave.push(fn);
                e.ondragleave = fn;
            });
        } else {
            this.each(function(e) {
                if ("dragleave" in e) e.dragleave();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.dragover = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("dragover" in e.eventList)) e.eventList.dragover = [];
                e.eventList.dragover.push(fn);
                e.ondragover = fn;
            });
        } else {
            this.each(function(e) {
                if ("dragover" in e) e.dragover();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.dragstart = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("dragstart" in e.eventList)) e.eventList.dragstart = [];
                e.eventList.dragstart.push(fn);
                e.ondragstart = fn;
            });
        } else {
            this.each(function(e) {
                if ("dragstart" in e) e.dragstart();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.drop = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("drop" in e.eventList)) e.eventList.drop = [];
                e.eventList.drop.push(fn);
                e.ondrop = fn;
            });
        } else {
            this.each(function(e) {
                if ("drop" in e) e.drop();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.scroll = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("scroll" in e.eventList)) e.eventList.scroll = [];
                e.eventList.scroll.push(fn);
                e.onscroll = fn;
            });
        } else {
            this.each(function(e) {
                if ("scroll" in e) e.scroll();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.copy = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("copy" in e.eventList)) e.eventList.copy = [];
                e.eventList.copy.push(fn);
                e.oncopy = fn;
            });
        } else {
            this.each(function(e) {
                if ("copy" in e) e.copy();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.cut = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("cut" in e.eventList)) e.eventList.cut = [];
                e.eventList.cut.push(fn);
                e.oncut = fn;
            });
        } else {
            this.each(function(e) {
                if ("cut" in e) e.cut();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.paste = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("paste" in e.eventList)) e.eventList.paste = [];
                e.eventList.paste.push(fn);
                e.onpaste = fn;
            });
        } else {
            this.each(function(e) {
                if ("paste" in e) e.paste();
                else fn();
            });
        }

        return this;
    }

    /**
     * add event to node list elements
     * @param {Function} fn 
     * @return XODom
     */
    XODom.fn.toggle = function(fn) {
        if (typeof fn === "function") {
            this.each(function(e) {
                if (!("eventList" in e)) e.eventList = {};
                if (!("toggle" in e.eventList)) e.eventList.toggle = [];
                e.eventList.toggle.push(fn);
                e.ontoggle = fn;
            });
        } else {
            this.each(function(e) {
                if ("toggle" in e) e.toggle();
                else fn();
            });
        }

        return this;
    }

    /**
     * local storage handler
     */
    XODom.storage = {
        /**
         * set local storage item if jsn as json
         * @param {String} nam 
         * @param {String|Object|Array} val 
         * @param {Boolean} jsn 
         */
        set(nam, val, jsn) {
            if (nam && val !== undefined && typeof nam === "string") {
                val = jsn ? JSON.stringify(val) : val;
                localStorage.setItem(nam, val);
            }
        },

        /**
         * delete local storage items
         * @param  {...String} nms 
         */
        del(...nms) {
            for (var nm in nms) {
                localStorage.removeItem(nm);
            }
        },

        /**
         * get local storage item if exist if jsn as json
         * @param {String} nam 
         * @param {Boolean} jsn 
         * @return String|Object
         */
        get(nam, jsn) {
            if (nam && this.has(nam)) {
                let val = localStorage.getItem(nam);
                return jsn ? JSON.parse(val) : val;
            }
        },

        /**
         * get true if local storage item exist else fals
         * @param {String} nam 
         * @return Boolean
         */
        has(nam) {
            return typeof nam === "string" && localStorage.getItem(nam) ? true : false;
        },

        /**
         * delete all local storage items 
         */
        rid() {
            localStorage.clear();
        }
    }

    /**
     * session storage handler
     */
    XODom.session = {
        /**
         * set session storage item if jsn as json
         * @param {String} nam 
         * @param {String|Object|Array} val 
         * @param {Boolean} jsn 
         */
        set(nam, val, jsn) {
            if (nam && val !== undefined && typeof nam === "string") {
                val = jsn ? JSON.stringify(val) : val;
                sessionStorage.setItem(nam, val);
            }
        },

        /**
         * delete session storage items
         * @param  {...String} nms 
         */
        del(...nms) {
            for (var nm in nms) {
                sessionStorage.removeItem(nm);
            }
        },

        /**
         * get session storage item if exist if jsn as json
         * @param {String} nam 
         * @param {Boolean} jsn 
         * @return String|Object
         */
        get(nam, jsn) {
            if (nam && this.has(nam)) {
                let val = sessionStorage.getItem(nam);
                return jsn ? JSON.parse(val) : val;
            }
        },

        /**
         * get true if session storage item exist else fals
         * @param {String} nam 
         * @return Boolean
         */
        has(nam) {
            return typeof nam === "string" && sessionStorage.getItem(nam) ? true : false;
        },

        /**
         * delete all session storage items 
         */
        rid() {
            sessionStorage.clear();
        }
    }

    /**
     * larray handler
     */
    XODom.array = {
        /**
         * convert list of arrays of length 2 to object
         * @param  {...Array} arr 
         * @return Object
         */
        object(...arr) {
            let all = {}
            for (var a of arr) {
                if (a.length === 2)
                    all[a[0]] = a[1];
            }
            return all;
        },
    }

    /**
     * number handler
     */
    XODom.number = {
        /**
         * check if fn bigger then ln if eq inlude =
         * @param {Number} fn 
         * @param {Number} ln 
         * @param {Boolean} eq 
         * @return Boolean
         */
        bigger(fn, ln, eq) {
            if ((Number(fn) || Number(fn) == 0) && (Number(ln) || Number(ln) == 0))
                return eq ? Number(fn) >= Number(ln) : Number(fn) > Number(ln);
        },

        /**
         * check if fn smaller then ln if eq inlude =
         * @param {Number} fn 
         * @param {Number} ln 
         * @param {Boolean} eq 
         * @return Boolean
         */
        lesser(fn, ln, eq) {
            if ((Number(fn) || Number(fn) == 0) && (Number(ln) || Number(ln) == 0))
                return eq ? Number(fn) <= Number(ln) : Number(fn) < Number(ln);
        },

        /**
         * check if fn equals to ln
         * @param {Number} fn 
         * @param {Number} ln 
         * @param {Boolean} eq 
         * @return Boolean
         */
        equals(fn, ln) {
            if ((Number(fn) || Number(fn) == 0) && (Number(ln) || Number(ln) == 0))
                return Number(fn) == Number(ln);
        },

        /**
         * check if num betweem min and max if eq inlude =
         * @param {Number} num 
         * @param {Number} min
         * @param {Number} max
         * @param {Boolean} eql 
         * @return Boolean
         */
        middle(num, min, max, eql) {
            if ((Number(num) || Number(num) == 0) && (Number(min) || Number(min) == 0) && (Number(max) || Number(max) == 0))
                return this.bigger(num, min, eql) && this.lesser(num, max, eql);
        },
    }

    return XODom;

})(window, document);