const { $AppBarUi } = require("../utils/__sass__");
const XOElement = require("../utils/__element__");

window.XOAppBarElement = class extends XOElement {
    static get styles() {
        return $AppBarUi;
    }

    render() {
        return /*html*/ `
            <main id="xo-container">
                <slot></slot>
            </main>
        `;
    }
}

XOAppBarElement.prototype.tag = "xo-app-bar";

customElements.define(XOAppBarElement.prototype.tag, XOAppBarElement);