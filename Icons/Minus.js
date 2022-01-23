const ICON = require("./__base__");

window.XOMinusIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M570 6055 c-71 -16 -168 -53 -202 -76 -14 -11 -29 -19 -33 -19 -7 0 -86 -62 -115 -90 -79 -75 -156 -202 -185 -305 -9 -33 -21 -68 -26 -77 -13 -25 -12 -965 1 -973 6 -3 10 -15 10 -25 0 -24 25 -99 56 -165 51 -111 164 -234 277 -299 50 -29 153 -69 220 -85 66 -15 8791 -16 8851 0 106 28 125 34 187 66 174 89 320 268 360 440 6 27 15 56 20 65 12 23 12 953 0 976 -5 9 -14 39 -20 66 -15 64 -72 177 -119 235 -20 25 -41 52 -47 59 -16 20 -127 107 -166 129 -52 30 -145 63 -219 79 -91 20 -8764 18 -8850 -1z"></path> 
      `;
   }

}

XOMinusIconElement.prototype.tag = "xo-minus-icon";

customElements.define(XOMinusIconElement.prototype.tag, XOMinusIconElement);
    