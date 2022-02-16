const { $ToastGroupComponent } = require("../utils/_styles");
const XOElement = require("../utils/_element");
require('./Toast');

window.XOToastGroupElement = class extends XOElement {

    static get styles() {
        return $ToastGroupComponent;
    }

    static onMounted() {
        Array.from(this.children).forEach(item => {
            if (item.tagName !== "XO-TOAST") {
                item.remove();
            }
        });
    }

    render() {
        return /*html*/ `
            <main id="xo-container">
                <slot></slot>
            </main>
        `
    }

}

XOToastGroupElement.prototype.tag = "xo-toast-group";

XOToastGroupElement.Create = function(...children) {
    var el = new XOToastGroupElement();
    for (var c in children) {
        el.appendChild(c);
    }
    return el;
}

customElements.define(XOToastGroupElement.prototype.tag, XOToastGroupElement);