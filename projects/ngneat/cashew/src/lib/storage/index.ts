import { from, isObservable, Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

type MaybeAsync<T = unknown> = T | Promise<T> | Observable<T>;

export interface CacheValue {
  version: string;
  ttl: number;
  response: HttpResponse<unknown>;
}

export interface CacheStorage {
  get(key: string): MaybeAsync<CacheValue> | undefined;

  set(key: string, value: CacheValue): this;

  delete(key: string): MaybeAsync<boolean>;

  clear(): MaybeAsync<void>;
}

export type BrowserStorage = {
  type: string;
  clearItem(key: string): void;
  setItem(key: string, value: any): void;
  getItem(key: string): any;
};

export class InMemoryStorage extends Map<string, CacheValue> implements CacheStorage {}

class BrowserStorageStorage implements CacheStorage {
  constructor(private storage: Storage) {}

  clear(): MaybeAsync<void> {
    return undefined;
  }

  delete(key: string): MaybeAsync<boolean> {
    this.storage.removeItem(key);
    return true;
  }

  get(key: string): MaybeAsync<CacheValue> | undefined {
    const value = this.storage.getItem(key);

    if (value === null) {
      return undefined;
    }

    return JSON.parse(value);
  }

  set(key: string, value: CacheValue): this {
    this.storage.setItem(key, JSON.stringify(value));

    return this;
  }
}

export const inMemoryStorage = new InMemoryStorage();
export const useLocalStorage = new BrowserStorageStorage(localStorage);
export const useSessionStorage = new BrowserStorageStorage(sessionStorage);

export function toObservable<T>(value: MaybeAsync<T>) {
  if (isObservable(value) || value instanceof Promise) {
    return from(value);
  }

  return of(value);
}
