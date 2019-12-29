import { InjectionToken } from '@angular/core';

export interface HttpCacheConfig {
  ttl: {
    default: number;
    custom: {
      [key: string]: number;
    }
  }
}

export const defaultConfig: HttpCacheConfig = {
  ttl: {
    default: 60, // seconds (change to one hour)
    custom: {},
  },
};

export function mergeConfig(config: Partial<HttpCacheConfig>) {
  return {
    ...defaultConfig,
    ...config,
    ttl: {
      ...defaultConfig.ttl,
      ...config.ttl
    }
  }
}

export const HTTP_CACHE_CONFIG = new InjectionToken<HttpCacheConfig>('HTTP_CAACHE_CONFIG');
