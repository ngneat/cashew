import { HttpResponse } from '@angular/common/http';
export declare abstract class HttpCacheStorage {
    abstract has(key: string): boolean;
    abstract get(key: string): HttpResponse<any>;
    abstract set(key: string, response: HttpResponse<any>): void;
    abstract delete(key?: string | RegExp): void;
}
export declare class DefaultHttpCacheStorage implements HttpCacheStorage {
    private cache;
    has(key: string): boolean;
    get(key: string): HttpResponse<any>;
    set(key: string, response: HttpResponse<any>): void;
    delete(key?: string | RegExp): void;
}
