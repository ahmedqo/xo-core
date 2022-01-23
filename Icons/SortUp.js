const ICON = require("./__base__");

window.XOSortUpIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M4888 8000 c-123 -22 -232 -67 -338 -141 -67 -46 -4295 -4276 -4337 -4339 -47 -69 -89 -158 -115 -240 -20 -65 -23 -95 -23 -225 1 -173 12 -229 79 -370 106 -223 299 -382 546 -447 l85 -23 4245 0 4245 0 85 23 c239 65 428 219 536 437 64 131 86 224 87 370 1 181 -40 319 -137 461 -33 49 -668 692 -2159 2186 -1162 1164 -2137 2134 -2167 2156 -73 54 -182 107 -272 133 -81 23 -279 34 -360 19z"></path> 
      `;
   }

}

XOSortUpIconElement.prototype.tag = "xo-sort-up-icon";

customElements.define(XOSortUpIconElement.prototype.tag, XOSortUpIconElement);
    