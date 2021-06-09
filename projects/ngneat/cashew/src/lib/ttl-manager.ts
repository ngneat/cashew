import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './cache-config';

export abstract class TTLManager {
  abstract isValid(key: string): boolean;

  abstract set(key: string, ttl?: number): void;

  abstract delete(key?: string): void;
}

@Injectable()
export class DefaultTTLManager implements TTLManager {
  private cache = new Map<string, number>();

  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
  }

  isValid(key: string): boolean {
    return this.cache.get(key)! > new Date().getTime();
  }

  set(key: string, ttl?: number): void {
    let resolveTTL = ttl || this.config.ttl;

    this.cache.set(key, new Date().setMilliseconds(resolveTTL));
  }

  delete(key?: string): void {
    if(!key) {
      this.cache.clear();
      return;
    }

    this.cache.delete(key as string);
  }

  forEach(cb: any) {
    this.cache.forEach(cb);
  }
}
