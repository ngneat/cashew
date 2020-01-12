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
  constructor(private cacheFacade: HttpCacheManager, private keySerializer: KeySerializer) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const canActivate = this.cacheFacade._canActivate(request);
    const cache = request.params.get('cache$');
    const ttl = request.params.get('ttl$');
    const customKey = request.params.get('key$');
    const bucket: any = request.params.get('bucket$');

    const clone = cloneWithoutParams(request, customKey);
    const key = this.keySerializer.serialize(clone);

    if (this.cacheFacade._isCacheable(canActivate, cache)) {
      bucket && (bucket as CacheBucket).add(key);

      // @ts-ignore
      if (this.cacheFacade.queue.has(key)) {
        // @ts-ignore
        return this.cacheFacade.queue.get(key);
      }

      if (this.cacheFacade.validate(key)) {
        return of(this.cacheFacade.get(key));
      }

      const shared = next.handle(clone).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cacheFacade._set(key, event, +ttl);
          }
        }),
        share()
      );

      // @ts-ignore
      this.cacheFacade.queue.set(key, shared);

      return shared;
    }

    return next.handle(clone);
  }
}
