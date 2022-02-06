const { $RadarChart } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');
var { _toConsumableArray, _node } = require("../utils/__runtime__");

window.XORadarChartElement = class extends XOElement {

    static get styles() {
        return $RadarChart;
    }

    static get attributes() {
        return {
            header: String,
            theme: String,
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
                    ${__grid(this.data)}
                </main>
                <div id="xo-tooltip"></div>
            {§/if§}
        `;
    }

}

XORadarChartElement.prototype.tag = "xo-radar-chart";

customElements.define(XORadarChartElement.prototype.tag, XORadarChartElement);

function __grid(data) {
    var size = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];

    var group = _node("g", {
            transform: "translate(10, 10)"
        }),
        grid = _node("svg"),
        scale = 5;
    for (var i = scale; i > 0; i--) {
        var poly = _node("path", {
            d: __polygon(size / 2, size / 2, data.length, size / 2 / scale * i),
            id: "xo-grid"
        });
        group.append(poly);
    }
    __lines(data.length, size, group);
    __area(size, group, data);
    __dots(size, group, data);
    grid.append(group);
    grid.setAttribute("viewBox", "0 0 " + (size + 20) + " " + (size + 20));
    if (data.length === 3) grid.setAttribute("viewBox", "0 0 " + (size + 20) + " " + (size + 20 - size / 100 * 25));
    if (data.length === 5) grid.setAttribute("viewBox", "0 0 " + (size + 20) + " " + (size + 20 - size / 100 * 9.2));
    return grid.outerHTML;
}

function __polar(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function __polygon(centerX, centerY, points, radius) {
    var degreeIncrement = 360 / points;
    var d = new Array(points).fill('foo').map(function(p, i) {
        var point = __polar(centerX, centerY, radius, degreeIncrement * i);
        return point.x + "," + point.y;
    });
    return "M " + d.join(" ") + " Z";
}

function __lines(corners, size, svg) {
    var pts = __polygon(size / 2, size / 2, corners, size / 2).split(" ");
    pts.splice(pts.length - 1, 1);
    pts.splice(0, 1);
    for (var i = 0; i < corners; i++) {
        var line = _node("line", {
            x1: pts[i].split(",")[0],
            y1: pts[i].split(",")[1],
            id: "xo-grid",
            x2: size / 2,
            y2: size / 2
        });
        svg.append(line);
    }
}

function __dots(size, svg, data) {
    var max = Math.max.apply(Math, _toConsumableArray(data.map(function(e) {
        return parseFloat(e.value);
    })));
    for (var i = 0; i < data.length; i++) {
        var pts = __polygon(size / 2, size / 2, data.length, size / 2 / 100 * (parseFloat(data[i].value) / max * 100)).split(" "),
            c = data[i].color || "";
        pts.splice(pts.length - 1, 1);
        pts.splice(0, 1);
        var dot = _node("circle", {
            "data-value": "<strong>" + data[i].label + "</strong><em>" + (parseFloat(data[i].value) / max * 100).toFixed(2) + "%</em>",
            cx: pts[i].split(",")[0],
            cy: pts[i].split(",")[1],
            id: "xo-dots",
            r: 2
        });
        if (c) dot.setAttribute("style", "fill:" + c);
        svg.append(dot);
    }
}

function __area(size, svg, data) {
    var path = "M ",
        max = Math.max.apply(Math, _toConsumableArray(data.map(function(e) {
            return parseFloat(e.value);
        })));
    for (var i = 0; i < data.length; i++) {
        var pts = __polygon(size / 2, size / 2, data.length, size / 2 / 100 * (parseFloat(data[i].value) / max * 100)).split(" ");
        pts.splice(pts.length - 1, 1);
        pts.splice(0, 1);
        path += pts[i] + " ";
    }
    var poly = _node("path", {
        d: path + " Z",
        id: "xo-area"
    });
    svg.append(poly);
}

function __tooltip(E) {
    E.$.container.find("#xo-dots").forEach(function(e) {
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