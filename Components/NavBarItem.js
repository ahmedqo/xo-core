const { $NavBarItemComponent } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

window.XONavBarItemElement = class extends XOElement {

    static get styles() {
        return $NavBarItemComponent;
    }

    static get attributes() {
        return {
            disabled: Boolean,
            spa: Boolean,
            to: String,
        }
    }

    static get methods() {
        return {
            click() {
                this.makeEvent("push", {}, () => {
                    if (this.disabled) return;
                    this.parentElement.querySelectorAll("xo-navbar-item").forEach(e => {
                        e.removeAttribute("active");
                    });
                    this.setAttribute("active", "");
                    if (window.innerWidth < 768)
                        this.parentElement.setAttribute("expand", false);
                    if (this.spa) {
                        return this.to === null ? XORouter.goto("/") : XORouter.goto(this.to);
                    }
                    window.location.href = this.to === null ? "" : this.to;
                });
            }
        }
    }

    static onMounted() {
        if ((location.hash.includes(this.to) || location.pathname === this.to) && !this.hasAttribute("slot")) this.setAttribute("active", "");
    }

    render() {
        return /*html*/ `
            <main (click)="{{>click()}}">
                <button id="xo-container" {§if disabled§} disabled {§/if§}>
                    <slot name="prefix"></slot>
                    <label id="xo-label"><slot></slot></label>
                    <slot name="suffix"></slot>
                </button>
            </main>
        `
    }

}

XONavBarItemElement.prototype.tag = "xo-navbar-item";

customElements.define(XONavBarItemElement.prototype.tag, XONavBarItemElement);