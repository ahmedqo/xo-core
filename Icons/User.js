const ICON = require("./__base__");

window.XOUserIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M4775 8988 c-93 -14 -267 -48 -300 -58 -394 -122 -680 -295 -935 -567 -718 -768 -718 -1958 0 -2725 314 -336 694 -536 1180 -620 100 -17 449 -17 560 0 677 107 1235 517 1520 1116 143 300 195 530 195 866 0 336 -52 566 -196 868 -328 691 -1044 1137 -1813 1131 -83 -1 -178 -6 -211 -11z"></path><path d="M3425 4493 c-16 -2 -77 -10 -135 -18 -831 -118 -1525 -750 -1729 -1575 -53 -214 -61 -321 -61 -791 0 -497 2 -517 73 -679 43 -99 161 -234 267 -307 70 -47 159 -84 260 -108 57 -13 414 -15 2900 -15 2486 0 2843 2 2900 15 302 70 515 283 585 585 22 95 22 890 0 1052 -16 118 -40 245 -55 288 -5 14 -16 52 -26 85 -43 153 -146 369 -249 525 -293 445 -744 764 -1255 889 -165 40 -280 53 -520 58 -225 5 -237 4 -285 -17 -178 -78 -405 -148 -600 -184 -184 -34 -266 -41 -495 -41 -229 0 -311 7 -495 41 -193 36 -418 105 -598 183 -45 19 -66 21 -250 20 -111 -1 -215 -4 -232 -6z"></path> 
      `;
   }

}

XOUserIconElement.prototype.tag = "xo-user-icon";

customElements.define(XOUserIconElement.prototype.tag, XOUserIconElement);
    