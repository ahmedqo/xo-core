// module.exports = (function() {
//     /**
//      * XOImage constructor
//      * @param {FileList} files
//      * @return XOImage
//      */
//     function XOImage(files) {

//         if (files instanceof XOImage) {
//             return files;
//         }

//         if (!(this instanceof XOImage)) {
//             return new XOImage(files);
//         }

//         this.files = [];

//         if (files instanceof FileList)
//             this.files = [].slice.call(files);

//     }

//     XOImage.fn = XOImage.prototype;

//     /**
//      * get list of object with name and dataurl of filelist images
//      * @return Object
//      */
//     XOImage.fn.toDataUrl = function() {
//         let allow = ["jpg", "png", "gif", "webp", "tiff", "psd", "raw", "bmp", "heif", "indo", "jpeg"],
//             res = [];
//         for (let f of this.files) {
//             if (allow.includes(f.name.split(".").pop())) {
//                 let r = new FileReader();
//                 r.readAsDataURL(f);
//                 r.onload = function() {
//                     res.push({ name: f.name, value: this.result });
//                 }
//             }
//         }
//         return res;
//     }

//     /**
//      * get list of object with name and array buffer of filelist images
//      * @return Object
//      */
//     XOImage.fn.toArrayBuffer = function() {
//         let allow = ["jpg", "png", "gif", "webp", "tiff", "psd", "raw", "bmp", "heif", "indo", "jpeg"],
//             res = [];
//         for (let f of this.files) {
//             if (allow.includes(f.name.split(".").pop())) {
//                 let r = new FileReader();
//                 r.readAsArrayBuffer(f);
//                 r.onload = function() {
//                     res.push({ name: f.name, value: this.result });
//                 }
//             }
//         }
//         return res;
//     }

//     /**
//      * get list of object with name and binary string of filelist images
//      * @return Object
//      */
//     XOImage.fn.toBinaryString = function() {
//         let allow = ["jpg", "png", "gif", "webp", "tiff", "psd", "raw", "bmp", "heif", "indo", "jpeg"],
//             res = [];
//         for (let f of this.files) {
//             if (allow.includes(f.name.split(".").pop())) {
//                 let r = new FileReader();
//                 r.readAsBinaryString(f);
//                 r.onload = function() {
//                     res.push({ name: f.name, value: this.result });
//                 }
//             }
//         }
//         return res;
//     }

//     /**
//      * convert array buffer to url and blob
//      * @param {Array<ArrayBuffer>} buffer
//      * @return Array
//      */
//     XOImage.fromArrayBuffer = function(buffers) {
//         var res = [];
//         for (var buffer of buffers) {
//             if (buffer instanceof ArrayBuffer) {
//                 var arrayBufferView = new Uint8Array(buffer);
//                 var blob = new Blob([arrayBufferView], { type: "image/png" });
//                 var urlCreator = window.URL || window.webkitURL;
//                 var url = urlCreator.createObjectURL(blob);
//                 res.push({ url, blob });
//             }
//         }
//         return res;
//     }

//     return XOImage;

// })();

("use strict");

module.exports = function() {
    /**
     * XOImage constructor
     * @param {FileList} files 
     * @return XOImage
     */
    function XOImage(files) {

        if (files instanceof XOImage) {
            return files;
        }

        if (!(this instanceof XOImage)) {
            return new XOImage(files);
        }

        this.files = [];

        if (files instanceof FileList) this.files = [].slice.call(files);
    }

    XOImage.fn = XOImage.prototype;

    /**
     * get list of object with name and dataurl of filelist images
     * @return Object
     */
    XOImage.fn.toDataUrl = function() {
        var allow = ["jpg", "png", "gif", "webp", "tiff", "psd", "raw", "bmp", "heif", "indo", "jpeg"],
            res = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            var _loop = function _loop() {
                var f = _step.value;

                if (allow.includes(f.name.split(".").pop())) {
                    var r = new FileReader();
                    r.readAsDataURL(f);
                    r.onload = function() {
                        res.push({ name: f.name, value: this.result });
                    };
                }
            };

            for (var _iterator = this.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _loop();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return res;
    };

    /**
     * get list of object with name and array buffer of filelist images
     * @return Object
     */
    XOImage.fn.toArrayBuffer = function() {
        var allow = ["jpg", "png", "gif", "webp", "tiff", "psd", "raw", "bmp", "heif", "indo", "jpeg"],
            res = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            var _loop2 = function _loop2() {
                var f = _step2.value;

                if (allow.includes(f.name.split(".").pop())) {
                    var r = new FileReader();
                    r.readAsArrayBuffer(f);
                    r.onload = function() {
                        res.push({ name: f.name, value: this.result });
                    };
                }
            };

            for (var _iterator2 = this.files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                _loop2();
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return res;
    };

    /**
     * get list of object with name and binary string of filelist images
     * @return Object
     */
    XOImage.fn.toBinaryString = function() {
        var allow = ["jpg", "png", "gif", "webp", "tiff", "psd", "raw", "bmp", "heif", "indo", "jpeg"],
            res = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            var _loop3 = function _loop3() {
                var f = _step3.value;

                if (allow.includes(f.name.split(".").pop())) {
                    var r = new FileReader();
                    r.readAsBinaryString(f);
                    r.onload = function() {
                        res.push({ name: f.name, value: this.result });
                    };
                }
            };

            for (var _iterator3 = this.files[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                _loop3();
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return res;
    };

    /**
     * convert array buffer to url and blob
     * @param {Array<ArrayBuffer>} buffer 
     * @return Array
     */
    XOImage.fromArrayBuffer = function(buffers) {
        var res = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = buffers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var buffer = _step4.value;

                if (buffer instanceof ArrayBuffer) {
                    var arrayBufferView = new Uint8Array(buffer);
                    var blob = new Blob([arrayBufferView], { type: "image/png" });
                    var urlCreator = window.URL || window.webkitURL;
                    var url = urlCreator.createObjectURL(blob);
                    res.push({ url: url, blob: blob });
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        return res;
    };

    return XOImage;
}();