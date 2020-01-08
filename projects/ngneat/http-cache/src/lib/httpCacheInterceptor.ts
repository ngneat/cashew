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
    const isRequestCacheable = this.cacheFacade.isCacheable(request);

    if (isRequestCacheable && !!request.params.get('cache$') === true) {
      if (this.cacheFacade.validate(request)) {
        return of(this.cacheFacade.get(request));
      }

      const filteredParams = filterParams(request);
      const clone = request.clone({
        params: new HttpParams({ fromObject: filteredParams })
      });

      return next.handle(clone).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const ttl = request.params.get('ttl$');
            this.cacheFacade.set(request, event, +ttl);
          }
        })
      );
    }

    return next.handle(request);
  }
}
