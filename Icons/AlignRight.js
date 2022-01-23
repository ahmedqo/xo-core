const ICON = require("./__base__");

window.XOAlignRightIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M3775 9986 c-95 -37 -161 -103 -188 -188 -15 -48 -17 -108 -17 -513 0 -518 1 -530 73 -611 40 -45 74 -68 137 -91 28 -10 627 -13 3005 -13 2648 0 2975 2 3014 16 82 28 137 77 177 158 l24 50 0 491 0 491 -24 50 c-40 81 -89 126 -167 154 -53 20 -97 20 -3029 19 -2229 -1 -2983 -4 -3005 -13z"></path><path d="M260 7128 c-14 -6 -42 -17 -62 -26 -51 -20 -132 -103 -158 -160 -12 -26 -26 -55 -31 -64 -13 -25 -12 -898 1 -898 6 0 10 -8 10 -17 0 -27 54 -114 92 -150 46 -43 113 -78 176 -92 84 -18 9357 -15 9433 3 112 26 194 95 249 208 l30 62 0 433 c0 238 -4 441 -8 451 -5 9 -19 38 -32 65 -25 51 -98 130 -141 153 -91 47 220 44 -4824 43 -3252 0 -4718 -4 -4735 -11z"></path><path d="M3765 4268 c-89 -32 -165 -119 -185 -211 -8 -36 -10 -200 -8 -517 3 -461 3 -465 26 -515 26 -56 82 -113 139 -141 37 -19 113 -19 3040 -22 l3002 -2 53 24 c29 14 67 39 84 58 28 29 41 51 75 120 12 23 12 993 0 1016 -5 9 -17 34 -27 55 -25 50 -68 90 -130 121 l-52 26 -2993 -1 c-2098 0 -3003 -4 -3024 -11z"></path><path d="M274 1416 c-67 -16 -132 -55 -177 -105 -39 -43 -77 -110 -77 -136 0 -8 -4 -15 -10 -15 -12 0 -14 -881 -2 -895 5 -6 16 -30 26 -55 29 -78 114 -157 208 -191 52 -19 123 -19 4758 -19 5047 0 4728 -3 4821 45 44 23 124 110 143 157 10 24 22 51 27 60 5 10 9 213 9 451 l0 433 -30 62 c-55 113 -137 182 -249 208 -80 19 -9369 19 -9447 0z"></path> 
      `;
   }

}

XOAlignRightIconElement.prototype.tag = "xo-align-right-icon";

customElements.define(XOAlignRightIconElement.prototype.tag, XOAlignRightIconElement);
    