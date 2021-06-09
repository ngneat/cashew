import { Injectable } from '@angular/core';
import { storage } from './local-storage';
import { HttpCacheVersions } from '../versions';

const KEY = `@version`;

function createKey(key: string) {
  return `${KEY}-${key}`;
}

@Injectable()
export class LocalStorageVersionsManager extends HttpCacheVersions {

  has(key: string): boolean {
    return super.has(createKey(key)) || !!storage.getItem(createKey(key));
  }

  get(key: string): string {
    const cacheValue = super.get(createKey(key));

    if(cacheValue) {
      return cacheValue;
    }

    const value = storage.getItem(createKey(key));

    if(value) {
      super.set(createKey(key), value);
    }

    return super.get(createKey(key))!;
  }

  set(key: string, version: string) {
    storage.setItem(createKey(key), version);

    return super.set(createKey(key), version);
  }

  delete(key: string) {
    super.delete(key);
    storage.clearItem(key);

    return true;
  }

  clear() {
    super.forEach((_: any, key: string) => {
      super.delete(key);
      storage.clearItem(key);
    });
  }
}
