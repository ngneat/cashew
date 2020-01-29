import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { deleteByRegex } from './deleteByRegex';
import { HttpCacheStorage } from './httpCacheStorage';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';

@Injectable()
export class HttpCacheLocalStorage implements HttpCacheStorage {
  private readonly storageKey: string;

  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
    this.storageKey = config.localStorageKey || 'httpCache';
  }

  has(key: string): boolean {
    const storage = this.getLocalStorage();
    return !!storage[key];
  }

  get(key: string) {
    const storage = this.getLocalStorage();
    return storage[key];
  }

  set(key: string, response: HttpResponse<any>): void {
    const storage = this.getLocalStorage();
    storage[key] = response;
    localStorage.setItem(this.storageKey, JSON.stringify(storage));
  }

  delete(key?: string | RegExp): void {
    if (!key) {
      localStorage.removeItem(this.storageKey);
      return;
    }

    if (typeof key === 'string') {
      const storage = this.getLocalStorage();
      delete storage[key];
      localStorage.setItem(this.storageKey, JSON.stringify(storage));
      return;
    }

    const storage = this.getLocalStorage();
    deleteByRegex(key as RegExp, storage);
    localStorage.setItem(this.storageKey, JSON.stringify(storage));
  }

  private getLocalStorage(): Map<string, HttpResponse<any>> {
    const storageString = localStorage.getItem(this.storageKey) || '{}';
    return JSON.parse(storageString);
  }
}
