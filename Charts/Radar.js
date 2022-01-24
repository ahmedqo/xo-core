const { $RadarChart } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

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
                    ${__grid__(this.data)}
                </main>
                <div id="xo-tooltip"></div>
            {*/if*}
        `;
    }

}

XORadarChartElement.prototype.tag = "xo-radar-chart";

customElements.define(XORadarChartElement.prototype.tag, XORadarChartElement);

function __node__(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (var p in v) {
        n.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) {
            return "-" + m.toLowerCase();
        }), v[p]);
    }
    return n
}

function __grid__(data, size = 500) {
    var group = __node__("g", {
            transform: "translate(10, 10)"
        }),
        grid = __node__("svg"),
        scale = 5;
    for (var i = scale; i > 0; i--) {
        var poly = __node__("path", {
            d: __polygon__(size / 2, size / 2, data.length, (size / 2) / scale * i),
            id: "xo-grid",
        });
        group.append(poly);
    }
    __lines__(data.length, size, group);
    __area__(size, group, data);
    __dots__(size, group, data);
    grid.append(group);
    grid.setAttribute("viewBox", `0 0 ${size + 20} ${size + 20}`);
    if (data.length === 3) grid.setAttribute("viewBox", `0 0 ${size + 20} ${(size + 20) - (size / 100 * 25)}`);
    if (data.length === 5) grid.setAttribute("viewBox", `0 0 ${size + 20} ${(size + 20) - (size / 100 * 9.2)}`);
    return grid.outerHTML;
}

function __polar__(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function __polygon__(centerX, centerY, points, radius) {
    const degreeIncrement = 360 / (points);
    const d = new Array(points).fill('foo').map((p, i) => {
        const point = __polar__(centerX, centerY, radius, degreeIncrement * i);
        return `${point.x},${point.y}`;
    });
    return `M ${d.join(" ")} Z`;
}

function __lines__(corners, size, svg) {
    var pts = __polygon__(size / 2, size / 2, corners, (size / 2)).split(" ");
    pts.splice(pts.length - 1, 1);
    pts.splice(0, 1);
    for (var i = 0; i < corners; i++) {
        var line = __node__("line", {
            x1: pts[i].split(",")[0],
            y1: pts[i].split(",")[1],
            id: "xo-grid",
            x2: size / 2,
            y2: size / 2,
        });
        svg.append(line);
    }
}

function __dots__(size, svg, data) {
    var max = Math.max(...data.map(e => parseFloat(e.value)));
    for (var i = 0; i < data.length; i++) {
        var pts = __polygon__(size / 2, size / 2, data.length, ((size / 2) / 100) * (parseFloat(data[i].value) / max * 100)).split(" "),
            c = data[i].color || "";
        pts.splice(pts.length - 1, 1);
        pts.splice(0, 1);
        var dot = __node__("circle", {
            "data-value": `<strong>${data[i].label}</strong><em>${((parseFloat(data[i].value) / max) * 100).toFixed(2)}%</em>`,
            cx: pts[i].split(",")[0],
            cy: pts[i].split(",")[1],
            id: "xo-dots",
            r: 2
        });
        if (c) dot.setAttribute("style", `fill:${c}`);
        svg.append(dot);
    }
}

function __area__(size, svg, data) {
    var path = "M ",
        max = Math.max(...data.map(e => parseFloat(e.value)));
    for (var i = 0; i < data.length; i++) {
        var pts = __polygon__(size / 2, size / 2, data.length, ((size / 2) / 100) * (parseFloat(data[i].value) / max * 100)).split(" ");
        pts.splice(pts.length - 1, 1);
        pts.splice(0, 1);
        path += pts[i] + " ";
    }
    var poly = __node__("path", {
        d: path + " Z",
        id: "xo-area",
    });
    svg.append(poly);
}

function __tooltip__(E) {
    E.$.container.find("#xo-dots").forEach(e => {
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