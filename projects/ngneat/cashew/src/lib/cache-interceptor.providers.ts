import { makeEnvironmentProviders } from '@angular/core';
import { defaultConfig, HTTP_CACHE_CONFIG, HttpCacheConfig, isHttpCacheConfig } from './cache-config';
import { DefaultHttpCacheGuard, HttpCacheGuard } from './cache-guard';
import { httpCacheInterceptor } from './cache-interceptor';
import { HttpCacheManager } from './cache-manager.service';
import { DefaultHttpCacheStorage } from './cache-storage';
import { DefaultKeySerializer, KeySerializer } from './key-serializer';
import { RequestsCache } from './requests-cache';
import { RequestsQueue } from './requests-queue';
import { DefaultTTLManager } from './ttl-manager';
import { DefaultHttpVersions, HttpCacheVersions } from './versions';

export function withHttpCacheInterceptor() {
  return httpCacheInterceptor;
}

export function provideHttpCache(
  ...extensions: Array<ReturnType<typeof makeEnvironmentProviders>>
): ReturnType<typeof makeEnvironmentProviders>;
export function provideHttpCache(
  config: Partial<HttpCacheConfig>,
  ...extensions: Array<ReturnType<typeof makeEnvironmentProviders>>
): ReturnType<typeof makeEnvironmentProviders>;

export function provideHttpCache(
  configOrExtension?: Partial<HttpCacheConfig> | ReturnType<typeof makeEnvironmentProviders>,
  ...extensions: Array<ReturnType<typeof makeEnvironmentProviders>>
) {
  let config: Partial<HttpCacheConfig> = {};
  let extensionProviders: Array<ReturnType<typeof makeEnvironmentProviders>> = [];

  if (isHttpCacheConfig(configOrExtension)) {
    config = { ...defaultConfig, ...configOrExtension };
    extensionProviders = extensions;
  } else if (configOrExtension) {
    extensionProviders = [configOrExtension, ...extensions];
  }

  const flatProviders = extensionProviders.flatMap(p => p);

  return makeEnvironmentProviders([
    { provide: HTTP_CACHE_CONFIG, useValue: config },
    { provide: KeySerializer, useClass: DefaultKeySerializer },
    { provide: DefaultHttpCacheStorage, useClass: DefaultHttpCacheStorage },
    { provide: DefaultTTLManager, useClass: DefaultTTLManager },
    { provide: HttpCacheGuard, useClass: DefaultHttpCacheGuard },
    { provide: HttpCacheVersions, useClass: DefaultHttpVersions },
    HttpCacheManager,
    RequestsQueue,
    RequestsCache,
    ...flatProviders
  ]);
}
