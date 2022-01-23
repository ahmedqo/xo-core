const ICON = require("./__base__");

window.XOChevronUpIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M4883 8011 c-23 -4 -80 -26 -127 -49 l-84 -42 -2250 -2249 c-1237 -1237 -2265 -2268 -2284 -2292 -81 -100 -112 -192 -112 -334 -1 -221 29 -267 421 -657 381 -379 420 -403 643 -403 112 0 131 4 220 43 34 14 113 65 136 87 29 26 1603 1593 2520 2507 562 560 1027 1018 1035 1018 7 0 473 -458 1034 -1018 2131 -2126 2502 -2493 2560 -2537 33 -24 94 -57 135 -72 66 -25 88 -28 190 -28 82 1 129 6 162 18 122 43 144 61 479 396 288 288 329 333 357 391 50 105 57 137 57 255 -1 126 -22 201 -84 295 -42 64 -4512 4539 -4582 4587 -86 60 -163 84 -279 88 -58 2 -124 0 -147 -4z"></path> 
      `;
   }

}

XOChevronUpIconElement.prototype.tag = "xo-chevron-up-icon";

customElements.define(XOChevronUpIconElement.prototype.tag, XOChevronUpIconElement);
    