import { InjectionToken } from '@angular/core';

export interface HttpCacheConfig {
  strategy: 'implicit' | 'explicit';
  ttl: number;
  responseSerializer?: (value: any) => any;
}

export const defaultConfig: HttpCacheConfig = {
  strategy: 'explicit',
  ttl: 3_600_000 // One hour
};

export const HTTP_CACHE_CONFIG = new InjectionToken<HttpCacheConfig>('HTTP_CACHE_CONFIG');
