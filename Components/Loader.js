const { $LoaderComponent } = require("../utils/_styles");
const XOElement = require("../utils/_element");

window.XOLoaderElement = class extends XOElement {

    static get styles() {
        return $LoaderComponent;
    }

    static get attributes() {
        return {
            theme: String
        }
    }

    static onMounted() {
        _run(this, 0);
        _run(this, 1);
    }

    render() {
        return /*html*/ `
            <main id="xo-container">
                <svg id="xo-svg" viewBox="0 0 20 20">
                    <circle id="xo-circle"></circle>
                    <circle id="xo-circle"></circle>
                </svg>
            </main>
		`;
    }

}

XOLoaderElement.prototype.tag = "xo-loader";

customElements.define(XOLoaderElement.prototype.tag, XOLoaderElement);

/**
 * run the function every interval
 * @param {HTMLElement} self 
 * @param {Number} i 
 */
function _run(self, i) {
    var time = i ? 15 : 0;
    setTimeout(() => {
        var off = parseInt(window.getComputedStyle(self.$.circle[i]).strokeDashoffset);
        if (off < 400) self.$.circle[i].css("stroke-dashoffset", off + 1);
        else self.$.circle[i].css("stroke-dashoffset", 0);
        requestAnimationFrame(function() {
            _run(self, i);
        })
    }, time);
}