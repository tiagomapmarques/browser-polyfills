import * as setPolyfill from 'es6-set';
import * as mapPolyfill from 'es6-map';
import * as arrayFindPolyfill from 'array.prototype.find';
import * as promisePolyfill from 'promise-polyfill';
import * as setImmediate from 'setasap';
import * as rafPolyfill from 'raf';

interface WindowWithPromise extends Window {
  Map: typeof mapPolyfill;
  Set: typeof setPolyfill;
  Promise: typeof promisePolyfill | undefined;
}

declare var window: WindowWithPromise;

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
if (!(Array.prototype as any).find) {
  arrayFindPolyfill.shim();
}

import 'whatwg-fetch';

if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
  window.requestAnimationFrame = rafPolyfill;
  window.cancelAnimationFrame = rafPolyfill.cancel;
}

const finalFetch = window.fetch;
const finalPromise: typeof promisePolyfill = window.Promise;

window.fetch = (input, init) => {
  try {
    return finalFetch(input, init);
  } catch (error) {
    return new finalPromise((_, reject) => reject(error));
  }
};
