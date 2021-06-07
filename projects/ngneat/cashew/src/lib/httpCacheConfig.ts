import { InjectionToken } from '@angular/core';

export interface HttpCacheConfig {
  strategy: 'implicit' | 'explicit';
  ttl: number;
  responseSerializer?: (value: any) => any;
  localStorageKey?: string;
}

export const defaultConfig: HttpCacheConfig = {
  strategy: 'explicit',
  ttl: 3600000, // One hour
  localStorageKey: 'httpCache'
};

export function cashewConfig(config: Partial<HttpCacheConfig> = defaultConfig): HttpCacheConfig {
  return {
    strategy: config.strategy ?? defaultConfig.strategy,
    ttl: config.ttl ?? defaultConfig.ttl,
    localStorageKey: config.localStorageKey ?? defaultConfig.localStorageKey,
    responseSerializer: config.responseSerializer
  };
}

export const HTTP_CACHE_CONFIG = new InjectionToken<HttpCacheConfig>('HTTP_CACHE_CONFIG');
