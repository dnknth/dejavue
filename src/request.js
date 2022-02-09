"use strict";

function HttpError(xhr) {
  this.name = 'HttpError';
  this.message = xhr.statusText;
  this.statusCode = xhr.status;
  const err = Error(xhr.statusText); // http://es5.github.io/#x15.11.1
  this.stack = err.stack;
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;


/* See: https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr#30008115
 * 
 * opts = {
 *   method: String,
 *   url: String,
 *   data: String | Object,
 *   headers: Object,
 *   responseType: String,
 *   binary: Boolean,
 * }
 */
export function request(opts) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'GET', opts.url);
    if (opts.responseType) xhr.responseType = opts.responseType;
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr);
      } else {
        reject(new HttpError(xhr));
      }
    };
    xhr.onerror = function () {
      reject(new HttpError(xhr));
    };
    if (opts.headers) {
      Object.keys(opts.headers).forEach(function (key) {
        xhr.setRequestHeader(key, opts.headers[key]);
      });
    }
    var params = opts.data;
    // We'll need to stringify if we've been given an object
    // If we have a string, this is skipped.
    if (params && typeof params === 'object' && !opts.binary) {
      params = Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');
    }
    xhr.send(params);
  });
}
