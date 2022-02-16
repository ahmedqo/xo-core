("use strict");

var { _typeof } = require("./_runtime");

module.exports = (function(window, document) {
    var hash = false,
        routes = [],
        loader, root, pop, change;

    function XORouter(el) {
        window["XORouter"] = XORouter;
        if (el instanceof HTMLElement) root = el;
        else root = document.querySelector(el);
        return XORouter;
    }

    XORouter.log = {};

    /**
     * @return {this}
     */
    XORouter.run = function() {
        var _this = this;

        if (hash && !location.hash) location.hash = "#/";

        window.addEventListener("popstate", function() {
            _run(_this);
            if (typeof pop === "function") pop();
        });
        window.addEventListener("hashchange", function() {
            _this.goto(location.hash.slice(1));
        });

        _run(this);
        return this;
    };

    /**
     * add route to routes
     * @param {string} path
     * @param {View} view
     * @param {Function} callback
     * @return {this}
     */
    XORouter.add = function(path, view, name) {
        if (typeof path === "string" && typeof view === "function" && view.prototype.name === "XOView") {
            path = !path || path == "*" ? "/404" : path;
            path = path.endsWith("/") && path.length > 1 ? path.substr(0, path.length - 1) : path;
            routes.push({ path: path, view: view, name: name });
        }
        return this;
    };

    /**
     * add a scope the the routes returned by func
     * @param {string} path
     * @param {function} func
     * @return {this}
     */
    XORouter.scope = function(path, func) {
        var obj = { views: [] }
        obj.add = _sub.bind(obj);
        func.call(obj);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (
                var _iterator = obj.views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true
            ) {
                var view = _step.value;

                if ((typeof view === "undefined" ? "undefined" : _typeof(view)) === "object" && view.view) {
                    var url = path.slice(-1) === "/" ? view.path : "/" + view.path;
                    this.add(path + url, view.view, view.name);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return this;
    };

    /**
     * execte fn when domcontent is loaded
     * @param {function} fn
     * @return {this}
     */
    XORouter.onLoad = function(fn) {
        document.addEventListener("DOMContentLoaded", fn);
        return this;
    };

    /**
     * set fn to _pop attr
     * @param {function} fn
     * @return {this}
     */
    XORouter.onState = function(fn) {
        pop = fn;
        return this;
    };

    /**
     * set fn to _change attr
     * @param {function} fn
     * @return {this}
     */
    XORouter.onChange = function(fn) {
        change = fn;
        return this;
    };

    /**
     * launch the run function
     * @param {string} url
     * @return {this}
     */
    XORouter.goto = function(url) {
        history.pushState({
                path: url,
            },
            document.title,
            url
        );
        _run(this);
        return this;
    };

    /**
     * set loader
     * @param {string|HTMLElement} el
     * @return {this}
     */
    XORouter.loader = function(el) {
        loader = el;
        return this;
    };

    /**
     * set hash in link
     * @return {this}
     */
    XORouter.hash = function(bol) {
        hash = true;
        if (bol === false) hash = false;
        return this;
    };

    /**
     * return the url of class
     * @param {string} name
     * @param {array} data
     * @return {string|undefined}
     */
    XORouter.url = function(name) {
        for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            data[_key - 1] = arguments[_key];
        }

        var route = routes.filter(function(r) {
            return r.name === name;
        })[0];
        if (route) {
            var path = route.path.replace(/{\w+:\w+}/g, "(.+)");
            if (data.length) {
                var i = -1;
                path = path.replaceAll("(.+)", function() {
                    i++;
                    return data[i];
                });
            }
            var url = (hash ? "#/" : "/") + (path.startsWith("/") ? path.slice(1) : path);
            return url;
        }
        return undefined;
    };

    /**
     * return the param value
     * @param {string} name
     * @return {string|undefined}
     */
    XORouter.param = function(name) {
        if (this.log.current && this.log.current.params && this.log.current.params[name]) return this.log.current.params[name];
        return undefined;
    };

    /**
     * return the query value
     * @param {string} name
     * @return {string|undefined}
     */
    XORouter.query = function(name) {
        if (this.log.current && this.log.current.queries && this.log.current.queries[name]) return this.log.current.queries[name];
        return undefined;
    };

    /**
     * return a view object
     * @param {string} path
     * @param {function} view
     * @param {string} name
     * @return {object|undefined}
     */
    function _sub(path, view, name) {
        if (typeof path === "string" && typeof view === "function" && view.prototype.name === "XOView") {
            path = path.charAt(0) === "/" ? path.substr(1) : path;
            //return { path: path, view: view, name: name };
            this.views.push({ path: path, view: view, name: name })
        } //else return undefined;
    }

    /**
     * replace the path with current values
     * @param {string} path
     * @return {string};
     */
    function _path(path) {
        return new RegExp("^" + path.replace(/\//g, "\\/").replace(/{\w+:\w+}/g, "(.+)") + "$");
    }

    /**
     * shearch for the match path
     * @param {XONavigo} self
     * @return {match}
     */
    function _match(self) {
        var url = hash ? location.hash.slice(1) : location.pathname;
        if (!hash && !url.startsWith("/")) url = "/" + url;
        var potentialMatches = routes.map(function(route) {
            return {
                route: route,
                result: url.match(_path(route.path)),
            };
        });

        var match = potentialMatches.find(function(potentialMatch) {
            return potentialMatch.result !== null;
        });

        if (!match) {
            match = {
                route: routes.find(function(x) {
                    return x.path === "/404";
                }),
                result: [url],
            };
        }
        return match;
    }

    /**
     * recollect params in an object
     * @param {object} match
     * @return {object}
     */
    function _params(match) {
        var values = match.result.slice(1);
        var keys = Array.from(match.route.path.matchAll(/{(\w+):/g)).map(function(result) {
            return result[1];
        });
        var types = Array.from(match.route.path.matchAll(/:(\w+)}/g)).map(function(result) {
            return result[1];
        });
        return Object.fromEntries(
            keys.map(function(key, i) {
                var val = void 0;
                switch (types[i].toLowerCase()) {
                    case "s":
                    case "str":
                    case "string":
                        val = String(values[i]);
                        break;
                    case "i":
                    case "int":
                    case "intiger":
                        val = parseInt(values[i]);
                        break;
                    case "n":
                    case "d":
                    case "nbr":
                    case "num":
                    case "number":
                    case "decimal":
                        val = Number(values[i]);
                        break;
                    case "r":
                    case "f":
                    case "real":
                    case "flaot":
                        val = parseFloat(values[i]);
                        break;
                    case "b":
                    case "bool":
                    case "boolean":
                        val = Boolean(values[i]);
                        break;
                    case "m":
                    case "mixed":
                    default:
                        val = values[i];
                        break;
                }
                return [key, val];
            })
        );
    }

    /**
     * get search values
     * @returns {object}
     */
    function _queries() {
        var params = new URLSearchParams(location.search);
        var obj = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (
                var _iterator2 = params.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true
            ) {
                var key = _step2.value;

                if (params.getAll(key).length > 1) {
                    obj[key] = params.getAll(key);
                } else {
                    obj[key] = params.get(key);
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return obj;
    }

    /**
     * test if the path exist or not then reolace the root html with view
     * @param {XONavigo} self
     */
    async function _run(self) {
        if (!root) return;
        if (loader && typeof loader === "string") root.insertAdjacentHTML("beforeend", loader);
        if (loader && _typeof(loader) === "object") root.appendChild(loader);
        var match = _match(self);
        var params = _params(match);
        var queries = _queries();
        _logger(self, match, params, queries);
        root.innerHTML = await _view(match, params, queries);
        if (typeof change === "function") change()
    }

    function _view(match, param, query) {
        var view = new match.route.view(param, query);
        return view.render();
    }

    /**
     * log the current and prevoius paths
     * @param {XONavigo} self
     * @param {route} match
     * @param {object} params
     * @param {object} queries
     */
    function _logger(self, match, params, queries) {
        self.log = {
            previous: self.log.current || {},
            current: {
                path: match.route.path,
                input: match.result[0],
                params: params,
                queries: queries,
            },
        };
    }

    return XORouter;
})(window, document);