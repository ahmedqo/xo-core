const ICON = require("./__base__");

window.XOOudentIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M248 9980 c-51 -19 -101 -48 -136 -78 -29 -25 -92 -131 -92 -154 0 -10 -4 -18 -10 -18 -7 0 -10 -153 -10 -438 l0 -438 30 -62 c52 -108 137 -181 240 -209 67 -18 9408 -18 9465 0 102 32 184 100 225 185 13 26 27 55 32 64 11 24 10 884 -1 906 -5 9 -18 37 -30 62 -40 84 -108 144 -204 179 l-58 21 -4702 -1 c-4487 -1 -4704 -2 -4749 -19z"></path><path d="M2395 7481 c-28 -9 -66 -27 -85 -38 -19 -12 -533 -521 -1142 -1130 -1071 -1073 -1148 -1154 -1148 -1208 0 -8 -4 -15 -10 -15 -6 0 -10 -37 -10 -90 0 -53 4 -90 10 -90 6 0 10 -8 10 -17 0 -10 13 -39 28 -66 35 -62 2221 -2250 2277 -2280 174 -93 383 -38 480 127 58 100 55 -54 55 2326 0 2322 2 2220 -45 2310 -76 146 -266 224 -420 171z"></path><path d="M4485 7126 c-80 -31 -136 -79 -168 -146 -22 -44 -22 -56 -25 -535 -2 -369 0 -500 9 -530 18 -56 65 -119 111 -150 88 -59 -82 -55 2759 -53 l2604 3 56 26 c62 29 112 77 135 129 9 19 20 43 25 52 5 10 9 230 9 506 l0 488 -25 52 c-40 84 -91 130 -175 159 -49 18 -5270 16 -5315 -1z"></path><path d="M4455 4256 c-62 -29 -117 -86 -144 -149 -20 -47 -21 -66 -21 -538 l0 -488 24 -53 c29 -65 85 -120 149 -147 l49 -21 2634 0 2633 0 53 24 c29 14 67 39 84 58 28 29 41 51 75 120 12 23 12 993 0 1016 -5 9 -17 34 -27 55 -25 50 -68 90 -130 121 l-52 26 -2638 -1 -2639 0 -50 -23z"></path><path d="M274 1416 c-67 -16 -132 -55 -177 -105 -39 -43 -77 -110 -77 -136 0 -8 -4 -15 -10 -15 -12 0 -14 -881 -2 -895 5 -6 16 -30 26 -55 29 -78 114 -157 208 -191 52 -19 123 -19 4758 -19 5047 0 4728 -3 4821 45 44 23 124 110 143 157 10 24 22 51 27 60 5 10 9 213 9 451 l0 433 -30 62 c-55 113 -137 182 -249 208 -80 19 -9369 19 -9447 0z"></path> 
      `;
   }

}

XOOudentIconElement.prototype.tag = "xo-oudent-icon";

customElements.define(XOOudentIconElement.prototype.tag, XOOudentIconElement);
    