import { TTLManager } from '../ttl-manager';
import { HttpCacheStorage } from '../cache-storage';
import { HttpCacheLocalStorage } from './local-storage-cache';
import { LocalStorageTTLManager } from './local-storage-ttl';

export const useHttpCacheLocalStorage = [
  { provide: HttpCacheStorage, useClass: HttpCacheLocalStorage },
  { provide: TTLManager, useClass: LocalStorageTTLManager }
];
