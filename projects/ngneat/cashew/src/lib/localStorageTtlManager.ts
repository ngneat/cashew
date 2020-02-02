import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from '@ngneat/cashew';
import { deleteByRegex } from './deleteByRegex';
import { getLocalStorage } from './getLocalStorage';

@Injectable()
export class LocalStorageTtlManager {
  private readonly ttlStorageKey: string;

  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
    this.ttlStorageKey = `${config.localStorageKey || 'httpCache'}Ttl`;
  }

  isValid(key: string): boolean {
    const storage = getLocalStorage(this.ttlStorageKey);
    return !!storage[key] && storage[key] > new Date().getTime();
  }

  set(key: string, ttl?: number) {
    const resolveTTL = ttl || this.config.ttl;
    const storage = getLocalStorage(this.ttlStorageKey);
    storage[key] = resolveTTL;
    localStorage.setItem(this.ttlStorageKey, JSON.stringify(storage));
  }

  delete(key?: string | RegExp) {
    if (!key) {
      localStorage.removeItem(this.ttlStorageKey);
      return;
    }

    if (typeof key === 'string') {
      const storage = getLocalStorage(this.ttlStorageKey);
      delete storage[key];
      localStorage.setItem(this.ttlStorageKey, JSON.stringify(storage));
      return;
    }

    const storage = getLocalStorage(this.ttlStorageKey);
    deleteByRegex(key as RegExp, storage);
    localStorage.setItem(this.ttlStorageKey, JSON.stringify(storage));
  }
}
