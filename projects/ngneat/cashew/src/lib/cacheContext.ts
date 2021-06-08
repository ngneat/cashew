import { HttpContext, HttpContextToken } from '@angular/common/http';
import { CacheBucket } from './cacheBucket';

export interface ContextOptions {
  cache?: boolean;
  ttl?: number;
  key?: string;
  bucket?: CacheBucket;
}

export const CACHE_CONTEXT = new HttpContextToken<ContextOptions | undefined>(() => undefined);

export function withCache(options: ContextOptions = {}) {
  return new HttpContext().set(CACHE_CONTEXT, {
    cache: true,
    ...options
  });
}
