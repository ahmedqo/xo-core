const { $ModalComponent } = require("../utils/_styles");
const XOElement = require("../utils/_element");

window.XOModalElement = class extends XOElement {

    static get styles() {
        return $ModalComponent;
    }

    static get attributes() {
        return {
            expand: Boolean
        }
    }

    static get methods() {
        return {
            show() {
                this.expand = true;
                if (this.$ && this.$.content)
                    this.$.content.querySelector("slot").assignedElements().forEach(e => {
                        __block(e, true);
                    });
                this.makeEvent("visible");
            },
            hide() {
                this.expand = false;
                if (this.$ && this.$.content)
                    this.$.content.querySelector("slot").assignedElements().forEach(e => {
                        __block(e);
                    });
                this.makeEvent("hidden");
            }
        }
    }

    static onMounted() {
        this.hide();
    }

    render() {
        return /*html*/ `
            <main id="xo-container" {§if !expand§} shrink {§/if§}>
                <button id="xo-icon" (click)="{{>hide()}}" {§if !expand§} disabled {§/if§}>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                            <path d="M1790 8714 c-189 -41 -362 -179 -451 -359 -107 -217 -88 -464 52 -672 17 -27 624 -641 1348 -1366 l1316 -1317 -1316 -1318 c-724 -724 -1331 -1338 -1348 -1365 -266 -397 -66 -918 395 -1028 182 -44 367 -8 534 104 25 16 638 622 1363 1346 l1317 1316 1318 -1316 c724 -724 1337 -1330 1362 -1346 116 -77 216 -112 350 -120 265 -15 511 129 631 372 107 217 88 463 -52 672 -17 27 -624 641 -1348 1365 l-1316 1318 1316 1317 c724 725 1331 1339 1348 1366 140 208 159 455 52 672 -183 369 -633 486 -978 254 -27 -17 -641 -624 -1365 -1348 l-1318 -1316 -1317 1316 c-725 724 -1339 1331 -1366 1348 -159 107 -346 144 -527 105z"/>
                        </g>
                    </svg>
                </button>
                <div id="xo-content" {§if !expand§} shrink {§/if§}>
                    <slot></slot>
                </div>
            </main>
        `;
    }

}

XOModalElement.prototype.tag = "xo-modal";

customElements.define(XOModalElement.prototype.tag, XOModalElement);

function __block(el, opt) {
    if (opt) {
        if ("disabled" in el) el.removeAttribute("disabled");
        el.querySelectorAll("*").forEach(function(e) {
            __block(e, true);
        });
        return;
    }
    if ("disabled" in el) el.setAttribute("disabled", "");
    el.querySelectorAll("*").forEach(function(e) {
        __block(e);
    });
    return;
}