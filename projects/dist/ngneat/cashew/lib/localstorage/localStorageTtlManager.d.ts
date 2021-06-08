import { HttpCacheConfig } from '../httpCacheConfig';
export declare class LocalStorageTTLManager {
    private config;
    private readonly ttl;
    private readonly ttlStorageKey;
    constructor(config: HttpCacheConfig);
    isValid(key: string): boolean;
    set(key: string, ttl?: number): void;
    delete(key?: string | RegExp): void;
}
