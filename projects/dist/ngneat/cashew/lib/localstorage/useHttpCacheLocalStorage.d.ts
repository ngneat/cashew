import { TTLManager } from '../ttlManager';
import { HttpCacheStorage } from '../httpCacheStorage';
import { HttpCacheLocalStorage } from './httpCacheLocalStorage';
import { LocalStorageTTLManager } from './localStorageTtlManager';
export declare const useHttpCacheLocalStorage: ({
    provide: typeof HttpCacheStorage;
    useClass: typeof HttpCacheLocalStorage;
} | {
    provide: typeof TTLManager;
    useClass: typeof LocalStorageTTLManager;
})[];
