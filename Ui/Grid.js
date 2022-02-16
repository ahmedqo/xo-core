const { $GridUi } = require("../utils/_styles");
const XOElement = require("../utils/_element");

window.XOGridElement = class extends XOElement {

    static get styles() {
        return $GridUi;
    }

    static get attributes() {
        return {
            direction: String,
            colspace: Number,
            rowspace: Number,
            content: String,
            space: Number,
            items: String,
            wrap: Boolean,
            item: Boolean,
            xs: Number,
            sm: Number,
            md: Number,
            lg: Number,
            xl: Number
        }
    }

    static onUpdated(name) {
        var attrs = ['direction', 'colspace', 'rowspace', 'content', 'space', 'items', 'wrap'],
            items = {
                baseline: "baseline",
                stretch: "stretch",
                center: "center",
                start: "start",
                end: "end",
            },
            space = {
                _0: '0',
                _1: '5px',
                _2: '10px',
                _3: '15px',
                _4: '20px',
                _8: '40px',
                _12: '60px'
            },
            content = {
                between: "space-between",
                evenly: "space-evenly",
                around: "space-around",
                stretch: "stretch",
                center: "center",
                start: "start",
                end: "end",
            },
            direction = {
                row: "row",
                column: "column",
                "-row": "row-reverse",
                "-column": "column-reverse",
            };
        this.item && attrs.includes(name) && this.removeAttribute(name);
        this.item && (this.styles = {
            ":host": {
                ...(this.xs > 0 && this.xs < 13 ? { gridColumn: 'span ' + this.xs } : {}),
                display: "block",
            },
            mediaQueries: [
                {...(this.sm > 0 && this.sm < 13 ? { condition: "min-width: 640px", ":host": { gridColumn: 'span ' + this.sm } } : {}) },
                {...(this.md > 0 && this.md < 13 ? { condition: "min-width: 768px", ":host": { gridColumn: 'span ' + this.md } } : {}) },
                {...(this.lg > 0 && this.lg < 13 ? { condition: "min-width: 1024px", ":host": { gridColumn: 'span ' + this.lg } } : {}) },
                {...(this.xl > 0 && this.xl < 13 ? { condition: "min-width: 1280px", ":host": { gridColumn: 'span ' + this.xl } } : {}) },
            ]
        });
        !this.item && (this.styles = {
            ":host": {
                ...(Object.keys(direction).includes(this.direction) ? { flexDirection: direction[this.direction], display: 'flex' } : {}),
                ...(Object.keys(content).includes(this.content) ? { justifyContent: content[this.content] } : {}),
                ...(Object.keys(items).includes(this.items) ? { alignItems: items[this.items] } : {}),
                ...(Object.keys(space).includes('_' + this.colspace) ? { gridColumnGap: space['_' + this.colspace] } : {}),
                ...(Object.keys(space).includes('_' + this.rowspace) ? { gridRowGap: space['_' + this.rowspace] } : {}),
                ...(Object.keys(space).includes('_' + this.space) ? { gridGap: space['_' + this.space] } : {}),
                ...(this.wrap ? { flexWrap: 'wrap' } : {}),
            }
        });
    }

    render() {
        return /*html*/ `
            <slot></slot>
        `;
    }

}

XOGridElement.prototype.tag = "xo-grid";

customElements.define(XOGridElement.prototype.tag, XOGridElement);