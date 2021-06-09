import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultHttpCacheStorage, HttpCacheStorage } from '../cache-storage';
import { storage } from './local-storage';

const KEY = `@cache`;

function createKey(key: string) {
  return `${KEY}-${key}`;
}

@Injectable()
export class HttpCacheLocalStorage implements HttpCacheStorage {
  private readonly cache = new DefaultHttpCacheStorage();

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

  delete(key?: string) {
    if(!key) {
      this.cache.forEach((_: any, key: string) => {
        this.cache.delete(createKey(key));
        storage.clearItem(createKey(key));
      });

      return;
    }

    this.cache.delete(createKey(key));
    storage.clearItem(createKey(key));
  }

  forEach(cb: any) {
    this.cache.forEach(cb);
  }
}
