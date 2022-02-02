const { $ContainerUi } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

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