import { HttpContext, HttpContextToken, HttpRequest } from '@angular/common/http';
import { CacheBucket } from './cacheBucket';

export interface ContextOptions {
  cache?: boolean;
  ttl?: number;
  key?: string;
  bucket?: CacheBucket;

  clearCachePredicate?<T>(currentRequest: HttpRequest<T> | undefined, nextRequest: HttpRequest<T>): boolean;
}

export const CACHE_CONTEXT = new HttpContextToken<ContextOptions | undefined>(() => undefined);

export function withCache(options: ContextOptions = {}) {
  return new HttpContext().set(CACHE_CONTEXT, {
    cache: true,
    ...options
  });
}
