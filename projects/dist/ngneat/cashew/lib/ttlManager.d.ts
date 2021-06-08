import { HttpCacheConfig } from './httpCacheConfig';
export declare abstract class TTLManager {
    abstract isValid(key: string): boolean;
    abstract set(key: string, ttl?: number): void;
    abstract delete(key?: string | RegExp): void;
}
export declare class DefaultTTLManager {
    private config;
    private cache;
    constructor(config: HttpCacheConfig);
    isValid(key: string): boolean;
    set(key: string, ttl?: number): void;
    delete(key?: string | RegExp): void;
}
