const { $PieChart } = require("../utils/_styles");
const XOElement = require("../utils/_element");
const XOColor = require('../utils/_color');
var { _node } = require("../utils/_runtime");

window.XOPieChartElement = class extends XOElement {

    static get styles() {
        return $PieChart;
    }

    static get attributes() {
        return {
            header: String,
        }
    }

    static get properties() {
        return {
            data: { default: [], type: Array },
        }
    }

    static onUpdated() {
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
                    ${__draw(this)}
                </main>
                <div id="xo-tooltip"></div>
            {§/if§}
        `;
    }

}

XOPieChartElement.prototype.tag = "xo-pie-chart";

customElements.define(XOPieChartElement.prototype.tag, XOPieChartElement);

function __getColor(cs) {
    var nms = Object.keys(XOColor.NAMES),
        pos = Math.floor(Math.random() * nms.length),
        nme = XOColor.NAMES[nms[pos]];
    if (cs.includes(nme)) __getColor(cs);
    else return nme;
}

function __draw(el) {
    var size = 100,
        length = Math.PI * (size * 2),
        left = Math.PI * (size * 2),
        sum = el.data.reduce(function(a, b) {
            return a + parseFloat(b.value);
        }, 0),
        grid = _node("svg"),
        colors = [];
    grid.setAttribute("viewBox", "0 0 " + size * 2 + " " + size * 2);
    for (var i = 0; i < el.data.length; i++) {
        var color = el.data[i].color || __getColor(colors),
            circle = _node("circle", {
                cx: size,
                cy: size,
                r: size,
                stroke: color,
                id: "xo-slices",
                style: "stroke-dashArray: " + left + " " + length,
                "data-value": "<strong>" + el.data[i].label + "</strong><em>" + (el.data[i].value / sum * 100).toFixed(2) + "%</em>"
            });
        grid.append(circle);
        left -= el.data[i].value / sum * length;
    }
    return grid.outerHTML;
}

function __tooltip(E) {
    E.$.container.find("#xo-slices").forEach(function(e) {
        e.addEventListener("mousemove", function(_) {
            E.$.tooltip.innerHTML = e.dataset.value;
            E.$.tooltip.style.left = _.x + "px";
            E.$.tooltip.style.top = _.y + "px";
            E.$.tooltip.style.display = "flex";
            if (_.x < parseFloat(window.getComputedStyle(E.$.tooltip).width)) E.$.tooltip.classList.add("right");
            else E.$.tooltip.classList.remove("right");
        });
        e.addEventListener("mouseout", function() {
            E.$.tooltip.style.display = "none";
        });
    });
}