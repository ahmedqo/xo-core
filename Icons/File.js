const ICON = require("./__base__");

window.XOFileIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M1615 9990 c-3 -5 -15 -10 -25 -10 -36 0 -146 -65 -200 -120 -55 -54 -120 -164 -120 -200 0 -10 -4 -22 -10 -25 -14 -9 -14 -9261 0 -9270 6 -3 10 -15 10 -25 0 -36 65 -146 120 -200 53 -54 136 -102 221 -129 47 -15 6765 -16 6774 -1 3 6 15 10 26 10 38 0 143 63 200 119 56 57 119 162 119 200 0 11 5 23 10 26 7 4 10 1100 10 3255 l0 3249 -1367 3 c-1090 3 -1376 6 -1408 17 -167 54 -273 160 -334 331 -14 40 -16 194 -19 1413 l-3 1367 -1999 0 c-1322 0 -2001 -3 -2005 -10z"></path><path d="M6250 8750 l0 -1250 1250 0 1250 0 0 98 c0 103 -23 189 -71 271 -30 50 -1993 2015 -2050 2051 -85 55 -172 80 -281 80 l-98 0 0 -1250z"></path> 
      `;
   }

}

XOFileIconElement.prototype.tag = "xo-file-icon";

customElements.define(XOFileIconElement.prototype.tag, XOFileIconElement);
    