import { HttpContext, HttpContextToken, HttpRequest } from '@angular/common/http';
import { CacheBucket } from './cache-bucket';

export interface ContextOptions {
  cache?: boolean;
  ttl?: number;
  key?: string | ((request: HttpRequest<any>) => string);
  bucket?: CacheBucket;
  version?: string;
  clearCachePredicate?<T>(
    currentRequest: HttpRequest<T> | undefined,
    nextRequest: HttpRequest<T>,
    key: string
  ): boolean;
}

export const CACHE_CONTEXT = new HttpContextToken<ContextOptions>(() => ({}));

export function withCache(options: ContextOptions = {}, existingHttpContext?: HttpContext) {
  return (existingHttpContext ?? new HttpContext()).set(CACHE_CONTEXT, {
    cache: true,
    ...options
  });
}
