import { InjectionToken, inject } from '@angular/core';
import { CacheStorageStrategy } from './cache-context';

export interface HttpCacheConfig {
  strategy: 'implicit' | 'explicit';
  storage: CacheStorageStrategy;
  mode: 'stateManagement' | 'cache';
  ttl: number;
  responseSerializer?: (value: any) => any;
}

export const defaultConfig: HttpCacheConfig = {
  strategy: 'explicit',
  mode: 'cache',
  storage: 'memory',
  ttl: 3_600_000 // One hour
};

export const HTTP_CACHE_CONFIG = new InjectionToken<HttpCacheConfig>('HTTP_CACHE_CONFIG');

export function injectCacheConfig() {
  return inject(HTTP_CACHE_CONFIG);
}
