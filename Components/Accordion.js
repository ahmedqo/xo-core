const { $AccordionComponent } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

window.XOAccordionElement = class extends XOElement {

    static get styles() {
        return $AccordionComponent;
    }

    static get attributes() {
        return {
            theme: String,
            header: String,
            expand: Boolean,
        }
    }

    static get properties() {
        return {
            _height: { default: NaN, type: Number }
        }
    }

    static get methods() {
        return {
            toggle() {
                this._height = this.$.content.scrollHeight;
                if (this.expand) {
                    this.makeEvent("shrink");
                } else {
                    this.makeEvent("expand");
                }
                this.expand = !this.expand;
            }
        }
    }

    static onMounted() {
        this._height = this.$.content.scrollHeight;
    }

    render() {
        return /*html*/ `
                <main id="xo-container">
                    <div id="xo-header" (click)="{{>toggle()}}">
                        <button id="xo-icon">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M715 7910 c-75 -14 -171 -48 -255 -91 -196 -101 -345 -285 -416 -514 -26 -81 -29 -105 -29 -235 0 -121 4 -158 23 -223 30 -106 80 -209 143 -292 62 -85 4123 -4152 4257 -4265 101 -85 206 -142 332 -182 65 -20 96 -23 230 -23 135 0 165 3 230 24 101 31 203 81 270 131 30 22 1008 993 2173 2158 1481 1481 2132 2138 2166 2187 54 79 101 179 127 275 14 49 18 101 18 210 0 129 -3 155 -28 235 -113 371 -438 615 -821 615 -177 0 -326 -45 -485 -148 -35 -22 -624 -603 -1590 -1567 -1042 -1040 -1554 -1544 -1595 -1571 -83 -53 -195 -100 -287 -118 -155 -32 -357 -15 -493 40 -164 67 -95 2 -1740 1644 -969 967 -1560 1550 -1595 1572 -155 100 -278 139 -455 144 -71 1 -152 -1 -180 -6z"></path>
                                </g>
                            </svg>
                        </button>
                        <label id="xo-label">
                            {{header}}
                        </label>
                    </div>
                    <div id="xo-content" style="--height: {{_height}}px">
                        <p>
                            <slot></slot>
                        </p>
                    </div>
                </main>
            `;
    }
}

XOAccordionElement.prototype.tag = "xo-accordion";

customElements.define(XOAccordionElement.prototype.tag, XOAccordionElement);