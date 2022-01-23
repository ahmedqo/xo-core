const ICON = require("./__base__");

window.XOUserCogIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M3275 8988 c-93 -14 -267 -48 -300 -58 -394 -122 -680 -295 -935 -567 -718 -768 -718 -1958 0 -2725 104 -112 240 -228 360 -307 105 -70 313 -174 430 -216 93 -33 277 -79 390 -96 111 -18 448 -18 560 -1 676 107 1236 517 1519 1114 144 302 196 532 196 868 0 336 -52 566 -196 868 -328 691 -1044 1137 -1813 1131 -83 -1 -178 -6 -211 -11z"></path><path d="M7516 5838 c-111 -9 -286 -42 -317 -59 -11 -5 -29 -25 -39 -42 -18 -29 -20 -52 -20 -275 l0 -243 -52 -22 c-160 -65 -323 -159 -460 -263 -31 -24 -60 -44 -65 -44 -5 0 -51 25 -102 55 -51 30 -95 55 -96 55 -2 0 -52 29 -112 65 -160 96 -181 92 -309 -60 -162 -194 -308 -446 -397 -685 -52 -137 -57 -178 -28 -219 12 -16 100 -73 211 -137 105 -60 200 -117 210 -126 15 -14 16 -23 7 -65 -13 -62 -13 -483 0 -545 7 -34 7 -52 -1 -62 -6 -8 -99 -64 -206 -125 -107 -62 -205 -124 -217 -139 -32 -38 -29 -80 13 -192 19 -52 40 -108 46 -125 25 -69 145 -288 213 -390 95 -142 228 -300 266 -315 44 -19 91 -6 175 44 41 25 76 46 79 46 2 0 57 32 121 70 65 39 123 70 128 70 5 0 27 -15 50 -33 114 -93 315 -209 474 -274 l52 -22 0 -243 c0 -316 -1 -314 175 -348 269 -52 601 -52 870 1 175 34 175 34 175 354 l0 236 48 20 c79 34 255 121 297 148 22 14 81 56 132 93 50 37 94 68 97 68 3 0 100 -54 215 -120 244 -140 266 -145 334 -77 53 53 198 244 256 338 68 108 181 329 181 352 0 7 4 17 9 23 13 15 71 187 71 212 0 46 -32 80 -133 139 -325 190 -322 188 -320 214 1 13 7 80 13 149 13 127 8 315 -10 427 -7 43 -7 61 3 69 6 7 102 64 212 127 205 118 235 143 235 198 0 23 -44 160 -69 214 -5 11 -25 54 -43 95 -53 119 -107 216 -188 337 -86 130 -224 296 -258 312 -45 21 -85 12 -170 -39 -46 -28 -85 -50 -87 -50 -2 0 -44 -24 -92 -53 -48 -29 -104 -61 -124 -71 l-36 -19 -86 64 c-115 85 -302 192 -404 231 l-83 31 0 239 c0 324 0 324 -181 358 -206 38 -439 48 -663 28z m418 -1605 c258 -64 468 -269 546 -533 18 -61 22 -99 22 -205 0 -117 -3 -139 -30 -221 -80 -241 -254 -416 -496 -496 -83 -27 -102 -30 -226 -30 -123 0 -143 3 -226 30 -255 85 -442 284 -509 543 -22 86 -23 271 0 359 9 36 37 108 63 160 39 80 61 110 137 186 98 99 176 149 298 192 119 41 292 47 421 15z"></path><path d="M1925 4493 c-356 -44 -579 -113 -850 -261 -346 -190 -666 -523 -843 -877 -118 -236 -172 -409 -212 -674 -18 -118 -20 -184 -20 -572 0 -498 2 -518 73 -679 28 -64 72 -125 141 -199 108 -113 225 -179 386 -216 57 -13 414 -15 2900 -15 2995 0 2880 -1 2995 42 60 22 153 69 165 83 9 11 8 32 -4 91 -9 42 -16 115 -16 163 l0 86 -52 27 -52 28 -65 -38 c-148 -85 -236 -112 -361 -112 -223 1 -374 89 -571 331 -75 93 -207 284 -262 380 -55 96 -137 268 -181 382 -95 242 -114 370 -77 514 47 181 137 294 323 408 l83 51 3 60 c3 68 5 66 -83 114 -171 93 -280 230 -326 408 -33 129 -21 255 38 409 l20 51 -62 11 c-34 6 -132 11 -217 11 -137 0 -162 -3 -205 -21 -180 -78 -405 -147 -598 -183 -184 -34 -266 -41 -495 -41 -229 0 -311 7 -495 41 -196 37 -462 118 -597 184 -38 18 -59 20 -247 19 -113 -1 -219 -4 -236 -6z"></path> 
      `;
   }

}

XOUserCogIconElement.prototype.tag = "xo-user-cog-icon";

customElements.define(XOUserCogIconElement.prototype.tag, XOUserCogIconElement);
    