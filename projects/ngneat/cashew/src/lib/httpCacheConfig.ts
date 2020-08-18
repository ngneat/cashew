import { HttpParameterCodec } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { CacheBucket } from './cacheBucket';

export interface HttpCacheConfig {
  strategy: 'implicit' | 'explicit';
  ttl: number;
  responseSerializer?: (value: any) => any;
  localStorageKey?: string;
  parameterCodec?: HttpParameterCodec;
}

export const defaultConfig: HttpCacheConfig = {
  strategy: 'explicit',
  ttl: 3600000, // One hour
  localStorageKey: 'httpCache'
};

type Params = {
  cache$?: boolean;
  ttl$?: number;
  key$?: string;
  bucket$?: CacheBucket;
  parameterCodec$?: HttpParameterCodec;
  [key: string]: any;
};

export function withCache(params: Params = {}): { params: Params } {
  return {
    params: {
      cache$: true,
      ...params
    }
  };
}

export function cashewConfig(config: Partial<HttpCacheConfig> = defaultConfig): HttpCacheConfig {
  return {
    strategy: config.strategy || defaultConfig.strategy,
    ttl: config.ttl || defaultConfig.ttl,
    localStorageKey: config.localStorageKey || defaultConfig.localStorageKey,
    responseSerializer: config.responseSerializer,
    parameterCodec: config.parameterCodec
  };
}

export const HTTP_CACHE_CONFIG = new InjectionToken<HttpCacheConfig>('HTTP_CACHE_CONFIG');
