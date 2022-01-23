const ICON = require("./__base__");

window.XOChevronLeftIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M6865 9974 c-49 -8 -147 -45 -190 -72 -49 -30 -126 -107 -2603 -2584 -2101 -2101 -2026 -2022 -2069 -2158 -25 -75 -24 -255 1 -325 49 -139 -50 -36 2342 -2429 1297 -1297 2287 -2279 2317 -2299 91 -60 166 -81 292 -82 118 0 150 7 255 57 57 27 103 69 391 357 337 336 351 353 396 478 22 61 25 270 4 323 -34 89 -77 165 -116 206 -26 29 -1608 1619 -2517 2530 -554 556 -1008 1017 -1008 1024 0 7 516 530 1147 1164 1909 1915 2381 2390 2401 2416 32 42 70 113 89 165 25 69 25 270 0 338 -45 125 -59 142 -396 478 -289 289 -333 329 -391 357 -36 17 -81 36 -100 42 -38 12 -197 21 -245 14z"></path> 
      `;
   }

}

XOChevronLeftIconElement.prototype.tag = "xo-chevron-left-icon";

customElements.define(XOChevronLeftIconElement.prototype.tag, XOChevronLeftIconElement);
    