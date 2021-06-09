import { HttpContext, HttpContextToken, HttpRequest } from '@angular/common/http';
import { CacheBucket } from './cache-bucket';

export interface ContextOptions {
  cache?: boolean;
  ttl?: number;
  key?: string | ((request: HttpRequest<any>) => string);
  bucket?: CacheBucket;
  version?: string;
  clearCachePredicate?<T>(currentRequest: HttpRequest<T> | undefined, nextRequest: HttpRequest<T>): boolean;
}

export const CACHE_CONTEXT = new HttpContextToken<ContextOptions | undefined>(() => undefined);

export function withCache(options: ContextOptions = {}) {
  return new HttpContext().set(CACHE_CONTEXT, {
    cache: true,
    ...options
  });
}
