import { HttpContext, HttpContextToken } from '@angular/common/http';
import { CacheBucket } from './cacheBucket';
export interface ContextOptions {
    cache?: boolean;
    ttl?: number;
    key?: string;
    bucket?: CacheBucket;
}
export declare const CACHE_CONTEXT: HttpContextToken<ContextOptions>;
export declare function withCache(options?: ContextOptions): HttpContext;
