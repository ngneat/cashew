import { InjectionToken } from '@angular/core';

export interface HttpCacheConfig {
  strategy: 'implicit' | 'explicit';
  ttl: {
    default?: number;
  };
}

export const defaultConfig: HttpCacheConfig = {
  strategy: 'explicit',
  ttl: {
    default: 3600000 // One hour
  }
};

export function mergeConfig(config: Partial<HttpCacheConfig>) {
  return {
    ...defaultConfig,
    ...config,
    ttl: {
      ...defaultConfig.ttl,
      ...config.ttl
    }
  };
}

type Params = {
  cache$?: boolean;
  ttl$?: number;
  key$?: string;
  [key: string]: any;
};

export function withCache(params: Params = {}): any {
  return {
    params: {
      cache$: true,
      key$: null,
      ttl$: params.ttl$,
      ...params
    }
  };
}

export const HTTP_CACHE_CONFIG = new InjectionToken<HttpCacheConfig>('HTTP_CAACHE_CONFIG');
