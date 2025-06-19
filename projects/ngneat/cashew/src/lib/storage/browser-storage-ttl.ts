import { injectCacheConfig } from '../cache-config';
import { DefaultTTLManager, TTLManager } from '../ttl-manager';
import { BrowserStorage } from './index';

const KEY = `@ttl`;

function createKey(key: string) {
  return `${KEY}-${key}`;
}

export class BrowserStorageTTLManager extends TTLManager {
  private readonly ttl = new DefaultTTLManager();
  private readonly config = injectCacheConfig();

  constructor(private storage: BrowserStorage) {
    super();
  }

  isValid(key: string): boolean {
    const valid = this.ttl.isValid(createKey(key));
    if (valid) {
      return true;
    }
    const storageTimeStamp = this.storage.getItem(createKey(key));
    const validInStorage = storageTimeStamp > new Date().getTime();
    if (validInStorage) {
      this.ttl.set(createKey(key), storageTimeStamp - new Date().getTime());
    }
    return validInStorage;
  }

  set(key: string, ttl?: number) {
    const resolveTTL = ttl ?? this.config.ttl;
    this.storage.setItem(createKey(key), new Date().setMilliseconds(resolveTTL));
    this.ttl.set(createKey(key), resolveTTL);
    return this;
  }

  delete(key: string) {
    this.ttl.delete(createKey(key));
    this.storage.clearItem(createKey(key));
    return true;
  }

  clear() {
    this.ttl.forEach((_: any, key: string) => {
      this.ttl.delete(key);
      this.storage.clearItem(key);
    });
  }
}
