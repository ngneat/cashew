import { HttpRequest } from '@angular/common/http';

export abstract class HttpCacheGuard {
  abstract isCacheable(request: HttpRequest<any>): boolean;
}

export class DefaultHttpCacheGuard implements HttpCacheGuard {
  isCacheable(request: HttpRequest<any>): boolean {
    return request.method === 'GET' && request.responseType === 'json';
  }
}
