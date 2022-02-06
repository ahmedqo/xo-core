// const XOHtml = require("./__engine__");

// const objs = (self) => {
//     const state = self.state(),
//         all = { param: self.param, query: self.query };
//     Object.getOwnPropertyNames(state).forEach((p) => {
//         all[p] = state[p];
//     });
//     return all;
// };

// class XOView {
//     constructor(param, query) {
//         document.title = this.props().title || "";
//         this.param = param;
//         this.query = query;
//     }

//     props() {
//         return {};
//     }

//     state() {
//         return {};
//     }

//     render() {
//         return (async() => {
//             return await XOHtml(objs(this))(`{§include ${this.props().template}§}`);
//         })();
//     }
// }

// XOView.prototype.name = "XOView";

// module.exports = function(n, { title, template, state }) {
//     return class extends XOView {
//         static get name() {
//             return n || "";
//         }
//         props() {
//             return {
//                 title: title || "",
//                 template: template || "",
//             };
//         }
//         state() {
//             return state || {};
//         }
//     };
// };

("use strict");

var { _createClass, _inherits, _classCallCheck, _possibleConstructorReturn } = require("./__runtime__");
var XOHtml = require("./__engine__");

var objs = function objs(self) {
    var state = self.state(),
        all = { param: self.param, query: self.query };
    Object.getOwnPropertyNames(state).forEach(function(p) {
        all[p] = state[p];
    });
    return all;
};

var XOView = (function() {
    function XOView(param, query) {
        _classCallCheck(this, XOView);

        document.title = this.props().title || "";
        this.param = param;
        this.query = query;
    }

    _createClass(XOView, [{
            key: "props",
            value: function props() {
                return {};
            },
        },
        {
            key: "state",
            value: function state() {
                return {};
            },
        },
        {
            key: "render",
            value: function render() {
                var _this = this;

                return (async function() {
                    return await XOHtml(objs(_this))("{§include " + _this.props().template + "§}");
                })();
            },
        },
    ]);

    return XOView;
})();

XOView.prototype.name = "XOView";

module.exports = function(n, _ref) {
    var title = _ref.title;
    var template = _ref.template;
    var _state = _ref.state;

    return (function(_XOView) {
        _inherits(_class, _XOView);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(
            _class, [{
                    key: "props",
                    value: function props() {
                        return {
                            title: title || "",
                            template: template || "",
                        };
                    },
                },
                {
                    key: "state",
                    value: function state() {
                        return _state || {};
                    },
                },
            ], [{
                key: "name",
                get: function get() {
                    return n || "";
                },
            }, ]
        );

        return _class;
    })(XOView);
};