import * as promisePolyfill from 'promise-polyfill';
import * as setImmediate from 'setasap';

interface WindowWithPromise extends Window {
  Promise: typeof promisePolyfill | undefined;
}

declare var window: WindowWithPromise;

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
