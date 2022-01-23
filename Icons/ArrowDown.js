const ICON = require("./__base__");

window.XOArrowDownIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M4535 9990 c-3 -5 -16 -10 -27 -10 -12 0 -55 -16 -97 -36 -92 -45 -201 -150 -244 -236 -61 -124 -57 133 -57 -3403 0 -1877 -4 -3236 -9 -3239 -5 -3 -28 16 -51 42 -47 52 -148 160 -314 332 -61 64 -149 156 -196 205 -94 99 -434 457 -575 605 -49 52 -142 148 -205 214 -63 67 -160 168 -215 226 -55 57 -145 152 -201 210 -55 58 -139 145 -185 195 -46 49 -136 143 -200 210 -64 66 -158 165 -210 220 -247 262 -292 300 -411 347 -43 17 -77 21 -178 22 -131 1 -146 -2 -250 -53 -61 -29 -118 -82 -438 -401 -203 -203 -264 -274 -299 -350 -78 -165 -49 -393 66 -540 29 -36 4181 -4191 4397 -4400 61 -59 183 -130 223 -130 11 0 23 -5 26 -10 8 -13 222 -13 230 0 3 5 16 10 27 10 12 0 55 16 97 36 75 36 94 54 2302 2263 1527 1526 2235 2241 2255 2275 54 96 74 168 74 274 0 108 -18 182 -66 271 -21 38 -111 135 -309 335 -312 313 -347 344 -428 382 -145 66 -306 63 -455 -8 -88 -42 -129 -78 -337 -298 -54 -58 -151 -159 -214 -225 -64 -67 -154 -161 -200 -210 -46 -50 -130 -137 -185 -195 -56 -58 -139 -146 -186 -195 -47 -50 -175 -184 -286 -300 -110 -115 -238 -250 -285 -300 -46 -49 -142 -150 -214 -224 -71 -75 -170 -179 -220 -231 -49 -52 -140 -147 -200 -210 -135 -140 -265 -277 -330 -348 -35 -37 -51 -49 -57 -40 -4 7 -8 1467 -8 3243 0 3551 5 3272 -61 3403 -38 75 -144 179 -221 218 -127 64 -120 63 -615 64 -291 0 -454 -4 -458 -10z"></path> 
      `;
   }

}

XOArrowDownIconElement.prototype.tag = "xo-arrow-down-icon";

customElements.define(XOArrowDownIconElement.prototype.tag, XOArrowDownIconElement);
    