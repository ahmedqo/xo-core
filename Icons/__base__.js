const { $IconComponent } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

module.exports = class extends XOElement {

    static get styles() {
        return $IconComponent;
    }

    static get attributes() {
        return {
            color: String,
            size: String,
        }
    }

    render() {
        var size = !this.size ? NaN : ((/\d+[px]|[em]|[rem]|[%]/g.test(this.size)) ? this.size : this.size.match(/\d/g).join("") + "px");
        return /*html*/ `
            <main id="xo-container" ${size ? 'styles="{width:\'' + size + '\',height:\'' + size + '\'}"' : ''}>
                <svg id="xo-icon" viewBox="0 0 1000.000000 1000.000000" {§if color§} styles="{fill:'{{color}}'}" {§/if§}>
                    <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                        ${this.constructor.icon}
                    </g>
                </svg>
            </main>
        `;
    }

}