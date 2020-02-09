import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { deleteByRegex } from '../deleteByRegex';
import { DefaultHttpCacheStorage, HttpCacheStorage } from '../httpCacheStorage';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from '../httpCacheConfig';
import { setCacheInStorage, getStorageCache, clearStorageCache } from './localstorage';

@Injectable()
export class HttpCacheLocalStorage implements HttpCacheStorage {
  private readonly cache = new DefaultHttpCacheStorage();
  private readonly storageKey: string;

  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
    this.storageKey = config.localStorageKey;
  }

  has(key: string): boolean {
    return this.cache.has(key) || getStorageCache(this.storageKey).has(key);
  }

  get(key: string): HttpResponse<any> {
    const cacheValue = this.cache.get(key);
    if (cacheValue) {
      return cacheValue;
    }

    const value = getStorageCache(this.storageKey).get(key);
    if (value) {
      const response = new HttpResponse(value);
      this.cache.set(key, response);
    }

    return this.cache.get(key);
  }

  set(key: string, response: HttpResponse<any>): void {
    const storage = getStorageCache(this.storageKey);
    storage.set(key, response);
    setCacheInStorage(this.storageKey, storage);
    this.cache.set(key, response);
  }

  delete(key?: string | RegExp): void {
    this.cache.delete(key);

    if (!key) {
      clearStorageCache(this.storageKey);
      return;
    }

    const storage = getStorageCache(this.storageKey);

    if (typeof key === 'string') {
      storage.delete(key);
      setCacheInStorage(this.storageKey, storage);
      return;
    }

    deleteByRegex(key as RegExp, storage);
    setCacheInStorage(this.storageKey, storage);
  }
}
