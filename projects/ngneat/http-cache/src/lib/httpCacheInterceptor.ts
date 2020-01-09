import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpCacheFacade } from './httpCache';
import { cloneWithoutParams } from './cloneWithoutParams';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(private cacheFacade: HttpCacheFacade) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const canActivate = this.cacheFacade.canActivate(request);
    const cache = request.params.get('cache$');
    const ttl = request.params.get('ttl$');

    if (canActivate && this.cacheFacade.isCacheable(cache)) {
      if (this.cacheFacade.validate(request)) {
        return of(this.cacheFacade.get(request));
      }

      return next.handle(cloneWithoutParams(request)).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cacheFacade.set(request, event, +ttl);
          }
        })
      );
    }

    return next.handle(cache !== undefined || ttl !== undefined ? cloneWithoutParams(request) : request);
  }
}
