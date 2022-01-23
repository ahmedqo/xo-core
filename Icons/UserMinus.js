const ICON = require("./__base__");

window.XOUserMinusIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M3275 8988 c-93 -14 -267 -48 -300 -58 -394 -122 -680 -295 -935 -567 -718 -768 -718 -1958 0 -2725 314 -336 694 -536 1180 -620 100 -17 449 -17 560 0 677 107 1235 517 1520 1116 143 300 195 530 195 866 0 336 -52 566 -196 868 -328 691 -1044 1137 -1813 1131 -83 -1 -178 -6 -211 -11z"></path><path d="M6661 5731 c-61 -25 -122 -88 -144 -147 -24 -70 -26 -595 -1 -667 19 -58 81 -122 140 -148 45 -19 84 -19 1598 -19 l1552 0 52 26 c57 28 96 69 123 129 17 36 19 71 19 342 0 341 -3 356 -78 431 -77 77 48 72 -1676 71 -1461 0 -1543 -1 -1585 -18z"></path><path d="M1925 4493 c-16 -2 -77 -10 -135 -18 -831 -118 -1525 -750 -1729 -1575 -53 -214 -61 -321 -61 -791 0 -497 2 -517 73 -679 43 -99 161 -234 267 -307 70 -47 159 -84 260 -108 57 -13 414 -15 2900 -15 3042 0 2876 -2 3010 47 243 90 420 298 475 558 21 102 21 875 0 1042 -29 221 -70 375 -153 573 -254 604 -794 1064 -1432 1219 -165 40 -280 53 -520 58 -225 5 -237 4 -285 -17 -178 -78 -405 -148 -600 -184 -184 -34 -266 -41 -495 -41 -229 0 -311 7 -495 41 -196 37 -462 118 -597 184 -38 18 -59 20 -247 19 -113 -1 -219 -4 -236 -6z"></path> 
      `;
   }

}

XOUserMinusIconElement.prototype.tag = "xo-user-minus-icon";

customElements.define(XOUserMinusIconElement.prototype.tag, XOUserMinusIconElement);
    