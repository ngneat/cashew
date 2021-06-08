import { ModuleWithProviders } from '@angular/core';
import { HttpCacheConfig } from './httpCacheConfig';
export declare class HttpCacheInterceptorModule {
    static forRoot(config?: Partial<HttpCacheConfig>): ModuleWithProviders<HttpCacheInterceptorModule>;
}
