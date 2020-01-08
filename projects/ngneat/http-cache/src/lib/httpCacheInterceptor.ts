import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpCacheFacade } from './httpCache';
import { filterParams } from './filterParams';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(private cacheFacade: HttpCacheFacade) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const allowCacheGlobal = this.cacheFacade.isCacheable(request);
    const allowCacheLocal = request.params.get('cache$') as any;

    const filteredParams = filterParams(request);
    const clone = request.clone({
      params: new HttpParams({
        fromObject: filteredParams
      })
    });

    // allowCacheLocal !== false => because it can be null which means we allow it
    if (allowCacheLocal === true || (allowCacheGlobal && allowCacheLocal !== false)) {
      const ttl = request.params.get('ttl$');

      if (this.cacheFacade.isCached(request)) {
        return of(this.cacheFacade.get(request));
      }

      return next.handle(clone).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cacheFacade.set(request, event, +ttl);
          }
        })
      );
    } else {
      return next.handle(clone);
    }
  }
}
