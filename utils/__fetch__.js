// module.exports = (function(Headers, Response, Promise, Object, Reflect, Array, JSON, FormData, String, Function, fetch) {
//     var URL, DATA, OPTS = {},
//         ALLOW = false;

//     /**
//      * set the Vars
//      * @param {String} url
//      * @param {Object} opts
//      */
//     function XOFetch(url = '', opts = {}) {

//         if (url instanceof XOFetch) return url

//         if (!(this instanceof XOFetch)) return new XOFetch(url, opts);

//         this.url = url;
//         this.auth = opts.auth;
//         this.headers = new Headers(opts.headers) || new Headers();
//         this.method = opts.method ? opts.method.toLowerCase() : 'get';
//         this.data = opts.text || opts.json || opts.form || opts.query || {};

//         __method(this, opts);

//         __auth(this);

//         OPTS = {
//             method: this.method,
//             headers: this.headers,
//         }

//     }

//     XOFetch.fn = XOFetch.prototype;

//     /**
//      * add new header to headres
//      * @param {String} name
//      * @param {String} type
//      * @return XOFetch
//      */
//     XOFetch.fn.addHeader = function(name, type) {
//         if (name && type) {
//             this.headers.append(name, type);
//             OPTS.headers = this.headers;
//         }
//         return this;
//     }

//     /**
//      * set mode
//      * @param {String} o
//      * @return XOFetch
//      */
//     XOFetch.fn.setMode = function(method) {
//         if (method) this.mode = method;
//         else this.mode = 'cors';
//         OPTS.mode = t
//         his.mode;
//         return this;
//     }

//     /**
//      * set auth Header
//      * @param {Object} o
//      * @return XOFetch
//      */
//     XOFetch.fn.setAuth = function(auth) {
//         if (__test.isObject(auth)) {
//             this.auth = auth;
//             __auth(this);
//         }
//         return this;
//     }

//     /**
//      * set data and convert it to Query String
//      * @param {Object|Fromdata} o
//      * @return XOFetch
//      */
//     XOFetch.fn.toQuery = function(obj) {
//         this.data = obj;
//         DATA = __toText(obj);
//         ALLOW = false;
//         return this;
//     }

//     /**
//      * set data and convert it to String
//      * @param {Object|Fromdata} o
//      * @return XOFetch
//      */
//     XOFetch.fn.toText = function(obj) {
//         this.data = obj;
//         DATA = __toText(obj);
//         ALLOW = true;
//         return this;
//     }

//     /**
//      * set data and convert it to Json String
//      * @param {Object|Fromdata} o
//      * @return XOFetch
//      */
//     XOFetch.fn.toJson = function(obj) {
//         this.data = obj;
//         DATA = __toJson(obj);
//         ALLOW = true;
//         return this;
//     }

//     /**
//      * set data and convert it to Formdata
//      * @param {Object|Fromdata} o
//      * @return XOFetch
//      */
//     XOFetch.fn.toForm = function(obj) {
//         this.data = obj;
//         DATA = __toForm(obj);
//         ALLOW = true;
//         return this;
//     }

//     /**
//      * execute fetch as arrayBuffer
//      * @return Object
//      */
//     XOFetch.fn.asBuffer = async function() {
//         return this.as('arraybuffer');
//     }

//     /**
//      * execute fetch as Clone
//      * @return Object
//      */
//     XOFetch.fn.asClone = async function() {
//         return this.as('clone');
//     }

//     /**
//      * execute fetch as Text
//      * @return Object
//      */
//     XOFetch.fn.asText = async function() {
//         return this.as('text')
//     }

//     /**
//      * execute fetch as Json
//      * @return Object
//      */
//     XOFetch.fn.asJson = async function() {
//         return this.as('json');
//     }

//     /**
//      * execute fetch as Blob
//      * @return Object
//      */
//     XOFetch.fn.asBlob = async function() {
//         return this.as('blob');
//     }

//     /**
//      * execute fetch as Formdata
//      * @return Object
//      */
//     XOFetch.fn.asForm = async function() {
//         return this.as('formdata');
//     }

//     /**
//      * test the type and execute fetch as type entred
//      * @param {String} type
//      * @return XOFetcj
//      */
//     XOFetch.fn.as = async function(type) {
//         var types = {
//             arraybuffer: 'arrayBuffer',
//             blob: 'blob',
//             clone: 'clone',
//             formdata: 'formData',
//             json: 'json',
//             text: 'text'
//         }
//         if (Object.keys(types).includes(type.toLowerCase())) {
//             var obj = __getObj(this),
//                 re = await fetch(URL, obj),
//                 rt = await re[type.toLowerCase()]();
//             __clean(this);
//             return __getRes(re, rt);
//         } else {
//             return new Promise.reject(new Response({
//                 type: 'error',
//                 message: 'type is not recognized',
//             }));
//         }
//     }

//     /**
//      * test if the Element type
//      * @param {Element} obj
//      * @return Boolean
//      */
//     const __test = {
//         isBoolean(obj) {
//             return obj !== undefined && obj !== null && obj.constructor == Boolean;
//         },
//         isNumber(obj) {
//             return obj !== undefined && obj !== null && obj.constructor == Number;
//         },
//         isString(obj) {
//             return obj !== undefined && obj !== null && obj.constructor == String;
//         },
//         isArray(obj) {
//             return obj !== undefined && obj !== null && obj.constructor == Array;
//         },
//         isObject(obj) {
//             return obj !== undefined && obj !== null && obj.constructor == Object;
//         },
//         isFunction(obj) {
//             return obj !== undefined && obj !== null && obj.constructor == Function;
//         },
//         isFormData(obj) {
//             return obj !== undefined && obj !== null && obj.constructor == FormData;
//         },
//     }

//     /**
//      * set vars in object
//      * @param {Request} req
//      * @param {Response} res
//      * @return Object
//      */
//     function __getRes(re, rt) {
//         /*return new(class XOResponse {
//             get data() {
//                 return rt.data
//             }
//             get headers() {
//                 return re.headers
//             }
//             get ok() {
//                 return re.ok
//             }
//             get status() {
//                 return re.status
//             }
//             get statusText() {
//                 return re.statusText
//             }
//             get type() {
//                 return re.type
//             }
//             get url() {
//                 return re.url
//             }
//         });*/
//         return {
//             data: rt,
//             headers: re.headers,
//             ok: re.ok,
//             status: re.status,
//             statusText: re.statusText,
//             type: re.type,
//             url: re.url
//         };
//     }

//     /**
//      * convert Object|Formdata to Json String
//      * @param {Object|Formdata} d
//      * @return Json String
//      */
//     function __toJson(d) {
//         if (__test.isFormData(d)) {
//             let o = {};
//             d.forEach((value, key) => {
//                 if (!Reflect.has(o, key)) {
//                     o[key] = value;
//                     return;
//                 }
//                 if (!Array.isArray(o[key])) {
//                     o[key] = [o[key]];
//                 }
//                 o[key].push(value);
//             });
//             return JSON.stringify(o) || null;
//         }
//         return JSON.stringify(d) || null;
//     }

//     /**
//      * convert Object|Formdata to Formdata
//      * @param {Object|FormData} d
//      * @return Formdata
//      */
//     function __toForm(d) {
//         if (__test.isObject(d)) {
//             let f = new FormData();
//             Object.keys(d).forEach(k => {
//                 f.append(k, d[k]);
//             });
//             return f || null;
//         }
//         return d || null;
//     }

//     /**
//      * convert Object|Formdata to Query String
//      * @param {Object|FormData} d
//      * @return Query String
//      */
//     function __toText(d) {
//         if (__test.isFormData(d)) d = new Function('return ' + __toJson(d))();
//         return Object.keys(d).reduce((a, i) => [...a, `${i}=${encodeURIComponent(d[i]).replace('%20', '+')}`], []).join('&') || null;
//     }

//     /**
//      * set data depend on the method type
//      * @param {XOFetch} self
//      * @param {Object} obj
//      */
//     function __method(self, obj) {
//         if (self.method === 'post') {
//             ALLOW = true;
//             if (obj.form) {
//                 DATA = __toForm(obj.form);;
//                 return
//             }
//             if (obj.json) {
//                 DATA = __toJson(obj.json);;
//                 return
//             }
//             if (obj.text) {
//                 DATA = __toText(obj.text);;
//                 return
//             }
//         }

//         if (self.method === 'put') {
//             ALLOW = true;
//             if (obj.form) {
//                 DATA = __toJson(obj.form);;
//                 return
//             }
//             if (obj.json) {
//                 DATA = __toJson(obj.json);;
//                 return
//             }
//             if (obj.text) {
//                 DATA = __toText(obj.text);;
//                 return
//             }
//         }

//         if (self.method === 'get') {
//             ALLOW = false;
//             if (obj.query) {
//                 DATA = __toText(obj.query);
//                 return;
//             }
//         }

//         if (self.method === 'delete') {
//             ALLOW = false;
//             if (obj.query) {
//                 DATA = __toText(obj.query);
//                 return;
//             }
//         }
//     }

//     /**
//      * set auth headers
//      * @param {XOFetch} self
//      */
//     function __auth(self) {
//         if (self.auth && __test.isObject(self.auth)) {
//             var auth;
//             if (self.auth.username && self.auth.password)
//                 auth = `Basic ${__encode(self.auth.username + ':' + self.auth.password)}`;
//             if (self.auth.bearer)
//                 auth = `Bearer ${self.auth.bearer}`;
//             if (auth)
//                 self.headers.append('Authorization', auth);
//         }
//     }

//     /**
//      * set fetch obj and url
//      * @param {XOFetch} s
//      * @return Object
//      */
//     function __getObj(self) {
//         var obj = { headers: self.headers, method: self.method, mode: self.mode }
//         if (self.auth) obj.credentials = 'include';
//         if (ALLOW) {
//             if (DATA) obj.body = DATA;
//             URL = self.url;
//         } else {
//             URL = self.url;
//             if (DATA) URL += '?' + DATA;
//         }
//         return obj;
//     }

//     /**
//      * clean the XOFetch props
//      * @param {XOFetch} self
//      */
//     function __clean(self) {
//         self.url = undefined;
//         self.auth = undefined
//         self.data = undefined;
//         self.method = undefined;
//         self.headers = undefined;
//         DATA = undefined;
//         URL = undefined;
//         ALLOW = false
//         OPTS = {};
//     }

//     /**
//      * encode string
//      * @param {string} input
//      * @return string
//      */
//     function __encode(input) {
//         const TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
//         input = String(input);
//         if (/[^\0-\xFF]/.test(input)) {
//             // Note: no need to special-case astral symbols here, as surrogates are
//             // matched, and the input is supposed to only contain ASCII anyway.
//             throw new Error(
//                 'The string to be encoded contains characters outside of the ' +
//                 'Latin1 range.'
//             );
//         }
//         let padding = input.length % 3,
//             length = input.length - padding,
//             position = -1,
//             output = '',
//             buffer,
//             a,
//             b,
//             c;
//         while (++position < length) {
//             // Read three bytes, i.e. 24 bits.
//             a = input.charCodeAt(position) << 16;
//             b = input.charCodeAt(++position) << 8;
//             c = input.charCodeAt(++position);
//             buffer = a + b + c;
//             // Turn the 24 bits into four chunks of 6 bits each, and append the
//             // matching character for each of them to the output.
//             output += (
//                 TABLE.charAt(buffer >> 18 & 0x3F) +
//                 TABLE.charAt(buffer >> 12 & 0x3F) +
//                 TABLE.charAt(buffer >> 6 & 0x3F) +
//                 TABLE.charAt(buffer & 0x3F)
//             );
//         }
//         if (padding == 2) {
//             a = input.charCodeAt(position) << 8;
//             b = input.charCodeAt(++position);
//             buffer = a + b;
//             output += (
//                 TABLE.charAt(buffer >> 10) +
//                 TABLE.charAt((buffer >> 4) & 0x3F) +
//                 TABLE.charAt((buffer << 2) & 0x3F) +
//                 '='
//             );
//         } else if (padding == 1) {
//             buffer = input.charCodeAt(position);
//             output += (
//                 TABLE.charAt(buffer >> 2) +
//                 TABLE.charAt((buffer << 4) & 0x3F) +
//                 '=='
//             );
//         }
//         return output;
//     }

//     /**
//      * set XOFetch as Global
//      * @return XOFetch
//      */
//     ['get', 'put', 'post', 'delete'].forEach(m => {
//         XOFetch[m] = function(url, opts) {
//             return new XOFetch(url, Object.assign(opts, { method: m }));
//         }
//     });

//     return XOFetch

// })(Headers, Response, Promise, Object, Reflect, Array, JSON, FormData, String, Function, fetch);

("use strict");

var { _typeof, _toConsumableArray } = require("./__runtime__");

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
        this.data = opts.text || opts.json || opts.form || opts.query || {};

        __method(this, opts);

        __auth(this);

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
    XOFetch.fn.setMode = function(method) {
        if (method) this.mode = method;
        else this.mode = "cors";
        OPTS.mode = t;
        his.mode;
        return this;
    };

    /**
     * set auth Header
     * @param {Object} o
     * @return XOFetch
     */
    XOFetch.fn.setAuth = function(auth) {
        if (__test.isObject(auth)) {
            this.auth = auth;
            __auth(this);
        }
        return this;
    };

    /**
     * set data and convert it to Query String
     * @param {Object|Fromdata} o
     * @return XOFetch
     */
    XOFetch.fn.toQuery = function(obj) {
        this.data = obj;
        DATA = __toText(obj);
        ALLOW = false;
        return this;
    };

    /**
     * set data and convert it to String
     * @param {Object|Fromdata} o
     * @return XOFetch
     */
    XOFetch.fn.toText = function(obj) {
        this.data = obj;
        DATA = __toText(obj);
        ALLOW = true;
        return this;
    };

    /**
     * set data and convert it to Json String
     * @param {Object|Fromdata} o
     * @return XOFetch
     */
    XOFetch.fn.toJson = function(obj) {
        this.data = obj;
        DATA = __toJson(obj);
        ALLOW = true;
        return this;
    };

    /**
     * set data and convert it to Formdata
     * @param {Object|Fromdata} o
     * @return XOFetch
     */
    XOFetch.fn.toForm = function(obj) {
        this.data = obj;
        DATA = __toForm(obj);
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
            var obj = __getObj(this),
                re = await fetch(URL, obj),
                rt = await re[type.toLowerCase()]();
            __clean(this);
            return __getRes(re, rt);
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
    var __test = {
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
    function __getRes(re, rt) {
        return {
            data: rt,
            headers: re.headers,
            ok: re.ok,
            status: re.status,
            statusText: re.statusText,
            type: re.type,
            url: re.url,
        };
    }

    /**
     * convert Object|Formdata to Json String
     * @param {Object|Formdata} d
     * @return Json String
     */
    function __toJson(d) {
        if (__test.isFormData(d)) {
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
    function __toForm(d) {
        if (__test.isObject(d)) {
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
    function __toText(d) {
        if (__test.isFormData(d)) d = new Function("return " + __toJson(d))();
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
    function __method(self, obj) {
        if (self.method === "post") {
            ALLOW = true;
            if (obj.form) {
                DATA = __toForm(obj.form);
                return;
            }
            if (obj.json) {
                DATA = __toJson(obj.json);
                return;
            }
            if (obj.text) {
                DATA = __toText(obj.text);
                return;
            }
        }

        if (self.method === "put") {
            ALLOW = true;
            if (obj.form) {
                DATA = __toJson(obj.form);
                return;
            }
            if (obj.json) {
                DATA = __toJson(obj.json);
                return;
            }
            if (obj.text) {
                DATA = __toText(obj.text);
                return;
            }
        }

        if (self.method === "get") {
            ALLOW = false;
            if (obj.query) {
                DATA = __toText(obj.query);
                return;
            }
        }

        if (self.method === "delete") {
            ALLOW = false;
            if (obj.query) {
                DATA = __toText(obj.query);
                return;
            }
        }
    }

    /**
     * set auth headers
     * @param {XOFetch} self
     */
    function __auth(self) {
        if (self.auth && __test.isObject(self.auth)) {
            var auth;
            if (self.auth.username && self.auth.password) auth = "Basic " + __encode(self.auth.username + ":" + self.auth.password);
            if (self.auth.bearer) auth = "Bearer " + self.auth.bearer;
            if (auth) self.headers.append("Authorization", auth);
        }
    }

    /**
     * set fetch obj and url
     * @param {XOFetch} s
     * @return Object
     */
    function __getObj(self) {
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
    function __clean(self) {
        self.url = undefined;
        self.auth = undefined;
        self.data = undefined;
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
    function __encode(input) {
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