const ICON = require("./__base__");

window.XOSortLeftIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M6908 9954 c-88 -19 -197 -66 -283 -122 -98 -63 -4292 -4252 -4362 -4356 -62 -92 -108 -201 -129 -305 -33 -166 -5 -380 68 -526 64 -126 129 -193 2231 -2291 1685 -1684 2128 -2120 2189 -2161 203 -135 453 -175 683 -108 335 97 566 367 605 705 8 67 10 1321 8 4285 l-3 4190 -22 80 c-31 110 -101 247 -166 326 -188 226 -531 345 -819 283z"></path> 
      `;
   }

}

XOSortLeftIconElement.prototype.tag = "xo-sort-left-icon";

customElements.define(XOSortLeftIconElement.prototype.tag, XOSortLeftIconElement);
    