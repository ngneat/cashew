import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from '@ngneat/cashew';
import { HttpResponse } from '@angular/common/http';
import { deleteByRegex } from './deleteByRegex';

@Injectable()
export class LocalStorageTtlManager {
  private readonly ttlStorageKey: string;

  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
    this.ttlStorageKey = `${config.localStorageKey || 'httpCache'}Ttl`;
  }

  isValid(key: string): boolean {
    const storage = this.getLocalTtlStorage();
    return !!storage[key] && storage[key] > new Date().getTime();
  }

  set(key: string, ttl?: number) {
    const resolveTTL = ttl || this.config.ttl;
    const storage = this.getLocalTtlStorage();
    storage[key] = resolveTTL;
    localStorage.setItem(this.ttlStorageKey, JSON.stringify(storage));
  }

  delete(key?: string | RegExp) {
    if (!key) {
      localStorage.removeItem(this.ttlStorageKey);
      return;
    }

    if (typeof key === 'string') {
      const storage = this.getLocalTtlStorage();
      delete storage[key];
      localStorage.setItem(this.ttlStorageKey, JSON.stringify(storage));
      return;
    }

    const storage = this.getLocalTtlStorage();
    deleteByRegex(key as RegExp, storage);
    localStorage.setItem(this.ttlStorageKey, JSON.stringify(storage));
  }

  private getLocalTtlStorage(): Map<string, HttpResponse<any>> {
    const storageString = localStorage.getItem(this.ttlStorageKey) || '{}';
    return JSON.parse(storageString);
  }
}
