const { $GridChart } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

window.XOGridChartElement = class extends XOElement {

    static get styles() {
        return $GridChart;
    }

    static get attributes() {
        return {
            header: String,
            theme: String,
        }
    }

    static get properties() {
        return {
            offset: { default: { width: 2, height: 2 }, type: Object },
            data: { default: [], type: Array },
            size: { default: { width: 1000, height: 400 }, type: Object },
        }
    }

    static onUpdated() {
        if (this.data.length) {
            __tooltip__(this);
        }
    }

    render() {
        return /*html*/ `
            @{{if header}}
                <div id="xo-header">
                    {{header}}
                </div>
            @{{/if}}
            @{{if data.length}}
                <main id="xo-container">
                    ${__chart__(this)}
                </main>
                <div id="xo-tooltip"></div>
            @{{/if}}
        `;
    }

}

XOGridChartElement.prototype.tag = "xo-grid-chart";

customElements.define(XOGridChartElement.prototype.tag, XOGridChartElement);

function __node__(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (var p in v)
        n.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) {
            return "-" + m.toLowerCase();
        }), v[p]);
    return n
}

function __chart__(self) {
    let size = self.size,
        offset = self.offset,
        data = self.data,
        nSize = {
            width: size.width - offset.width,
            height: size.height - offset.height
        },
        max = Math.max(...data.map(e => e.value)),
        len = data.length > 9 ? 10 : data.length + 1,
        unit = max / len;

    // elems
    let svg = __node__('svg'),
        g1 = __node__('g'),
        g2 = __node__('g'),
        g3 = __node__('g'),
        g4 = __node__('g'),
        g5 = __node__('g'),
        g6 = __node__('g'),
        g7 = __node__('g'),
        g8 = __node__('g'),
        g9 = __node__('g');

    svg.setAttribute("viewBox", `0 0 ${size.width} ${size.height}`);

    // axis
    let x = __node__('line', { x1: offset.width, y1: 0, x2: offset.width, y2: nSize.height, id: "xo-axis" }),
        y = __node__('line', { x1: offset.width, y1: nSize.height, x2: size.width, y2: nSize.height, id: "xo-axis" }),
        x0 = __node__('line', { x1: offset.width - 5, y1: 1, x2: offset.width + 5, y2: 1, id: "xo-axis" }),
        y0 = __node__('line', { x1: size.width - 1, y1: nSize.height - 5, x2: size.width - 1, y2: nSize.height + 5, id: "xo-axis" });
    g3.appendChild(x0);
    g3.appendChild(x);
    g3.appendChild(y);
    g3.appendChild(y0);

    // grid
    for (let i = 0; i < len; i++) {
        let mv = (nSize.height - 10) / len,
            line = __node__("line", {
                x1: offset.width,
                y1: (mv * i) + 10,
                x2: size.width,
                y2: (mv * i) + 10,
                id: "xo-grid",
            });
        g4.appendChild(line);
    };

    // ylabels
    for (let i = len; i >= 0; i--) {

        let mv = (nSize.height - 10) / len,
            text = __node__('text', {
                x: offset.width / 2,
                y: (mv * (len - i)) + 10,
                id: "xo-legendVert"
            });
        text.innerHTML = Number.isInteger(Number(unit * i)) ? Number(unit * i) : Number(unit * i).toFixed(2);
        g1.appendChild(text);
    };

    // xlabels
    for (let i = 0; i < data.length; i++) {
        let mv = ((nSize.width / (data.length)) * i) + offset.width,
            text = __node__("foreignObject", {
                x: mv,
                y: nSize.height,
                width: `calc(100% / ${data.length})`,
                height: offset.height,
            });
        text.innerHTML = `<div id="xo-legendHors">${data[i].label}</div>`;
        g2.appendChild(text);
    };

    // bar 
    for (let i = 0; i < data.length; i++) {
        let mv = ((nSize.width / (data.length)) * i) + offset.width + ((nSize.width / (data.length)) / 2),
            pr = Number(data[i].value) ? (nSize.height + 10) - (nSize.height / 100) * ((Number(data[i].value) / max) * 100) : nSize.height,
            line = __node__("line", {
                x1: mv,
                y1: nSize.height - 1,
                x2: mv,
                y2: pr,
                id: "xo-bars",
                'stroke-width': `calc((100% / ${data.length}))`,
            });
        g5.appendChild(line);
    }

    // area 
    let path = data.reduce((acc, itm, i) => {
            let mv = ((nSize.width / (data.length)) * i) + offset.width + ((nSize.width / (data.length)) / 2),
                pr = Number(itm.value) ? (nSize.height + 10) - (nSize.height / 100) * ((Number(itm.value) / max) * 100) : nSize.height;
            return acc + `${mv} ${pr} `;
        },
        "").trim();
    let xf = offset.width + ((nSize.width / (data.length)) / 2),
        xl = ((nSize.width / (data.length)) * (data.length - 1)) + offset.width + ((nSize.width / (data.length)) / 2),
        area = __node__("path", {
            d: `M${xf} ${nSize.height} ${path} ${xl} ${nSize.height}`,
            id: "xo-area",
        });
    g6.appendChild(area);

    // line 
    let line = __node__("path", {
        d: `M${path}`,
        id: "xo-line",
    });
    g7.appendChild(line);

    // dots 
    for (let i = 0; i < data.length; i++) {
        let mv = ((nSize.width / (data.length)) * i) + offset.width + ((nSize.width / (data.length)) / 2),
            pr = Number(data[i].value) ? (nSize.height + 10) - (nSize.height / 100) * ((Number(data[i].value) / max) * 100) : nSize.height,
            circle = __node__("circle", {
                cx: mv,
                cy: pr,
                r: 10,
                id: "xo-dots"
            });
        g8.appendChild(circle);
    }

    // hovers
    for (let i = 0; i < data.length; i++) {
        let mv = ((nSize.width / (data.length)) * i) + offset.width + ((nSize.width / (data.length)) / 2),
            line = __node__("line", {
                x1: mv,
                y1: nSize.height - 3,
                x2: mv,
                y2: nSize.height + 3,
                stroke: "black",
                'stroke-linecap': 'round',
            }),
            line2 = __node__("line", {
                x1: mv,
                y1: 0,
                x2: mv,
                y2: nSize.height,
                id: "xo-hover",
                'stroke-width': `calc((100% / ${data.length}) - 10px)`,
                "data-value": `<strong>${data[i].label}</strong><br/><em>${data[i].value}</em>`,
            });
        g2.appendChild(line);
        g9.appendChild(line2);
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

    return svg.outerHTML;
}

function __tooltip__(self) {
    self.$.container.find("#xo-hover").forEach(e => {
        e.addEventListener("mousemove", _ => {
            self.$.tooltip.innerHTML = e.dataset.value;
            self.$.tooltip.style.left = _.x + "px";
            self.$.tooltip.style.top = _.y + "px";
            self.$.tooltip.style.display = "block";
            if (_.x < parseFloat(window.getComputedStyle(self.$.tooltip).width))
                self.$.tooltip.classList.add("right");
            else
                self.$.tooltip.classList.remove("right");
        });
        e.addEventListener("mouseout", () => {
            self.$.tooltip.style.display = "none";
        });
    })
}