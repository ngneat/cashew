import { Injectable } from '@angular/core';
import { injectCacheConfig } from '../cache-config';
import { DefaultTTLManager, TTLManager } from '../ttl-manager';
import { storage } from './session-storage';

const KEY = `@ttl`;

function createKey(key: string) {
  return `${KEY}-${key}`;
}

@Injectable()
export class SessionStorageTTLManager extends TTLManager {
  private readonly ttl = new DefaultTTLManager();
  private config = injectCacheConfig();

  isValid(key: string): boolean {
    const valid = this.ttl.isValid(createKey(key));

    if (valid) {
      return true;
    }

    const sessionStorageTimeStamp = storage.getItem(createKey(key));
    const validInStorage = sessionStorageTimeStamp > new Date().getTime();

    if (validInStorage) {
      this.ttl.set(createKey(key), sessionStorageTimeStamp - new Date().getTime());
    }

    return validInStorage;
  }

  set(key: string, ttl: number) {
    const resolveTTL = ttl ?? this.config.ttl;
    storage.setItem(createKey(key), new Date().setMilliseconds(resolveTTL));
    this.ttl.set(createKey(key), resolveTTL);

    return this;
  }

  delete(key: string) {
    this.ttl.delete(createKey(key));
    storage.clearItem(createKey(key));

    return true;
  }

  clear() {
    this.ttl.forEach((_: any, key: string) => {
      this.ttl.delete(key);
      storage.clearItem(key);
    });
  }
}
