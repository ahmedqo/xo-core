const { $SelectItemField } = require("../utils/_styles");
const XOElement = require("../utils/_element");

window.XOSelectItemElement = class extends XOElement {

    static get styles() {
        return $SelectItemField;
    }

    static get attributes() {
        return {
            disabled: Boolean,
        }
    }

    static get properties() {
        return {
            value: { default: null, type: String },
            text: { default: null, type: String },
        }
    }

    static get methods() {
        return {
            clickHandler() {
                if (this.disabled) return;
                else {
                    let pt = this.parentElement;
                    pt.querySelectorAll(XOSelectItemElement.prototype.tag).forEach(e => {
                        e.removeAttribute("selected");
                    });
                    this.setAttribute("selected", "");
                    pt._expand = false;
                    pt.$.container.class().del("focus");
                    _set(pt, this);
                }
            }
        }
    }

    static onMounted() {
        this.text = this.innerText.trim();
        this.value = this.getAttribute("value");
        if (this.hasAttribute("selected")) {
            let pt = this.parentElement;
            _set(pt, this);
        }
    }

    render() {
        return /*html*/ `
            <button id="xo-container" (click|prev)="{{>clickHandler('event')}}">
                <slot></slot>
            </button>
        `;
    }

}

XOSelectItemElement.prototype.tag = "xo-select-item";

customElements.define(XOSelectItemElement.prototype.tag, XOSelectItemElement);

function _set(p, s) {
    if (!p || !p.$) return;
    p.index = Array.from(p.querySelectorAll(XOSelectItemElement.prototype.tag)).indexOf(s);
    p.$.text.value = s.text;
    p.value = s.value;
    p.text = s.text;
    p.item = s;
}