("use strict");

var { _typeof, _toConsumableArray, _classCallCheck, _createClass } = require("./_runtime");

var XOResponse = (function() {
    var rt, re;

    function XOResponse(_rt, _re) {
        _classCallCheck(this, XOResponse);
        rt = _rt;
        re = _re;
    }

    _createClass(XOResponse, [{
        key: "data",
        get: function get() {
            return rt;
        }
    }, {
        key: "headers",
        get: function get() {
            return re.headers;
        }
    }, {
        key: "ok",
        get: function get() {
            return re.ok;
        }
    }, {
        key: "status",
        get: function get() {
            return re.status;
        }
    }, {
        key: "statusText",
        get: function get() {
            return re.statusText;
        }
    }, {
        key: "type",
        get: function get() {
            return re.type;
        }
    }, {
        key: "url",
        get: function get() {
            return re.url;
        }
    }]);

    return XOResponse;
})();

module.exports = (function(Headers, Response, Promise, Object, Reflect, Array, JSON, FormData, String, Function, fetch) {
    var URL,
        DATA,
        OPTS = {},
        ALLOW = false;

    /**
     * set the Vars
     * @param {String} url
     * @param {Object} opts
     */
    function XOFetch() {
        var url = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (url instanceof XOFetch) return url;

        if (!(this instanceof XOFetch)) return new XOFetch(url, opts);

        this.url = url;
        this.auth = opts.auth;
        this.headers = new Headers(opts.headers) || new Headers();
        this.method = opts.method ? opts.method.toLowerCase() : "get";
        this.body = opts.text || opts.json || opts.form || opts.query || {};

        _method(this, opts);

        _auth(this);

        OPTS = {
            method: this.method,
            headers: this.headers,
        };
    }

    XOFetch.fn = XOFetch.prototype;

    /**
     * add new header to headres
     * @param {String} name
     * @param {String} type
     * @return XOFetch
     */
    XOFetch.fn.addHeader = function(name, type) {
        if (name && type) {
            this.headers.append(name, type);
            OPTS.headers = this.headers;
        }
        return this;
    };

    /**
     * set mode
     * @param {String} o
     * @return XOFetch
     */
    XOFetch.fn.setMode = function(mode) {
        if (mode) this.mode = mode;
        else this.mode = "cors";
        OPTS.mode = this.mode;
        return this;
    };

    /**
     * set auth Header
     * @param {Object} o
     * @return XOFetch
     */
    XOFetch.fn.setAuth = function(auth) {
        if (_test.isObject(auth)) {
            this.auth = auth;
            _auth(this);
        }
        return this;
    };

    /**
     * set data and convert it to Query String
     * @param {Object|Fromdata} o
     * @return XOFetch
     */
    XOFetch.fn.toQuery = function(obj) {
        this.body = obj;
        DATA = _toText(obj);
        ALLOW = false;
        return this;
    };

    /**
     * set data and convert it to String
     * @param {Object|Fromdata} o
     * @return XOFetch
     */
    XOFetch.fn.toText = function(obj) {
        this.body = obj;
        DATA = _toText(obj);
        ALLOW = true;
        return this;
    };

    /**
     * set data and convert it to Json String
     * @param {Object|Fromdata} o
     * @return XOFetch
     */
    XOFetch.fn.toJson = function(obj) {
        this.body = obj;
        DATA = _toJson(obj);
        ALLOW = true;
        return this;
    };

    /**
     * set data and convert it to Formdata
     * @param {Object|Fromdata} o
     * @return XOFetch
     */
    XOFetch.fn.toForm = function(obj) {
        this.body = obj;
        DATA = _toForm(obj);
        ALLOW = true;
        return this;
    };

    /**
     * execute fetch as arrayBuffer
     * @return Object
     */
    XOFetch.fn.asBuffer = async function() {
        return this.as("arraybuffer");
    };

    /**
     * execute fetch as Clone
     * @return Object
     */
    XOFetch.fn.asClone = async function() {
        return this.as("clone");
    };

    /**
     * execute fetch as Text
     * @return Object
     */
    XOFetch.fn.asText = async function() {
        return this.as("text");
    };

    /**
     * execute fetch as Json
     * @return Object
     */
    XOFetch.fn.asJson = async function() {
        return this.as("json");
    };

    /**
     * execute fetch as Blob
     * @return Object
     */
    XOFetch.fn.asBlob = async function() {
        return this.as("blob");
    };

    /**
     * execute fetch as Formdata
     * @return Object
     */
    XOFetch.fn.asForm = async function() {
        return this.as("formdata");
    };

    /**
     * test the type and execute fetch as type entred
     * @param {String} type
     * @return XOFetcj
     */
    XOFetch.fn.as = async function(type) {
        var types = {
            arraybuffer: "arrayBuffer",
            blob: "blob",
            clone: "clone",
            formdata: "formData",
            json: "json",
            text: "text",
        };
        if (Object.keys(types).includes(type.toLowerCase())) {
            var obj = _getObj(this),
                re = await fetch(URL, obj),
                rt = await re[type.toLowerCase()]();
            _clean(this);
            return _getRes(re, rt);
        } else {
            return new Promise.reject(
                new Response({
                    type: "error",
                    message: "type is not recognized",
                })
            );
        }
    };

    /**
     * test if the Element type
     * @param {Element} obj
     * @return Boolean
     */
    var _test = {
        isBoolean: function isBoolean(obj) {
            return obj !== undefined && obj !== null && obj.constructor == Boolean;
        },
        isNumber: function isNumber(obj) {
            return obj !== undefined && obj !== null && obj.constructor == Number;
        },
        isString: function isString(obj) {
            return obj !== undefined && obj !== null && obj.constructor == String;
        },
        isArray: function isArray(obj) {
            return obj !== undefined && obj !== null && obj.constructor == Array;
        },
        isObject: function isObject(obj) {
            return obj !== undefined && obj !== null && obj.constructor == Object;
        },
        isFunction: function isFunction(obj) {
            return obj !== undefined && obj !== null && obj.constructor == Function;
        },
        isFormData: function isFormData(obj) {
            return obj !== undefined && obj !== null && obj.constructor == FormData;
        },
    };

    /**
     * set vars in object
     * @param {Request} req
     * @param {Response} res
     * @return Object
     */
    function _getRes(re, rt) {
        return new XOResponse(rt, re);
    }

    /**
     * convert Object|Formdata to Json String
     * @param {Object|Formdata} d
     * @return Json String
     */
    function _toJson(d) {
        if (_test.isFormData(d)) {
            var _ret = (function() {
                var o = {};
                d.forEach(function(value, key) {
                    if (!Reflect.has(o, key)) {
                        o[key] = value;
                        return;
                    }
                    if (!Array.isArray(o[key])) {
                        o[key] = [o[key]];
                    }
                    o[key].push(value);
                });
                return {
                    v: JSON.stringify(o) || null,
                };
            })();

            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
        return JSON.stringify(d) || null;
    }

    /**
     * convert Object|Formdata to Formdata
     * @param {Object|FormData} d
     * @return Formdata
     */
    function _toForm(d) {
        if (_test.isObject(d)) {
            var _ret2 = (function() {
                var f = new FormData();
                Object.keys(d).forEach(function(k) {
                    f.append(k, d[k]);
                });
                return {
                    v: f || null,
                };
            })();

            if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
        }
        return d || null;
    }

    /**
     * convert Object|Formdata to Query String
     * @param {Object|FormData} d
     * @return Query String
     */
    function _toText(d) {
        if (_test.isFormData(d)) d = new Function("return " + _toJson(d))();
        return (
            Object.keys(d)
            .reduce(function(a, i) {
                return [].concat(_toConsumableArray(a), [i + "=" + encodeURIComponent(d[i]).replace("%20", "+")]);
            }, [])
            .join("&") || null
        );
    }

    /**
     * set data depend on the method type
     * @param {XOFetch} self
     * @param {Object} obj
     */
    function _method(self, obj) {
        if (self.method === "post") {
            ALLOW = true;
            if (obj.form) {
                DATA = _toForm(obj.form);
                return;
            }
            if (obj.json) {
                DATA = _toJson(obj.json);
                return;
            }
            if (obj.text) {
                DATA = _toText(obj.text);
                return;
            }
        }

        if (self.method === "put") {
            ALLOW = true;
            if (obj.form) {
                DATA = _toJson(obj.form);
                return;
            }
            if (obj.json) {
                DATA = _toJson(obj.json);
                return;
            }
            if (obj.text) {
                DATA = _toText(obj.text);
                return;
            }
        }

        if (self.method === "get") {
            ALLOW = false;
            if (obj.query) {
                DATA = _toText(obj.query);
                return;
            }
        }

        if (self.method === "delete") {
            ALLOW = false;
            if (obj.query) {
                DATA = _toText(obj.query);
                return;
            }
        }
    }

    /**
     * set auth headers
     * @param {XOFetch} self
     */
    function _auth(self) {
        if (self.auth && _test.isObject(self.auth)) {
            var auth;
            if (self.auth.username && self.auth.password) auth = "Basic " + _encode(self.auth.username + ":" + self.auth.password);
            if (self.auth.bearer) auth = "Bearer " + self.auth.bearer;
            if (auth) self.headers.append("Authorization", auth);
        }
    }

    /**
     * set fetch obj and url
     * @param {XOFetch} s
     * @return Object
     */
    function _getObj(self) {
        var obj = { headers: self.headers, method: self.method, mode: self.mode };
        if (self.auth) obj.credentials = "include";
        if (ALLOW) {
            if (DATA) obj.body = DATA;
            URL = self.url;
        } else {
            URL = self.url;
            if (DATA) URL += "?" + DATA;
        }
        return obj;
    }

    /**
     * clean the XOFetch props
     * @param {XOFetch} self
     */
    function _clean(self) {
        self.url = undefined;
        self.auth = undefined;
        self.body = undefined;
        self.method = undefined;
        self.headers = undefined;
        DATA = undefined;
        URL = undefined;
        ALLOW = false;
        OPTS = {};
    }

    /**
     * encode string
     * @param {string} input
     * @return string
     */
    function _encode(input) {
        var TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        input = String(input);
        if (/[^\0-\xFF]/.test(input)) {
            // Note: no need to special-case astral symbols here, as surrogates are
            // matched, and the input is supposed to only contain ASCII anyway.
            throw new Error("The string to be encoded contains characters outside of the " + "Latin1 range.");
        }
        var padding = input.length % 3,
            length = input.length - padding,
            position = -1,
            output = "",
            buffer = void 0,
            a = void 0,
            b = void 0,
            c = void 0;
        while (++position < length) {
            // Read three bytes, i.e. 24 bits.
            a = input.charCodeAt(position) << 16;
            b = input.charCodeAt(++position) << 8;
            c = input.charCodeAt(++position);
            buffer = a + b + c;
            // Turn the 24 bits into four chunks of 6 bits each, and append the
            // matching character for each of them to the output.
            output +=
                TABLE.charAt((buffer >> 18) & 0x3f) +
                TABLE.charAt((buffer >> 12) & 0x3f) +
                TABLE.charAt((buffer >> 6) & 0x3f) +
                TABLE.charAt(buffer & 0x3f);
        }
        if (padding == 2) {
            a = input.charCodeAt(position) << 8;
            b = input.charCodeAt(++position);
            buffer = a + b;
            output += TABLE.charAt(buffer >> 10) + TABLE.charAt((buffer >> 4) & 0x3f) + TABLE.charAt((buffer << 2) & 0x3f) + "=";
        } else if (padding == 1) {
            buffer = input.charCodeAt(position);
            output += TABLE.charAt(buffer >> 2) + TABLE.charAt((buffer << 4) & 0x3f) + "==";
        }
        return output;
    }

    /**
     * set XOFetch as Global
     * @return XOFetch
     */
    ["get", "put", "post", "delete"].forEach(function(m) {
        XOFetch[m] = function(url, opts) {
            return new XOFetch(url, Object.assign(opts, { method: m }));
        };
    });

    return XOFetch;
})(Headers, Response, Promise, Object, Reflect, Array, JSON, FormData, String, Function, fetch);