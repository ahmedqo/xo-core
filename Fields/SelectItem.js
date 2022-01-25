const { $SelectItemField } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

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
            clickHandler(e) {
                let pt = this.parentElement;
                pt.querySelectorAll(XOSelectItemElement.prototype.tag).forEach(e => {
                    e.removeAttribute("selected");
                });
                this.setAttribute("selected", "");
                pt._expand = false;
                pt.$.container.class().del("focus");
                __set__(pt, this);
            }
        }
    }

    static onMounted() {
        this.text = this.innerText.trim();
        this.value = this.getAttribute("value");
        this.setAttribute("disabled", "");
        if (this.hasAttribute("selected")) {
            let pt = this.parentElement;
            __set__(pt, this);
        }
    }

    render() {
        return /*html*/ `
            <a {§if !disabled§} href {§/if§} id="xo-container" (click|prev)="{{>clickHandler('event')}}">
                <slot></slot>
            </a>
        `;
    }

}

XOSelectItemElement.prototype.tag = "xo-select-item";

customElements.define(XOSelectItemElement.prototype.tag, XOSelectItemElement);

function __set__(p, s) {
    if (!p || !p.$) return;
    p.index = Array.from(p.querySelectorAll(XOSelectItemElement.prototype.tag)).indexOf(s);
    p.$.text.value = s.text;
    p.value = s.value;
    p.text = s.text;
    p.item = s;
}