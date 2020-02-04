import { TTLManager } from './ttlManager';
import { HttpCacheStorage } from './httpCacheStorage';
import { HttpCacheLocalStorage } from './httpCacheLocalStorage';
import { LocalStorageTtlManager } from './localStorageTtlManager';

export const withHttpCacheLocalStorage = [
  { provide: HttpCacheStorage, useClass: HttpCacheLocalStorage },
  { provide: TTLManager, useClass: LocalStorageTtlManager }
];
