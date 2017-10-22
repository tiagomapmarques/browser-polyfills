
import 'whatwg-fetch';

import * as Promise from 'promise-polyfill';
import * as setImmediate from 'setasap';

if (!(<any> window).Promise) {
  (<any> window).Promise = Promise;
  (<any> Promise)._immediateFn = setImmediate;
}
