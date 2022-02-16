const { $AccordionGroupComponent } = require("../utils/_styles");
const XOElement = require("../utils/_element");
require('./Accordion');

window.XOAccordionGroupElement = class extends XOElement {

    static get styles() {
        return $AccordionGroupComponent;
    }

    static get attributes() {
        return {
            theme: String,
        }
    }

    static onMounted() {
        Array.from(this.children).forEach(item => {
            if (item.tagName !== "XO-ACCORDION") {
                item.remove();
            } else {
                item.style.borderRadius = 0;
                item.addEventListener("expand", () => {
                    _click(this, item);
                });
            }
        });
    }

    static onUpdated(name, value) {
        switch (name) {
            case "theme":
                this.querySelectorAll("xo-accordion").forEach(s => {
                    s.setAttribute("theme", value);
                });
                break;
        }
    }

    render() {
        return /*html*/ `
            <main id="xo-container">
                <slot></slot>
            </main>
        `
    }

}

XOAccordionGroupElement.prototype.tag = "xo-accordion-group";

customElements.define(XOAccordionGroupElement.prototype.tag, XOAccordionGroupElement);

function _click(self, e) {
    Array.from(self.children).forEach(item => {
        if (item !== e && item.hasAttribute("expand")) {
            item.expand = false;
        }
    });
}