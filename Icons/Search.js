const ICON = require("./__base__");

window.XOSearchIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M3775 9990 c-16 -4 -54 -8 -82 -9 -119 -3 -428 -56 -633 -108 -580 -150 -1078 -399 -1550 -777 -111 -89 -418 -384 -511 -491 -327 -377 -586 -818 -753 -1277 -66 -183 -144 -463 -171 -618 -3 -19 -11 -60 -16 -90 -11 -55 -19 -120 -41 -305 -15 -128 -15 -618 0 -755 40 -365 77 -544 183 -878 242 -767 757 -1491 1414 -1987 78 -59 312 -215 390 -260 28 -16 64 -37 80 -47 81 -47 344 -172 459 -218 120 -48 268 -99 376 -130 25 -7 64 -19 87 -26 40 -13 188 -47 278 -64 37 -7 111 -19 325 -52 137 -21 791 -17 945 6 66 10 149 22 185 27 36 5 83 13 105 18 22 5 65 14 95 21 394 86 789 239 1141 441 111 63 378 240 447 295 l32 27 0 -176 c0 -196 8 -252 52 -347 28 -61 99 -133 1047 -1083 559 -560 1039 -1033 1066 -1051 81 -54 158 -76 263 -76 50 0 94 5 97 10 3 6 15 10 25 10 10 0 47 14 82 32 53 26 112 81 376 342 172 171 328 334 347 361 53 77 85 176 85 264 0 82 -8 115 -53 211 -28 61 -99 134 -1046 1083 -559 560 -1037 1031 -1063 1048 -96 62 -143 72 -366 78 l-202 6 43 55 c100 127 265 389 356 565 115 221 241 537 297 742 71 264 92 367 136 678 18 125 18 788 0 905 -7 47 -18 117 -23 155 -11 75 -25 155 -39 220 -5 22 -14 65 -21 95 -70 322 -263 817 -419 1075 -17 28 -33 57 -37 65 -12 28 -205 315 -266 395 -268 354 -629 691 -1007 937 -212 138 -412 246 -650 351 -152 66 -478 172 -640 207 -30 6 -71 16 -90 20 -19 5 -51 12 -70 15 -19 3 -60 11 -90 16 -70 12 -191 28 -305 41 -115 12 -631 19 -670 8z m521 -1565 c136 -14 275 -36 344 -54 119 -32 282 -82 330 -103 14 -6 34 -14 45 -18 11 -4 81 -38 156 -74 569 -276 1029 -790 1245 -1393 152 -425 185 -904 94 -1354 -137 -669 -562 -1273 -1147 -1628 -98 -59 -364 -191 -386 -191 -7 0 -17 -3 -21 -7 -7 -7 -70 -28 -202 -68 -345 -103 -758 -123 -1154 -55 -118 20 -370 92 -422 121 -10 5 -22 9 -28 9 -10 0 -80 30 -180 78 -142 68 -348 199 -485 310 -97 79 -289 270 -371 372 -87 107 -205 289 -273 421 -91 179 -151 341 -212 569 -33 127 -69 426 -69 579 0 168 37 451 79 611 34 129 42 157 50 175 6 11 19 49 31 85 33 98 148 332 219 445 257 407 613 728 1030 927 69 34 135 64 146 68 11 4 31 12 45 18 28 13 170 60 215 73 325 89 622 116 921 84z"></path> 
      `;
   }

}

XOSearchIconElement.prototype.tag = "xo-search-icon";

customElements.define(XOSearchIconElement.prototype.tag, XOSearchIconElement);
    