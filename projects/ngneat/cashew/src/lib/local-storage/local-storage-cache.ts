import { HttpResponse, HttpHeaders } from '@angular/common/http';
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
    const generatedKey = createKey(key);

    return super.has(generatedKey) || !!storage.getItem(generatedKey);
  }

  get(key: string): HttpResponse<any> | boolean {
    const generatedKey = createKey(key);

    const cacheValue = super.get(generatedKey);

    if (cacheValue) {
      return cacheValue;
    }

    const value = storage.getItem(generatedKey);

    if (value) {
      value.headers = new HttpHeaders(value.headers);
      const response = new HttpResponse(value);
      super.set(generatedKey, response);
    }

    return super.get(generatedKey)!;
  }

  set(key: string, response: HttpResponse<any>) {
    const generatedKey = createKey(key);

    const httpResponse: any = { ...response, headers: {} };
    if (response.headers instanceof HttpHeaders) {
      response.headers.keys().forEach(headerKey => {
        httpResponse.headers[headerKey] = response.headers.get(headerKey);
      });
    }

    storage.setItem(generatedKey, response);

    return super.set(generatedKey, response);
  }

  delete(key: string) {
    const generatedKey = createKey(key);

    storage.clearItem(generatedKey);

    return super.delete(generatedKey);
  }

  clear() {
    super.forEach((value, key) => {
      super.delete(key);
      storage.clearItem(key);
    });
  }
}
