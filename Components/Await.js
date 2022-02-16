const { $AwaitComponent } = require("../utils/_styles");
const XOElement = require("../utils/_element");

window.XOAwaitElement = class extends XOElement {

    static get styles() {
        return $AwaitComponent;
    }

    static get properties() {
        return {
            caller: { default: '', type: String },
            holder: { default: '', type: String }
        }
    }

    static onMounted() {
        this.holder = this.innerHTML;
        if (this.hasAttribute("caller")) {
            this.caller = this.getAttribute("caller");
            this.removeAttribute("caller");
        }
    }

    static onUpdated(name, value) {
        switch (name) {
            case "caller":
                this.innerHTML = this.holder;
                var func = new Function("return " + value).apply(this, {...window });
                typeof func === "object" ?
                    func.then(code => {
                        this.innerHTML = code;
                    }) : func().then(code => {
                        this.innerHTML = code;
                    });
                break;
        }
    }

    render() {
        return /*html*/ `
                <slot></slot>
            `;
    }
}

XOAwaitElement.prototype.tag = "xo-await";

customElements.define(XOAwaitElement.prototype.tag, XOAwaitElement);