"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setPolyfill = require("es6-set");
var mapPolyfill = require("es6-map");
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
require("whatwg-fetch");
var polyFetch = window.fetch;
var polyPromise = window.Promise;
window.fetch = function (input, init) {
    try {
        return polyFetch(input, init);
    }
    catch (error) {
        return new polyPromise(function (_, reject) { return reject(error); });
    }
};
if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
    window.requestAnimationFrame = rafPolyfill;
    window.cancelAnimationFrame = rafPolyfill.cancel;
}
