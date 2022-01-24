const { $PieChart } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');
const XOColor = require('../utils/__color__');

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
            __tooltip__(this);
        }
    }

    render() {
        return /*html*/ `
            {*if header*}
                <div id="xo-header">
                    {{header}}
                </div>
            {*/if*}
            {*if data.length*}
                <main id="xo-container">
                    ${__draw__(this)}
                </main>
                <div id="xo-tooltip"></div>
            {*/if*}
        `;
    }

}

XOPieChartElement.prototype.tag = "xo-pie-chart";

customElements.define(XOPieChartElement.prototype.tag, XOPieChartElement);


function __node__(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (var p in v)
        n.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) {
            return "-" + m.toLowerCase();
        }), v[p]);
    return n
}

function __getColor__(cs) {
    var nms = Object.keys(XOColor.NAMES),
        pos = Math.floor(Math.random() * nms.length),
        nme = XOColor.NAMES[nms[pos]];
    if (cs.includes(nme)) __getColor__(cs);
    else return nme;
}

function __draw__(el) {
    var size = 100,
        length = Math.PI * (size * 2),
        left = Math.PI * (size * 2),
        sum = el.data.reduce((a, b) => a + parseFloat(b.value), 0),
        grid = __node__("svg"),
        colors = [];
    grid.setAttribute("viewBox", `0 0 ${size * 2} ${size * 2}`);
    for (var i = 0; i < el.data.length; i++) {
        var color = el.data[i].color || __getColor__(colors),
            circle = __node__("circle", {
                cx: size,
                cy: size,
                r: size,
                stroke: color,
                id: "xo-slices",
                style: "stroke-dashArray: " + left + " " + length,
                "data-value": `<strong>${el.data[i].label}</strong><em>${((el.data[i].value / sum) * 100).toFixed(2)}%</em>`
            });
        grid.append(circle);
        left -= (el.data[i].value / sum) * length;
    }
    return grid.outerHTML;
}

function __tooltip__(E) {
    E.$.container.find("#xo-slices").forEach(e => {
        e.addEventListener("mousemove", _ => {
            E.$.tooltip.innerHTML = e.dataset.value;
            E.$.tooltip.style.left = _.x + "px";
            E.$.tooltip.style.top = _.y + "px";
            E.$.tooltip.style.display = "flex";
            if (_.x < parseFloat(window.getComputedStyle(E.$.tooltip).width))
                E.$.tooltip.classList.add("right");
            else
                E.$.tooltip.classList.remove("right");
        });
        e.addEventListener("mouseout", () => {
            E.$.tooltip.style.display = "none";
        });
    });
}