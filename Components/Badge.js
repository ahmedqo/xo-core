const { $BadgeComponent } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');
const XOColor = require('../utils/__color__');

window.XOBadgeElement = class extends XOElement {

    static get styles() {
        return $BadgeComponent;
    }

    static get attributes() {
        return {
            loading: String,
        }
    }

    render() {
        let back = __getBackground__(__getText__(this.innerHTML));
        return /*html*/ `
            <main id="xo-container" styles="{'--delay': '{{loading || 1500}}ms'}">
                <span id="xo-icon" styles="{background: ${back}}">
                    <slot name="icon"></slot>
                </span>
                <label id="xo-label">
                    <slot></slot>
                </label>
            </main>
        `;
    }

}

XOBadgeElement.prototype.tag = "xo-badge";

customElements.define(XOBadgeElement.prototype.tag, XOBadgeElement);

/**
 * @param {strinig} txt 
 * @returns first letter of each word 
 */
function __getText__(txt) {
    let text = txt.trim().split(" ");
    return (text.length > 1) ? text[0][0] + text[1][0] : "";
}
/**
 * 
 * @param {strinig} txt 
 * @returns create an image with text
 */
function __getBackground__(txt) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 60;
    canvas.height = 60;
    context.fillStyle = __getColor__();
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "bold 24px Assistant";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(txt.toUpperCase(), canvas.width / 2, 39);
    return `'url(${canvas.toDataURL("image/png")})'`;
}

/**
 * @returns a random color form the colors list
 */
function __getColor__() {
    return XOColor.NAMES[Object.keys(XOColor.NAMES)[Math.floor(Math.random() * Object.keys(XOColor.NAMES).length)]];
}