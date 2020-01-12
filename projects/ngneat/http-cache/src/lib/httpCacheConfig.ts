import { InjectionToken } from '@angular/core';
import { CacheBucket } from './cacheBucket';

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
  bucket$?: CacheBucket,
  [key: string]: any;
};

export function withCache(params: Params = {}): any {
  return {
    params: {
      cache$: true,
      ttl$: params.ttl$,
      ...params
    }
  };
}

export const HTTP_CACHE_CONFIG = new InjectionToken<HttpCacheConfig>('HTTP_CAACHE_CONFIG');
