import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from '../httpCacheConfig';
import { DefaultTTLManager, TTLManager } from '../ttlManager';
import { clearStorageCache, getStorageCache, setCacheInStorage } from './localstorage';

@Injectable()
export class LocalStorageTTLManager implements TTLManager {
  private readonly ttl: DefaultTTLManager;
  private readonly ttlStorageKey: string;

  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
    this.ttlStorageKey = `${config.localStorageKey}TTL`;
    this.ttl = new DefaultTTLManager(config);
  }

  isValid(key: string): boolean {
    const valid = this.ttl.isValid(key);

    if(valid) {
      return true;
    }

    const localStorageTimeStamp = getStorageCache(this.ttlStorageKey).get(key);
    const validInStorage = localStorageTimeStamp > new Date().getTime();

    if(validInStorage) {
      this.ttl.set(key, localStorageTimeStamp - new Date().getTime());
    }

    return validInStorage;
  }

  set(key: string, ttl?: number) {
    const resolveTTL = ttl || this.config.ttl;
    const storage = getStorageCache(this.ttlStorageKey);
    storage.set(key, new Date().setMilliseconds(resolveTTL));
    setCacheInStorage(this.ttlStorageKey, storage);
    this.ttl.set(key, resolveTTL);
  }

  delete(key?: string) {
    this.ttl.delete(key);

    if(!key) {
      clearStorageCache(this.ttlStorageKey);

      return;
    }

    const storage = getStorageCache(this.ttlStorageKey);
    storage.delete(key);
    setCacheInStorage(this.ttlStorageKey, storage);
  }
}
