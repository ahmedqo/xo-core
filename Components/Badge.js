const { $BadgeComponent } = require("../utils/_styles");
const XOElement = require("../utils/_element");
const XOColor = require('../utils/_color');

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
        let back = _background(_text(this.innerHTML));
        return /*html*/ `
                <main id="xo-container" styles="{'--delay': '{{loading || 1200}}ms'}">
                    <span id="xo-icon" styles="{backgroundImage: ${back}}">
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

XOBadgeElement.Create = function(icon, loading, ...children) {
    var el = new XOBadgeElement();
    if (icon) {
        icon.setAttribute("slot", "icon");
        el.appendChild(icon);
    }
    if (loading) el.setAttribute("loading", loading);
    for (var c in children) {
        el.appendChild(c);
    }
    return el;
}

customElements.define(XOBadgeElement.prototype.tag, XOBadgeElement);

/**
 * returns fisrt letter of each word
 * @param {String} txt 
 * @returns {String}
 */
function _text(txt) {
    let text = txt.trim().split(" ");
    return (text.length > 1) ? text[0][0] + text[1][0] : "";
}
/**
 * create an image with text
 * @param {strinig} txt 
 * @returns {String}
 */
function _background(txt) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 60;
    canvas.height = 60;
    context.fillStyle = _color();
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "bold 24px Assistant";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(txt.toUpperCase(), canvas.width / 2, 39);
    return `'url(${canvas.toDataURL("image/png")})'`;
}

/**
 * returns a random color form the colors list
 * @returns {String}
 */
function _color() {
    return XOColor.NAMES[Object.keys(XOColor.NAMES)[Math.floor(Math.random() * Object.keys(XOColor.NAMES).length)]];
}