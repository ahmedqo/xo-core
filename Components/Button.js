const { $ButtonComponent } = require("../utils/_styles");
const XOElement = require("../utils/_element");
window.XOButtonElement = class extends XOElement {

    static get styles() {
        return $ButtonComponent;
    }

    static get attributes() {
        return {
            disabled: Boolean,
            outlined: Boolean,
            rounded: Boolean,
            flatted: Boolean,
            theme: String,
        }
    }

    render() {
        return /*html*/ `
            <button id="xo-container" {§if disabled§} disabled {§/if§}>
                <slot name="prefix"></slot>
                <label id="xo-label">
                    <slot></slot>
                </label>
                <slot name="suffix"></slot>
            </button>
        `
    }

}

XOButtonElement.prototype.tag = "xo-button";

customElements.define(XOButtonElement.prototype.tag, XOButtonElement);