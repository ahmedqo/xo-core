const ICON = require("./__base__");

window.XOChevronDownIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M985 8013 c-16 -2 -49 -11 -72 -19 -113 -37 -141 -60 -474 -393 -288 -288 -329 -333 -357 -391 -50 -105 -57 -137 -57 -255 1 -126 22 -201 84 -295 42 -64 4513 -4540 4582 -4588 78 -53 165 -82 264 -89 117 -7 191 7 291 57 l82 40 2250 2249 c1237 1238 2265 2269 2285 2293 80 99 110 190 111 333 1 221 -29 267 -421 657 -381 379 -420 403 -643 403 -112 0 -131 -4 -220 -43 -34 -14 -113 -65 -136 -87 -29 -26 -1532 -1522 -2485 -2472 -581 -579 -1062 -1053 -1070 -1053 -7 0 -473 458 -1034 1018 -2135 2129 -2502 2493 -2555 2533 -55 41 -103 66 -170 89 -38 12 -206 21 -255 13z"></path> 
      `;
   }

}

XOChevronDownIconElement.prototype.tag = "xo-chevron-down-icon";

customElements.define(XOChevronDownIconElement.prototype.tag, XOChevronDownIconElement);
    