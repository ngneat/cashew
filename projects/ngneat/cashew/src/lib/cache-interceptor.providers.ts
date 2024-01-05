import { makeEnvironmentProviders } from '@angular/core';
import { httpCacheInterceptor } from './cache-interceptor';
import { DefaultKeySerializer, KeySerializer } from './key-serializer';
import { DefaultHttpCacheStorage, HttpCacheStorage } from './cache-storage';
import { defaultConfig, HTTP_CACHE_CONFIG, HttpCacheConfig } from './cache-config';
import { HttpCacheManager } from './cache-manager.service';
import { DefaultTTLManager, TTLManager } from './ttl-manager';
import { DefaultHttpCacheGuard, HttpCacheGuard } from './cache-guard';
import { RequestsQueue } from './requests-queue';
import { RequestsCache } from './requests-cache';
import { DefaultHttpVersions, HttpCacheVersions } from './versions';

export function withHttpCacheInterceptor() {
  return httpCacheInterceptor;
}

export function provideHttpCache(config: Partial<HttpCacheConfig> = {}) {
  return makeEnvironmentProviders([
    { provide: HTTP_CACHE_CONFIG, useValue: { ...defaultConfig, ...config } },
    { provide: KeySerializer, useClass: DefaultKeySerializer },
    { provide: HttpCacheStorage, useClass: DefaultHttpCacheStorage },
    { provide: TTLManager, useClass: DefaultTTLManager },
    { provide: HttpCacheGuard, useClass: DefaultHttpCacheGuard },
    { provide: HttpCacheVersions, useClass: DefaultHttpVersions },
    HttpCacheManager,
    RequestsQueue,
    RequestsCache
  ]);
}
