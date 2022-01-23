const ICON = require("./__base__");

window.XOCalendarPlusIconElement = class extends ICON {

   static get icon() {
      return /*html*/`
         <path d="M2640 9978 c-53 -30 -97 -76 -120 -125 -19 -41 -20 -61 -20 -573 l0 -530 -507 0 c-527 0 -571 -3 -710 -45 -174 -52 -348 -175 -472 -334 -51 -65 -125 -218 -152 -312 -24 -83 -24 -88 -24 -555 l0 -471 30 -48 c22 -36 45 -57 84 -77 l53 -28 4212 2 4211 3 42 28 c23 16 54 47 70 70 l28 42 0 480 0 480 -27 89 c-89 288 -290 504 -575 617 -132 53 -210 59 -755 59 l-508 0 0 530 c0 521 0 531 -21 576 -26 55 -62 92 -118 122 -43 22 -46 22 -487 22 -431 0 -444 -1 -481 -21 -55 -30 -99 -76 -123 -126 -19 -41 -20 -61 -20 -573 l0 -530 -1250 0 -1250 0 0 530 c0 521 0 531 -21 576 -26 55 -62 92 -118 122 -43 22 -45 22 -489 21 -429 0 -448 -1 -482 -21z"></path><path d="M764 6226 c-58 -27 -120 -98 -129 -150 -3 -17 -4 -1219 -3 -2671 l3 -2640 28 -90 c30 -96 99 -234 151 -300 134 -174 331 -303 526 -345 30 -7 68 -16 84 -21 40 -12 7120 -12 7160 0 17 5 56 15 86 22 290 64 578 334 659 619 8 25 18 59 25 75 8 22 12 737 14 2685 3 2979 10 2705 -73 2778 -24 21 -61 44 -83 50 -30 9 -1043 12 -4218 11 l-4179 0 -51 -23z m4720 -1090 c50 -25 97 -72 122 -122 18 -37 19 -69 22 -651 l3 -613 603 0 c529 0 608 -2 642 -16 61 -26 101 -62 129 -117 l25 -51 0 -438 c0 -474 0 -471 -55 -544 -14 -18 -49 -44 -79 -58 l-55 -26 -605 0 -605 0 -3 -612 c-3 -689 1 -650 -80 -729 -70 -68 -81 -69 -548 -69 -290 0 -427 4 -451 12 -61 20 -114 64 -144 120 l-30 53 -3 612 -3 613 -605 0 -605 0 -55 27 c-58 28 -92 65 -118 127 -14 33 -16 98 -16 471 0 402 1 437 19 477 23 55 67 99 125 127 45 21 53 21 650 21 l605 0 3 613 3 612 31 55 c32 57 107 114 163 123 14 3 217 4 451 3 399 -1 427 -2 464 -20z"></path> 
      `;
   }

}

XOCalendarPlusIconElement.prototype.tag = "xo-calendar-plus-icon";

customElements.define(XOCalendarPlusIconElement.prototype.tag, XOCalendarPlusIconElement);
    