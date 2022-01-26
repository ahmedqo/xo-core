const XOHtml = require("./__engine__");

const objs = (self) => {
    const state = self.state(),
        all = { param: self.param, query: self.query };
    Object.getOwnPropertyNames(state).forEach(p => {
        all[p] = state[p];
    });
    return all;
}

class XOView {
    constructor(param, query) {
        document.title = this.props().title || '';
        this.param = param;
        this.query = query;
    }

    props() {
        return {}
    }

    state() {
        return {}
    }

    render() {
        return (async() => {
            return await XOHtml(objs(this))(`{§include ${this.props().template}§}`);
        })();
    }
}

XOView.prototype.name = 'XOView';

module.exports = XOView;