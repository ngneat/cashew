import { TTLManager } from '../ttlManager';
import { HttpCacheStorage } from '../httpCacheStorage';
import { HttpCacheLocalStorage } from './httpCacheLocalStorage';
import { LocalStorageTTLManager } from './localStorageTtlManager';

export const useHttpCacheLocalStorage = [
  { provide: HttpCacheStorage, useClass: HttpCacheLocalStorage },
  { provide: TTLManager, useClass: LocalStorageTTLManager }
];
