const ICON = require("./__base__");

window.XOUserShieldIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M3275 8988 c-93 -14 -267 -48 -300 -58 -314 -97 -547 -220 -763 -403 -703 -597 -909 -1573 -507 -2402 195 -403 517 -725 920 -921 188 -91 362 -146 595 -186 100 -17 449 -17 560 0 677 107 1235 517 1520 1116 143 300 195 530 195 866 0 336 -52 566 -196 868 -328 691 -1044 1137 -1813 1131 -83 -1 -178 -6 -211 -11z"></path><path d="M7625 5481 c-33 -10 -82 -27 -110 -38 -27 -12 -79 -33 -115 -46 -147 -57 -313 -122 -440 -172 -74 -29 -182 -71 -240 -94 -320 -124 -497 -193 -515 -201 -11 -5 -90 -36 -175 -69 -281 -108 -299 -116 -355 -156 -68 -49 -132 -137 -156 -217 -24 -75 -25 -217 -4 -448 47 -515 162 -938 371 -1365 91 -186 127 -251 219 -390 345 -525 799 -936 1300 -1176 304 -146 389 -145 693 2 485 235 970 672 1294 1164 380 578 582 1234 605 1961 5 179 4 194 -16 257 -32 94 -103 184 -191 238 -14 9 -79 37 -145 63 -66 26 -129 51 -140 56 -11 5 -62 25 -112 44 -89 34 -192 74 -333 129 -36 14 -130 51 -210 82 -167 65 -348 136 -435 170 -141 54 -307 119 -399 156 -183 73 -274 84 -391 50z m251 -800 c102 -40 259 -102 424 -166 52 -20 146 -57 208 -81 61 -24 163 -64 225 -88 182 -72 341 -134 427 -167 94 -36 89 -19 65 -217 -23 -186 -59 -356 -117 -552 -76 -257 -245 -592 -420 -834 -122 -168 -332 -387 -503 -525 -123 -99 -396 -271 -430 -271 -3 0 -5 662 -5 1470 0 1251 2 1470 14 1470 8 0 58 -18 112 -39z"></path><path d="M1925 4493 c-16 -2 -77 -10 -135 -18 -831 -118 -1525 -750 -1729 -1575 -53 -214 -61 -321 -61 -791 0 -498 2 -518 73 -679 28 -64 72 -125 141 -199 108 -113 225 -179 386 -216 57 -13 415 -15 2898 -15 2572 0 2840 1 2904 16 79 18 138 40 137 52 0 4 -34 34 -76 67 -107 84 -361 339 -475 475 -505 606 -827 1331 -942 2120 -37 256 -57 667 -35 739 6 22 -38 28 -213 30 -138 1 -162 -1 -205 -20 -180 -78 -405 -147 -598 -183 -184 -34 -266 -41 -495 -41 -229 0 -311 7 -495 41 -196 37 -462 118 -597 184 -38 18 -59 20 -247 19 -113 -1 -219 -4 -236 -6z"></path> 
      `;
   }

}

XOUserShieldIconElement.prototype.tag = "xo-user-shield-icon";

customElements.define(XOUserShieldIconElement.prototype.tag, XOUserShieldIconElement);
    