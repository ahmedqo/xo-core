const ICON = require("./__base__");

window.XOUserTimesIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M3275 8988 c-93 -14 -267 -48 -300 -58 -394 -122 -680 -295 -935 -567 -718 -768 -718 -1958 0 -2725 314 -336 694 -536 1180 -620 100 -17 449 -17 560 0 677 107 1235 517 1520 1116 143 300 195 530 195 866 0 336 -52 566 -196 868 -328 691 -1044 1137 -1813 1131 -83 -1 -178 -6 -211 -11z"></path><path d="M7520 6732 c-36 -13 -89 -60 -265 -237 -191 -190 -223 -227 -238 -270 -22 -63 -22 -107 0 -170 15 -44 59 -92 392 -427 206 -208 373 -380 370 -382 -2 -3 -167 -168 -366 -368 -387 -388 -413 -421 -413 -514 0 -98 18 -124 244 -352 141 -142 225 -219 255 -234 62 -30 129 -34 193 -12 48 16 86 51 430 393 l378 375 377 -375 c336 -333 384 -377 428 -392 63 -21 108 -22 171 -1 42 15 79 47 262 228 233 231 262 271 262 364 0 101 -13 117 -413 520 l-372 372 372 373 c401 402 413 417 413 519 0 93 -29 133 -262 364 -228 226 -254 244 -352 244 -93 0 -126 -26 -514 -413 -200 -199 -365 -364 -368 -366 -2 -3 -174 164 -382 370 -335 333 -383 377 -427 392 -61 21 -116 21 -175 -1z"></path><path d="M1925 4493 c-270 -33 -434 -73 -620 -150 -620 -256 -1083 -794 -1244 -1443 -53 -214 -61 -321 -61 -791 0 -497 2 -517 73 -679 43 -99 161 -234 267 -307 70 -47 159 -84 260 -108 57 -13 414 -15 2900 -15 3042 0 2876 -2 3010 47 243 90 420 298 475 558 21 102 21 875 0 1042 -29 221 -70 375 -153 573 -255 606 -786 1058 -1432 1219 -162 40 -279 53 -520 58 -225 5 -237 4 -285 -17 -178 -78 -405 -148 -600 -184 -184 -34 -266 -41 -495 -41 -229 0 -311 7 -495 41 -196 37 -462 118 -597 184 -38 18 -59 20 -247 19 -113 -1 -219 -4 -236 -6z"></path> 
      `;
   }

}

XOUserTimesIconElement.prototype.tag = "xo-user-times-icon";

customElements.define(XOUserTimesIconElement.prototype.tag, XOUserTimesIconElement);
    