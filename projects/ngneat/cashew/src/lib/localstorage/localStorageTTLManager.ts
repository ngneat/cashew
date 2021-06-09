import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from '../httpCacheConfig';
import { DefaultTTLManager, TTLManager } from '../ttlManager';
import { storage } from './localstorage';

const KEY = `@ttl`;

function createKey(key: string) {
  return `${KEY}-${key}`;
}

@Injectable()
export class LocalStorageTTLManager implements TTLManager {
  private readonly ttl: DefaultTTLManager;

  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
    this.ttl = new DefaultTTLManager(config);
  }

  isValid(key: string): boolean {
    const valid = this.ttl.isValid(createKey(key));

    if(valid) {
      return true;
    }

    const localStorageTimeStamp = storage.getItem(createKey(key));
    const validInStorage = localStorageTimeStamp > new Date().getTime();

    if(validInStorage) {
      this.ttl.set(createKey(key), localStorageTimeStamp - new Date().getTime());
    }

    return validInStorage;
  }

  set(key: string, ttl?: number) {
    const resolveTTL = ttl || this.config.ttl;
    storage.setItem(createKey(key), new Date().setMilliseconds(resolveTTL));
    this.ttl.set(createKey(key), resolveTTL);
  }

  delete(key?: string) {
    if(!key) {
      this.ttl.forEach((_: any, key: string) => {
        this.ttl.delete(createKey(key));
        storage.clearItem(createKey(key));
      });

      return;
    }

    this.ttl.delete(createKey(key));
    storage.clearItem(createKey(key));
  }

  forEach(cb: any) {
    this.ttl.forEach(cb);
  }
}
