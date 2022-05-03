import { HttpContext, HttpContextToken, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { CacheBucket } from './cache-bucket';
import { HttpCacheConfig } from './cache-config';

export interface ContextOptions {
  cache?: boolean;
  ttl?: number;
  key?: string | ((request: HttpRequest<any>) => string);
  bucket?: CacheBucket;
  version?: string;
  clearCachePredicate?<T>(
    previousRequest: HttpRequest<T> | undefined,
    currentRequest: HttpRequest<T>,
    key: string
  ): boolean;
  context?: HttpContext;
  mode?: HttpCacheConfig['mode'];
  returnSource?: Observable<HttpResponse<any>>;
}

export const CACHE_CONTEXT = new HttpContextToken<ContextOptions>(() => ({}));

export function withCache(options: ContextOptions = {}) {
  const { context, ...remainingOptions } = options;
  return (context ?? new HttpContext()).set(CACHE_CONTEXT, {
    cache: true,
    returnSource: EMPTY,
    ...remainingOptions
  });
}
