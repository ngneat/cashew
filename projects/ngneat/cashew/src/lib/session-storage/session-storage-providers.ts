import { makeEnvironmentProviders } from '@angular/core';
import { SessionStorageHttpCacheStorage } from './session-storage-cache';
import { SessionStorageTTLManager } from './session-storage-ttl';
import { SessionStorageVersionsManager } from './session-storage-versions';

// Returns providers for use with provideHttpCache(..., withSessionStorage())
export function withSessionStorage() {
  return makeEnvironmentProviders([
    { provide: SessionStorageHttpCacheStorage, useClass: SessionStorageHttpCacheStorage },
    { provide: SessionStorageTTLManager, useClass: SessionStorageTTLManager },
    { provide: SessionStorageVersionsManager, useClass: SessionStorageVersionsManager }
  ]);
}
