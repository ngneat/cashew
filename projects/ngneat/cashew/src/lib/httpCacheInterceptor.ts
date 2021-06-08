import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { finalize, share, tap } from 'rxjs/operators';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';

import { HttpCacheManager } from './httpCacheManager.service';
import { KeySerializer } from './keySerializer';
import { CACHE_CONTEXT } from './cacheContext';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(
    private httpCacheManager: HttpCacheManager,
    private keySerializer: KeySerializer,
    @Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const context = request.context.get(CACHE_CONTEXT);

    if (context === undefined) {
      return next.handle(request);
    }

    const { cache, ttl, bucket } = context;

    const canActivate = this.httpCacheManager._canActivate(request);

    if (this.httpCacheManager._isCacheable(canActivate, Boolean(cache))) {
      const queue = this.httpCacheManager._getQueue();
      const key = this.keySerializer.serialize(request, context);

      bucket && bucket.add(key);

      if (queue.has(key)) {
        return queue.get(key)!;
      }

      if (this.httpCacheManager.validate(key)) {
        return of(this.httpCacheManager.get(key));
      }

      const shared = next.handle(request).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const cache = this.httpCacheManager._resolveResponse(event);
            this.httpCacheManager._set(key, cache, +ttl!);
          }
        }),
        finalize(() => queue.delete(key)),
        share()
      );

      queue.set(key, shared);

      return shared;
    }

    return next.handle(request);
  }
}
