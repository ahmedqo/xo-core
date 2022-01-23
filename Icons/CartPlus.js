const ICON = require("./__base__");

window.XOCartPlusIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M285 9421 c-28 -10 -62 -24 -75 -31 -45 -24 -132 -114 -156 -162 -50 -99 -54 -121 -54 -338 0 -178 3 -213 20 -265 36 -107 109 -194 209 -245 90 -48 117 -49 778 -50 583 0 622 -1 627 -17 3 -10 21 -97 41 -193 66 -329 124 -615 175 -860 28 -135 70 -344 95 -465 25 -121 67 -330 95 -465 28 -135 71 -344 95 -465 25 -121 67 -330 95 -465 28 -135 55 -265 59 -290 5 -25 25 -126 46 -225 65 -316 102 -495 140 -680 21 -99 41 -200 46 -225 4 -25 31 -155 59 -290 84 -406 122 -593 130 -635 8 -43 101 -495 125 -610 8 -38 15 -71 15 -72 0 -1 -24 -18 -53 -37 -221 -147 -375 -385 -422 -655 -38 -219 10 -466 128 -656 114 -184 298 -336 492 -407 132 -49 161 -53 345 -52 162 0 182 2 265 28 247 76 455 242 578 462 53 94 102 249 116 370 32 254 -59 542 -233 739 -20 22 -36 43 -36 48 0 4 812 7 1805 7 993 0 1805 -2 1805 -5 0 -3 -26 -38 -59 -78 -107 -132 -176 -284 -206 -456 -25 -146 -13 -305 35 -451 91 -279 315 -513 585 -612 130 -48 162 -53 340 -53 178 0 210 5 340 53 256 94 473 312 568 569 55 150 74 295 57 431 -24 192 -68 312 -173 465 -72 105 -172 200 -284 269 -46 28 -83 53 -83 54 0 2 23 104 51 226 44 196 50 234 47 309 -3 72 -9 97 -36 150 -50 103 -122 170 -224 212 l-53 22 -2380 5 -2380 5 -11 60 c-7 33 -29 141 -49 240 -21 99 -40 197 -42 218 l-5 37 2574 0 c2852 0 2624 -5 2733 64 105 68 165 165 199 321 9 44 26 116 36 160 18 75 124 539 140 615 4 19 16 69 25 110 9 41 21 91 25 110 4 19 20 89 35 155 15 66 31 136 35 155 4 19 16 69 25 110 9 41 21 91 25 110 15 69 121 537 140 615 10 44 30 130 44 190 13 61 39 173 57 250 17 77 35 156 39 175 4 19 20 89 35 155 15 66 31 136 35 155 4 19 16 69 25 110 9 41 21 91 25 110 4 19 20 87 35 150 48 206 45 283 -19 408 -28 53 -103 130 -158 160 -100 56 156 52 -3580 52 -2742 0 -3440 3 -3443 13 -5 11 -93 436 -135 652 -43 215 -92 308 -204 379 -108 69 -55 66 -1125 66 -907 -1 -969 -2 -1016 -19z m5778 -1938 c69 -22 147 -99 170 -167 15 -43 17 -99 17 -418 l0 -368 435 0 c419 0 436 -1 492 -21 73 -28 144 -97 166 -164 24 -68 24 -400 1 -467 -21 -64 -75 -122 -142 -155 l-57 -28 -447 -3 -448 -3 0 -368 c0 -405 -2 -423 -62 -495 -17 -20 -47 -47 -67 -60 -69 -42 -105 -48 -306 -44 -179 3 -193 4 -238 28 -57 29 -111 86 -138 144 -17 38 -19 71 -19 419 l0 377 -426 0 c-290 0 -440 4 -472 12 -86 21 -155 79 -193 163 -16 35 -19 68 -19 245 0 178 3 210 19 246 23 51 75 110 115 132 74 40 98 42 544 42 l432 0 0 378 c0 376 0 377 24 427 30 64 89 120 152 145 69 27 388 29 467 3z"></path> 
      `;
   }

}

XOCartPlusIconElement.prototype.tag = "xo-cart-plus-icon";

customElements.define(XOCartPlusIconElement.prototype.tag, XOCartPlusIconElement);
    