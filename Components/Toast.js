const { $ToastComponent } = require("../utils/_styles");
const XOElement = require("../utils/_element");

window.XOToastElement = class extends XOElement {

    static get styles() {
        return $ToastComponent;
    }

    static get attributes() {
        return {
            theme: String,
            keep: Boolean,
            trigger: String,
            animation: String,
            auto: Number,
        }
    }

    static get methods() {
        return {
            show() {
                this.style.display = "";
                this.makeEvent("visible");
            },
            hide() {
                if (this.keep) {
                    this.style.display = "none";
                    this.makeEvent("hidden");
                } else {
                    this.remove();
                    this.makeEvent("remove");
                }
            }
        }
    }

    static onUpdated(name, value) {
        switch (name) {
            case "auto":
                if (value) setTimeout(() => {
                    this.hide()
                }, value);
                break;
        }
    }

    render() {
        return /*html*/ `
                <main id="xo-container">
                    {§if trigger !== 'hidden'§}
                        <button id="xo-icon" (click)="{{>hide()}}">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M1790 8714 c-189 -41 -362 -179 -451 -359 -107 -217 -88 -464 52 -672 17 -27 624 -641 1348 -1366 l1316 -1317 -1316 -1318 c-724 -724 -1331 -1338 -1348 -1365 -266 -397 -66 -918 395 -1028 182 -44 367 -8 534 104 25 16 638 622 1363 1346 l1317 1316 1318 -1316 c724 -724 1337 -1330 1362 -1346 116 -77 216 -112 350 -120 265 -15 511 129 631 372 107 217 88 463 -52 672 -17 27 -624 641 -1348 1365 l-1316 1318 1316 1317 c724 725 1331 1339 1348 1366 140 208 159 455 52 672 -183 369 -633 486 -978 254 -27 -17 -641 -624 -1365 -1348 l-1318 -1316 -1317 1316 c-725 724 -1339 1331 -1366 1348 -159 107 -346 144 -527 105z"/>
                                </g>
                            </svg>
                        </button>
                    {§/if§}
                    <div>
                        <slot></slot>
                    </div>
                </main>
            `
    }

}

XOToastElement.prototype.tag = "xo-toast";

XOToastElement.Create = function(message, { theme, keep, auto, trigger, animation } = {}) {
    var el = new XOToastElement();
    el.innerText = message;
    if (keep) el.setAttribute("keep", keep);
    if (auto) el.setAttribute("auto", auto);
    if (theme) el.setAttribute("theme", theme);
    if (trigger) el.setAttribute("trigger", trigger);
    if (animation) el.setAttribute("animation", animation);
    return el;
}

customElements.define(XOToastElement.prototype.tag, XOToastElement);