const { $LoaderComponent } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

var timer1, timer2;

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
        timer1 = setInterval(() => {
            var off = parseInt(window.getComputedStyle(this.$.circle[0]).strokeDashoffset);
            if (off < 400) {
                this.$.circle[0].css("stroke-dashoffset", off + 1);
            } else {
                this.$.circle[0].css("stroke-dashoffset", 0);
            }
        }, 20);
        timer2 = setInterval(() => {
            var off = parseInt(window.getComputedStyle(this.$.circle[1]).strokeDashoffset);
            if (off < 100) {
                this.$.circle[1].css("stroke-dashoffset", off + 1);
            } else {
                this.$.circle[1].css("stroke-dashoffset", 0);
            }
        }, 10);
    }

    static unMounted() {
        clearInterval(timer1);
        clearInterval(timer2);
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