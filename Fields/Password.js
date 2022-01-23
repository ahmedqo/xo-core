const { $PasswordField } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

window.XOPasswordElement = class extends XOElement {

    static get styles() {
        return $PasswordField;
    }

    static get attributes() {
        return {
            readonly: Boolean,
            outlined: Boolean,
            flatted: Boolean,
            info: String,
            infotype: String,
            disabled: Boolean,
            pattern: String,
            label: String,
            maxsize: Number,
            minsize: Number,
            autofocus: Boolean,
            autocomplete: Boolean,
        }
    }

    static get properties() {
        return {
            value: { default: "", type: String },
            type: { default: "password", type: String },
        }
    }

    static get methods() {
        return {
            changeHandler() {
                if (this.$.text.val().trim() === "") this.value = "";
                else this.value = this.$.text.val().trim();
            },
            focusHandler() {
                if (this.disabled || this.readonly || !this.label) return;
                this.$.label.class().add("valid");
                this.$.container.class().add("focus");
            },
            blurHandler() {
                if (!this.label) return;
                if (this.$.text.val().trim()) {
                    this.$.label.class().add("valid");
                } else {
                    this.$.label.class().del("valid")
                }
                this.$.container.class().del("focus");
            },
            clickHandler() {
                if (this.disabled || this.readonly) return;
                if (this.type === "password") {
                    this.type = "text";
                } else {
                    this.type = "password";
                }
            },
            clear() {
                this.value = "";
                this.$.label.class().del("valid");
            },
            select() {
                this.$.text.select();
            },
            setRangeText(...a) {
                this.$.text.setRangeText(...a);
            },
            setSelectionRange(...a) {
                this.$.text.setSelectionRange(...a);
            }
        }
    }

    static onMounted() {
        if (this.hasAttribute("value")) {
            this.value = this.getAttribute("value");
            this.removeAttribute("value");
        }
    }

    static onUpdated(name) {
        switch (name) {
            case "value":
                this.makeEvent("change");
                break;
        }
    }

    get isEmpty() {
        switch (this.value) {
            case "":
            case null:
            case false:
            case this.value.trim() === "":
            case typeof(this.value) === "undefined":
                return true;
            default:
                return false;
        }
    }

    get isValid() {
        if (this.pattern) {
            let reg = new RegExp(this.pattern, "g"),
                v = this.$.text.val().trim();
            if (reg.test(v)) return true;
            else return false;
        }
        return true;
    }

    render() {
        return /*html*/ `
            <main id="xo-container">
                <slot name="prefix"></slot>
                <section>
                    <input id="xo-text" type="{{type}}"
                        (change)="{{>changeHandler()}}"
                        (focus)="{{>focusHandler()}}"
                        (blur)="{{>blurHandler()}}"
                        @{{if maxsize}} maxsize="{{maxsize}}" @{{/if}}
                        @{{if minsize}} minsize="{{minsize}}" @{{/if}}
                        @{{if value}} value="{{value}}" @{{/if}}
                        @{{if autocomplete}} autocomplete @{{/if}}
                        @{{if autofocus}} autofocus @{{/if}}
                        @{{if disabled}} disabled @{{/if}}
                        @{{if readonly}} readonly @{{/if}}
                        @{{if !label}} style="padding-top: 0px" @{{/if}}
                    />
                    @{{if label}}
                        <label for="xo-text" id="xo-label" @{{if value}} class="valid" @{{/if}}>{{label}}</label>
                    @{{/if}}
                </section>
                <button id="xo-btn" @{{if disabled}} disabled @{{/if}} @{{if readonly}} disabled @{{/if}} (click)="{{>clickHandler()}}">
                    @{{if type === "text"}}
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M453 8974 c-51 -25 -84 -58 -189 -194 -183 -236 -225 -294 -244 -329 -43 -86 -14 -210 67 -281 42 -37 96 -79 388 -305 417 -321 547 -422 905 -700 58 -45 172 -133 254 -196 82 -63 190 -146 240 -184 50 -39 143 -111 206 -160 63 -49 165 -127 225 -174 206 -159 240 -185 375 -290 209 -161 336 -260 449 -346 57 -44 147 -114 200 -155 53 -42 164 -127 246 -191 83 -63 242 -187 355 -274 113 -87 249 -193 303 -234 54 -42 135 -105 180 -140 45 -34 134 -103 197 -151 153 -118 282 -217 300 -233 19 -15 160 -124 301 -231 114 -88 379 -293 543 -421 57 -44 118 -91 136 -105 18 -14 69 -53 114 -88 44 -35 97 -75 116 -90 86 -65 483 -372 560 -432 210 -164 394 -307 418 -325 15 -10 115 -87 222 -170 176 -136 247 -191 415 -320 28 -22 67 -52 86 -67 19 -15 198 -154 399 -308 201 -155 392 -303 425 -329 33 -26 150 -117 260 -201 110 -85 242 -187 294 -228 123 -95 175 -122 243 -122 65 0 140 33 184 81 62 68 318 404 346 453 36 67 38 140 4 211 -32 67 -28 64 -401 351 -71 55 -202 156 -290 224 -88 68 -218 169 -290 224 -71 55 -159 123 -195 151 -61 49 -155 121 -473 365 -75 58 -136 110 -137 116 0 7 51 57 114 113 341 302 643 663 928 1106 78 120 220 382 240 443 44 126 32 276 -30 397 -217 419 -529 864 -826 1174 -181 188 -324 321 -516 482 -154 129 -409 306 -617 430 -115 68 -458 245 -518 267 -16 6 -75 30 -130 53 -226 95 -606 210 -855 259 -186 36 -204 39 -285 50 -363 49 -724 61 -1040 35 -115 -9 -266 -25 -335 -36 -69 -11 -150 -24 -180 -29 -30 -4 -75 -13 -100 -18 -25 -6 -79 -18 -120 -28 -165 -36 -525 -145 -625 -189 -16 -7 -61 -25 -100 -40 -98 -38 -137 -56 -322 -146 -89 -43 -167 -79 -173 -79 -7 0 -37 19 -68 43 -97 74 -259 199 -462 356 -107 83 -328 254 -490 378 -162 125 -344 266 -405 314 -368 287 -566 437 -610 461 -66 37 -139 37 -212 2z m4797 -1739 c465 -57 863 -229 1210 -524 513 -435 808 -1096 787 -1761 -9 -286 -50 -480 -164 -775 -20 -49 -39 -94 -44 -99 -10 -11 -22 -3 -194 130 -78 60 -205 159 -283 219 -96 74 -141 115 -138 125 61 201 80 336 73 515 -8 203 -43 362 -121 543 -232 538 -771 892 -1358 892 -132 0 -391 -40 -404 -62 -3 -5 1 -17 10 -27 8 -9 33 -55 55 -101 63 -137 86 -289 60 -410 -11 -51 -11 -51 -34 -36 -21 14 -267 202 -485 371 -43 33 -129 99 -191 148 -63 48 -127 98 -144 111 -16 13 -92 71 -168 129 l-137 106 22 21 c130 123 435 294 666 374 315 109 668 149 982 111z"/>
                                <path d="M1079 6033 c-185 -232 -429 -607 -522 -805 -57 -120 -70 -232 -42 -343 42 -162 337 -650 581 -960 154 -195 469 -529 639 -677 346 -300 687 -531 1072 -726 110 -56 395 -182 411 -182 4 0 19 -7 34 -14 32 -17 305 -110 385 -132 29 -8 79 -21 111 -30 110 -31 195 -49 427 -94 66 -12 240 -35 390 -52 157 -17 681 -17 840 0 193 20 427 56 540 82 22 5 82 18 132 30 151 34 147 27 57 98 -44 34 -155 121 -249 193 -93 72 -223 172 -288 222 -65 51 -135 104 -155 119 l-37 28 -100 -17 c-143 -24 -482 -24 -630 0 -591 95 -1077 381 -1446 852 -90 115 -156 221 -234 380 -120 244 -195 499 -221 757 l-6 68 -152 117 c-83 64 -195 151 -249 193 -54 41 -145 111 -202 155 -57 44 -136 105 -177 137 -151 117 -686 530 -760 588 -42 33 -82 62 -90 65 -8 3 -32 -18 -59 -52z"/>               
                            </g>
                        </svg>
                    @{{else}}
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M4740 7994 c-19 -2 -93 -9 -165 -15 -134 -11 -302 -32 -390 -49 -27 -5 -90 -17 -140 -26 -208 -39 -599 -151 -775 -222 -14 -5 -45 -18 -70 -28 -25 -9 -73 -30 -108 -46 -35 -15 -66 -28 -68 -28 -3 0 -78 -36 -167 -79 -643 -314 -1203 -758 -1695 -1345 -138 -164 -372 -507 -494 -721 -135 -237 -168 -323 -168 -432 0 -115 33 -202 163 -428 249 -436 516 -784 869 -1131 84 -84 176 -171 203 -195 343 -299 687 -532 1072 -727 113 -58 367 -170 423 -187 14 -4 30 -11 35 -15 12 -9 297 -105 372 -126 29 -8 79 -21 111 -30 88 -25 284 -68 377 -85 345 -59 511 -74 870 -74 312 0 404 6 670 41 376 50 795 160 1140 301 61 24 123 50 140 56 78 31 433 213 539 277 709 423 1286 986 1737 1697 90 142 230 398 251 461 44 126 32 276 -30 397 -217 419 -529 864 -826 1174 -373 389 -711 661 -1133 912 -115 68 -458 245 -518 267 -16 6 -75 29 -130 53 -392 164 -886 287 -1354 335 -136 14 -663 27 -741 18z m510 -759 c122 -15 155 -21 290 -52 283 -65 591 -215 839 -407 458 -356 754 -861 848 -1451 22 -137 25 -486 5 -620 -104 -691 -482 -1275 -1051 -1619 -272 -165 -535 -261 -859 -313 -150 -25 -495 -25 -647 0 -577 92 -1074 377 -1427 818 -204 254 -364 576 -431 869 -31 135 -37 168 -52 290 -70 580 108 1193 480 1655 301 374 711 642 1175 768 257 70 570 93 830 62z"/>
                                <path d="M4795 6480 c-198 -36 -200 -36 -171 -69 30 -33 95 -187 110 -263 33 -162 11 -331 -64 -484 -149 -300 -489 -466 -818 -398 -77 16 -230 80 -264 111 -11 10 -22 13 -27 7 -17 -19 -43 -184 -48 -314 -18 -436 131 -816 441 -1125 133 -133 227 -201 386 -280 123 -61 137 -66 255 -100 275 -78 600 -73 868 15 109 36 232 93 328 153 127 79 155 101 279 227 141 142 243 298 330 505 54 128 91 316 97 495 18 511 -234 999 -663 1286 -310 207 -701 295 -1039 234z"/>
                            </g>
                        </svg>
                    @{{/if}}
                </button>
                <slot name="suffix"></slot>
            </main>
            @{{if info && infotype}}
                <label id="xo-{{infotype}}">
                    <span>{{info}}</span>
                    @{{if infotype === 'success'}}
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M8681 8715 c-30 -8 -84 -28 -120 -46 -61 -30 -240 -206 -2434 -2398 -1302 -1301 -2370 -2368 -2373 -2371 -2 -2 -510 500 -1127 1116 -1024 1022 -1128 1123 -1187 1153 -121 59 -232 74 -344 45 -138 -35 -142 -38 -575 -468 -228 -227 -419 -425 -440 -457 -20 -30 -42 -75 -50 -100 -7 -24 -17 -52 -22 -61 -12 -24 -11 -205 1 -213 5 -3 10 -15 10 -26 0 -11 14 -50 31 -87 30 -63 123 -159 1713 -1750 1534 -1535 1687 -1685 1750 -1718 153 -81 304 -84 463 -9 52 25 378 348 2986 2954 1610 1609 2941 2947 2958 2973 105 162 105 374 -1 537 -16 25 -213 229 -437 452 -339 337 -418 411 -464 433 -112 54 -228 67 -338 41z"/>
                            </g>
                        </svg>
                    @{{else}}
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M4580 9825 c-330 -31 -728 -106 -975 -185 -233 -75 -402 -138 -570 -213 -73 -33 -338 -165 -390 -195 -412 -237 -724 -471 -1038 -781 -335 -329 -584 -655 -839 -1096 -75 -130 -204 -404 -273 -580 -26 -66 -51 -129 -55 -140 -5 -11 -22 -60 -39 -110 -256 -776 -311 -1641 -155 -2450 60 -312 161 -652 259 -880 7 -16 20 -48 29 -70 146 -357 404 -796 654 -1111 546 -689 1244 -1209 2037 -1519 66 -26 129 -51 140 -56 36 -15 231 -78 311 -99 496 -133 838 -180 1324 -180 452 0 857 52 1260 160 134 37 453 143 525 175 17 8 59 26 95 40 148 61 358 165 520 257 671 383 1256 939 1677 1593 432 672 683 1418 753 2240 13 155 13 595 0 750 -55 646 -205 1191 -485 1760 -260 529 -550 925 -990 1355 -97 95 -108 105 -230 209 -167 142 -468 361 -606 439 -18 11 -79 46 -134 77 -131 77 -542 275 -568 275 -7 0 -17 4 -23 9 -10 9 -97 41 -259 96 -366 122 -708 192 -1130 230 -194 18 -633 18 -825 0z m770 -1249 c381 -41 740 -130 1022 -255 26 -12 51 -21 54 -21 14 0 259 -123 352 -177 567 -326 1036 -797 1359 -1368 72 -127 203 -403 203 -429 0 -7 3 -16 7 -19 10 -11 73 -193 103 -297 7 -25 16 -56 20 -70 5 -14 17 -65 28 -115 78 -348 96 -535 89 -899 -7 -353 -44 -604 -135 -931 -50 -175 -155 -441 -246 -620 -80 -157 -215 -382 -246 -410 -21 -19 -41 1 -2515 2475 -1372 1372 -2495 2498 -2495 2502 0 20 249 172 425 261 412 208 785 317 1265 372 160 18 544 18 710 1z m-793 -4018 c1371 -1371 2493 -2497 2493 -2503 0 -10 -30 -31 -170 -121 -77 -49 -380 -206 -460 -238 -46 -18 -72 -29 -112 -45 -31 -13 -185 -67 -228 -80 -129 -39 -180 -52 -305 -80 -251 -55 -414 -73 -707 -78 -359 -7 -547 12 -893 89 -49 11 -101 23 -115 28 -14 4 -45 13 -70 20 -95 27 -228 72 -300 102 -14 6 -36 15 -50 21 -55 22 -69 28 -165 73 -628 292 -1184 792 -1551 1395 -63 104 -190 349 -218 419 -10 25 -24 59 -31 75 -169 388 -265 883 -265 1365 1 637 159 1240 469 1780 64 112 168 270 179 270 4 0 1129 -1122 2499 -2492z"/>                    
                            </g>
                        </svg>
                    @{{/if}}
                </label>
            @{{/if}}
        `;
    }

}

XOPasswordElement.prototype.tag = "xo-password";

customElements.define(XOPasswordElement.prototype.tag, XOPasswordElement);