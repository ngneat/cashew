import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { finalize, share, tap } from 'rxjs/operators';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './cache-config';

import { HttpCacheManager } from './cache-manager.service';
import { KeySerializer } from './key-serializer';
import { CACHE_CONTEXT } from './cache-context';
import { isPlatformServer } from '@angular/common';

let log: any;

// @ts-ignore
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  log = require('debug')('http-cache:');
}

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(
    private httpCacheManager: HttpCacheManager,
    private keySerializer: KeySerializer,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const context = request.context.get(CACHE_CONTEXT);

    if (context === undefined || isPlatformServer(this.platformId)) {
      return next.handle(request);
    }

    const key = this.keySerializer.serialize(request, context);

    const { cache, ttl, bucket, clearCachePredicate, version } = context;

    if (version) {
      const versions = this.httpCacheManager._getVersions();
      const currentVersion = versions.get(key);

      if (currentVersion !== version) {
        this.httpCacheManager.delete(key);

        // @ts-ignore
        if (process.env.NODE_ENV === 'development') {
          log(`New version for key: ${key}`);
        }
      }

      versions.set(key, version);
    }

    if (key && clearCachePredicate) {
      const requests = this.httpCacheManager._getRequests();
      const clearCache = clearCachePredicate(requests.get(key)!, requests.set(key, request).get(key)!, key);

      if (clearCache) {
        this.httpCacheManager.delete(key, { deleteRequests: false, deleteVersions: false });

        // @ts-ignore
        if (process.env.NODE_ENV === 'development') {
          log(`clearCachePredicate is true for key: ${key}`);
        }
      }
    }

    const canActivate = this.httpCacheManager._canActivate(request);

    if (this.httpCacheManager._isCacheable(canActivate, cache!)) {
      const queue = this.httpCacheManager._getQueue();

      bucket && bucket.add(key);

      if (queue.has(key)) {
        // @ts-ignore
        if (process.env.NODE_ENV === 'development') {
          log(`${key} was returned from the queue`);
        }

        return queue.get(key)!;
      }

      if (this.httpCacheManager.validate(key)) {
        // @ts-ignore
        if (process.env.NODE_ENV === 'development') {
          log(`${key} was returned from the cache`);
        }

        return of(this.httpCacheManager.get(key));
      }

      const shared = next.handle(request).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const cache = this.httpCacheManager._resolveResponse(event);
            this.httpCacheManager._set(key, cache, ttl || this.config.ttl);
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
