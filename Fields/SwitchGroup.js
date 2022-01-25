const { $SwitchGroupField } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');
require('./Switch');

window.XOSwitchGroupElement = class extends XOElement {

    static get styles() {
        return $SwitchGroupField;
    }

    static get attributes() {
        return {
            rounded: Boolean,
            flatted: Boolean,
            info: String,
            infotype: String,
            theme: String,
            disabled: Boolean,
        }
    }

    static get properties() {
        return {
            value: { default: null, type: String },
            text: { default: null, type: String },
        }
    }

    static onMounted() {
        Array.from(this.children).forEach(item => {
            if (item.tagName !== "XO-SWITCH") {
                item.remove();
            }
            if (item.hasAttribute("checked")) {
                this.value = item.getAttribute('value');
                this.text = item.innerText;
            }
        });
        this.querySelectorAll("xo-switch").forEach(item => {
            item.addEventListener("click", (e) => {
                if (item.checked) e.preventDefault();
            });
            item.addEventListener("checked", () => {
                this.querySelectorAll("xo-switch").forEach(e => {
                    if (e !== item) e.removeAttribute("checked");
                });
                this.text = item.text;
                this.value = item.value;
                this.makeEvent("checked");
            });
        });
    }

    static onUpdated(name, value) {
        switch (name) {
            case "theme":
                this.querySelectorAll("xo-switch").forEach(s => {
                    s.setAttribute("theme", value);
                });
                break;
            case "disabled":
                if (value !== null)
                    this.querySelectorAll("xo-switch").forEach(s => {
                        s.setAttribute("disabled", "");
                    });
                else
                    this.querySelectorAll("xo-switch").forEach(s => {
                        s.removeAttribute("disabled");
                    });
                break;
            case "rounded":
                if (value !== null)
                    this.querySelectorAll("xo-switch").forEach(s => {
                        s.setAttribute("rounded", "");
                    });
                else
                    this.querySelectorAll("xo-switch").forEach(s => {
                        s.removeAttribute("rounded");
                    });
                break;
            case "flatted":
                if (value !== null)
                    this.querySelectorAll("xo-switch").forEach(s => {
                        s.setAttribute("flatted", "");
                    });
                else
                    this.querySelectorAll("xo-switch").forEach(s => {
                        s.removeAttribute("flatted");
                    });
                break;
        }
    }

    get isEmpty() {
        switch (this.value) {
            case "":
            case null:
            case false:
            case this.value.trim() === "":
            case typeof(this.value) === "undefined":
                return true;
            default:
                return false;
        }
    }

    render() {
        return /*html*/ `
            <main id="xo-container">
                <slot></slot>
            </main>
            {§if info && infotype§}
                <label id="xo-info" {{infotype}}>
                    <span>{{info}}</span>
                    {§if infotype === 'success'§}
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M8681 8715 c-30 -8 -84 -28 -120 -46 -61 -30 -240 -206 -2434 -2398 -1302 -1301 -2370 -2368 -2373 -2371 -2 -2 -510 500 -1127 1116 -1024 1022 -1128 1123 -1187 1153 -121 59 -232 74 -344 45 -138 -35 -142 -38 -575 -468 -228 -227 -419 -425 -440 -457 -20 -30 -42 -75 -50 -100 -7 -24 -17 -52 -22 -61 -12 -24 -11 -205 1 -213 5 -3 10 -15 10 -26 0 -11 14 -50 31 -87 30 -63 123 -159 1713 -1750 1534 -1535 1687 -1685 1750 -1718 153 -81 304 -84 463 -9 52 25 378 348 2986 2954 1610 1609 2941 2947 2958 2973 105 162 105 374 -1 537 -16 25 -213 229 -437 452 -339 337 -418 411 -464 433 -112 54 -228 67 -338 41z"/>
                            </g>
                        </svg>
                    {§else§}
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M4580 9825 c-330 -31 -728 -106 -975 -185 -233 -75 -402 -138 -570 -213 -73 -33 -338 -165 -390 -195 -412 -237 -724 -471 -1038 -781 -335 -329 -584 -655 -839 -1096 -75 -130 -204 -404 -273 -580 -26 -66 -51 -129 -55 -140 -5 -11 -22 -60 -39 -110 -256 -776 -311 -1641 -155 -2450 60 -312 161 -652 259 -880 7 -16 20 -48 29 -70 146 -357 404 -796 654 -1111 546 -689 1244 -1209 2037 -1519 66 -26 129 -51 140 -56 36 -15 231 -78 311 -99 496 -133 838 -180 1324 -180 452 0 857 52 1260 160 134 37 453 143 525 175 17 8 59 26 95 40 148 61 358 165 520 257 671 383 1256 939 1677 1593 432 672 683 1418 753 2240 13 155 13 595 0 750 -55 646 -205 1191 -485 1760 -260 529 -550 925 -990 1355 -97 95 -108 105 -230 209 -167 142 -468 361 -606 439 -18 11 -79 46 -134 77 -131 77 -542 275 -568 275 -7 0 -17 4 -23 9 -10 9 -97 41 -259 96 -366 122 -708 192 -1130 230 -194 18 -633 18 -825 0z m770 -1249 c381 -41 740 -130 1022 -255 26 -12 51 -21 54 -21 14 0 259 -123 352 -177 567 -326 1036 -797 1359 -1368 72 -127 203 -403 203 -429 0 -7 3 -16 7 -19 10 -11 73 -193 103 -297 7 -25 16 -56 20 -70 5 -14 17 -65 28 -115 78 -348 96 -535 89 -899 -7 -353 -44 -604 -135 -931 -50 -175 -155 -441 -246 -620 -80 -157 -215 -382 -246 -410 -21 -19 -41 1 -2515 2475 -1372 1372 -2495 2498 -2495 2502 0 20 249 172 425 261 412 208 785 317 1265 372 160 18 544 18 710 1z m-793 -4018 c1371 -1371 2493 -2497 2493 -2503 0 -10 -30 -31 -170 -121 -77 -49 -380 -206 -460 -238 -46 -18 -72 -29 -112 -45 -31 -13 -185 -67 -228 -80 -129 -39 -180 -52 -305 -80 -251 -55 -414 -73 -707 -78 -359 -7 -547 12 -893 89 -49 11 -101 23 -115 28 -14 4 -45 13 -70 20 -95 27 -228 72 -300 102 -14 6 -36 15 -50 21 -55 22 -69 28 -165 73 -628 292 -1184 792 -1551 1395 -63 104 -190 349 -218 419 -10 25 -24 59 -31 75 -169 388 -265 883 -265 1365 1 637 159 1240 469 1780 64 112 168 270 179 270 4 0 1129 -1122 2499 -2492z"/>                    
                            </g>
                        </svg>
                    {§/if§}
                </label>
            {§/if§}
        `
    }

}

XOSwitchGroupElement.prototype.tag = "xo-switch-group";

customElements.define(XOSwitchGroupElement.prototype.tag, XOSwitchGroupElement);