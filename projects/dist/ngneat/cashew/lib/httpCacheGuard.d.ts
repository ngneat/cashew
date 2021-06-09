import { HttpRequest } from '@angular/common/http';
export declare abstract class HttpCacheGuard {
  abstract canActivate(request: HttpRequest<any>): boolean;
}
export declare class DefaultHttpCacheGuard implements HttpCacheGuard {
  canActivate(request: HttpRequest<any>): boolean;
}
