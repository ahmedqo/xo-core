module.exports = (function() {
    'use strict';

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

        if (files instanceof FileList)
            this.files = [].slice.call(files);

    }

    XOImage.fn = XOImage.prototype;

    /**
     * get list of object with name and dataurl of filelist images
     * @return Object
     */
    XOImage.fn.toDataUrl = function() {
        let allow = ["jpg", "png", "gif", "webp", "tiff", "psd", "raw", "bmp", "heif", "indo", "jpeg"],
            res = [];
        for (let f of this.files) {
            if (allow.includes(f.name.split(".").pop())) {
                let r = new FileReader();
                r.readAsDataURL(f);
                r.onload = function() {
                    res.push({ name: f.name, value: this.result });
                }
            }
        }
        return res;
    }

    /**
     * get list of object with name and array buffer of filelist images
     * @return Object
     */
    XOImage.fn.toArrayBuffer = function() {
        let allow = ["jpg", "png", "gif", "webp", "tiff", "psd", "raw", "bmp", "heif", "indo", "jpeg"],
            res = [];
        for (let f of this.files) {
            if (allow.includes(f.name.split(".").pop())) {
                let r = new FileReader();
                r.readAsArrayBuffer(f);
                r.onload = function() {
                    res.push({ name: f.name, value: this.result });
                }
            }
        }
        return res;
    }

    /**
     * get list of object with name and binary string of filelist images
     * @return Object
     */
    XOImage.fn.toBinaryString = function() {
        let allow = ["jpg", "png", "gif", "webp", "tiff", "psd", "raw", "bmp", "heif", "indo", "jpeg"],
            res = [];
        for (let f of this.files) {
            if (allow.includes(f.name.split(".").pop())) {
                let r = new FileReader();
                r.readAsBinaryString(f);
                r.onload = function() {
                    res.push({ name: f.name, value: this.result });
                }
            }
        }
        return res;
    }

    /**
     * convert array buffer to url and blob
     * @param {Array<ArrayBuffer>} buffer 
     * @return Array
     */
    XOImage.fromArrayBuffer = function(buffers) {
        var res = [];
        for (var buffer of buffers) {
            if (buffer instanceof ArrayBuffer) {
                var arrayBufferView = new Uint8Array(buffer);
                var blob = new Blob([arrayBufferView], { type: "image/png" });
                var urlCreator = window.URL || window.webkitURL;
                var url = urlCreator.createObjectURL(blob);
                res.push({ url, blob });
            }
        }
        return res;
    }

    return XOImage;

})();