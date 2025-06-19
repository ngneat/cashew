import { InjectionToken } from '@angular/core';
import { BrowserStorageHttpCacheStorage } from './browser-storage-cache';
import { BrowserStorageTTLManager } from './browser-storage-ttl';
import { BrowserStorageVersionsManager } from './browser-storage-version-manager';

export const LocalStorageHttpCacheStorage = new InjectionToken<BrowserStorageHttpCacheStorage>(
  'LocalStorageHttpCacheStorage'
);
export const LocalStorageTTLManager = new InjectionToken<BrowserStorageTTLManager>('LocalStorageTTLManager');
export const LocalStorageVersionsManager = new InjectionToken<BrowserStorageVersionsManager>(
  'LocalStorageVersionsManager'
);

export const SessionStorageHttpCacheStorage = new InjectionToken<BrowserStorageHttpCacheStorage>(
  'SessionStorageHttpCacheStorage'
);
export const SessionStorageTTLManager = new InjectionToken<BrowserStorageTTLManager>('SessionStorageTTLManager');
export const SessionStorageVersionsManager = new InjectionToken<BrowserStorageVersionsManager>(
  'SessionStorageVersionsManager'
);
