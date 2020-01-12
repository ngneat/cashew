import { HttpCacheRequest } from './types';

export abstract class HttpCacheGuard {
  abstract canActivate(request: HttpCacheRequest): boolean;
}

export class DefaultHttpCacheGuard implements HttpCacheGuard {
  canActivate(request: HttpCacheRequest): boolean {
    return request.method === 'GET' && request.responseType === 'json';
  }
}
