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
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const context = request.context.get(CACHE_CONTEXT);

    if(context === undefined) {
      return next.handle(request);
    }

    let key = this.keySerializer.serialize(request, context);

    const { cache, ttl, bucket, clearCachePredicate, version } = context;

    if(version) {
      const versions = this.httpCacheManager._getVersions();
      const currentVersion = versions.get(key);

      if(currentVersion !== version) {
        this.httpCacheManager.delete(key);

        // @ts-ignore
        if(process.env.NODE_ENV === 'development') {
          console.log(`%c new version for key: ${key}`, 'background: #add8e6; color: #3e3c3c; padding: 5px');
        }
      }

      versions.set(key, version);
    }

    if(key && clearCachePredicate) {
      const requests = this.httpCacheManager._getRequests();
      const clearCache = clearCachePredicate(requests.get(key)!, requests.set(key, request).get(key)!);

      if(clearCache) {
        this.httpCacheManager.delete(key);

        // @ts-ignore
        if(process.env.NODE_ENV === 'development') {
          console.log(`%c clearCachePredicate is true for key: ${key}`, 'background: #add8e6; color: #3e3c3c; padding: 5px');
        }
      }
    }

    const canActivate = this.httpCacheManager._canActivate(request);

    if(this.httpCacheManager._isCacheable(canActivate, cache!)) {
      const queue = this.httpCacheManager._getQueue();

      bucket && bucket.add(key);

      if(queue.has(key)) {
        // @ts-ignore
        if(process.env.NODE_ENV === 'development') {
          console.log(`%c ${key} was returned from the queue`, 'background: #add8e6; color: #3e3c3c; padding: 5px');
        }

        return queue.get(key)!;
      }

      if(this.httpCacheManager.validate(key)) {
        // @ts-ignore
        if(process.env.NODE_ENV === 'development') {
          console.log(`%c ${key} was returned from the cache`, 'background: #add8e6; color: #3e3c3c; padding: 5px');
        }

        return of(this.httpCacheManager.get(key));
      }

      const shared = next.handle(request).pipe(
        tap(event => {
          if(event instanceof HttpResponse) {
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
