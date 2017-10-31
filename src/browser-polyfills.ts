
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
