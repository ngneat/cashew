import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { share, tap } from 'rxjs/operators';

import { HttpCacheFacade } from './httpCache';
import { cloneWithoutParams } from './cloneWithoutParams';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(private cacheFacade: HttpCacheFacade) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const canActivate = this.cacheFacade.canActivate(request);
    const cache = request.params.get('cache$');
    const ttl = request.params.get('ttl$');
    const clone = cloneWithoutParams(request);

    if (canActivate && this.cacheFacade.isCacheable(cache)) {
      if (this.cacheFacade.queue.has(clone)) {
        return this.cacheFacade.queue.get(clone);
      }

      if (this.cacheFacade.validate(clone)) {
        return of(this.cacheFacade.get(clone));
      }

      const shared = next.handle(clone).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cacheFacade.set(clone, event, +ttl);
          }
        }),
        share()
      );

      this.cacheFacade.queue.set(clone, shared);

      return shared;
    }

    return next.handle(clone);
  }
}
