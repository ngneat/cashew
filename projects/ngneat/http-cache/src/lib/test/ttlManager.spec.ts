// import { Inject, Injectable } from '@angular/core';
// import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';
// import { deleteByRegex } from './deleteByRegex';
//
// export abstract class TTLManager {
//   abstract isValid(key: string): boolean;
//   abstract set(key: string, ttl?: number): void;
//   abstract delete(key: string | RegExp): void;
// }
//
// @Injectable()
// export class DefaultTTLManager {
//   private cache = new Map<string, number>();
//
//   constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {}
//
//   isValid(key: string): boolean {
//     return this.cache.get(key) > new Date().getTime();
//   }
//
//   set(key: string, ttl?: number): void {
//     let resolveTTL = ttl || this.config.ttl.default;
//
//     this.cache.set(key, new Date().setMilliseconds(resolveTTL));
//   }
//
//   delete(key?: string | RegExp): void {
//     if (!key) {
//       this.cache.clear();
//       return;
//     }
//
//     if (typeof key === 'string') {
//       this.cache.delete(key as string);
//       return;
//     }
//
//     deleteByRegex(key as RegExp, this.cache);
//   }
// }
