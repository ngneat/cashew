import { HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { CacheBucket } from '../cacheBucket';
import { defaultConfig } from '../httpCacheConfig';
import { DefaultHttpCacheGuard } from '../httpCacheGuard';
import { HttpCacheManager } from '../httpCacheManager.service';
import { DefaultHttpCacheStorage } from '../httpCacheStorage';
import { DefaultKeySerializer } from '../keySerializer';
import { RequestsQueue } from '../requestsQueue';
import { DefaultTTLManager } from '../ttlManager';
import { RequestsCache } from '../requestsCache';

export const frame = 1000;
export const config = defaultConfig;
export const ttl = config.ttl;

export const httpRequest = (method: string = 'GET', options: any = {}, url: string = 'api/mock') =>
  new HttpRequest(method, url, {}, options);
export const httpResponse = () => new HttpResponse();
export const requestQueue = () => new RequestsQueue();
export const cacheBucket = () => new CacheBucket();
export const httpCacheStorage = () => new DefaultHttpCacheStorage();
export const httpCacheGuard = () => new DefaultHttpCacheGuard();
export const ttlManager = (conf = config) => new DefaultTTLManager(conf);
export const keySerializer = () => new DefaultKeySerializer();
export const httpCacheManager = (conf = config) =>
  new HttpCacheManager(requestQueue(), httpCacheStorage(), httpCacheGuard(), ttlManager(conf), new RequestsCache(), conf);

export function localStorageMock() {
  const localStorageMock = (function () {
    let store = {};
    return {
      getItem: function (key) {
        return store[key];
      },
      setItem: function (key, value) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
      removeItem: function (key) {
        delete store[key];
      }
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
}
