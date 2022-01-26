const XOHtml = require("./__engine__");

const prop = {
    title: "",
    template: false,
}

const objs = (self) => {
    var all = {}
    Object.getOwnPropertyNames(self.constructor.state).forEach(p => {
        if (typeof self.constructor.state[p] === "function") all[p] = self.constructor.state[p].bind(self);
        else all[p] = self.constructor.state[p];
    });
    return all;
}

class XOView extends HTMLElement {
    constructor(param, query) {
        super();
        let props = Object.assign({}, prop, this.constructor.props);
        document.title = props.title;
        this.param = param;
        this.query = query;
        this.root = this.attachShadow({ mode: "closed" });
        this.root.innerHTML = `
            <style>:host{display:block}</style>
            <slot></slot>
        `;
        XOHtml(objs(this))(`{§include ${props.template}§}`).then(code => {
            this.innerHTML = code;
        });
    }

    static get props() {
        return {}
    }

    static get state() {
        return {}
    }
}

XOView.prototype.name = 'XOView';

module.exports = XOView;