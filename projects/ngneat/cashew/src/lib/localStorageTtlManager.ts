import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';
import { DefaultTTLManager } from './ttlManager';
import { deleteByRegex } from './deleteByRegex';
import { getLocalStorageValue } from './getLocalStorageValue';
import { setLocalStorageValue } from './setLocalStorageValue';

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
    const localStorageTimeStamp = getLocalStorageValue(this.ttlStorageKey).get(key);
    const validInStorage = localStorageTimeStamp > new Date().getTime();
    if (validInStorage) {
      this.ttl.set(key, localStorageTimeStamp - new Date().getTime());
    }
    return validInStorage;
  }

  set(key: string, ttl?: number) {
    const resolveTTL = ttl || this.config.ttl;
    const storage = getLocalStorageValue(this.ttlStorageKey);
    storage.set(key, new Date().setMilliseconds(resolveTTL));
    setLocalStorageValue(this.ttlStorageKey, storage);
    this.ttl.set(key, resolveTTL);
  }

  delete(key?: string | RegExp) {
    this.ttl.delete(key);

    if (!key) {
      localStorage.removeItem(this.ttlStorageKey);
      return;
    }

    if (typeof key === 'string') {
      const storage = getLocalStorageValue(this.ttlStorageKey);
      storage.delete(key);
      setLocalStorageValue(this.ttlStorageKey, storage);
      return;
    }

    const storage = getLocalStorageValue(this.ttlStorageKey);
    deleteByRegex(key as RegExp, storage);
    setLocalStorageValue(this.ttlStorageKey, storage);
  }
}
