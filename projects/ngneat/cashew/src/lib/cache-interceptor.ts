import { PLATFORM_ID, inject } from '@angular/core';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { injectCacheConfig } from './cache-config';

import { HttpCacheManager } from './cache-manager.service';
import { KeySerializer } from './key-serializer';
import { CACHE_CONTEXT } from './cache-context';
import { isPlatformServer } from '@angular/common';

export const httpCacheInterceptor: HttpInterceptorFn = (request, next) => {
  const config = injectCacheConfig();
  const httpCacheManager = inject(HttpCacheManager);
  const keySerializer = inject(KeySerializer);
  const platformId = inject(PLATFORM_ID);

  const context = request.context.get(CACHE_CONTEXT);

  if (isPlatformServer(platformId)) {
    return next(request);
  }

  const key = keySerializer.serialize(request, context);

  const {
    cache = config.strategy === 'implicit',
    ttl,
    bucket,
    clearCachePredicate,
    version,
    mode,
    returnSource
  } = context;

  if (version) {
    const versions = httpCacheManager._getVersions();
    const currentVersion = versions.get(key);

    if (currentVersion !== version) {
      httpCacheManager.delete(key);
    }

    versions.set(key, version);
  }

  if (key && clearCachePredicate) {
    const requests = httpCacheManager._getRequests();
    const clearCache = clearCachePredicate(requests.get(key)!, requests.set(key, request).get(key)!, key);

    if (clearCache) {
      httpCacheManager.delete(key, { deleteRequests: false, deleteVersions: false });
    }
  }

  const canActivate = httpCacheManager._canActivate(request);

  if (httpCacheManager._isCacheable(canActivate, cache!)) {
    const queue = httpCacheManager._getQueue();

    bucket && bucket.add(key);

    if (queue.has(key)) {
      return queue.get(key)!;
    }

    if (httpCacheManager.validate(key)) {
      return mode === 'stateManagement' ? returnSource! : of(httpCacheManager.get(key));
    }

    const shared = next(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (mode === 'stateManagement') {
              httpCacheManager._set(key, true, ttl || config.ttl);
            } else {
              const cache = httpCacheManager._resolveResponse(event);
              httpCacheManager._set(key, cache, ttl || config.ttl);
            }
            queue.delete(key);
          }
        },
        err => queue.delete(key)
      ),
      share()
    );

    queue.set(key, shared);

    return shared;
  }

  return next(request);
};
