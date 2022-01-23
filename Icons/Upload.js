const ICON = require("./__base__");

window.XOUploadIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M4915 9992 c-6 -4 -28 -14 -50 -21 -22 -8 -58 -26 -80 -42 -22 -15 -722 -711 -1556 -1546 -1723 -1726 -1574 -1561 -1573 -1743 0 -89 4 -112 24 -155 50 -105 124 -173 233 -214 57 -21 62 -21 947 -21 l890 0 0 -1671 c0 -1188 3 -1684 11 -1713 47 -175 180 -308 355 -355 29 -8 300 -11 882 -11 911 0 891 -1 1002 55 69 35 160 126 195 195 58 114 55 17 55 1830 l0 1670 889 0 c610 0 899 3 922 11 115 37 201 108 250 206 32 64 34 74 33 173 0 185 152 17 -1572 1743 -835 835 -1535 1531 -1557 1546 -22 16 -58 34 -80 42 -22 7 -44 17 -49 21 -6 4 -44 8 -86 8 -42 0 -80 -4 -85 -8z"></path><path d="M315 3097 c-75 -28 -137 -70 -197 -134 -46 -50 -98 -146 -98 -183 0 -10 -4 -22 -10 -25 -7 -4 -10 -413 -10 -1195 0 -782 3 -1191 10 -1195 6 -3 10 -15 10 -25 0 -36 65 -146 120 -200 53 -54 136 -102 221 -129 47 -15 9265 -16 9274 -1 3 6 15 10 26 10 38 0 143 63 200 119 56 57 119 162 119 200 0 11 5 23 10 26 7 4 10 411 10 1188 l0 1182 -25 70 c-46 127 -124 214 -245 273 l-75 37 -1385 3 -1386 2 -12 -177 c-12 -171 -23 -236 -58 -333 -98 -277 -312 -513 -571 -631 -104 -47 -103 -47 -184 -68 -130 -34 -302 -41 -1058 -41 -871 0 -960 6 -1140 67 -315 107 -575 371 -680 693 -32 96 -49 202 -57 353 l-7 137 -1371 -1 -1371 0 -60 -22z m7001 -1792 c109 -36 207 -139 243 -254 33 -104 24 -197 -28 -298 -112 -220 -414 -272 -603 -104 -160 142 -172 389 -26 552 39 43 120 92 183 111 70 21 155 18 231 -7z m1250 0 c109 -36 207 -139 243 -254 33 -104 24 -197 -28 -298 -112 -220 -414 -272 -603 -104 -160 142 -172 389 -26 552 39 43 120 92 183 111 70 21 155 18 231 -7z"></path> 
      `;
   }

}

XOUploadIconElement.prototype.tag = "xo-upload-icon";

customElements.define(XOUploadIconElement.prototype.tag, XOUploadIconElement);
    