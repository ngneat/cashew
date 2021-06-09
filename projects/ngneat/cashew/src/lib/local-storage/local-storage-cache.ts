import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCacheStorage } from '../cache-storage';
import { storage } from './local-storage';

const KEY = `@cache`;

function createKey(key: string) {
  return `${KEY}-${key}`;
}

@Injectable()
export class HttpCacheLocalStorage extends HttpCacheStorage {
  has(key: string): boolean {
    return super.has(createKey(key)) || !!storage.getItem(createKey(key));
  }

  get(key: string): HttpResponse<any> {
    const cacheValue = super.get(createKey(key));

    if (cacheValue) {
      return cacheValue;
    }

    const value = storage.getItem(createKey(key));

    if (value) {
      super.set(createKey(key), new HttpResponse(value));
    }

    return super.get(createKey(key))!;
  }

  set(key: string, response: HttpResponse<any>) {
    storage.setItem(createKey(key), response);

    return super.set(createKey(key), response);
  }

  delete(key: string) {
    storage.clearItem(createKey(key));

    return super.delete(createKey(key));
  }

  clear() {
    super.forEach((value, key) => {
      super.delete(createKey(key));
      storage.clearItem(createKey(key));
    });
  }
}
