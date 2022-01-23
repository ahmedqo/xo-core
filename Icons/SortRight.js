const ICON = require("./__base__");

window.XOSortRightIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M2755 9955 c-326 -72 -565 -296 -648 -609 l-22 -81 0 -4250 0 -4250 23 -85 c42 -160 114 -282 228 -390 84 -79 157 -128 244 -165 213 -91 429 -96 640 -14 172 66 73 -29 2366 2264 1972 1972 2134 2136 2177 2210 175 303 153 663 -59 935 -77 99 -4254 4263 -4317 4304 -91 59 -215 113 -299 130 -92 19 -250 20 -333 1z"></path> 
      `;
   }

}

XOSortRightIconElement.prototype.tag = "xo-sort-right-icon";

customElements.define(XOSortRightIconElement.prototype.tag, XOSortRightIconElement);
    