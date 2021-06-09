import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DefaultHttpCacheStorage, HttpCacheStorage } from '../httpCacheStorage';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from '../httpCacheConfig';
import { storage } from './localstorage';

const KEY = `@cache`;

function createKey(key: string) {
  return `${KEY}-${key}`;
}

@Injectable()
export class HttpCacheLocalStorage implements HttpCacheStorage {
  private readonly cache = new DefaultHttpCacheStorage();

  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
  }

  has(key: string): boolean {
    return this.cache.has(createKey(key)) || !!storage.getItem(createKey(key));
  }

  get(key: string): HttpResponse<any> {
    const cacheValue = this.cache.get(createKey(key));

    if(cacheValue) {
      return cacheValue;
    }

    const value = storage.getItem(createKey(key));

    if(value) {
      this.cache.set(createKey(key), new HttpResponse(value));
    }

    return this.cache.get(createKey(key))!;
  }

  set(key: string, response: HttpResponse<any>): void {
    storage.setItem(createKey(key), response);
    this.cache.set(createKey(key), response);
  }

  delete(key?: string): void {

    if(!key) {
      Object.keys(localStorage).forEach(key => {
        if(key.startsWith(KEY)) {
          this.cache.delete(key);
          storage.clearItem(key);
        }
      });
      return;
    }

    this.cache.delete(createKey(key));
    storage.clearItem(createKey(key));
  }
}
