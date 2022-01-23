const ICON = require("./__base__");

window.XOWalletIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M1026 9354 c-206 -37 -414 -135 -571 -268 -107 -91 -183 -175 -248 -274 -98 -153 -151 -284 -189 -472 -17 -80 -24 -6563 -8 -6640 56 -267 117 -411 246 -580 180 -233 419 -390 706 -462 l93 -23 4065 0 c3402 0 4073 2 4115 14 152 41 279 98 370 166 68 50 104 83 162 147 112 126 175 253 222 451 14 60 16 5244 2 5291 -6 17 -19 67 -31 110 -77 286 -318 529 -624 631 -176 58 91 55 -4033 55 l-3792 0 -58 22 c-39 14 -74 38 -109 72 -164 165 -105 425 118 514 40 16 273 17 3873 22 3669 5 3831 6 3863 23 51 28 110 85 140 136 26 44 27 52 27 181 0 109 -5 150 -22 212 -92 320 -326 556 -653 659 l-75 24 -3755 2 c-3219 1 -3766 -1 -3834 -13z m7255 -4688 c367 -99 564 -489 423 -836 -49 -122 -157 -247 -265 -308 -108 -61 -170 -76 -314 -76 -143 -1 -201 13 -315 77 -54 29 -210 177 -210 198 0 6 -8 23 -18 37 -46 66 -82 206 -82 312 1 132 52 272 136 376 58 71 56 69 124 120 66 49 131 80 208 99 31 7 66 16 77 19 35 9 178 -2 236 -18z"></path> 
      `;
   }

}

XOWalletIconElement.prototype.tag = "xo-wallet-icon";

customElements.define(XOWalletIconElement.prototype.tag, XOWalletIconElement);
    