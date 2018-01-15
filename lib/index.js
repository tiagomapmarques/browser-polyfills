"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setPolyfill = require("es6-set");
var mapPolyfill = require("es6-map");
var arrayFindPolyfill = require("array.prototype.find");
var promisePolyfill = require("promise-polyfill");
var setImmediate = require("setasap");
var rafPolyfill = require("raf");
if (!window.Set) {
    window.Set = setPolyfill;
}
if (!window.Map) {
    window.Map = mapPolyfill;
}
if (!window.Promise) {
    window.Promise = promisePolyfill;
    window.Promise._immediateFn = setImmediate;
}
// tslint:disable-next-line:no-any
if (!Array.prototype.find) {
    arrayFindPolyfill.shim();
}
require("whatwg-fetch");
if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
    window.requestAnimationFrame = rafPolyfill;
    window.cancelAnimationFrame = rafPolyfill.cancel;
}
var finalFetch = window.fetch;
var finalPromise = window.Promise;
window.fetch = function (input, init) {
    try {
        return finalFetch(input, init);
    }
    catch (error) {
        return new finalPromise(function (_, reject) { return reject(error); });
    }
};
