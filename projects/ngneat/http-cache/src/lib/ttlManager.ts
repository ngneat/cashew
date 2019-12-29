import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';
import { HttpRequest } from '@angular/common/http';
import { KeySerializer } from './keySerializer';

export abstract class TTLManager {
  abstract isValid(request: HttpRequest<any>): boolean;
  abstract set(request: HttpRequest<any>): void;
}

@Injectable()
export class DefaultTTLManager {
  private cache = new Map<string, number>();

  constructor(
    @Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig,
    private keySerializer: KeySerializer,
  ) {}

  isValid(request: HttpRequest<any>): boolean {
    const key = this.keySerializer.serialize(request);
    return this.cache.get(key) > new Date().getTime();
  }

  set(request: HttpRequest<any>): void {
    const key = this.keySerializer.serialize(request);
    const [baseUrl] = key.split('?');
    let ttl = this.config.ttl.default;

    if (this.config.ttl.custom.hasOwnProperty(baseUrl)) {
      ttl = this.config.ttl.custom[baseUrl];
    }

    this.cache.set(key, new Date().setSeconds(ttl));
  }
}
