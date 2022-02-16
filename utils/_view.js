("use strict");

var { _createClass, _inherits, _classCallCheck, _possibleConstructorReturn } = require("./_runtime");
var { XOBuild } = require("./_build");

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

    XOView.prototype.name = "XOView";

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
                    return await XOBuild.loader(objs(_this), _this.props().template);
                })();
            },
        },
    ]);

    return XOView;
})();

module.exports = function(n, _ref) {
    var title = _ref.title;
    var template = _ref.template;
    var _state = _ref.state;

    return (function(_XOView) {
        _inherits(XOView, _XOView);

        function XOView() {
            _classCallCheck(this, XOView);

            return _possibleConstructorReturn(this, (XOView.__proto__ || Object.getPrototypeOf(XOView)).apply(this, arguments));
        }

        _createClass(
            XOView, [{
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

        return XOView;
    })(XOView);
};