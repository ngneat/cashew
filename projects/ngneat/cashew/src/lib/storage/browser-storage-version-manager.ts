import { HttpCacheVersions } from '../versions';
import { BrowserStorage } from './index';
const KEY = `@version`;

function createKey(key: string) {
  return `${KEY}-${key}`;
}

export class BrowserStorageVersionsManager extends HttpCacheVersions {
  constructor(private storage: BrowserStorage) {
    super();
  }

  has(key: string): boolean {
    return super.has(createKey(key)) || !!this.storage.getItem(createKey(key));
  }

  get(key: string): string {
    const cacheValue = super.get(createKey(key));
    if (cacheValue) {
      return cacheValue;
    }
    const value = this.storage.getItem(createKey(key));
    if (value) {
      super.set(createKey(key), value);
    }
    return super.get(createKey(key))!;
  }

  set(key: string, version: string) {
    this.storage.setItem(createKey(key), version);
    return super.set(createKey(key), version);
  }

  delete(key: string) {
    super.delete(key);
    this.storage.clearItem(createKey(key));
    return true;
  }

  clear() {
    super.forEach((_: any, key: string) => {
      super.delete(key);
      this.storage.clearItem(key);
    });
  }
}
