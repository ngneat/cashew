import { HttpRequest } from '@angular/common/http';

export abstract class HttpCacheGuard {
  abstract canActivate(request: HttpRequest<any>): boolean;
}

export class DefaultHttpCacheGuard implements HttpCacheGuard {
  canActivate(request: HttpRequest<any>): boolean {
    return request.method === 'GET' && request.responseType === 'json';
  }
}
