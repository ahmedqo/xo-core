const ICON = require("./__base__");

window.XOChevronRightIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M2960 9974 c-170 -30 -219 -66 -572 -421 -379 -381 -403 -420 -403 -643 0 -112 4 -131 43 -220 14 -34 65 -113 87 -136 30 -33 1624 -1635 2507 -2520 560 -562 1018 -1027 1018 -1035 0 -7 -458 -473 -1018 -1034 -2129 -2135 -2493 -2502 -2533 -2555 -42 -56 -67 -104 -91 -175 -19 -59 -17 -257 5 -317 43 -122 61 -144 396 -479 288 -288 333 -329 391 -357 105 -50 137 -57 255 -57 126 1 201 22 295 84 64 42 4540 4513 4588 4582 53 78 82 165 89 264 7 117 -7 191 -57 292 l-40 81 -2249 2250 c-1237 1237 -2269 2265 -2293 2284 -47 39 -103 69 -170 93 -43 15 -201 28 -248 19z"></path> 
      `;
   }

}

XOChevronRightIconElement.prototype.tag = "xo-chevron-right-icon";

customElements.define(XOChevronRightIconElement.prototype.tag, XOChevronRightIconElement);
    