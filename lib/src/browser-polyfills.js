"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promisePolyfill = require("promise-polyfill");
var setImmediate = require("setasap");
if (!window.Promise) {
    window.Promise = promisePolyfill;
    window.Promise._immediateFn = setImmediate;
}
require("whatwg-fetch");
