import { InjectionToken, inject, makeEnvironmentProviders } from '@angular/core';

export interface HttpCacheConfig {
  strategy: 'implicit' | 'explicit';
  mode: 'stateManagement' | 'cache';
  ttl: number;
  responseSerializer?: (value: any) => any;
}

export const defaultConfig: HttpCacheConfig = {
  strategy: 'explicit',
  mode: 'cache',
  ttl: 3_600_000 // One hour
};

export const HTTP_CACHE_CONFIG = new InjectionToken<HttpCacheConfig>('HTTP_CACHE_CONFIG');

export function injectCacheConfig() {
  return inject(HTTP_CACHE_CONFIG);
}

export function withConfig(config: Partial<HttpCacheConfig>) {
  return makeEnvironmentProviders([
    {
      provide: HTTP_CACHE_CONFIG,
      useValue: { ...defaultConfig, ...config }
    }
  ]);
}

export function isHttpCacheConfig(value: unknown): value is Partial<HttpCacheConfig> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  // Check if it has any HttpCacheConfig properties
  const hasStrategy = 'strategy' in obj && (obj.strategy === 'implicit' || obj.strategy === 'explicit');
  const hasMode = 'mode' in obj && (obj.mode === 'stateManagement' || obj.mode === 'cache');
  const hasTtl = 'ttl' in obj && typeof obj.ttl === 'number';
  const hasResponseSerializer = 'responseSerializer' in obj && typeof obj.responseSerializer === 'function';

  return hasStrategy || hasMode || hasTtl || hasResponseSerializer;
}
