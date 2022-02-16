{
    //// var REGEX = {
    ////     FIL: /*Filters ->*/ /\s*\(\s*(.*)\s*:\s*\[(.+?)\]\s*\)\s*/g,
    ////     COD: /*logics ->*/ /(if|elif|while|define|log|warn|error) (.*)|(##)([\s\S]+)|(#)(.*)\((.*)\)|(loop) (.*)|(each) (.*) in (.*)/g,
    ////     INC: /*include ->*/ /{{[ ]{0,}include (.*?)}}/g,
    ////     EXT: /*extend ->*/ /{{[ ]{0,}extend (.*?)}}/g,
    ////     PRI: /*evaluate ->*/ /{{(.*?)}}/g,
    //// }
}

{
    // Regex = {
    //* imports: /\{\{\s*(include|extend)\s+([A-Za-z0-9\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]+)\s*\}\}/g,
    //? /(if|elif|while|log|warn|error)\s+(.*)|(\?)(.*)\((.*)\)|(loop)\s+(.*)|(each)\s+(.*)\s+in\s+(.*)/g,
    //? filters: /\s*\(\s*(.*)\s*:\s*\[(.+?)\]\s*\)\s*/g,
    //! declares: /define\s+(.*)\s+=\s+([\s\S]+?)/g
    //! comments: /\{\{#([\s\S]+?)#\}\}/g,
    //* evaluate: /\{\{([\s\S]+?)\}\}/g,
    //}
}

module.exports = (function() {
    var REGEX = {
        FIL: /*Filters ->*/ /\s*\(\s*(.*)\s*:\s*\[(.+?)\]\s*\)\s*/g,
        COD: /*logics ->*/ /(if|elif|while|define|log|warn|error) (.*)|(##)([\s\S]+)|(#)(.*)\((.*)\)|(loop) (.*)|(each) (.*) in (.*)/g,
        INC: /*Include ->*/ /\{\{\s*include \s*(.*)\s*\}\}/g,
        EXT: /*Extend ->*/ /\{\{\s*extend \s*(.*)\s*\}\}/g,
        PRI: /*evaluate ->*/ /{{(.*?)}}/g,
    }

    window.__XOBuild__ = {
        __filters__: {
            cap: function(str) {
                return (typeof str === 'string' && str.split(/[\s]/g).map(function(w) { return (w[0]).toUpperCase() + (w.slice(1)).toLowerCase() }).join(' ')) || null;
            },
            str: function(str) {
                return (typeof str !== "object" && String(str)) || null;
            },
            num: function(num) {
                return (num && /^[0-9.]+$/g.test(num) && Number(num)) || null;
            },
            int: function(num) {
                return (num && /^[0-9.]+$/g.test(num) && parseInt(num)) || null;
            },
            reel: function(num) {
                return (num && /^[0-9.]+$/g.test(num) && parseFloat(num)) || null;
            },
            bool: function(bol) {
                return (bol === true || bol === 'true' || bol === false || bol === 'false') ? JSON.parse(bol) : null
            },
            floor: function(num) {
                return (num && /^[0-9.]+$/g.test(num) && Math.floor(Number(num))) || null;
            },
            round: function(num) {
                return (num && /^[0-9.]+$/g.test(num) && Math.round(Number(num))) || null;
            },
            ceil: function(num) {
                return (num && /^[0-9.]+$/g.test(num) && Math.ceil(Number(num))) || null;
            },
            last: function(str) {
                return ((typeof str === 'string' || Array.isArray(str)) && str[str.length - 1]) || null;
            },
            trim: function(str) {
                return (typeof str === 'string' && str.trim()) || null;
            },
            sort: function(str) {
                return typeof str === 'string' ? str.split('').sort().join('') : Array.isArray(str) ? str.sort() : null
            },
            join: function(arr, glu) {
                return (Array.isArray(arr) && arr.join((glu ? glu : ', '))) || null;
            },
            uniq: function(arr) {
                return (Array.isArray(arr) && [...new Set(arr)]) || null;
            },
            sum: function(arr) {
                return (Array.isArray(arr) && arr.reduce(function(a, n) { return a + n })) || null;
            },
            max: function(arr) {
                return (Array.isArray(arr) && Math.max.apply(Math, arr)) || null;
            },
            min: function(arr) {
                return (Array.isArray(arr) && Math.min.apply(Math, arr)) || null;
            },
            isStr: function(str) {
                return typeof str === 'string';
            },
            isNum: function(num, rel) {
                return rel ? num % 1 !== 0 : typeof num === 'number';
            },
            isBol: function(bol) {
                return typeof bol === 'boolean';
            },
            upper: function(str) {
                return (typeof str === 'string' && str.toUpperCase()) || null;
            },
            lower: function(str) {
                return (typeof str === 'string' && str.toLowerCase()) || null;
            },
            latin: function(str) {
                var _latin = { 'Á': 'A', 'Ă': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ằ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ǎ': 'A', 'Â': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ầ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ä': 'A', 'Ǟ': 'A', 'Ȧ': 'A', 'Ǡ': 'A', 'Ạ': 'A', 'Ȁ': 'A', 'À': 'A', 'Ả': 'A', 'Ȃ': 'A', 'Ā': 'A', 'Ą': 'A', 'Å': 'A', 'Ǻ': 'A', 'Ḁ': 'A', 'Ⱥ': 'A', 'Ã': 'A', 'Ꜳ': 'AA', 'Æ': 'AE', 'Ǽ': 'AE', 'Ǣ': 'AE', 'Ꜵ': 'AO', 'Ꜷ': 'AU', 'Ꜹ': 'AV', 'Ꜻ': 'AV', 'Ꜽ': 'AY', 'Ḃ': 'B', 'Ḅ': 'B', 'Ɓ': 'B', 'Ḇ': 'B', 'Ƀ': 'B', 'Ƃ': 'B', 'Ć': 'C', 'Č': 'C', 'Ç': 'C', 'Ḉ': 'C', 'Ĉ': 'C', 'Ċ': 'C', 'Ƈ': 'C', 'Ȼ': 'C', 'Ď': 'D', 'Ḑ': 'D', 'Ḓ': 'D', 'Ḋ': 'D', 'Ḍ': 'D', 'Ɗ': 'D', 'Ḏ': 'D', 'ǲ': 'D', 'ǅ': 'D', 'Đ': 'D', 'Ð': 'D', 'Ƌ': 'D', 'Ǳ': 'DZ', 'Ǆ': 'DZ', 'É': 'E', 'Ĕ': 'E', 'Ě': 'E', 'Ȩ': 'E', 'Ḝ': 'E', 'Ê': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ề': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ḙ': 'E', 'Ë': 'E', 'Ė': 'E', 'Ẹ': 'E', 'Ȅ': 'E', 'È': 'E', 'Ẻ': 'E', 'Ȇ': 'E', 'Ē': 'E', 'Ḗ': 'E', 'Ḕ': 'E', 'Ę': 'E', 'Ɇ': 'E', 'Ẽ': 'E', 'Ḛ': 'E', 'Ꝫ': 'ET', 'Ḟ': 'F', 'Ƒ': 'F', 'Ǵ': 'G', 'Ğ': 'G', 'Ǧ': 'G', 'Ģ': 'G', 'Ĝ': 'G', 'Ġ': 'G', 'Ɠ': 'G', 'Ḡ': 'G', 'Ǥ': 'G', 'Ḫ': 'H', 'Ȟ': 'H', 'Ḩ': 'H', 'Ĥ': 'H', 'Ⱨ': 'H', 'Ḧ': 'H', 'Ḣ': 'H', 'Ḥ': 'H', 'Ħ': 'H', 'Í': 'I', 'Ĭ': 'I', 'Ǐ': 'I', 'Î': 'I', 'Ï': 'I', 'Ḯ': 'I', 'İ': 'I', 'Ị': 'I', 'Ȉ': 'I', 'Ì': 'I', 'Ỉ': 'I', 'Ȋ': 'I', 'Ī': 'I', 'Į': 'I', 'Ɨ': 'I', 'Ĩ': 'I', 'Ḭ': 'I', 'І': 'I', 'Ꝺ': 'D', 'Ꝼ': 'F', 'Ᵹ': 'G', 'Ꞃ': 'R', 'Ꞅ': 'S', 'Ꞇ': 'T', 'Ꝭ': 'IS', 'Ĵ': 'J', 'Ɉ': 'J', 'Ḱ': 'K', 'Ǩ': 'K', 'Ķ': 'K', 'Ⱪ': 'K', 'Ꝃ': 'K', 'Ḳ': 'K', 'Ƙ': 'K', 'Ḵ': 'K', 'Ꝁ': 'K', 'Ꝅ': 'K', 'Ĺ': 'L', 'Ƚ': 'L', 'Ľ': 'L', 'Ļ': 'L', 'Ḽ': 'L', 'Ḷ': 'L', 'Ḹ': 'L', 'Ⱡ': 'L', 'Ꝉ': 'L', 'Ḻ': 'L', 'Ŀ': 'L', 'Ɫ': 'L', 'ǈ': 'L', 'Ł': 'L', 'Ǉ': 'LJ', 'Ḿ': 'M', 'Ṁ': 'M', 'Ṃ': 'M', 'Ɱ': 'M', 'Ń': 'N', 'Ň': 'N', 'Ņ': 'N', 'Ṋ': 'N', 'Ṅ': 'N', 'Ṇ': 'N', 'Ǹ': 'N', 'Ɲ': 'N', 'Ṉ': 'N', 'Ƞ': 'N', 'ǋ': 'N', 'Ñ': 'N', 'Ǌ': 'NJ', 'Ó': 'O', 'Ŏ': 'O', 'Ǒ': 'O', 'Ô': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ồ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ö': 'O', 'Ȫ': 'O', 'Ȯ': 'O', 'Ȱ': 'O', 'Ọ': 'O', 'Ő': 'O', 'Ȍ': 'O', 'Ò': 'O', 'Ỏ': 'O', 'Ơ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ờ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ȏ': 'O', 'Ꝋ': 'O', 'Ꝍ': 'O', 'Ō': 'O', 'Ṓ': 'O', 'Ṑ': 'O', 'Ɵ': 'O', 'Ǫ': 'O', 'Ǭ': 'O', 'Ø': 'O', 'Ǿ': 'O', 'Õ': 'O', 'Ṍ': 'O', 'Ṏ': 'O', 'Ȭ': 'O', 'Ƣ': 'OI', 'Ꝏ': 'OO', 'Ɛ': 'E', 'Ɔ': 'O', 'Ȣ': 'OU', 'Ṕ': 'P', 'Ṗ': 'P', 'Ꝓ': 'P', 'Ƥ': 'P', 'Ꝕ': 'P', 'Ᵽ': 'P', 'Ꝑ': 'P', 'Ꝙ': 'Q', 'Ꝗ': 'Q', 'Ŕ': 'R', 'Ř': 'R', 'Ŗ': 'R', 'Ṙ': 'R', 'Ṛ': 'R', 'Ṝ': 'R', 'Ȑ': 'R', 'Ȓ': 'R', 'Ṟ': 'R', 'Ɍ': 'R', 'Ɽ': 'R', 'Ꜿ': 'C', 'Ǝ': 'E', 'Ś': 'S', 'Ṥ': 'S', 'Š': 'S', 'Ṧ': 'S', 'Ş': 'S', 'Ŝ': 'S', 'Ș': 'S', 'Ṡ': 'S', 'Ṣ': 'S', 'Ṩ': 'S', 'ß': 'ss', 'Ť': 'T', 'Ţ': 'T', 'Ṱ': 'T', 'Ț': 'T', 'Ⱦ': 'T', 'Ṫ': 'T', 'Ṭ': 'T', 'Ƭ': 'T', 'Ṯ': 'T', 'Ʈ': 'T', 'Ŧ': 'T', 'Ɐ': 'A', 'Ꞁ': 'L', 'Ɯ': 'M', 'Ʌ': 'V', 'Ꜩ': 'TZ', 'Ú': 'U', 'Ŭ': 'U', 'Ǔ': 'U', 'Û': 'U', 'Ṷ': 'U', 'Ü': 'U', 'Ǘ': 'U', 'Ǚ': 'U', 'Ǜ': 'U', 'Ǖ': 'U', 'Ṳ': 'U', 'Ụ': 'U', 'Ű': 'U', 'Ȕ': 'U', 'Ù': 'U', 'Ủ': 'U', 'Ư': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ừ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ȗ': 'U', 'Ū': 'U', 'Ṻ': 'U', 'Ų': 'U', 'Ů': 'U', 'Ũ': 'U', 'Ṹ': 'U', 'Ṵ': 'U', 'Ꝟ': 'V', 'Ṿ': 'V', 'Ʋ': 'V', 'Ṽ': 'V', 'Ꝡ': 'VY', 'Ẃ': 'W', 'Ŵ': 'W', 'Ẅ': 'W', 'Ẇ': 'W', 'Ẉ': 'W', 'Ẁ': 'W', 'Ⱳ': 'W', 'Ẍ': 'X', 'Ẋ': 'X', 'Ý': 'Y', 'Ŷ': 'Y', 'Ÿ': 'Y', 'Ẏ': 'Y', 'Ỵ': 'Y', 'Ỳ': 'Y', 'Ƴ': 'Y', 'Ỷ': 'Y', 'Ỿ': 'Y', 'Ȳ': 'Y', 'Ɏ': 'Y', 'Ỹ': 'Y', 'Ї': 'YI', 'Ź': 'Z', 'Ž': 'Z', 'Ẑ': 'Z', 'Ⱬ': 'Z', 'Ż': 'Z', 'Ẓ': 'Z', 'Ȥ': 'Z', 'Ẕ': 'Z', 'Ƶ': 'Z', 'Þ': 'TH', 'Ĳ': 'IJ', 'Œ': 'OE', 'ᴀ': 'A', 'ᴁ': 'AE', 'ʙ': 'B', 'ᴃ': 'B', 'ᴄ': 'C', 'ᴅ': 'D', 'ᴇ': 'E', 'ꜰ': 'F', 'ɢ': 'G', 'ʛ': 'G', 'ʜ': 'H', 'ɪ': 'I', 'ʁ': 'R', 'ᴊ': 'J', 'ᴋ': 'K', 'ʟ': 'L', 'ᴌ': 'L', 'ᴍ': 'M', 'ɴ': 'N', 'ᴏ': 'O', 'ɶ': 'OE', 'ᴐ': 'O', 'ᴕ': 'OU', 'ᴘ': 'P', 'ʀ': 'R', 'ᴎ': 'N', 'ᴙ': 'R', 'ꜱ': 'S', 'ᴛ': 'T', 'ⱻ': 'E', 'ᴚ': 'R', 'ᴜ': 'U', 'ᴠ': 'V', 'ᴡ': 'W', 'ʏ': 'Y', 'ᴢ': 'Z', 'á': 'a', 'ă': 'a', 'ắ': 'a', 'ặ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ǎ': 'a', 'â': 'a', 'ấ': 'a', 'ậ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ä': 'a', 'ǟ': 'a', 'ȧ': 'a', 'ǡ': 'a', 'ạ': 'a', 'ȁ': 'a', 'à': 'a', 'ả': 'a', 'ȃ': 'a', 'ā': 'a', 'ą': 'a', 'ᶏ': 'a', 'ẚ': 'a', 'å': 'a', 'ǻ': 'a', 'ḁ': 'a', 'ⱥ': 'a', 'ã': 'a', 'ꜳ': 'aa', 'æ': 'ae', 'ǽ': 'ae', 'ǣ': 'ae', 'ꜵ': 'ao', 'ꜷ': 'au', 'ꜹ': 'av', 'ꜻ': 'av', 'ꜽ': 'ay', 'ḃ': 'b', 'ḅ': 'b', 'ɓ': 'b', 'ḇ': 'b', 'ᵬ': 'b', 'ᶀ': 'b', 'ƀ': 'b', 'ƃ': 'b', 'ɵ': 'o', 'ć': 'c', 'č': 'c', 'ç': 'c', 'ḉ': 'c', 'ĉ': 'c', 'ɕ': 'c', 'ċ': 'c', 'ƈ': 'c', 'ȼ': 'c', 'ď': 'd', 'ḑ': 'd', 'ḓ': 'd', 'ȡ': 'd', 'ḋ': 'd', 'ḍ': 'd', 'ɗ': 'd', 'ᶑ': 'd', 'ḏ': 'd', 'ᵭ': 'd', 'ᶁ': 'd', 'đ': 'd', 'ɖ': 'd', 'ƌ': 'd', 'ð': 'd', 'ı': 'i', 'ȷ': 'j', 'ɟ': 'j', 'ʄ': 'j', 'ǳ': 'dz', 'ǆ': 'dz', 'é': 'e', 'ĕ': 'e', 'ě': 'e', 'ȩ': 'e', 'ḝ': 'e', 'ê': 'e', 'ế': 'e', 'ệ': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ḙ': 'e', 'ë': 'e', 'ė': 'e', 'ẹ': 'e', 'ȅ': 'e', 'è': 'e', 'ẻ': 'e', 'ȇ': 'e', 'ē': 'e', 'ḗ': 'e', 'ḕ': 'e', 'ⱸ': 'e', 'ę': 'e', 'ᶒ': 'e', 'ɇ': 'e', 'ẽ': 'e', 'ḛ': 'e', 'ꝫ': 'et', 'ḟ': 'f', 'ƒ': 'f', 'ᵮ': 'f', 'ᶂ': 'f', 'ǵ': 'g', 'ğ': 'g', 'ǧ': 'g', 'ģ': 'g', 'ĝ': 'g', 'ġ': 'g', 'ɠ': 'g', 'ḡ': 'g', 'ᶃ': 'g', 'ǥ': 'g', 'ḫ': 'h', 'ȟ': 'h', 'ḩ': 'h', 'ĥ': 'h', 'ⱨ': 'h', 'ḧ': 'h', 'ḣ': 'h', 'ḥ': 'h', 'ɦ': 'h', 'ẖ': 'h', 'ħ': 'h', 'ƕ': 'hv', 'í': 'i', 'ĭ': 'i', 'ǐ': 'i', 'î': 'i', 'ï': 'i', 'ḯ': 'i', 'ị': 'i', 'ȉ': 'i', 'ì': 'i', 'ỉ': 'i', 'ȋ': 'i', 'ī': 'i', 'į': 'i', 'ᶖ': 'i', 'ɨ': 'i', 'ĩ': 'i', 'ḭ': 'i', 'і': 'i', 'ꝺ': 'd', 'ꝼ': 'f', 'ᵹ': 'g', 'ꞃ': 'r', 'ꞅ': 's', 'ꞇ': 't', 'ꝭ': 'is', 'ǰ': 'j', 'ĵ': 'j', 'ʝ': 'j', 'ɉ': 'j', 'ḱ': 'k', 'ǩ': 'k', 'ķ': 'k', 'ⱪ': 'k', 'ꝃ': 'k', 'ḳ': 'k', 'ƙ': 'k', 'ḵ': 'k', 'ᶄ': 'k', 'ꝁ': 'k', 'ꝅ': 'k', 'ĺ': 'l', 'ƚ': 'l', 'ɬ': 'l', 'ľ': 'l', 'ļ': 'l', 'ḽ': 'l', 'ȴ': 'l', 'ḷ': 'l', 'ḹ': 'l', 'ⱡ': 'l', 'ꝉ': 'l', 'ḻ': 'l', 'ŀ': 'l', 'ɫ': 'l', 'ᶅ': 'l', 'ɭ': 'l', 'ł': 'l', 'ǉ': 'lj', 'ſ': 's', 'ẜ': 's', 'ẛ': 's', 'ẝ': 's', 'ḿ': 'm', 'ṁ': 'm', 'ṃ': 'm', 'ɱ': 'm', 'ᵯ': 'm', 'ᶆ': 'm', 'ń': 'n', 'ň': 'n', 'ņ': 'n', 'ṋ': 'n', 'ȵ': 'n', 'ṅ': 'n', 'ṇ': 'n', 'ǹ': 'n', 'ɲ': 'n', 'ṉ': 'n', 'ƞ': 'n', 'ᵰ': 'n', 'ᶇ': 'n', 'ɳ': 'n', 'ñ': 'n', 'ǌ': 'nj', 'ó': 'o', 'ŏ': 'o', 'ǒ': 'o', 'ô': 'o', 'ố': 'o', 'ộ': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ö': 'o', 'ȫ': 'o', 'ȯ': 'o', 'ȱ': 'o', 'ọ': 'o', 'ő': 'o', 'ȍ': 'o', 'ò': 'o', 'ỏ': 'o', 'ơ': 'o', 'ớ': 'o', 'ợ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ȏ': 'o', 'ꝋ': 'o', 'ꝍ': 'o', 'ⱺ': 'o', 'ō': 'o', 'ṓ': 'o', 'ṑ': 'o', 'ǫ': 'o', 'ǭ': 'o', 'ø': 'o', 'ǿ': 'o', 'õ': 'o', 'ṍ': 'o', 'ṏ': 'o', 'ȭ': 'o', 'ƣ': 'oi', 'ꝏ': 'oo', 'ɛ': 'e', 'ᶓ': 'e', 'ɔ': 'o', 'ᶗ': 'o', 'ȣ': 'ou', 'ṕ': 'p', 'ṗ': 'p', 'ꝓ': 'p', 'ƥ': 'p', 'ᵱ': 'p', 'ᶈ': 'p', 'ꝕ': 'p', 'ᵽ': 'p', 'ꝑ': 'p', 'ꝙ': 'q', 'ʠ': 'q', 'ɋ': 'q', 'ꝗ': 'q', 'ŕ': 'r', 'ř': 'r', 'ŗ': 'r', 'ṙ': 'r', 'ṛ': 'r', 'ṝ': 'r', 'ȑ': 'r', 'ɾ': 'r', 'ᵳ': 'r', 'ȓ': 'r', 'ṟ': 'r', 'ɼ': 'r', 'ᵲ': 'r', 'ᶉ': 'r', 'ɍ': 'r', 'ɽ': 'r', 'ↄ': 'c', 'ꜿ': 'c', 'ɘ': 'e', 'ɿ': 'r', 'ś': 's', 'ṥ': 's', 'š': 's', 'ṧ': 's', 'ş': 's', 'ŝ': 's', 'ș': 's', 'ṡ': 's', 'ṣ': 's', 'ṩ': 's', 'ʂ': 's', 'ᵴ': 's', 'ᶊ': 's', 'ȿ': 's', 'ɡ': 'g', 'ᴑ': 'o', 'ᴓ': 'o', 'ᴝ': 'u', 'ť': 't', 'ţ': 't', 'ṱ': 't', 'ț': 't', 'ȶ': 't', 'ẗ': 't', 'ⱦ': 't', 'ṫ': 't', 'ṭ': 't', 'ƭ': 't', 'ṯ': 't', 'ᵵ': 't', 'ƫ': 't', 'ʈ': 't', 'ŧ': 't', 'ᵺ': 'th', 'ɐ': 'a', 'ᴂ': 'ae', 'ǝ': 'e', 'ᵷ': 'g', 'ɥ': 'h', 'ʮ': 'h', 'ʯ': 'h', 'ᴉ': 'i', 'ʞ': 'k', 'ꞁ': 'l', 'ɯ': 'm', 'ɰ': 'm', 'ᴔ': 'oe', 'ɹ': 'r', 'ɻ': 'r', 'ɺ': 'r', 'ⱹ': 'r', 'ʇ': 't', 'ʌ': 'v', 'ʍ': 'w', 'ʎ': 'y', 'ꜩ': 'tz', 'ú': 'u', 'ŭ': 'u', 'ǔ': 'u', 'û': 'u', 'ṷ': 'u', 'ü': 'u', 'ǘ': 'u', 'ǚ': 'u', 'ǜ': 'u', 'ǖ': 'u', 'ṳ': 'u', 'ụ': 'u', 'ű': 'u', 'ȕ': 'u', 'ù': 'u', 'ủ': 'u', 'ư': 'u', 'ứ': 'u', 'ự': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ȗ': 'u', 'ū': 'u', 'ṻ': 'u', 'ų': 'u', 'ᶙ': 'u', 'ů': 'u', 'ũ': 'u', 'ṹ': 'u', 'ṵ': 'u', 'ᵫ': 'ue', 'ꝸ': 'um', 'ⱴ': 'v', 'ꝟ': 'v', 'ṿ': 'v', 'ʋ': 'v', 'ᶌ': 'v', 'ⱱ': 'v', 'ṽ': 'v', 'ꝡ': 'vy', 'ẃ': 'w', 'ŵ': 'w', 'ẅ': 'w', 'ẇ': 'w', 'ẉ': 'w', 'ẁ': 'w', 'ⱳ': 'w', 'ẘ': 'w', 'ẍ': 'x', 'ẋ': 'x', 'ᶍ': 'x', 'ý': 'y', 'ŷ': 'y', 'ÿ': 'y', 'ẏ': 'y', 'ỵ': 'y', 'ỳ': 'y', 'ƴ': 'y', 'ỷ': 'y', 'ỿ': 'y', 'ȳ': 'y', 'ẙ': 'y', 'ɏ': 'y', 'ỹ': 'y', 'ї': 'yi', 'ź': 'z', 'ž': 'z', 'ẑ': 'z', 'ʑ': 'z', 'ⱬ': 'z', 'ż': 'z', 'ẓ': 'z', 'ȥ': 'z', 'ẕ': 'z', 'ᵶ': 'z', 'ᶎ': 'z', 'ʐ': 'z', 'ƶ': 'z', 'ɀ': 'z', 'þ': 'th', 'ﬀ': 'ff', 'ﬃ': 'ffi', 'ﬄ': 'ffl', 'ﬁ': 'fi', 'ﬂ': 'fl', 'ĳ': 'ij', 'œ': 'oe', 'ﬆ': 'st', 'ₐ': 'a', 'ₑ': 'e', 'ᵢ': 'i', 'ⱼ': 'j', 'ₒ': 'o', 'ᵣ': 'r', 'ᵤ': 'u', 'ᵥ': 'v', 'ₓ': 'x', 'Ё': 'YO', 'Й': 'I', 'Ц': 'TS', 'У': 'U', 'К': 'K', 'Е': 'E', 'Н': 'N', 'Г': 'G', 'Ґ': 'G', 'Ш': 'SH', 'Щ': 'SCH', 'З': 'Z', 'Х': 'H', 'Ъ': "'", 'ё': 'yo', 'й': 'i', 'ц': 'ts', 'у': 'u', 'к': 'k', 'е': 'e', 'н': 'n', 'г': 'g', 'ґ': 'g', 'ш': 'sh', 'щ': 'sch', 'з': 'z', 'х': 'h', 'ъ': "'", 'Ф': 'F', 'Ы': 'I', 'В': 'V', 'А': 'a', 'П': 'P', 'Р': 'R', 'О': 'O', 'Л': 'L', 'Д': 'D', 'Ж': 'ZH', 'Э': 'E', 'ф': 'f', 'ы': 'i', 'в': 'v', 'а': 'a', 'п': 'p', 'р': 'r', 'о': 'o', 'л': 'l', 'д': 'd', 'ж': 'zh', 'э': 'e', 'Я': 'Ya', 'Ч': 'CH', 'С': 'S', 'М': 'M', 'И': 'I', 'Т': 'T', 'Ь': "'", 'Б': 'B', 'Ю': 'YU', 'я': 'ya', 'ч': 'ch', 'с': 's', 'м': 'm', 'и': 'i', 'т': 't', 'ь': "'", 'б': 'b', 'ю': 'yu' };
                return (typeof str === 'string' && str.replace(/[^A-Za-z0-9]/g, function(c) { return _latin[c] || c })) || null;
            },
            start: function(str) {
                return (typeof str === 'string' && str.split(/[-_.\\\/\s]/g).map(function(w, i) { return (w[0]).toUpperCase() + (w.slice(1)).toLowerCase() }).join(' ')) || null;
            },
            camel: function(str) {
                return (typeof str === 'string' && str.split(/[-_.\\\/\s]/g).map(function(w, i) { return i ? (w[0]).toUpperCase() + (w.slice(1)).toLowerCase() : (w).toLowerCase() }).join('')) || null;
            },
            kebab: function(str) {
                return (typeof str === 'string' && str.split(/[-_.\\\/\s]/g).map(function(w, i) { return (w).toLowerCase() }).join('-')) || null;
            },
            snake: function(str) {
                return (typeof str === 'string' && str.split(/[-_.\\\/\s]/g).map(function(w, i) { return (w).toLowerCase() }).join('_')) || null;
            },
            first: function(str) {
                return ((typeof str === 'string' || Array.isArray(str)) && str[0]) || null;
            },
            clean: function(str, tar) {
                return typeof str === 'string' && str.replace(tar, '') || null;
            },
            slice: function(str, is, ie) {
                return ((typeof str === 'string' || Array.isArray(str)) && str.slice(is, ie)) || null;
            },
            shrink: function(str, lim, end) {
                return (typeof str === 'string' && str.slice(0, lim) + (end || '...')) || null;
            },
            size: function(str) {
                return ((typeof str === 'string' || Array.isArray(str)) && str.length) || null;
            },
            date: function(str, fom) {
                var _tran = {
                    _date: function(date, formatStr) {
                        formatStr = formatStr || 'yyyy-MM-dd';
                        var tokens = formatStr.match(/(\w)\1*|''|'(''|[^'])+('|$)|./g);
                        if (!tokens) return date;
                        date = new Date(date);
                        var result = tokens.map(function(substring) {
                            if (substring === '\'\'') {
                                return '\'';
                            }
                            var firstCharacter = substring[0];
                            if (firstCharacter === '\'') {
                                return _tran._clean(substring);
                            }
                            var formatter = _tran._action(firstCharacter);
                            if (formatter) {
                                return formatter(date, substring);
                            }
                            return substring;
                        }).join('');
                        return result;
                    },
                    _action: function(format) {
                        var formatters = {
                            // Year
                            y: function y(date, token) {
                                var signedYear = date.getFullYear();
                                var year = signedYear > 0 ? signedYear : 1 - signedYear;
                                return _tran._zeros(token === 'yy' ? year % 100 : year, token.length);
                            },
                            // Month
                            M: function M(date, token) {
                                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                var month = date.getMonth();
                                switch (token) {
                                    case 'MMM':
                                        return months[month].slice(0, 3);
                                    case 'MMMM':
                                        return months[month];
                                    default:
                                        return _tran._zeros(month + 1, token.length);
                                }
                            },
                            // Day of the month
                            d: function d(date, token) {
                                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                switch (token) {
                                    case 'ddd':
                                        return days[date.getDay()].slice(0, 3);
                                    case 'dddd':
                                        return days[date.getDay()];
                                    default:
                                        return _tran._zeros(date.getDate(), token.length);
                                }
                            },
                            // AM or PM
                            a: function a(date, token) {
                                var dayPeriodEnumValue = date.getHours() / 12 >= 1 ? 'pm' : 'am';

                                switch (token) {
                                    case 'a':
                                    case 'aa':
                                        return dayPeriodEnumValue.toUpperCase();
                                    case 'aaa':
                                        return dayPeriodEnumValue;
                                    case 'aaaaa':
                                        return dayPeriodEnumValue[0];
                                    case 'aaaa':
                                    default:
                                        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
                                }
                            },
                            // Hour [1-12]
                            h: function h(date, token) {
                                return _tran._zeros(date.getHours() % 12 || 12, token.length);
                            },
                            // Hour [0-23]
                            H: function H(date, token) {
                                return _tran._zeros(date.getHours(), token.length);
                            },
                            // Minute
                            m: function m(date, token) {
                                return _tran._zeros(date.getMinutes(), token.length);
                            },
                            // Second
                            s: function s(date, token) {
                                return _tran._zeros(date.getSeconds(), token.length);
                            },
                            // Fraction of second
                            S: function S(date, token) {
                                var numberOfDigits = token.length;
                                var milliseconds = date.getMilliseconds();
                                var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
                                return _tran._zeros(fractionalSeconds, token.length);
                            }
                        };
                        return formatters[format]
                    },
                    _zeros: function(nbr, len) {
                        var sign = nbr < 0 ? '-' : '';
                        var output = Math.abs(nbr).toString();
                        while (output.length < len) {
                            output = '0' + output;
                        }
                        return sign + output;
                    },
                    _clean: function(input) {
                        var matches = input.match(/^'([^]*?)'?$/);
                        if (!matches) {
                            return input;
                        }
                        return matches[1].replace(/''/g, '\'');
                    }
                }
                return (typeof str === 'string' && _tran._date(new Date(str), fom)) || null
            },
            split: function(str, spr, lim) {
                return (typeof str === 'string' && str.split(spr, (lim ? lim : 9999999999999999999999999))) || null;
            },
            replace: function(str, tar, rep) {
                return (typeof str === 'string' && str.replace(tar, rep)) || null;
            },
            decamel: function(str, sep) {
                return (typeof str === 'string' && str.replace(/[A-Z0-9]/g, function(c, i) { return (i ? (sep || ' ') : '') + (c).toLowerCase() })) || null;
            },
            reverse: function(str) {
                return (typeof str === 'string' && [...str].reverse().join('') || Array.isArray(str) && [...str].reverse()) || null;
            },
            escape: function(str) {
                return (typeof str === 'string' && str.replace(/[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u00FF]/g, function(c) { return '&#' + ('000' + c.charCodeAt(0)).slice(-4) + ';' })) || null;
            },
            padEnd: function(str, len, fil) {
                return (typeof str === 'string' && str.padEnd(len, (fil ? fil : ' '))) || null;
            },
            trimEnd: function(str) {
                return (typeof str === 'string' && str.trimEnd()) || null;
            },
            endWith: function(str, ser) {
                return (typeof str === 'string' && str.endsWith(ser)) || null;
            },
            upperEnd: function(str) {
                return (typeof str === 'string' && str.slice(0, -1) + (str.slice(-1)).toUpperCase()) || null;
            },
            lowerEnd: function(str) {
                return (typeof str === 'string' && str.slice(0, -1) + (str.slice(-1)).toLowerCase()) || null;
            },
            padStart: function(str, len, fil) {
                return (typeof str === 'string' && str.padStart(len, (fil ? fil : ' '))) || null;
            },
            trimStart: function(str) {
                return (typeof str === 'string' && str.trimStart()) || null;
            },
            startWith: function(str, ser) {
                return (typeof str === 'string' && str.startsWith(ser)) || null;
            },
            upperStart: function(str) {
                return (typeof str === 'string' && (str[0]).toUpperCase() + str.slice(1)) || null;
            },
            lowerStart: function(str) {
                return (typeof str === 'string' && (str[0]).toLowerCase() + str.slice(1)) || null;
            }
        },
        __cache__: [],
        __data__: {},
    };

    var error = function(e, c) {
        var ls = c.split('\n');
        var l = ls.length - 1;
        var p = ls[l].length + 2;
        var m = e.message;
        var _ = (/__XOBuild__.__filters__.(.*) is not a function/g).exec(m)
        if (_) {
            console.error('XOFilterError: ' + _[1] + ' is not a valid filter @' + l + '/' + p);
        } else {
            console.error('XOReferenceError: ' + m + ' @' + l + '/' + p);
        }
        return void 0;
    }

    var each = function(obj, func) {
        if (obj == null) {
            return obj;
        }
        var index = -1;
        if (Array.isArray(obj)) {
            const length = obj.length;
            var count = 1;
            while (++index < length) {
                if (func(obj[index], index, count, count - 1) === false) {
                    break;
                }
                count++;
            }
        }
        var key = Object.keys(obj);
        const length = key.length;
        var count = 1;
        while (++index < length) {
            if (func(obj[key[index]], key[index], count, count - 1) === false) {
                break;
            }
            count++;
        }
    }

    var loop = function(times, func) {
        for (var i = 0; i < times; i++) {
            func(i + 1, i);
        }
    }

    var json = function(obj) {
        var sobj = '',
            i;
        for (i in obj)
            if (obj.hasOwnProperty(i)) {
                sobj += '\t\"' + i + '\": ' + type(obj[i]) + ',\r\n\t';
            }
        return ('{\r\n\t' + sobj + '}').replaceAll("\\\"", "\'")
    }

    var type = function(obj) {
        if (['string', 'number', 'boolean', 'undefined'].includes(typeof obj) || obj === null) return obj == undefined ? 'undefined' : obj == NaN ? 'NaN' : JSON.stringify(obj);
        if (typeof obj === 'function') return obj.toString();
        if (Array.isArray(obj)) {
            var code = '[';
            for (var itm of obj) {
                code += type(itm) + ',';
            }
            return code + ']';
        }
        if (typeof obj === 'object') return json(obj)
    }

    var setter = function(code, data, wait, def = true) {
        return (def ? '__XOBuild__.__data__ = ' + json(data) + '\r\ntemplate = ' + (wait ? 'async ' : '') : '\r\ntemplate = ') + "function(__self__) {\r\n\tvar type = " + type.toString() + "\r\n\tvar json = " + json.toString() + "\r\n\tvar each = " + each.toString() + "\r\n\tvar error = " + error.toString() + "\r\n\tvar loop = " + loop.toString() + "\r\n\tvar __temp = \'\';\r\n\twith(__self__ || {}) {\r\n\t\ttry {\r\n\t\t\t" + code + "\r\n\t\t} catch(e) {\r\n\t\t\treturn error(e, __temp);\r\n\t\t}\r\n\t}\r\n\treturn __temp;\r\n}\r\nreturn template;";
    }

    var join = function(code, ...vars) {
        code = code.raw;
        let all = [];
        vars.forEach(function(v, i) {
            all.push(code[i]);
            all.push(v);
        });
        all.push(code[code.length - 1]);
        return all.join("");
    }

    var gets = function(code) {
        var matches = {};
        var blocks = code.match(/{{[ ]{0,}block (.*)[ ]{0,}}}([\s\S]*?){{[ ]{0,}\/block[ ]{0,}}}/g);
        var names = code.match(/{{[ ]{0,}block (.*)[ ]{0,}}}/g);
        if (names) names.forEach(name => {
            var _block, _name = name.replace(/{{|}}|block/g, '').trim();
            for (var block of blocks) {
                if (block.startsWith(name)) _block = block;
            }
            var end = _block.match(/{{[]{0,}\/block[ ]{0,}}}/g)[0];
            _block = _block.slice(name.length, -end.length).trim();
            matches[_name] = _block;
        });
        return matches;
    }

    var filter = function(code) {
        var found = REGEX.FIL.exec(code);
        if (found !== null) {
            var fils = found[2].split("|"),
                name = found[1],
                data = fils.reduce(function(a, f) {
                    if (!f.trim().length) return a;
                    var e = /([A-Za-z]+)(.*)*/g.exec(f),
                        p = e[2] && e[2].slice(1).slice(0, -1),
                        n = e[1];
                    return (a.length) ? a = "__XOBuild__.__filters__." + n + "(" + a + (p ? ", " + p : "") + ")" : a = "__XOBuild__.__filters__." + n + "(" + name + (p ? ", " + p : "") + ")";
                }, "");
            return code.replace(found[0], " " + data + " ")
        }
        return code
    }

    var parser = function(code, def = true) {
        // Parse code line has parameter
        var found, code = filter(code);
        found = REGEX.COD.exec(code);
        if (found) {
            found = [...found].reduce(function(a, i) {
                if (i) a.push(i);
                return a;
            }, []).slice(1);
            switch (found[0]) {
                case '#':
                    var props = found[2] ? ',' + found[2].split(',').map(function(p) {
                        p = p.trim();
                        return p.startsWith(':') ? '${typeof ' + p.slice(1) + ' == \'string\' ? \'\\\'\' + ' + p.slice(1) + ' + \'\\\'\' : type(' + p.slice(1) + ')}' : p
                    }).join(', ') : '';
                    return def ? '__temp += `__XOBuild__.__data__.' + found[1] + '(__XOBuild__.__data__' + props + ')`;' :
                        '__temp += `__self__.' + found[1] + '(' + props.slice(1) + ')`;';
                case '##':
                    return '/*' + found[1] + '*/';
                case 'log':
                    return 'console.log(' + found[1] + ');';
                case 'warn':
                    return 'console.warn(' + found[1] + ');';
                case 'error':
                    return 'console.error(' + found[1] + ');';
                case 'define':
                    return 'var ' + found[1] + ';';
                case 'if':
                    return 'if(' + found[1] + ') {';
                case 'elif':
                    return '} else if(' + found[1] + ') {';
                case 'while':
                    return 'while(' + found[1] + ') {';
                case 'loop':
                    return 'loop(' + found[1] + ', function(__round__, __index__) {';
                case 'each':
                    return 'each(' + found[2] + ', function(' + found[1] + ', __key__, __round__, __index__) {';
            }
        }

        // Parse code line has only keyword
        switch (code) {
            case 'break':
                return 'return false;';
            case 'continue':
                return 'return true;';
            case 'else':
                return '} else {';
            case '/each':
            case '/loop':
                return '});';
            case '/if':
            case '/while':
                return '}';
        }
        // String return
        return '__temp += ' + code + ';';
    }

    var run = function(code, data) {
        return new Function('', code)()(data)
    }

    var lexer = function(code, def = true) {
        // Parse main contain
        var cursor = 0;
        var left = '';
        var _code = '';
        var found = null;
        var i = 0;
        while (found = REGEX.PRI.exec(code)) {
            left = code.slice(cursor, found.index);
            _code += "\t\t\t/*" + (++i) + "*/__temp += `" + left.replace(/\r\n  +|\r\n/g, '') + "`;\n";
            var jsCode = parser(found[1], def);
            parser("", def)
            _code += "\t\t\t/*" + (++i) + "*/" + jsCode + '\n';
            cursor = found.index + found[0].length;
        }
        var right = code.substr(cursor, code.length - cursor);
        _code += "\t\t\t/*" + (++i) + "*/__temp += `" + right.replace(/\r\n  +|\r\n/g, '') + "`;";
        // Parse layout if available
        return _code;
    }

    var render = function(code, data = {}) {
        var _code = lexer(code, false);
        _code = setter(_code, data, false, false);
        return run(_code, data);
    }

    var require = async function(f) {
        var r = await fetch(location.origin + (!f.startsWith('/') ? '/' : '') + f);
        if (r.status !== 200) {
            return "";
        }
        return await r.text();
    }

    var extend = async function(code) {
        // Check layout
        // Layout must be declared {{ extend filename }} at first line of template file (or code)
        var firstNewLinePos = code.indexOf("\n");
        var firstLine = code.substring(0, firstNewLinePos);
        var layout = REGEX.EXT.exec(firstLine);
        if (layout != null) {
            layout = layout[1];
            code = code.substring(firstNewLinePos + 1);
        }
        if (layout) {
            var layoutCode = await require(layout),
                matches = gets(code),
                found;
            while (found = /{{__(.*)__}}/g.exec(layoutCode)) {
                var name = found[1],
                    hold = found[0];
                layoutCode = layoutCode.replace(hold, matches[name]);
            }
            //code = layoutCode.replace('{{__content__}}', code);
            code = layoutCode;
        }
        return code
    }

    var include = async function(code) {
        var match,
            cursor,
            found = [];
        while ((match = REGEX.INC.exec(code))) {
            found.push({
                hold: match[0],
                path: match[1]
            })
            cursor = match.index + match[0].length;
        }
        for (var fn of found) {
            var _code = await require(fn.path);
            _code = code.replace(fn.hold, _code);
            code = await include(_code);
        }
        return code
    }

    var pre = function(code, data) {
        var found = __XOBuild__.__cache__.find(function(v) { return v.template == code })
        if (found) {
            return run(found['parsed'], data);
        }
        __XOBuild__.__cache__.push({ template: code });
    }

    var asyncLexer = async function(code) {
        code = await extend(code);
        extend("");
        return lexer(code);
    }

    var asyncBuild = async function(code, data = {}) {
        var _code = await include(code);
        _code = await asyncLexer(_code);
        _code = setter(_code, data, true);
        __XOBuild__.__cache__[__XOBuild__.__cache__.length - 1]['parsed'] = _code;
        return run(_code, data);
    }

    var asyncRender = function(data, ...vars) {
        if (Array.isArray(data)) {
            var code = join(data, ...vars);
            return (async function(code) {
                return await pre(code) || asyncBuild(code);
            })(code);
        } else if (typeof data === "string") {
            return (async function(code) {
                return await pre(code) || asyncBuild(code);
            })(data)
        } else {
            return async function(code, ...vars) {
                if (Array.isArray(code)) {
                    code = join(code, ...vars);
                    return await pre(code, data) || asyncBuild(code, data);
                } else {
                    return await pre(code, data) || asyncBuild(code, data);
                }
            }
        }
    }

    var asyncLoader = async function(data, path) {
        var found = __XOBuild__.__cache__.find(function(v) { return v.path == path })
        if (found) {
            return run(found['parsed'], data);
        }
        __XOBuild__.__cache__.push({ path });
        var code = await require(path);
        return await asyncBuild(code, data);

    }

    var createFilter = function(name, fn) {
        if (Object.keys(__XOBuild__.__filters__).includes(name)) return;
        __XOBuild__.__filters__[name] = fn;
    }

    var XOBuild = {
        filter: createFilter,
        loader: asyncLoader,
        render: asyncRender
    }

    window.XOBuild = XOBuild;

    var t = render(`{{#click(:s,:n,:b,:u,:a,:o)}}`, {
        click: (...e) => { console.log(...e) },
        s: "test",
        n: 10,
        b: false,
        u: undefined,
        a: [1, 2, 3, 4],
        o: {
            n: 10,
            a: [1, 2, 3, 4],
        },
    });
    console.log(t);

    return {
        render,
        XOBuild
    }
})();