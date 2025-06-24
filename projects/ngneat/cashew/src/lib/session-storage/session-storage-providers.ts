import { makeEnvironmentProviders } from '@angular/core';
import { BrowserStorageHttpCacheStorage } from '../storage/browser-storage-cache';
import { BrowserStorageTTLManager } from '../storage/browser-storage-ttl';
import { BrowserStorageVersionsManager } from '../storage/browser-storage-version-manager';
import {
  SessionStorageHttpCacheStorage,
  SessionStorageTTLManager,
  SessionStorageVersionsManager
} from '../storage/tokens';
import { storage } from './session-storage';

// Returns providers for use with provideHttpCache(..., withSessionStorage())
export function withSessionStorage() {
  return makeEnvironmentProviders([
    {
      provide: SessionStorageHttpCacheStorage,
      useFactory: () => new BrowserStorageHttpCacheStorage(storage)
    },
    {
      provide: SessionStorageTTLManager,
      useFactory: () => new BrowserStorageTTLManager(storage)
    },
    {
      provide: SessionStorageVersionsManager,
      useFactory: () => new BrowserStorageVersionsManager(storage)
    }
  ]);
}
