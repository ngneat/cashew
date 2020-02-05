import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';
import { DefaultTTLManager } from './ttlManager';
import { deleteByRegex } from './deleteByRegex';
import { getLocalStorage } from './getLocalStorage';
import { setLocalStorage } from './setLocalStorage';

@Injectable()
export class LocalStorageTtlManager {
  private readonly ttl: DefaultTTLManager;
  private readonly ttlStorageKey: string;

  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
    this.ttlStorageKey = `${config.localStorageKey}Ttl`;
    this.ttl = new DefaultTTLManager(config);
  }

  isValid(key: string): boolean {
    const valid = this.ttl.isValid(key);
    if (valid) {
      return true;
    }
    const ttlValue = getLocalStorage(this.ttlStorageKey).get(key);
    const validInStorage = ttlValue > new Date().getTime();
    if (validInStorage) {
      this.ttl.set(key, ttlValue);
    }
    return validInStorage;
  }

  set(key: string, ttl?: number) {
    const resolveTTL = ttl || this.config.ttl;
    const storage = getLocalStorage(this.ttlStorageKey);
    storage.set(key, new Date().setMilliseconds(resolveTTL));
    setLocalStorage(this.ttlStorageKey, storage);
    this.ttl.set(key, ttl);
  }

  delete(key?: string | RegExp) {
    this.ttl.delete(key);

    if (!key) {
      localStorage.removeItem(this.ttlStorageKey);
      return;
    }

    if (typeof key === 'string') {
      const storage = getLocalStorage(this.ttlStorageKey);
      storage.delete(key);
      setLocalStorage(this.ttlStorageKey, storage);
      return;
    }

    const storage = getLocalStorage(this.ttlStorageKey);
    deleteByRegex(key as RegExp, storage);
    setLocalStorage(this.ttlStorageKey, storage);
  }
}
