import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpCacheStorage } from '../cache-storage';
import { BrowserStorage } from './index';

const KEY = `@cache`;

function createKey(key: string) {
  return `${KEY}-${key}`;
}

export class BrowserStorageHttpCacheStorage extends HttpCacheStorage {
  constructor(private storage: BrowserStorage) {
    super();
  }

  has(key: string): boolean {
    const generatedKey = createKey(key);

    return super.has(generatedKey) || !!this.storage.getItem(generatedKey);
  }

  get(key: string): HttpResponse<any> | boolean {
    const generatedKey = createKey(key);

    const cacheValue = super.get(generatedKey);

    if (cacheValue) {
      return cacheValue;
    }

    const value = this.storage.getItem(generatedKey);

    if (value) {
      value.headers = new HttpHeaders(value.headers);
      value.headers.init();
      const response = new HttpResponse(value);
      super.set(generatedKey, response);
    }

    return super.get(generatedKey)!;
  }

  set(key: string, response: HttpResponse<any>) {
    const generatedKey = createKey(key);

    const httpResponse: any = { ...response, headers: {} };
    response.headers.keys().forEach(headerKey => {
      httpResponse.headers[headerKey] = response.headers.get(headerKey);
    });

    this.storage.setItem(generatedKey, httpResponse);

    return super.set(generatedKey, response);
  }

  delete(key: string) {
    const generatedKey = createKey(key);

    this.storage.clearItem(generatedKey);

    return super.delete(generatedKey);
  }

  clear() {
    super.forEach((_value, key) => {
      super.delete(key);
      this.storage.clearItem(key);
    });
  }
}
