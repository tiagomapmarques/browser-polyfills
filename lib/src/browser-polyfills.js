"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promisePolyfill = require("promise-polyfill");
var setImmediate = require("setasap");
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
