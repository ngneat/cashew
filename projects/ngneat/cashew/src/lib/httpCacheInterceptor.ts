import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { share, tap } from 'rxjs/operators';

import { HttpCacheManager } from './httpCacheManager.service';
import { cloneWithoutParams } from './cloneWithoutParams';
import { KeySerializer } from './keySerializer';
import { CacheBucket } from './cacheBucket';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(private httpCacheManager: HttpCacheManager, private keySerializer: KeySerializer) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const canActivate = this.httpCacheManager._canActivate(request);
    const cache = request.params.get('cache$');
    const ttl = request.params.get('ttl$');
    const customKey = request.params.get('key$');
    const bucket: any = request.params.get('bucket$');

    const clone = cloneWithoutParams(request, customKey);
    const key = this.keySerializer.serialize(clone);
    const queue = this.httpCacheManager._getQueue();

    if (this.httpCacheManager._isCacheable(canActivate, cache)) {
      bucket && (bucket as CacheBucket).add(key);

      if (queue.has(key)) {
        return queue.get(key);
      }

      if (this.httpCacheManager.validate(key)) {
        return of(this.httpCacheManager.get(key));
      }
      const shared = next.handle(clone).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const cache = this.httpCacheManager._resolveResponse(event);
            this.httpCacheManager._set(key, cache, +ttl);
            queue.delete(key);
          }
        }),
        share()
      );

      queue.set(key, shared);

      return shared;
    }

    return next.handle(clone);
  }
}
