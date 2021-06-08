import { InjectionToken } from '@angular/core';
export interface HttpCacheConfig {
    strategy: 'implicit' | 'explicit';
    ttl: number;
    responseSerializer?: (value: any) => any;
    localStorageKey?: string;
}
export declare const defaultConfig: HttpCacheConfig;
export declare function cashewConfig(config?: Partial<HttpCacheConfig>): HttpCacheConfig;
export declare const HTTP_CACHE_CONFIG: InjectionToken<HttpCacheConfig>;
