import { makeEnvironmentProviders } from '@angular/core';
import { HttpCacheStorage } from '../cache-storage';
import { BrowserStorageHttpCacheStorage } from '../storage/browser-storage-cache';
import { BrowserStorageTTLManager } from '../storage/browser-storage-ttl';
import { BrowserStorageVersionsManager } from '../storage/browser-storage-version-manager';
import {
  LocalStorageHttpCacheStorage as LocalStorageHttpCacheStorageToken,
  LocalStorageTTLManager as LocalStorageTTLManagerToken,
  LocalStorageVersionsManager as LocalStorageVersionsManagerToken
} from '../storage/tokens';
import { TTLManager } from '../ttl-manager';
import { HttpCacheVersions } from '../versions';
import { storage } from './local-storage';

/**
 * @deprecated This provider is no longer needed. Please update your configuration to use `withLocalStorage()` instead.
 */
export function provideHttpCacheLocalStorageStrategy() {
  console.warn(
    'provideHttpCacheLocalStorageStrategy is deprecated and will be removed in the future. Use withLocalStorage() instead.'
  );
  return makeEnvironmentProviders([
    { provide: HttpCacheStorage, useFactory: () => new BrowserStorageHttpCacheStorage(storage) },
    { provide: TTLManager, useFactory: () => new BrowserStorageTTLManager(storage) },
    { provide: HttpCacheVersions, useFactory: () => new BrowserStorageVersionsManager(storage) }
  ]);
}

// Returns providers for use with provideHttpCache(..., withLocalStorage())
export function withLocalStorage() {
  return makeEnvironmentProviders([
    {
      provide: LocalStorageHttpCacheStorageToken,
      useFactory: () => new BrowserStorageHttpCacheStorage(storage)
    },
    {
      provide: LocalStorageTTLManagerToken,
      useFactory: () => new BrowserStorageTTLManager(storage)
    },
    {
      provide: LocalStorageVersionsManagerToken,
      useFactory: () => new BrowserStorageVersionsManager(storage)
    }
  ]);
}
