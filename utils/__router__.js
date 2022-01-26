module.exports = (function(window, document) {
    'use strict';

    function XORouter(el) {
        window["XORouter"] = XORouter;
        if (el instanceof HTMLElement) XORouter._root = el;
        else XORouter._root = document.querySelector(el);
        return XORouter;
    }

    XORouter._base = location.origin;
    XORouter._loader = undefined;
    XORouter._root = undefined;
    XORouter._hash = false;
    XORouter.routes = [];
    XORouter.logs = {};

    /**
     * @return {this}
     */
    XORouter.run = function() {
        if (this._hash && !location.hash)
            location.hash = '#/';

        window.addEventListener('popstate', () => {
            const url = this._hash ? location.hash.slice(1) : location.pathname;
            this.goto(url);
            if (this._pop instanceof Function)
                this._pop();
        });
        window.addEventListener('hashchange', () => {
            this.goto(location.hash.slice(1))
        });

        __run(this);
        return this;
    }

    /**
     * add route to routes
     * @param {string} path 
     * @param {View} view 
     * @param {Function} callback 
     * @return {this}
     */
    XORouter.add = function(path, view, name) {
        if (typeof view === 'function') {
            path = !path || path == '*' ? '/404' : path;
            path = path.endsWith('/') && path.length > 1 ? path.substr(0, path.length - 1) : path;
            this.routes.push({ path, view, name });
        }
        return this;
    }

    /**
     * add a scope the the routes returned by func
     * @param {string} path 
     * @param {function} func 
     * @return {this}
     */
    XORouter.scope = function(path, func) {
        var views = func(__sub);
        for (var view of views) {
            if (typeof view === 'object' && view.view) {
                let url = (path.slice(-1) === '/') ? view.path : '/' + view.path;
                this.add(path + url, view.view, view.name);
            }
        }
        return this;
    }

    /**
     * execte fn when domcontent is loaded
     * @param {function} fn
     * @return {this}
     */
    XORouter.onLoad = function(fn) {
        document.addEventListener('DOMContentLoaded', fn);
        return this;
    }

    /**
     * set fn to _poped attr
     * @param {function} fn 
     * @return {this}
     */
    XORouter.onChange = function(fn) {
        this._pop = fn;
        return this;
    }

    /**
     * launch the run function
     * @param {string} url 
     * @return {this}
     */
    XORouter.goto = function(url) {
        url = (this._hash ? "#" : "") + url;
        if (!history.state || history.state.path !== url) {
            history.pushState({
                page: document.title,
                path: url
            }, document.title, url);
            __run(this);
        }
        return this;
    }

    /**
     * set loader 
     * @param {string|HTMLElement} el
     * @return {this}
     */
    XORouter.loader = function(el) {
        this._loader = el;
        return this
    }

    /**
     * set hash in link
     * @return {this}
     */
    XORouter.hash = function(bol) {
        this._hash = true;
        if (bol === false) this._hash = false;
        return this;
    }

    /**
     * return the url of class
     * @param {string} name
     * @param {array} data
     * @return {string|undefined}
     */
    XORouter.url = function(name, ...data) {
        var route = this.routes.filter(r => r.name === name)[0];
        if (route) {
            var path = route.path.replace(/{\w+:\w+}/g, '(.+)');
            if (data.length) {
                var i = -1;
                path = path.replaceAll('(.+)', () => {
                    i++;
                    return data[i];
                });
            }
            var url = (this._hash ? '#/' : '/') + (path.startsWith('/') ? path.slice(1) : path);
            return url;
        }
        return undefined;
    }

    /**
     * return the url of class
     * @param {string} name
     * @return {string|undefined}
     */
    XORouter.param = function(name) {
        if (this.logs.current && this.logs.current.params && this.logs.current.params[name])
            return this.logs.current.params[name];
        return undefined;
    }

    /**
     * return a view object
     * @param {string} path 
     * @param {function} view 
     * @param {string} name 
     * @return {object|undefined}
     */
    function __sub(path, view, name) {
        if (view && typeof path === 'string' && typeof view === 'function') {
            path = path.charAt(0) === '/' ? path.substr(1) : path;
            return { path, view, name }
        } else return undefined;
    }

    /**
     * replace the path with current values
     * @param {string} path 
     * @return {string};
     */
    function __path(path) {
        return new RegExp('^' + path.replace(/\//g, '\\/').replace(/{\w+:\w+}/g, '(.+)') + '$');
    }

    /**
     * shearch for the match path
     * @param {XONavigo} self 
     * @return {match}
     */
    function __match(self) {
        let url = self._hash ? location.hash.slice(1) : location.pathname;
        if (!self._hash && !url.startsWith('/')) url = `/${url}`;
        const potentialMatches = self.routes.map((route) => {
            return {
                route: route,
                result: url.match(__path(route.path)),
            };
        });

        let match = potentialMatches.find((potentialMatch) => {
            return potentialMatch.result !== null
        });

        if (!match) {
            match = {
                route: self.routes.find(x => x.path === '/404'),
                result: [url],
            };
        }
        return match
    }

    /**
     * recollect params in an object
     * @param {object} match 
     * @return {object}
     */
    function __params(match) {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/{(\w+):/g)).map((result) => result[1]);
        const types = Array.from(match.route.path.matchAll(/:(\w+)}/g)).map((result) => result[1]);
        return Object.fromEntries(
            keys.map((key, i) => {
                let val;
                switch (types[i].toLowerCase()) {
                    case 's':
                    case 'str':
                    case 'string':
                        val = String(values[i]);
                        break;
                    case 'i':
                    case 'int':
                    case 'intiger':
                        val = parseInt(values[i]);
                        break;
                    case 'n':
                    case 'd':
                    case 'nbr':
                    case 'num':
                    case 'number':
                    case 'decimal':
                        val = Number(values[i]);
                        break;
                    case 'r':
                    case 'f':
                    case 'real':
                    case 'flaot':
                        val = parseFloat(values[i]);
                        break;
                    case 'b':
                    case 'bool':
                    case 'boolean':
                        val = Boolean(values[i]);
                        break;
                    case 'm':
                    case 'mixed':
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
    function __queries() {
        const params = new URLSearchParams(location.search);
        const obj = {};
        for (const key of params.keys()) {
            if (params.getAll(key).length > 1) {
                obj[key] = params.getAll(key);
            } else {
                obj[key] = params.get(key);
            }
        }
        return obj;
    }

    /**
     * test if the path exist or not then reolace the root html with view 
     * @param {XONavigo} self 
     */
    async function __run(self) {
        if (!self._root) return
        if (self._loader && typeof self._loader === "string")
            self._root.insertAdjacentHTML('beforeend', self._loader);
        if (self._loader && typeof self._loader === "object")
            self._root.appendChild(self._loader);
        const match = __match(self);
        const params = __params(match);
        const queries = __queries();
        const view = __view(match, params, queries);
        __logger(self, match, params, queries);
        const all = self._root.querySelectorAll("*");
        self._root.appendChild(view);
        all.forEach(e => e.remove());
    }

    function __view(match, param, query) {
        const view = match.route.view,
            name = `xo-${view.name.toLowerCase()}-view`;
        if (!customElements.get(name))
            customElements.define(name, view);
        return new view(param, query);
    }

    /**
     * log the current and prevoius paths
     * @param {XONavigo} self 
     * @param {route} match 
     * @param {object} params
     * @param {object} queries
     */
    function __logger(self, match, params, queries) {
        self.logs = {
            previous: self.logs.current || {},
            current: {
                path: match.route.path,
                input: match.result[0],
                params: params,
                queries: queries
            },
        }
    }

    return XORouter;

})(window, document);