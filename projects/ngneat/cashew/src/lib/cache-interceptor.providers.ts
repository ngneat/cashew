import { makeEnvironmentProviders } from '@angular/core';
import { defaultConfig, HTTP_CACHE_CONFIG, HttpCacheConfig } from './cache-config';
import { DefaultHttpCacheGuard, HttpCacheGuard } from './cache-guard';
import { httpCacheInterceptor } from './cache-interceptor';
import { HttpCacheManager } from './cache-manager.service';
import { DefaultHttpCacheStorage } from './cache-storage';
import { DefaultKeySerializer, KeySerializer } from './key-serializer';
import { LocalStorageHttpCacheStorage } from './local-storage/local-storage-cache';
import { LocalStorageTTLManager } from './local-storage/local-storage-ttl';
import { LocalStorageVersionsManager } from './local-storage/local-storage-versions';
import { RequestsCache } from './requests-cache';
import { RequestsQueue } from './requests-queue';
import { DefaultTTLManager } from './ttl-manager';
import { DefaultHttpVersions, HttpCacheVersions } from './versions';

export function withHttpCacheInterceptor() {
  return httpCacheInterceptor;
}

export function provideHttpCache(config: Partial<HttpCacheConfig> = {}) {
  return makeEnvironmentProviders([
    { provide: HTTP_CACHE_CONFIG, useValue: { ...defaultConfig, ...config } },
    { provide: KeySerializer, useClass: DefaultKeySerializer },
    { provide: DefaultHttpCacheStorage, useClass: DefaultHttpCacheStorage },
    { provide: DefaultTTLManager, useClass: DefaultTTLManager },
    { provide: LocalStorageHttpCacheStorage, useClass: LocalStorageHttpCacheStorage },
    { provide: LocalStorageTTLManager, useClass: LocalStorageTTLManager },
    { provide: LocalStorageVersionsManager, useClass: LocalStorageVersionsManager },
    { provide: HttpCacheGuard, useClass: DefaultHttpCacheGuard },
    { provide: HttpCacheVersions, useClass: DefaultHttpVersions },
    HttpCacheManager,
    RequestsQueue,
    RequestsCache
  ]);
}
