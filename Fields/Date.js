const { $DateField } = require('../utils/__sass__');
const XOElement = require('../utils/__element__');

const DATE = new Date(),
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ],
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

window.XODateElement = class extends XOElement {

    static get styles() {
        return $DateField;
    }

    static get attributes() {
        return {
            readonly: Boolean,
            outlined: Boolean,
            flatted: Boolean,
            info: String,
            infotype: String,
            disabled: Boolean,
            label: String,
            trigger: String,
        }
    }

    static get properties() {
        return {
            _expand: { default: false, type: Boolean },
            date: { default: null, type: Date },
            day: { default: NaN, type: Number },
            year: { default: NaN, type: Number },
            month: { default: NaN, type: Number },
            strDay: { default: "", type: String },
            value: { default: "", type: String },
            strMonth: { default: "", type: String },
        }
    }

    static get methods() {
        return {
            clickHandler() {
                if (this.disabled || this.readonly) return;
                if (!this._expand) {
                    if ((window.innerWidth - this.offsetLeft) < this.$.items.clientWidth) {
                        this.$.items.css({ left: "unset", right: "0", transform: "unset" });
                    } else if (this.offsetLeft < ((this.$.items.offsetWidth - this.offsetWidth) / 2)) {
                        this.$.items.css({ left: "0", transform: "unset" });
                    }

                    if (window.innerWidth < this.$.items.clientWidth) {
                        this.$.items.css("width", window.innerWidth - 50 + "px");
                    }

                    setTimeout(() => {
                        if ((window.innerHeight - (this.offsetTop + this.clientHeight)) < this.$.items.clientHeight) {
                            this.$.items.css("--slide", -this.$.items.clientHeight + "px");
                        }
                    }, 150);
                }
                this._expand = !this._expand;
                __cal__(this, this.day, this.month - 1, this.year);
            },
            blurHandler(e) {
                if (e.relatedTarget !== this.$.search) {
                    if (this.label) {
                        if (this.$.text.val().trim()) {
                            this.$.label.class().add("valid");
                        } else {
                            this.$.label.class().del("valid")
                        }
                    }
                }
            },
            dayHandler(e) {
                if (e.path[0].id === "xo-day") {
                    this.value = e.path[0].getAttribute("date");
                }
            },
            ctrHandler(o) {
                switch (o) {
                    case 0:
                        DATE.setFullYear(DATE.getFullYear() - 1);
                        break;
                    case 1:
                        DATE.setMonth(DATE.getMonth() - 1);
                        break;
                    case 2:
                        DATE.setMonth(DATE.getMonth() + 1);
                        break;
                    case 3:
                        DATE.setFullYear(DATE.getFullYear() + 1);
                        break;
                }
                setTimeout(() => {
                    if ((window.innerHeight - (this.offsetTop + this.clientHeight)) < this.$.items.clientHeight) {
                        this.$.items.css("--slide", -this.$.items.clientHeight + "px");
                    }
                }, 100);
                __cal__(this, this.day, this.month - 1, this.year);
            },
            clear() {
                this.value = "";
                this.text = "";
                this.item = null;
                this.index = NaN;
                this.$.text.val("");
                this.$.label.class().del("valid");
            }
        }
    }

    static onMounted() {
        if (this.hasAttribute("value")) {
            this.value = (new Date(this.getAttribute("value"))).toISOString().split('T')[0];
            this.removeAttribute("value");
        }
        document.addEventListener("click", e => {
            __click__(this, e);
        });
    }

    static onRemoved() {
        document.removeEventListener("click", e => {
            __click__(this, e);
        });
    }

    static onUpdated(name, value) {
        switch (name) {
            case "value":
                this.date = new Date(value);
                this.day = this.date.getDate();
                this.strDay = days[this.date.getDay()];
                this.month = this.date.getMonth() + 1;
                this.strMonth = months[this.date.getMonth()];
                this.year = this.date.getFullYear();
                this._expand = false;
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

    render() {
        return /*html*/ `
            <main id="xo-container" {§if _expand§} class="focus" {§/if§}>
                <slot name="prefix"></slot>
                <section>
                    <input id="xo-text" type="text" readonly
                        (blur)="{{>blurHandler('event')}}"
                        (click)="{{>clickHandler()}}"
                        {§if disabled§} disabled {§/if§}
                        {§if value§} value="{{value}}" {§/if§}
                        {§if !label§} style="padding-top: 0px" {§/if§}
                    />
                    {§if label§}
                        <label for="xo-text" id="xo-label" {§if value§} class="valid" {§/if§}>{{label}}</label>
                    {§/if§}
                </section>
                {§if trigger !== 'hidden'§}
                    <button id="xo-btn" {§if disabled || readonly§} disabled {§/if§} {§if _expand§} active {§/if§} (click)="{{>clickHandler()}}">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M2686 9970 c-76 -38 -118 -79 -153 -149 l-28 -56 -3 -507 -3 -508 -507 0 c-526 0 -570 -3 -709 -45 -177 -53 -353 -179 -475 -339 -49 -64 -122 -212 -150 -306 -22 -73 -22 -88 -26 -627 l-3 -553 4371 0 4371 0 -4 558 -3 557 -27 84 c-91 286 -291 500 -574 612 -132 53 -210 59 -755 59 l-508 0 0 495 c0 472 -1 497 -20 549 -29 76 -87 137 -164 175 l-65 31 -376 0 -376 0 -64 -31 c-72 -35 -123 -85 -157 -156 -23 -48 -23 -49 -26 -555 l-3 -508 -1249 0 -1250 0 0 495 c0 472 -1 497 -20 549 -29 76 -87 137 -164 175 l-65 31 -378 0 -378 -1 -59 -29z"/>
                                <path d="M632 3508 l3 -2743 28 -90 c30 -96 99 -234 151 -300 134 -174 331 -303 526 -345 30 -7 68 -16 84 -21 40 -12 7120 -12 7160 0 17 5 56 15 86 22 290 64 578 334 659 619 8 25 18 59 25 75 8 22 12 760 14 2778 l2 2747 -4370 0 -4370 0 2 -2742z m2330 1480 c56 -17 123 -79 145 -136 16 -43 18 -85 18 -477 0 -486 -1 -492 -75 -559 -74 -67 -65 -66 -552 -66 l-439 0 -48 25 c-53 26 -95 70 -120 125 -14 30 -16 92 -16 460 0 234 3 441 8 461 12 57 72 128 131 155 51 23 53 23 480 23 301 1 440 -2 468 -11z m2500 0 c56 -17 123 -79 145 -136 16 -43 18 -85 18 -477 0 -486 -1 -492 -75 -559 -74 -67 -65 -66 -552 -66 l-439 0 -48 25 c-53 26 -95 70 -120 125 -14 30 -16 92 -16 460 0 234 3 441 8 461 12 57 72 128 131 155 51 23 53 23 480 23 301 1 440 -2 468 -11z m2500 0 c56 -17 123 -79 145 -136 16 -43 18 -85 18 -477 0 -486 -1 -492 -75 -559 -74 -67 -65 -66 -552 -66 l-439 0 -48 25 c-53 26 -95 70 -120 125 -14 30 -16 92 -16 460 0 234 3 441 8 461 12 57 72 128 131 155 51 23 53 23 480 23 301 1 440 -2 468 -11z m-5000 -2500 c56 -17 123 -79 145 -136 16 -43 18 -85 18 -477 0 -486 -1 -492 -75 -559 -74 -67 -65 -66 -552 -66 l-439 0 -48 25 c-53 26 -95 70 -120 125 -14 30 -16 92 -16 460 0 234 3 441 8 461 12 57 72 128 131 155 51 23 53 23 480 23 301 1 440 -2 468 -11z m2500 0 c56 -17 123 -79 145 -136 16 -43 18 -85 18 -477 0 -486 -1 -492 -75 -559 -74 -67 -65 -66 -552 -66 l-439 0 -48 25 c-53 26 -95 70 -120 125 -14 30 -16 92 -16 460 0 234 3 441 8 461 12 57 72 128 131 155 51 23 53 23 480 23 301 1 440 -2 468 -11z m2500 0 c56 -17 123 -79 145 -136 16 -43 18 -85 18 -477 0 -486 -1 -492 -75 -559 -74 -67 -65 -66 -552 -66 l-439 0 -48 25 c-53 26 -95 70 -120 125 -14 30 -16 92 -16 460 0 234 3 441 8 461 12 57 72 128 131 155 51 23 53 23 480 23 301 1 440 -2 468 -11z"/>
                            </g>
                        </svg>
                    </button>
                {§/if§}
                <slot name="suffix"></slot>
                <div id="xo-items" {§if _expand§} expand {§/if§} (click)="{{>dayHandler('event')}}">
                    <header>
                        <button id="xo-controll" {§if !_expand§} disabled {§/if§} (click)="{{>ctrHandler(0)}}">
                            <svg viewBox="0 0 1000.000000 1000.000000">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M4671 9735 c-35 -8 -93 -28 -130 -45 -63 -29 -175 -140 -2222 -2188 -1349 -1349 -2170 -2178 -2193 -2212 -103 -159 -112 -363 -24 -534 27 -53 310 -339 2202 -2233 2147 -2148 2172 -2173 2246 -2207 130 -62 252 -70 388 -28 111 35 173 87 474 390 308 311 327 336 364 482 31 122 4 279 -68 394 -18 30 -321 343 -733 756 -385 388 -1146 1152 -1689 1698 l-988 994 133 136 c74 75 827 833 1674 1685 847 852 1559 1574 1582 1605 86 116 121 279 89 416 -34 143 -57 173 -399 512 -290 288 -317 312 -382 342 -68 30 -169 53 -230 51 -16 0 -59 -7 -94 -14z"/>
                                    <path d="M8843 9735 c-34 -8 -91 -26 -125 -41 -60 -26 -173 -137 -2221 -2183 -1319 -1318 -2173 -2178 -2197 -2214 -69 -102 -84 -155 -84 -292 0 -136 16 -195 78 -287 19 -30 1002 -1019 2198 -2214 2064 -2061 2166 -2162 2231 -2193 143 -67 311 -65 457 5 70 34 95 57 369 333 161 163 306 315 323 338 44 65 78 166 84 252 8 96 -13 188 -64 285 -34 66 -167 202 -1727 1770 -929 934 -1690 1704 -1690 1711 0 7 761 777 1691 1711 1678 1686 1691 1700 1731 1781 78 155 80 309 7 463 -33 70 -54 94 -347 387 -344 343 -362 357 -510 387 -90 19 -121 19 -204 1z"/>
                                </g>
                            </svg>  
                        </button>
                        <button id="xo-controll" {§if !_expand§} disabled {§/if§} (click)="{{>ctrHandler(1)}}">
                            <svg viewBox="0 0 1000.000000 1000.000000">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M6865 9974 c-49 -8 -147 -45 -190 -72 -49 -30 -126 -107 -2603 -2584 -2101 -2101 -2026 -2022 -2069 -2158 -25 -75 -24 -255 1 -325 49 -139 -50 -36 2342 -2429 1297 -1297 2287 -2279 2317 -2299 91 -60 166 -81 292 -82 118 0 150 7 255 57 57 27 103 69 391 357 337 336 351 353 396 478 22 61 25 270 4 323 -34 89 -77 165 -116 206 -26 29 -1608 1619 -2517 2530 -554 556 -1008 1017 -1008 1024 0 7 516 530 1147 1164 1909 1915 2381 2390 2401 2416 32 42 70 113 89 165 25 69 25 270 0 338 -45 125 -59 142 -396 478 -289 289 -333 329 -391 357 -36 17 -81 36 -100 42 -38 12 -197 21 -245 14z"/>
                                </g>
                            </svg>
                        </button>
                        <h1 id="xo-title">${months[DATE.getMonth()] + ", " + DATE.getFullYear()}</h1>
                        <button id="xo-controll" {§if !_expand§} disabled {§/if§} (click)="{{>ctrHandler(2)}}">
                            <svg viewBox="0 0 1000.000000 1000.000000">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path
                                        d="M2960 9974 c-170 -30 -219 -66 -572 -421 -379 -381 -403 -420 -403 -643 0 -112 4 -131 43 -220 14 -34 65 -113 87 -136 30 -33 1624 -1635 2507 -2520 560 -562 1018 -1027 1018 -1035 0 -7 -458 -473 -1018 -1034 -2129 -2135 -2493 -2502 -2533 -2555 -42 -56 -67 -104 -91 -175 -19 -59 -17 -257 5 -317 43 -122 61 -144 396 -479 288 -288 333 -329 391 -357 105 -50 137 -57 255 -57 126 1 201 22 295 84 64 42 4540 4513 4588 4582 53 78 82 165 89 264 7 117 -7 191 -57 292 l-40 81 -2249 2250 c-1237 1237 -2269 2265 -2293 2284 -47 39 -103 69 -170 93 -43 15 -201 28 -248 19z"
                                    />
                                </g>
                            </svg>
                        </button>
                        <button id="xo-controll" {§if !_expand§} disabled {§/if§} (click)="{{>ctrHandler(3)}}">
                            <svg viewBox="0 0 1000.000000 1000.000000">
                                <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                    <path d="M975 9734 c-176 -37 -190 -47 -524 -383 -162 -163 -309 -318 -326 -346 -61 -96 -79 -158 -78 -280 0 -126 19 -192 79 -283 20 -30 772 -794 1717 -1744 925 -929 1684 -1694 1685 -1699 2 -5 -749 -766 -1669 -1690 -920 -924 -1690 -1702 -1709 -1728 -47 -63 -77 -126 -95 -204 -18 -78 -19 -134 -1 -219 30 -141 41 -155 380 -496 294 -296 315 -315 391 -353 146 -72 300 -74 450 -7 69 31 112 74 2229 2187 1409 1408 2172 2176 2197 2215 57 87 81 157 86 261 6 105 -10 180 -58 277 -28 57 -244 276 -2197 2231 -2370 2371 -2207 2215 -2363 2252 -60 14 -149 18 -194 9z"/>
                                    <path d="M5090 9721 c-130 -35 -155 -55 -475 -375 -321 -322 -355 -365 -387 -485 -33 -127 -21 -244 39 -371 39 -83 -88 47 2462 -2512 l974 -977 -334 -340 c-184 -187 -948 -958 -1699 -1713 -1329 -1336 -1367 -1375 -1402 -1448 -59 -122 -73 -238 -43 -355 34 -133 47 -149 379 -483 294 -296 315 -315 391 -353 148 -73 302 -74 455 -2 74 35 94 54 2241 2201 1704 1704 2173 2179 2196 2222 54 98 68 154 67 270 -1 121 -23 195 -86 290 -22 32 -930 947 -2190 2207 -1936 1934 -2159 2154 -2215 2182 -122 61 -251 75 -373 42z"/>
                                </g>
                            </svg>  
                        </button>
                    </header>
                    <main>
                        <div id="weeks">
                            <h1 id="xo-weekDay">Sun</h1>
                            <h1 id="xo-weekDay">Mon</h1>
                            <h1 id="xo-weekDay">Tue</h1>
                            <h1 id="xo-weekDay">Wed</h1>
                            <h1 id="xo-weekDay">Thu</h1>
                            <h1 id="xo-weekDay">Fri</h1>
                            <h1 id="xo-weekDay">Sat</h1>
                        </div>
                        {§loop 30§}
                            <button id="xo-day" disabled>{{$i+1}}</button>
                        {§/loop§}
                    </main>
                </div>
            </main>
            {§if info && infotype§}
                <label id="xo-info" {{infotype}}>
                    <span>{{info}}</span>
                    {§if infotype === 'success'§}
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M8681 8715 c-30 -8 -84 -28 -120 -46 -61 -30 -240 -206 -2434 -2398 -1302 -1301 -2370 -2368 -2373 -2371 -2 -2 -510 500 -1127 1116 -1024 1022 -1128 1123 -1187 1153 -121 59 -232 74 -344 45 -138 -35 -142 -38 -575 -468 -228 -227 -419 -425 -440 -457 -20 -30 -42 -75 -50 -100 -7 -24 -17 -52 -22 -61 -12 -24 -11 -205 1 -213 5 -3 10 -15 10 -26 0 -11 14 -50 31 -87 30 -63 123 -159 1713 -1750 1534 -1535 1687 -1685 1750 -1718 153 -81 304 -84 463 -9 52 25 378 348 2986 2954 1610 1609 2941 2947 2958 2973 105 162 105 374 -1 537 -16 25 -213 229 -437 452 -339 337 -418 411 -464 433 -112 54 -228 67 -338 41z"/>
                            </g>
                        </svg>
                    {§else§}
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
                                <path d="M4580 9825 c-330 -31 -728 -106 -975 -185 -233 -75 -402 -138 -570 -213 -73 -33 -338 -165 -390 -195 -412 -237 -724 -471 -1038 -781 -335 -329 -584 -655 -839 -1096 -75 -130 -204 -404 -273 -580 -26 -66 -51 -129 -55 -140 -5 -11 -22 -60 -39 -110 -256 -776 -311 -1641 -155 -2450 60 -312 161 -652 259 -880 7 -16 20 -48 29 -70 146 -357 404 -796 654 -1111 546 -689 1244 -1209 2037 -1519 66 -26 129 -51 140 -56 36 -15 231 -78 311 -99 496 -133 838 -180 1324 -180 452 0 857 52 1260 160 134 37 453 143 525 175 17 8 59 26 95 40 148 61 358 165 520 257 671 383 1256 939 1677 1593 432 672 683 1418 753 2240 13 155 13 595 0 750 -55 646 -205 1191 -485 1760 -260 529 -550 925 -990 1355 -97 95 -108 105 -230 209 -167 142 -468 361 -606 439 -18 11 -79 46 -134 77 -131 77 -542 275 -568 275 -7 0 -17 4 -23 9 -10 9 -97 41 -259 96 -366 122 -708 192 -1130 230 -194 18 -633 18 -825 0z m770 -1249 c381 -41 740 -130 1022 -255 26 -12 51 -21 54 -21 14 0 259 -123 352 -177 567 -326 1036 -797 1359 -1368 72 -127 203 -403 203 -429 0 -7 3 -16 7 -19 10 -11 73 -193 103 -297 7 -25 16 -56 20 -70 5 -14 17 -65 28 -115 78 -348 96 -535 89 -899 -7 -353 -44 -604 -135 -931 -50 -175 -155 -441 -246 -620 -80 -157 -215 -382 -246 -410 -21 -19 -41 1 -2515 2475 -1372 1372 -2495 2498 -2495 2502 0 20 249 172 425 261 412 208 785 317 1265 372 160 18 544 18 710 1z m-793 -4018 c1371 -1371 2493 -2497 2493 -2503 0 -10 -30 -31 -170 -121 -77 -49 -380 -206 -460 -238 -46 -18 -72 -29 -112 -45 -31 -13 -185 -67 -228 -80 -129 -39 -180 -52 -305 -80 -251 -55 -414 -73 -707 -78 -359 -7 -547 12 -893 89 -49 11 -101 23 -115 28 -14 4 -45 13 -70 20 -95 27 -228 72 -300 102 -14 6 -36 15 -50 21 -55 22 -69 28 -165 73 -628 292 -1184 792 -1551 1395 -63 104 -190 349 -218 419 -10 25 -24 59 -31 75 -169 388 -265 883 -265 1365 1 637 159 1240 469 1780 64 112 168 270 179 270 4 0 1129 -1122 2499 -2492z"/>                    
                            </g>
                        </svg>
                    {§/if§}
                </label>
            {§/if§}
        `;
    }
}

XODateElement.prototype.tag = "xo-date";

customElements.define(XODateElement.prototype.tag, XODateElement);

function __click__(self, e) {
    if (e.target !== self) {
        if (self.label) {
            if (self.$.text.val().trim()) {
                self.$.label.class().add("valid");
            } else {
                self.$.label.class().del("valid")
            }
        }
        self._expand = false;
    }
}

function __cal__(el, d = null, m = null, y = null) {
    DATE.setDate(1);
    el.$.items.find("#xo-day").forEach(b => b.remove());
    const lastDay = new Date(
        DATE.getFullYear(),
        DATE.getMonth() + 1,
        0
    ).getDate();

    const firstDayIndex = DATE.getDay();

    const lastDayIndex = new Date(
        DATE.getFullYear(),
        DATE.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    el.$.title.htm(months[DATE.getMonth()] + ", " + DATE.getFullYear());
    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div id="xo-day" part="--xo-day" off></div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        var day = (i < 10) ? "0" + i : i,
            mon = ((DATE.getMonth() + 1) < 10) ? "0" + (DATE.getMonth() + 1) : (DATE.getMonth() + 1);
        if (
            i === d && DATE.getMonth() === m && DATE.getFullYear() === y
        ) {
            days += `<button id="xo-day" part="--xo-day" date="${DATE.getFullYear()}-${mon}-${day}" active>${day}</button>`;
        } else if (
            i === new Date().getDate() && DATE.getMonth() === new Date().getMonth() && DATE.getFullYear() === new Date().getFullYear()
        ) {
            days += `<button id="xo-day" part="--xo-day" date="${DATE.getFullYear()}-${mon}-${day}" on>${day}</button>`;
        } else {
            days += `<button id="xo-day" part="--xo-day" date="${DATE.getFullYear()}-${mon}-${day}">${day}</button>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div id="xo-day" part="--xo-day" off></div>`;
    }
    el.$.items.find("main").innerHTML += days;
}