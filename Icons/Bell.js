const ICON = require("./__base__");

window.XOBellIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M4869 8982 c-169 -44 -315 -194 -353 -362 -12 -49 -16 -123 -16 -257 l0 -188 -98 -23 c-367 -89 -729 -271 -1022 -516 -466 -388 -774 -943 -855 -1539 -9 -61 -20 -250 -25 -418 -11 -351 -29 -572 -65 -782 -55 -320 -134 -577 -255 -822 -120 -244 -224 -390 -453 -635 -139 -150 -187 -222 -211 -314 -43 -174 5 -347 134 -477 76 -77 163 -123 260 -139 45 -7 992 -10 3130 -8 2866 3 3068 4 3113 20 246 88 394 352 332 593 -27 104 -63 160 -203 312 -273 298 -381 455 -505 733 -98 220 -164 449 -213 735 -36 215 -53 417 -64 765 -10 335 -19 427 -55 603 -151 728 -625 1342 -1300 1684 -166 84 -366 160 -526 199 l-117 29 -4 215 c-4 186 -8 223 -26 272 -92 251 -347 387 -603 320z"></path><path d="M4000 1961 c0 -21 7 -78 15 -126 75 -427 402 -751 827 -820 117 -19 199 -19 316 0 365 59 667 315 788 668 24 69 54 231 54 290 l0 27 -1000 0 -1000 0 0 -39z"></path> 
      `;
   }

}

XOBellIconElement.prototype.tag = "xo-bell-icon";

customElements.define(XOBellIconElement.prototype.tag, XOBellIconElement);
    