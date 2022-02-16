const { $GridChart } = require("../utils/_styles");
const XOElement = require("../utils/_element");
var { _toConsumableArray, _node } = require("../utils/_runtime");

window.XOGridChartElement = class extends XOElement {

    static get styles() {
        return $GridChart;
    }

    static get attributes() {
        return {
            header: String,
            theme: String,
            axis: Array,
        }
    }

    static get properties() {
        return {
            offset: { default: { width: 2, height: 2 }, type: Object },
            data: { default: [], type: Array },
            size: { default: { width: 1000, height: 400 }, type: Object },
        }
    }

    static onUpdated(name, value) {
        if (this.data.length) {
            __tooltip(this);
        }
    }

    render() {
        return /*html*/ `
            {§if header§}
                <div id="xo-header">
                    {{header}}
                </div>
            {§/if§}
            {§if data.length§}
                <main id="xo-container">
                    {§if axis && axis[1]§}
                        <div id="xo-yheader">
                            {{axis[1]}}
                        </div>
                    {§/if§}
                    ${__chart(this)}
                    {§if axis && axis[0]§}
                        <div id="xo-xheader">
                            {{axis[0]}}
                        </div>
                    {§/if§}
                </main>
                <div id="xo-tooltip"></div>
            {§/if§}
        `;
    }

}

XOGridChartElement.prototype.tag = "xo-grid-chart";

customElements.define(XOGridChartElement.prototype.tag, XOGridChartElement);

function __chart(self) {
    var size = self.size,
        offset = self.offset,
        data = self.data,
        nSize = {
            width: size.width - offset.width,
            height: size.height - offset.height
        },
        max = Math.max.apply(Math, _toConsumableArray(data.map(function(e) {
            return e.value;
        }))),
        len = 1,
        unit = max / len;

    // elems
    var svg = _node('svg'),
        g1 = _node('g'),
        g2 = _node('g'),
        g3 = _node('g'),
        g4 = _node('g'),
        g5 = _node('g'),
        g6 = _node('g'),
        g7 = _node('g'),
        g8 = _node('g'),
        g9 = _node('g'),
        g10 = _node('g');

    svg.setAttribute("viewBox", "0 0 " + size.width + " " + size.height);

    // axis
    var x = _node('line', { x1: offset.width, y1: 0, x2: offset.width, y2: nSize.height + 5, id: "xo-axis" }),
        y = _node('line', { x1: offset.width - 5, y1: nSize.height, x2: size.width, y2: nSize.height, id: "xo-axis" }),
        x0 = _node('line', { x1: offset.width - 5, y1: 1, x2: offset.width + 5, y2: 1, id: "xo-axis" }),
        y0 = _node('line', { x1: size.width - 1, y1: nSize.height - 5, x2: size.width - 1, y2: nSize.height + 5, id: "xo-axis" });
    g3.appendChild(x0);
    g3.appendChild(x);
    g3.appendChild(y);
    g3.appendChild(y0);

    // grid
    // for (var i = 0; i < len; i++) {
    //     var mv = (nSize.height - 10) / len,
    //         _line = _node("line", {
    //             x1: offset.width,
    //             y1: mv * i + 10,
    //             x2: size.width,
    //             y2: mv * i + 10,
    //             id: "xo-grid"
    //         });
    //     g4.appendChild(_line);
    // };

    // ylabels
    for (var _i = len; _i >= 0; _i--) {
        var _mv = (nSize.height - 10) / len,
            text = _node('text', {
                x: offset.width / 2,
                y: _mv * (len - _i) + 10,
                id: "xo-legendVert"
            });
        text.innerHTML = Number.isInteger(Number(unit * _i)) ? Number(unit * _i) : Number(unit * _i).toFixed(2);
        g1.appendChild(text);
    };

    // xlabels
    for (var _i2 = 0; _i2 < data.length; _i2++) {
        var _mv2 = nSize.width / data.length * _i2 + offset.width,
            _text = _node("foreignObject", {
                x: _mv2,
                y: nSize.height,
                width: "calc(100% / " + data.length + ")",
                height: offset.height
            });
        _text.innerHTML = "<div id=\"xo-legendHors\">" + data[_i2].label + "</div>";
        g2.appendChild(_text);
    };

    // bar 
    for (var _i3 = 0; _i3 < data.length; _i3++) {
        var _mv3 = nSize.width / data.length * _i3 + offset.width + nSize.width / data.length / 2,
            pr = Number(data[_i3].value) ? nSize.height + 10 - nSize.height / 100 * (Number(data[_i3].value) / max * 100) : nSize.height,
            _line2 = _node("line", {
                x1: _mv3,
                y1: nSize.height - 1,
                x2: _mv3,
                y2: pr,
                id: "xo-bars",
                'stroke-width': "calc((100% / " + data.length + "))"
            }),
            _line3 = _node("line", {
                x1: offset.width,
                y1: pr,
                x2: size.width,
                y2: pr,
                id: "xo-ref",
            });
        g5.appendChild(_line2);
        g10.appendChild(_line3);
    }

    // area 
    var path = data.reduce(function(acc, itm, i) {
        var mv = nSize.width / data.length * i + offset.width + nSize.width / data.length / 2,
            pr = Number(itm.value) ? nSize.height + 10 - nSize.height / 100 * (Number(itm.value) / max * 100) : nSize.height;
        return acc + (mv + " " + pr + " ");
    }, "").trim();
    var xf = offset.width + nSize.width / data.length / 2,
        xl = nSize.width / data.length * (data.length - 1) + offset.width + nSize.width / data.length / 2,
        area = _node("path", {
            d: "M" + xf + " " + nSize.height + " " + path + " " + xl + " " + nSize.height,
            id: "xo-area"
        });
    g6.appendChild(area);

    // line 
    var line = _node("path", {
        d: "M" + path,
        id: "xo-line"
    });
    g7.appendChild(line);

    // dots 
    for (var _i4 = 0; _i4 < data.length; _i4++) {
        var _mv4 = nSize.width / data.length * _i4 + offset.width + nSize.width / data.length / 2,
            _pr = Number(data[_i4].value) ? nSize.height + 10 - nSize.height / 100 * (Number(data[_i4].value) / max * 100) : nSize.height,
            circle = _node("circle", {
                cx: _mv4,
                cy: _pr,
                r: 10,
                id: "xo-dots"
            });
        g8.appendChild(circle);
    }

    // hovers
    for (var _i5 = 0; _i5 < data.length; _i5++) {
        var _mv5 = nSize.width / data.length * _i5 + offset.width + nSize.width / data.length / 2,
            _line3 = _node("line", {
                x1: _mv5,
                y1: nSize.height - 3,
                x2: _mv5,
                y2: nSize.height + 3,
                'stroke-linecap': 'round'
            }),
            line2 = _node("line", {
                x1: _mv5,
                y1: 0,
                x2: _mv5,
                y2: nSize.height,
                id: "xo-hover",
                'stroke-width': "calc((100% / " + data.length + ") - 10px)",
                "data-value": "<strong>" + data[_i5].label + "</strong><br/><em>" + data[_i5].value + "</em>"
            }),
            line3 = _node("line", {
                x1: _mv5,
                y1: 0,
                x2: _mv5,
                y2: nSize.height,
                id: "xo-ref",
            });
        g2.appendChild(_line3);
        g9.appendChild(line2);
        g10.appendChild(line3);
    };

    svg.appendChild(g1);
    svg.appendChild(g2);
    svg.appendChild(g3);
    svg.appendChild(g4);
    svg.appendChild(g5);
    svg.appendChild(g6);
    svg.appendChild(g7);
    svg.appendChild(g8);
    svg.appendChild(g9);
    svg.appendChild(g10);

    return svg.outerHTML;
}

function __tooltip(self) {
    var _len = self.$.container.find("#xo-hover").length;
    self.$.container.find("#xo-hover").forEach(function(e, i) {
        e.addEventListener("mousemove", function(_) {
            self.$.tooltip.innerHTML = e.dataset.value;
            self.$.tooltip.style.left = _.x + "px";
            self.$.tooltip.style.top = _.y + "px";
            self.$.tooltip.style.display = "block";
            self.$.container.find("#xo-ref")[i].css('opacity', .5);
            self.$.container.find("#xo-ref")[_len + i].css('opacity', .5);
            if (_.x < parseFloat(window.getComputedStyle(self.$.tooltip).width)) self.$.tooltip.classList.add("right");
            else self.$.tooltip.classList.remove("right");
        });
        e.addEventListener("mouseout", function() {
            self.$.container.find("#xo-ref")[i].css('opacity', 0);
            self.$.container.find("#xo-ref")[_len + i].css('opacity', 0);
            self.$.tooltip.style.display = "none";
        });
    });
}