import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { deleteByRegex } from './deleteByRegex';
import { DefaultHttpCacheStorage, HttpCacheStorage } from './httpCacheStorage';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';
import { getLocalStorageValue } from './getLocalStorageValue';
import { setLocalStorageValue } from './setLocalStorageValue';

@Injectable()
export class HttpCacheLocalStorage implements HttpCacheStorage {
  private readonly cache = new DefaultHttpCacheStorage();
  private readonly storageKey: string;

  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
    this.storageKey = config.localStorageKey;
  }

  has(key: string): boolean {
    return this.cache.has(key) || getLocalStorageValue(this.storageKey).has(key);
  }

  get(key: string): HttpResponse<any> {
    const cacheValue = this.cache.get(key);
    if (cacheValue) {
      return cacheValue;
    }

    const value = getLocalStorageValue(this.storageKey).get(key);
    if (value) {
      const response = new HttpResponse(value);
      this.cache.set(key, response);
    }

    return this.cache.get(key);
  }

  set(key: string, response: HttpResponse<any>): void {
    const storage = getLocalStorageValue(this.storageKey);
    storage.set(key, response);
    setLocalStorageValue(this.storageKey, storage);
    this.cache.set(key, response);
  }

  delete(key?: string | RegExp): void {
    this.cache.delete(key);

    if (!key) {
      localStorage.removeItem(this.storageKey);
      return;
    }

    const storage = getLocalStorageValue(this.storageKey);

    if (typeof key === 'string') {
      storage.delete(key);
      setLocalStorageValue(this.storageKey, storage);
      return;
    }

    deleteByRegex(key as RegExp, storage);
    setLocalStorageValue(this.storageKey, storage);
  }
}
