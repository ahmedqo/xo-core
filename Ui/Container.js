const { $ContainerUi } = require("../utils/_styles");
const XOElement = require("../utils/_element");

window.XOContainerElement = class extends XOElement {

    static get styles() {
        return $ContainerUi;
    }

    render() {
        return /*html*/ `
            <slot></slot>
        `;
    }

}

XOContainerElement.prototype.tag = "xo-container";

customElements.define(XOContainerElement.prototype.tag, XOContainerElement);