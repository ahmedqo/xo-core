const ICON = require("./__base__");

window.XOBurgerSodaIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M3290 8979 c-202 -58 -365 -205 -430 -390 -10 -30 -53 -191 -94 -359 -42 -168 -80 -321 -86 -340 -8 -30 -201 -806 -215 -867 l-5 -23 -1123 0 c-1234 0 -1172 3 -1249 -60 -20 -17 -48 -55 -62 -85 l-26 -54 0 -301 0 -301 26 -54 c26 -57 77 -105 138 -130 31 -13 352 -15 2588 -15 2449 0 2555 1 2593 19 60 27 101 66 129 123 l26 52 0 306 0 306 -26 52 c-14 29 -42 65 -62 82 -76 63 -25 60 -1147 60 -562 0 -1024 2 -1027 5 -2 3 65 284 151 625 l155 620 380 0 c347 0 385 2 421 19 60 27 101 66 129 123 25 50 26 58 26 232 0 154 -3 187 -19 221 -28 61 -67 102 -126 129 l-54 26 -473 -1 c-429 -1 -479 -3 -538 -20z"></path><path d="M6870 5980 c-330 -35 -588 -91 -865 -186 -458 -159 -871 -410 -1167 -710 -258 -261 -348 -425 -336 -607 15 -219 158 -402 355 -458 68 -19 114 -19 2414 -16 2231 2 2347 3 2396 20 241 83 386 370 313 616 -59 199 -347 518 -671 743 -341 238 -728 408 -1159 512 -403 97 -879 129 -1280 86z m461 -495 c211 -72 227 -359 27 -459 -133 -66 -294 1 -343 143 -67 196 120 383 316 316z m-1250 -250 c211 -72 227 -359 27 -459 -98 -49 -205 -29 -286 52 -95 95 -94 251 3 347 68 69 164 91 256 60z m2500 0 c211 -72 227 -359 27 -459 -98 -49 -205 -29 -286 52 -95 95 -94 251 3 347 68 69 164 91 256 60z"></path><path d="M600 5493 c0 -5 5 -53 11 -108 10 -100 29 -295 48 -500 6 -60 15 -150 21 -200 5 -49 17 -162 25 -250 21 -217 43 -441 55 -550 6 -49 14 -137 20 -195 5 -58 16 -172 25 -255 8 -82 19 -199 25 -260 5 -60 12 -128 15 -150 3 -22 10 -85 15 -140 5 -55 17 -170 25 -255 9 -85 22 -220 30 -300 8 -80 21 -215 30 -300 25 -246 33 -326 45 -465 20 -214 54 -306 148 -407 58 -62 128 -106 215 -135 l71 -23 1321 0 c1290 0 1321 1 1384 20 34 11 67 22 72 25 4 3 -16 52 -46 108 -97 184 -143 345 -152 540 -12 223 71 444 221 586 20 19 36 38 36 42 0 4 -19 31 -43 60 -48 60 -94 133 -120 194 -10 22 -22 48 -27 57 -6 10 -22 62 -36 115 -88 333 2 680 247 947 l51 56 -61 66 c-71 78 -119 148 -162 236 -17 35 -34 70 -38 78 -33 65 -71 265 -71 376 0 135 44 324 102 439 64 125 211 315 352 455 47 46 86 88 86 92 0 5 -886 8 -1970 8 -1084 0 -1970 -3 -1970 -7z"></path><path d="M4875 3481 c-98 -28 -156 -61 -226 -131 -195 -196 -198 -499 -5 -695 73 -74 131 -109 223 -135 67 -20 117 -20 2383 -20 2275 0 2316 0 2384 20 90 25 166 72 227 138 64 70 96 125 119 209 36 124 18 271 -46 381 -39 66 -142 165 -205 195 -125 61 43 57 -2484 56 -2153 0 -2314 -2 -2370 -18z"></path><path d="M4661 1983 c-59 -21 -124 -87 -144 -148 -53 -155 26 -418 175 -580 122 -132 239 -201 408 -240 57 -13 331 -15 2150 -15 2196 0 2130 -1 2245 41 299 111 504 393 505 695 0 119 -63 213 -169 249 -40 13 -331 15 -2585 14 -2275 0 -2546 -2 -2585 -16z"></path> 
      `;
   }

}

XOBurgerSodaIconElement.prototype.tag = "xo-burger-soda-icon";

customElements.define(XOBurgerSodaIconElement.prototype.tag, XOBurgerSodaIconElement);
    