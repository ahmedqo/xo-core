const ICON = require("./__base__");

window.XOFilePdfIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M1615 9990 c-3 -5 -15 -10 -25 -10 -36 0 -146 -65 -200 -120 -55 -54 -120 -164 -120 -200 0 -10 -4 -22 -10 -25 -14 -9 -14 -9261 0 -9270 6 -3 10 -15 10 -25 0 -36 65 -146 120 -200 53 -54 136 -102 221 -129 47 -15 6765 -16 6774 -1 3 6 15 10 26 10 38 0 143 63 200 119 56 57 119 162 119 200 0 11 5 23 10 26 7 4 10 1100 10 3255 l0 3249 -1367 3 c-1090 3 -1376 6 -1408 17 -167 54 -273 160 -334 331 -14 40 -16 194 -19 1413 l-3 1367 -1999 0 c-1322 0 -2001 -3 -2005 -10z m3245 -3755 c95 -25 174 -71 234 -136 67 -72 98 -137 134 -278 25 -97 27 -122 27 -306 0 -263 -22 -403 -131 -864 -16 -66 -13 -108 10 -157 7 -16 29 -63 47 -104 43 -96 121 -238 172 -315 126 -188 323 -383 513 -509 l71 -47 134 15 c556 62 955 36 1187 -77 157 -76 242 -226 242 -427 0 -239 -133 -423 -346 -479 -259 -68 -792 55 -1283 296 -134 66 -134 66 -185 55 -133 -28 -254 -55 -281 -62 -16 -5 -48 -13 -70 -19 -120 -32 -276 -78 -400 -118 -281 -91 -709 -234 -725 -243 -8 -5 -51 -68 -95 -141 -358 -600 -664 -941 -930 -1034 -130 -46 -206 -45 -363 4 -103 32 -240 141 -279 224 -38 79 -43 98 -43 170 0 93 30 181 93 277 158 237 474 492 921 741 91 51 144 88 156 106 43 71 350 674 350 687 0 3 39 88 130 281 29 63 62 135 100 220 12 28 28 64 36 80 7 17 47 108 88 203 l76 172 -40 161 c-126 511 -174 872 -151 1139 17 199 50 288 135 368 116 110 310 159 466 117z"></path><path d="M4741 5860 c-27 -126 -8 -543 34 -745 26 -123 35 -126 63 -17 33 124 44 226 44 402 0 213 -22 331 -75 388 -34 37 -54 29 -66 -28z"></path><path d="M4763 4048 c-5 -7 -24 -51 -42 -98 -18 -47 -38 -96 -43 -110 -6 -14 -14 -34 -18 -45 -7 -18 -15 -37 -54 -127 -8 -18 -40 -94 -71 -168 -63 -148 -217 -468 -263 -547 -16 -28 -33 -59 -36 -71 -6 -19 -4 -20 21 -13 44 13 186 71 225 92 10 5 22 9 28 9 5 0 33 11 62 24 211 95 561 214 771 261 42 10 79 21 82 25 3 4 -21 29 -53 56 -188 157 -387 389 -527 614 -72 117 -70 114 -82 98z"></path><path d="M6410 3141 c-64 -6 -64 -6 -35 -20 176 -80 425 -156 598 -182 96 -15 180 1 204 37 13 21 13 26 -6 52 -24 34 -91 65 -185 87 -127 29 -398 42 -576 26z"></path><path d="M3574 2386 c-6 -6 -68 -62 -137 -124 -148 -134 -279 -273 -373 -398 -71 -95 -131 -207 -113 -212 36 -13 255 200 397 387 130 170 285 409 226 347z"></path><path d="M6250 8750 l0 -1250 1250 0 1250 0 0 98 c0 106 -25 197 -76 277 -34 52 -1997 2015 -2049 2049 -80 51 -171 76 -277 76 l-98 0 0 -1250z"></path> 
      `;
   }

}

XOFilePdfIconElement.prototype.tag = "xo-file-pdf-icon";

customElements.define(XOFilePdfIconElement.prototype.tag, XOFilePdfIconElement);
    