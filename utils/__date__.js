module.exports = (function(Math) {
    'use strict';

    const formattingTokensRegExp = /(\w)\1*|''|'(''|[^'])+('|$)|./g;
    const escapedStringRegExp = /^'([^]*?)'?$/;
    const doubleQuoteRegExp = /''/g;
    const unescapedLatinCharacterRegExp = /[a-zA-Z]/;
    const MILLISECONDS = {
        inYear: 31540000000,
        inMonth: 2628000000,
        inWeek: 604800000,
        inDay: 86400000,
        inHour: 3600000,
        inMinute: 60000,
        inSecond: 1000,
    }
    const SECONDS = {
        inYear: 31540000,
        inMonth: 2628000,
        inWeek: 604800,
        inDay: 86400,
        inHour: 3600,
        inMinute: 60,
    }
    const MINUTES = {
        inYear: 525600,
        inMonth: 43800,
        inWeek: 10080,
        inDay: 1440,
        inHour: 60,
    }
    const HOURS = {
        inYear: 8760,
        inMonth: 730.001,
        inWeek: 168,
        inDay: 24,
    }
    const DAYS = {
        inYear: 365,
        inMonth: 30,
        inWeek: 7,
    }
    const WEEKS = {
        inYear: 48,
        inMonth: 4,
    }
    const MOUNTS = {
        inYear: 12,
    }
    const formatters = {
        // Year
        y(date, token) {
            const signedYear = date.getUTCFullYear()
            const year = signedYear > 0 ? signedYear : 1 - signedYear
            return addZeros(token === 'yy' ? year % 100 : year, token.length)
        },

        // Month
        M(date, token) {
            const month = date.getUTCMonth()
            return token === 'M' ? String(month + 1) : addZeros(month + 1, 2)
        },

        // Day of the month
        d(date, token) {
            return addZeros(date.getUTCDate(), token.length)
        },

        // AM or PM
        a(date, token) {
            const dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am'

            switch (token) {
                case 'a':
                case 'aa':
                    return dayPeriodEnumValue.toUpperCase()
                case 'aaa':
                    return dayPeriodEnumValue
                case 'aaaaa':
                    return dayPeriodEnumValue[0]
                case 'aaaa':
                default:
                    return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.'
            }
        },

        // Hour [1-12]
        h(date, token) {
            return addZeros(date.getUTCHours() % 12 || 12, token.length)
        },

        // Hour [0-23]
        H(date, token) {
            return addZeros(date.getUTCHours(), token.length)
        },

        // Minute
        m(date, token) {
            return addZeros(date.getUTCMinutes(), token.length)
        },

        // Second
        s(date, token) {
            return addZeros(date.getUTCSeconds(), token.length)
        },

        // Fraction of second
        S(date, token) {
            const numberOfDigits = token.length
            const milliseconds = date.getUTCMilliseconds()
            const fractionalSeconds = Math.floor(
                milliseconds * Math.pow(10, numberOfDigits - 3)
            )
            return addZeros(fractionalSeconds, token.length)
        },
    }

    /**
     * pre add len of 0 to nbr
     * @param {Number} nbr 
     * @param {Number} len 
     * @returns String
     */
    function addZeros(nbr, len) {
        var sign = nbr < 0 ? '-' : '';
        var output = Math.abs(nbr).toString();
        while (output.length < len) {
            output = '0' + output;
        }
        return sign + output;
    }

    /**
     * check if its a leap year or not
     * @param {Date} date 
     * @returns Boolean
     */
    function isLeapYear(date) {
        const _date = toDate(date);
        const year = _date.getFullYear();
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    }

    /**
     * check if date day is saturday
     * @param {Date} date 
     * @returns Boolean
     */
    function isSaturday(date) {
        return toDate(date).getDay() === 6;
    }

    /**
     * check if date day is sunday
     * @param {Date} date 
     * @returns Boolean
     */
    function isSunday(date) {
        return toDate(date).getDay() === 0;
    }

    /**
     * check if date is valid
     * @param {Date} date 
     * @returns Boolean
     */
    function isValid(date) {
        var _date = toDate(date);
        return !isNaN(_date);
    }

    /**
     * check if date day is a weekend day
     * @param {Date} date 
     * @returns Boolean
     */
    function isWeekend(date) {
        const _date = toDate(date)
        const day = _date.getDay()
        return day === 0 || day === 6
    }

    /**
     * convert to date
     * @param {any} date 
     * @returns Date
     */
    function toDate(date) {
        const argStr = Object.prototype.toString.call(date)
        if (
            date instanceof Date ||
            (typeof date === 'object' && argStr === '[object Date]')
        ) {
            return new Date(date.getTime());
        } else if (typeof date === 'number' || argStr === '[object Number]') {
            return new Date(date);
        } else {
            return new Date(NaN);
        }
    }

    /**
     * convert to intiger
     * @param {any} val 
     * @returns Number
     */
    function toInteger(val) {
        if (val === null || val === true || val === false) {
            return NaN;
        }

        const nbr = Number(val);

        if (isNaN(nbr)) {
            return nbr;
        }

        return nbr < 0 ? Math.ceil(nbr) : Math.floor(nbr);
    }

    function getTimezoneOffsetInMilliseconds(date) {
        const utcDate = new Date(
            Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
            )
        );
        utcDate.setUTCFullYear(date.getFullYear());
        return date.getTime() - utcDate.getTime();
    }

    /**
     * sub amount millseconds from date,
     * @param {Date} date 
     * @param {Number} amount 
     * @returns Date
     */
    function subMilliseconds(date, amount) {
        const _amount = toInteger(amount)
        return XODate(date).addMilliseconds(-_amount)._date;
    }

    function lightFormat(date, formatStr) {
        const originalDate = toDate(date)

        if (!isValid(originalDate)) {
            throw new RangeError('Invalid time value')
        }

        const timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate)
        const utcDate = subMilliseconds(originalDate, timezoneOffset)

        const tokens = formatStr.match(formattingTokensRegExp)

        if (!tokens) return ''

        const result = tokens
            .map((substring) => {
                if (substring === "''") {
                    return "'"
                }

                const firstCharacter = substring[0]
                if (firstCharacter === "'") {
                    return cleanEscapedString(substring)
                }

                const formatter = formatters[firstCharacter]
                if (formatter) {
                    return formatter(utcDate, substring)
                }

                if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
                    throw new RangeError(
                        'Format string contains an unescaped latin alphabet character `' +
                        firstCharacter +
                        '`'
                    )
                }

                return substring
            })
            .join('')

        return result
    }

    function cleanEscapedString(input) {
        const matches = input.match(escapedStringRegExp)

        if (!matches) {
            return input
        }

        return matches[1].replace(doubleQuoteRegExp, "'")
    }

    function XODate(date) {
        if (date instanceof XODate) {
            return date;
        }

        if (!(this instanceof XODate)) {
            return new XODate(date);
        }

        this._date = toDate(date);
    }

    XODate.fn = XODate.prototype;

    /**
     * format date to specific pattern
     * Accepted patterns:
     * *********************************************************
     * | Unit               | Pattern | Result examples        |
     * *********************************************************
     * | AM, PM             | a..aaa  | AM, PM                 |
     * |                    | aaaa    | a.m., p.m.             |
     * |                    | aaaaa   | a, p                   |
     * | Calendar year      | y       | 44, 1, 1900, 2017      |
     * |                    | yy      | 44, 01, 00, 17         |
     * |                    | yyy     | 044, 001, 000, 017     |
     * |                    | yyyy    | 0044, 0001, 1900, 2017 |
     * | Month (formatting) | M       | 1, 2, ..., 12          |
     * |                    | MM      | 01, 02, ..., 12        |
     * | Day of month       | d       | 1, 2, ..., 31          |
     * |                    | dd      | 01, 02, ..., 31        |
     * | Hour [1*12]        | h       | 1, 2, ..., 11, 12      |
     * |                    | hh      | 01, 02, ..., 11, 12    |
     * | Hour [0*23]        | H       | 0, 1, 2, ..., 23       |
     * |                    | HH      | 00, 01, 02, ..., 23    |
     * | Minute             | m       | 0, 1, ..., 59          |
     * |                    | mm      | 00, 01, ..., 59        |
     * | Second             | s       | 0, 1, ..., 59          |
     * |                    | ss      | 00, 01, ..., 59        |
     * | Fraction of second | S       | 0, 1, ..., 9           |
     * |                    | SS      | 00, 01, ..., 99        |
     * |                    | SSS     | 000, 0001, ..., 999    |
     * |                    | SSSS    | ...                    |
     * *********************************************************
     * @param {String} format 
     * @returns XODate
     */
    XODate.fn.format = function(format) {
        return lightFormat(this._date, format);
    }

    /**
     * add cont to date millisecond
     * @param {Number} cont 
     * @returns XODate
     */
    XODate.fn.addMilliseconds = function(cont) {
        const amount = toInteger(cont);
        const timestamp = toDate(this._date).getTime();
        const date = toDate(timestamp + amount);
        this._date = date;

        return this;
    }

    /**
     * add cont to date second
     * @param {Number} cont 
     * @returns XODate
     */
    XODate.fn.addSeconds = function(cont) {
        const amount = toInteger(cont);
        this.addMilliseconds(amount * 1000);

        return this;
    }

    /**
     * add cont to date minute
     * @param {Number} cont 
     * @returns XODate
     */
    XODate.fn.addMinutes = function(cont) {
        const amount = toInteger(cont);
        this.addMilliseconds(amount * MILLISECONDS.inMinute);

        return this;
    }

    /**
     * add cont to date hour
     * @param {Number} cont 
     * @returns XODate
     */
    XODate.fn.addHours = function(cont) {
        const amount = toInteger(cont);
        this.addMilliseconds(amount * MILLISECONDS.inHour);

        return this;
    }

    /**
     * add cont to date day
     * @param {Number} cont 
     * @returns XODate
     */
    XODate.fn.addBusinessDays = function(cont) {
        const date = toDate(this._date);
        const startedOnWeekend = isWeekend(date);
        const amount = toInteger(cont);

        if (isNaN(amount)) this._date = new Date(NaN);
        else {

            const hours = date.getHours();
            const sign = amount < 0 ? -1 : 1;
            const fullWeeks = toInteger(amount / 5);

            date.setDate(date.getDate() + fullWeeks * 7);
            let restDays = Math.abs(amount % 5);

            while (restDays > 0) {
                date.setDate(date.getDate() + sign);
                if (!isWeekend(date)) restDays -= 1;
            }

            if (startedOnWeekend && isWeekend(date) && amount !== 0) {
                if (isSaturday(date)) date.setDate(date.getDate() + (sign < 0 ? 2 : -1));
                if (isSunday(date)) date.setDate(date.getDate() + (sign < 0 ? 1 : -2));
            }

            date.setHours(hours);

            this._date = date;
        }

        return this;
    }

    /**
     * add cont to date day
     * @param {Number} cont 
     * @returns XODate
     */
    XODate.fn.addDays = function(cont) {
        const date = toDate(this._date);
        const amount = toInteger(cont);

        if (isNaN(amount)) {
            this._date = new Date(NaN)
        } else {
            date.setDate(date.getDate() + amount);
            this._date = toDate(date);
        }

        return this;
    }

    /**
     * add cont to date week
     * @param {Number} cont 
     * @returns XODate
     */
    XODate.fn.addWeeks = function(cont) {
        const amount = toInteger(cont);
        this.addDays(amount * 7);

        return this;
    }

    /**
     * add cont to date month
     * @param {Number} cont 
     * @returns XODate
     */
    XODate.fn.addMonths = function(cont) {
        const date = toDate(this._date);
        const amount = toInteger(cont);

        if (isNaN(amount)) {
            this._date = new Date(NaN)
        } else {
            const dayOfMonth = date.getDate();
            const endOfDesiredMonth = toDate(date.getTime());
            endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
            const daysInMonth = endOfDesiredMonth.getDate();
            if (dayOfMonth >= daysInMonth) {
                this._date = toDate(endOfDesiredMonth);
            } else {
                date.setFullYear(
                    endOfDesiredMonth.getFullYear(),
                    endOfDesiredMonth.getMonth(),
                    dayOfMonth
                );
                this._date = toDate(date);
            }
        }

        return this;
    }

    /**
     * add cont to date year
     * @param {Number} cont 
     * @returns XODate
     */
    XODate.fn.addYears = function(cont) {
        const amount = toInteger(cont);
        this.addMonths(amount * 12);

        return this;
    }

    /**
     * get value of milliseconds in date
     * @returns Number
     */
    XODate.fn.getMilliseconds = function() {
        const date = toDate(this._date);
        const milliseconds = date.getMilliseconds();

        return milliseconds;
    }

    /**
     * get value of seconds in date
     * @returns Number
     */
    XODate.fn.getSeconds = function() {
        const date = toDate(this._date);
        const seconds = date.getSeconds();

        return seconds;
    }

    /**
     * get value of minutes in date
     * @returns Number
     */
    XODate.fn.getMinutes = function() {
        const date = toDate(this._date);
        const minutes = date.getMinutes();

        return minutes;
    }

    /**
     * get value of hours in date
     * @returns Number
     */
    XODate.fn.getHours = function() {
        const date = toDate(this._date);
        const hours = date.getHours();

        return hours;
    }

    /**
     * get value of timestamp in date
     * @returns Number
     */
    XODate.fn.getTime = function() {
        const date = toDate(this._date);
        const timestamp = date.getTime();
        return timestamp;
    }

    /**
     * get value of day in date
     * @returns Number
     */
    XODate.fn.getDays = function() {
        const date = toDate(this._date);
        const day = date.getDay();

        return day;
    }

    /**
     * get value of weeks in date
     * @returns Number
     */
    XODate.fn.getWeeks = function() {
        const date = toDate(this._date);
        const diff =
            startOfWeek(date).getTime() -
            startOfWeekYear(date).getTime();
        return Math.round(diff / MILLISECONDS.inWeek) + 1;
    }

    /**
     * get value of month in date
     * @returns Number
     */
    XODate.fn.getMonths = function() {
        const date = toDate(this._date);
        const month = date.getMonth();

        return month;
    }

    /**
     * get value of year in date
     * @returns Number
     */
    XODate.fn.getYears = function() {
        const date = toDate(this._date);
        const year = date.getFullYear();

        return year;
    }

    /**
     * get value of date in date
     * @returns Number
     */
    XODate.fn.getDate = function() {
        const date = toDate(this._date);
        const _date = date.getDate();

        return _date;

    }

    /**
     * get value of days in month
     * @returns Number
     */
    XODate.fn.getDaysInMonth = function() {
        const date = toDate(this._date);
        const year = date.getFullYear();
        const monthIndex = date.getMonth();
        const lastDayOfMonth = new Date(0);
        lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
        lastDayOfMonth.setHours(0, 0, 0, 0);
        return lastDayOfMonth.getDate();
    }

    /**
     * get value of days in year
     * @returns Number
     */
    XODate.fn.getDaysInYear = function() {
        const date = toDate(this._date);

        if (String(new Date(date)) === 'Invalid Date') {
            return NaN;
        }

        return isLeapYear(date) ? 366 : 365;
    }

    /**
     * check if date smaller then current date
     * @returns Boolean
     */
    XODate.fn.isPast = function() {
        return toDate(this._date).getTime() < Date.now();
    }

    /**
     * check if date greater then current date
     * @returns Boolean
     */
    XODate.fn.isFuture = function() {
        return toDate(this._date).getTime() > Date.now();
    }

    /**
     * set full date
     * @param {Number} val 
     * @returns XODate
     */
    XODate.fn.set = function(val) {
        if (typeof val !== 'object' || val === null) {
            throw new RangeError('values parameter must be an object')
        }

        let date = toDate(this._date);

        if (isNaN(date.getTime())) {
            this._date = new Date(NaN);
        }

        if (val.year != null) {
            date.setFullYear(val.year);
        }

        if (val.month != null) {
            date.setMonth(val.month - 1);
        }

        if (val.date != null) {
            date.setDate(toInteger(val.date));
        }

        if (val.hours != null) {
            date.setHours(toInteger(val.hours));
        }

        if (val.minutes != null) {
            date.setMinutes(toInteger(val.minutes));
        }

        if (val.seconds != null) {
            date.setSeconds(toInteger(val.seconds));
        }

        if (val.milliseconds != null) {
            date.setMilliseconds(toInteger(val.milliseconds));
        }

        this._date = date;
        return this;
    }

    /**
     * set date date
     * @param {Number} val 
     * @returns XODate
     */
    XODate.fn.setDate = function(val) {
        const date = toDate(this._date);
        date.setDate(toIntiger(val));
        this._date = date;

        return this;
    }

    /**
     * set date milliseconds
     * @param {Number} val 
     * @returns XODate
     */
    XODate.fn.setMilliseconds = function(val) {
        const date = toDate(this._date);
        date.setMilliseconds(toIntiger(val));
        this._date = date;

        return this;
    }

    /**
     * set date seconds
     * @param {Number} val 
     * @returns XODate
     */
    XODate.fn.setSeconds = function(val) {
        const date = toDate(this._date);
        date.setSeconds(toIntiger(val));
        this._date = date;

        return this;
    }

    /**
     * set date minutes
     * @param {Number} val 
     * @returns XODate
     */
    XODate.fn.setMinutes = function(val) {
        const date = toDate(this._date);
        date.setMinutes(toIntiger(val));
        this._date = date;

        return this;
    }

    /**
     * set date hours
     * @param {Number} val 
     * @returns XODate
     */
    XODate.fn.setHours = function(val) {
        const date = toDate(this._date);
        date.setHours(toIntiger(val));
        this._date = date;

        return this;
    }

    /**
     * set date timestamp
     * @param {Number} val 
     * @returns XODate
     */
    XODate.fn.setTime = function(val) {
        const date = toDate(this._date);
        date.setTime(toIntiger(val));
        this._date = date;
        return this;
    }

    /**
     * set date days
     * @param {Number} val 
     * @returns XODate
     */
    XODate.fn.setDays = function(val) {
        const date = toDate(this._date);
        date.setDay(toIntiger(val));
        this._date = date;

        return this;
    }

    /**
     * set date month
     * @param {Number} val 
     * @returns XODate
     */
    XODate.fn.setMonths = function(val) {
        const date = toDate(this._date);
        date.setMonth(toIntiger(val));
        this._date = date;

        return this;
    }

    /**
     * set date year
     * @param {Number} val 
     * @returns XODate
     */
    XODate.fn.setYears = function(val) {
        const date = toDate(this._date);
        date.setFullYear(toIntiger(val));
        this._date = date;

        return this;
    }

    /**
     * convert millisends to sepecific time
     * @param {Number} nbr 
     * @returns Number
     */

    XODate.millisecondsToSencods = function(nbr) {
        const val = nbr / MILLISECONDS.inSecond;
        return Math.floor(val)
    }

    XODate.millisecondsToMinutes = function(nbr) {
        const val = nbr / MILLISECONDS.inMinute;
        return Math.floor(val)
    }

    XODate.millisecondsToHours = function(nbr) {
        const val = nbr / MILLISECONDS.inHour;
        return Math.floor(val)
    }

    XODate.millisecondsToDays = function(nbr) {
        const val = nbr / MILLISECONDS.inDay;
        return Math.floor(val)
    }

    XODate.millisecondsToWeeks = function(nbr) {
        const val = nbr / MILLISECONDS.inWeek;
        return Math.floor(val)
    }

    XODate.millisecondsToMonths = function(nbr) {
        const val = nbr / MILLISECONDS.inMonth;
        return Math.floor(val)
    }

    XODate.millisecondsToYears = function(nbr) {
        const val = nbr / MILLISECONDS.inYear;
        return Math.floor(val)
    }

    /**
     * convert seconds to sepecific time
     * @param {Number} nbr 
     * @returns Number
     */

    XODate.secondsToMillisencods = function(nbr) {
        const val = nbr * MILLISECONDS.inSecond;
        return Math.floor(val)
    }

    XODate.secondsToMinutes = function(nbr) {
        const val = nbr / SECONDS.inMinute;
        return Math.floor(val)
    }

    XODate.secondsToHours = function(nbr) {
        const val = nbr / SECONDS.inHour;
        return Math.floor(val)
    }

    XODate.secondsToDays = function(nbr) {
        const val = nbr / SECONDS.inDay;
        return Math.floor(val)
    }

    XODate.secondsToWeeks = function(nbr) {
        const val = nbr / SECONDS.inWeek;
        return Math.floor(val)
    }

    XODate.secondsToMonths = function(nbr) {
        const val = nbr / SECONDS.inMonth;
        return Math.floor(val)
    }

    XODate.secondsToYears = function(nbr) {
        const val = nbr / SECONDS.inYear;
        return Math.floor(val)
    }

    /**
     * convert minutes to sepecific time
     * @param {Number} nbr 
     * @returns Number
     */

    XODate.minutesToMillisencods = function(nbr) {
        const val = nbr * MILLISECONDS.inMinute;
        return Math.floor(val)
    }

    XODate.minutesToSeconds = function(nbr) {
        const val = nbr * SECONDS.inMinute;
        return Math.floor(val)
    }

    XODate.minutesToHours = function(nbr) {
        const val = nbr / MINUTES.inHour;
        return Math.floor(val)
    }

    XODate.minutesToDays = function(nbr) {
        const val = nbr / MINUTES.inDay;
        return Math.floor(val)
    }

    XODate.minutesToWeeks = function(nbr) {
        const val = nbr / MINUTES.inWeek;
        return Math.floor(val)
    }

    XODate.minutesToMonths = function(nbr) {
        const val = nbr / MINUTES.inMonth;
        return Math.floor(val)
    }

    XODate.minutesToYears = function(nbr) {
        const val = nbr / MINUTES.inYear;
        return Math.floor(val)
    }

    /**
     * convert hours to sepecific time
     * @param {Number} nbr 
     * @returns Number
     */

    XODate.hoursToMillisencods = function(nbr) {
        const val = nbr * MILLISECONDS.inHour;
        return Math.floor(val)
    }

    XODate.hoursToSeconds = function(nbr) {
        const val = nbr * SECONDS.inHour;
        return Math.floor(val)
    }

    XODate.hoursToMinutes = function(nbr) {
        const val = nbr * MINUTES.inHour;
        return Math.floor(val)
    }

    XODate.hoursToDays = function(nbr) {
        const val = nbr / HOURS.inDay;
        return Math.floor(val)
    }

    XODate.hoursToWeeks = function(nbr) {
        const val = nbr / HOURS.inWeek;
        return Math.floor(val)
    }

    XODate.hoursToMonths = function(nbr) {
        const val = nbr / HOURS.inMonth;
        return Math.floor(val)
    }

    XODate.hoursToYears = function(nbr) {
        const val = nbr / HOURS.inYear;
        return Math.floor(val)
    }

    /**
     * convert days to sepecific time
     * @param {Number} nbr 
     * @returns Number
     */

    XODate.daysToMillisencods = function(nbr) {
        const val = nbr * MILLISECONDS.inDay;
        return Math.floor(val)
    }

    XODate.daysToSeconds = function(nbr) {
        const val = nbr * SECONDS.inDay;
        return Math.floor(val)
    }

    XODate.daysToMinutes = function(nbr) {
        const val = nbr * MINUTES.inDay;
        return Math.floor(val)
    }

    XODate.daysToHours = function(nbr) {
        const val = nbr * HOURS.inDay;
        return Math.floor(val)
    }

    XODate.daysToWeeks = function(nbr) {
        const val = nbr / DAYS.inWeek;
        return Math.floor(val)
    }

    XODate.daysToMonths = function(nbr) {
        const val = nbr / DAYS.inMonth;
        return Math.floor(val)
    }

    XODate.daysToYears = function(nbr) {
        const val = nbr / DAYS.inYear;
        return Math.floor(val)
    }

    /**
     * convert months to sepecific time
     * @param {Number} nbr 
     * @returns Number
     */

    XODate.monthsToMillisencods = function(nbr) {
        const val = nbr * MILLISECONDS.inMonth;
        return Math.floor(val)
    }

    XODate.monthsToSeconds = function(nbr) {
        const val = nbr * SECONDS.inMonth;
        return Math.floor(val)
    }

    XODate.monthsToMinutes = function(nbr) {
        const val = nbr * MINUTES.inMonth;
        return Math.floor(val)
    }

    XODate.monthsToHours = function(nbr) {
        const val = nbr * HOURS.inMonth;
        return Math.floor(val)
    }

    XODate.monthsToDays = function(nbr) {
        const val = nbr * DAYS.inMonth;
        return Math.floor(val)
    }

    XODate.monthsToWeeks = function(nbr) {
        const val = nbr * WEEKS.inMonth;
        return Math.floor(val)
    }

    XODate.monthsToYears = function(nbr) {
        const val = nbr / MOUNTS.inYear;
        return Math.floor(val)
    }

    /**
     * convert years to sepecific time
     * @param {Number} nbr 
     * @returns Number
     */

    XODate.yearsToMillisencods = function(nbr) {
        const val = nbr * MILLISECONDS.inYear;
        return Math.floor(val)
    }

    XODate.yearsToSeconds = function(nbr) {
        const val = nbr * SECONDS.inYear;
        return Math.floor(val)
    }

    XODate.yearsToMinutes = function(nbr) {
        const val = nbr * MINUTES.inYear;
        return Math.floor(val)
    }

    XODate.yearsToHours = function(nbr) {
        const val = nbr * HOURS.inYear;
        return Math.floor(val)
    }

    XODate.yearsToDays = function(nbr) {
        const val = nbr * DAYS.inYear;
        return Math.floor(val)
    }

    XODate.yearsToWeeks = function(nbr) {
        const val = nbr * WEEKS.inYear;
        return Math.floor(val)
    }

    XODate.yearsToMonths = function(nbr) {
        const val = nbr * MOUNTS.inYear;
        return Math.floor(val)
    }

    return XODate;

})(Math);