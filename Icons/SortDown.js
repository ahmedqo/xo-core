const ICON = require("./__base__");

window.XOSortDownIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M733 8035 c-273 -50 -489 -215 -609 -468 -54 -115 -76 -214 -77 -347 -1 -179 39 -321 130 -457 36 -54 569 -593 2167 -2193 1166 -1167 2143 -2139 2170 -2160 68 -50 174 -103 266 -132 65 -20 96 -23 225 -23 116 0 163 4 210 19 97 29 175 65 245 111 88 59 4310 4285 4364 4367 92 143 126 253 133 428 6 154 -16 260 -81 395 -77 158 -176 267 -319 355 -78 47 -117 64 -216 93 l-76 22 -4230 1 c-3442 2 -4243 0 -4302 -11z"></path> 
      `;
   }

}

XOSortDownIconElement.prototype.tag = "xo-sort-down-icon";

customElements.define(XOSortDownIconElement.prototype.tag, XOSortDownIconElement);
    