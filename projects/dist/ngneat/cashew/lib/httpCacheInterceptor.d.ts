import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpCacheConfig } from './httpCacheConfig';
import { HttpCacheManager } from './httpCacheManager.service';
import { KeySerializer } from './keySerializer';
export declare class HttpCacheInterceptor implements HttpInterceptor {
    private httpCacheManager;
    private keySerializer;
    private config;
    constructor(httpCacheManager: HttpCacheManager, keySerializer: KeySerializer, config: HttpCacheConfig);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
