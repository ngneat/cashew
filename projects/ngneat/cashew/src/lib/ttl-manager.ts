import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './cache-config';

export abstract class TTLManager extends Map<string, number> {
  abstract isValid(key: string): boolean;
}

@Injectable()
export class DefaultTTLManager extends TTLManager {
  constructor(@Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig) {
    super();
  }

  isValid(key: string): boolean {
    return this.get(key)! > new Date().getTime();
  }

  set(key: string, ttl: number) {
    return super.set(key, new Date().setMilliseconds(ttl || this.config.ttl));
  }
}
