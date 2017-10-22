"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("whatwg-fetch");
var Promise = require("promise-polyfill");
var setImmediate = require("setasap");
if (!window.Promise) {
    window.Promise = Promise;
    Promise._immediateFn = setImmediate;
}
