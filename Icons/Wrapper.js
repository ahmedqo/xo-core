const { $WrapperComponent } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

class Element extends XOElement {

    static get styles() {
        return $WrapperComponent;
    }

    static get methods() {
        return {
            clickHandler() {
                this.$.container.each("span", e => {
                    e.remove();
                });
                __span__(this);
                setTimeout(() => {
                    __span__(this);
                }, 200)
            }
        }
    }

    render() {
        return /*html*/ `
            <main id="xo-container" (click)="{{>clickHandler()}}">
                <slot></slot>
            </main>
        `
    }

}

Element.prototype.tag = "xo-icon-wrapper";

customElements.define(Element.prototype.tag, Element);

function __span__(self) {
    var span = document.createElement("span");
    span.classList.add("ripple");
    self.$.container.appendChild(span);
    span.classList.add("ripple-effect")
}