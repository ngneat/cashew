import { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpCacheConfig } from './httpCacheConfig';
import { HttpCacheStorage } from './httpCacheStorage';
import { TTLManager } from './ttlManager';
import { HttpCacheGuard } from './httpCacheGuard';
import { RequestsQueue } from './requestsQueue';
import { CacheBucket } from './cacheBucket';
export declare class HttpCacheManager {
    private queue;
    private storage;
    private guard;
    private ttlManager;
    private config;
    constructor(queue: RequestsQueue, storage: HttpCacheStorage, guard: HttpCacheGuard, ttlManager: TTLManager, config: HttpCacheConfig);
    validate(key: string): boolean;
    get<T = any>(key: string): HttpResponse<T>;
    has(key: string): boolean;
    set(key: string, body: HttpResponse<any> | any, { ttl, bucket }?: {
        ttl?: number;
        bucket?: CacheBucket;
    }): void;
    delete(key?: string | RegExp | CacheBucket): void;
    _getQueue(): RequestsQueue;
    _isCacheable(canActivate: boolean, cache: boolean): boolean;
    _set(key: string, response: HttpResponse<any>, ttl: number): void;
    _canActivate(request: HttpRequest<any>): boolean;
    _resolveResponse<T = any>(event: HttpResponse<T>): HttpResponse<T>;
}
