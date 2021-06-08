import { HttpResponse } from '@angular/common/http';
import { HttpCacheStorage } from '../httpCacheStorage';
import { HttpCacheConfig } from '../httpCacheConfig';
export declare class HttpCacheLocalStorage implements HttpCacheStorage {
    private config;
    private readonly cache;
    private readonly storageKey;
    constructor(config: HttpCacheConfig);
    has(key: string): boolean;
    get(key: string): HttpResponse<any>;
    set(key: string, response: HttpResponse<any>): void;
    delete(key?: string | RegExp): void;
}
