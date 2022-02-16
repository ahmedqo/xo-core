const { $AppBarUi } = require("../utils/_styles");
const XOElement = require("../utils/_element");

window.XOAppBarElement = class extends XOElement {
    static get styles() {
        return $AppBarUi;
    }

    static get attributes() {
        return {
            content: String,
        }
    }

    static onUpdated(name) {
        if (name === 'content') {
            var content = {
                between: "space-between",
                evenly: "space-evenly",
                around: "space-around",
                stretch: "stretch",
                center: "center",
                start: "start",
                end: "end",
            };
            (this.styles = {
                ":host": {
                    ...(Object.keys(content).includes(this.content) ? { justifyContent: content[this.content] } : {}),
                }
            });
        }
    }

    render() {
        return /*html*/ `
                <slot></slot>
            `;
    }
}

XOAppBarElement.prototype.tag = "xo-app-bar";

customElements.define(XOAppBarElement.prototype.tag, XOAppBarElement);