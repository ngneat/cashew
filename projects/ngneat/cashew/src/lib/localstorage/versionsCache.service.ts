import { Injectable } from '@angular/core';
import { storage } from './localstorage';

const KEY = `@version`;

function createKey(key: string) {
  return `${KEY}-${key}`;
}

@Injectable()
export class VersionsCache {
  private readonly cache = new Map<string, string>();

  has(key: string): boolean {
    return this.cache.has(createKey(key)) || !!storage.getItem(createKey(key));
  }

  get(key: string): string {
    const cacheValue = this.cache.get(createKey(key));

    if(cacheValue) {
      return cacheValue;
    }

    const value = storage.getItem(createKey(key));

    if(value) {
      this.cache.set(createKey(key), value);
    }

    return this.cache.get(createKey(key))!;
  }

  set(key: string, version: string): void {
    storage.setItem(createKey(key), version);
    this.cache.set(createKey(key), version);
  }

  delete(key?: string) {
    if(!key) {
      this.cache.forEach((_: any, key: string) => {
        this.cache.delete(key);
        storage.clearItem(key);
      });

      return;
    }

    this.cache.delete(key);
    storage.clearItem(key);
  }

  forEach(cb: any) {
    this.cache.forEach(cb);
  }
}
