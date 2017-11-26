import * as setPolyfill from 'es6-set';
import * as mapPolyfill from 'es6-map';
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

import 'whatwg-fetch';

const polyFetch = window.fetch;
const polyPromise: typeof promisePolyfill = window.Promise;

window.fetch = (input, init) => {
  try {
    return polyFetch(input, init);
  } catch (error) {
    return new polyPromise((_, reject) => reject(error));
  }
};

if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
  window.requestAnimationFrame = rafPolyfill;
  window.cancelAnimationFrame = rafPolyfill.cancel;
}
