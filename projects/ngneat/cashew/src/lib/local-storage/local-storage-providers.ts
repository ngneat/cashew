import { TTLManager } from '../ttl-manager';
import { HttpCacheStorage } from '../cache-storage';
import { LocalStorageHttpCacheStorage } from './local-storage-cache';
import { LocalStorageTTLManager } from './local-storage-ttl';
import { HttpCacheVersions } from '../versions';
import { LocalStorageVersionsManager } from './local-storage-versions';
import { makeEnvironmentProviders } from '@angular/core';

/**
 * @deprecated This provider is no longer needed. Please update your configuration to use `withLocalStorage()` instead.
 */
export function provideHttpCacheLocalStorageStrategy() {
  console.warn(
    'provideHttpCacheLocalStorageStrategy is deprecated and will be removed in the future. Use withLocalStorage() instead.'
  );
  return makeEnvironmentProviders([
    { provide: HttpCacheStorage, useClass: LocalStorageHttpCacheStorage },
    { provide: TTLManager, useClass: LocalStorageTTLManager },
    { provide: HttpCacheVersions, useClass: LocalStorageVersionsManager }
  ]);
}

// Returns providers for use with provideHttpCache(..., withLocalStorage())
export function withLocalStorage() {
  return makeEnvironmentProviders([
    { provide: LocalStorageHttpCacheStorage, useClass: LocalStorageHttpCacheStorage },
    { provide: LocalStorageTTLManager, useClass: LocalStorageTTLManager },
    { provide: LocalStorageVersionsManager, useClass: LocalStorageVersionsManager }
  ]);
}
