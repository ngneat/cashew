import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';
import { HttpCacheStorage } from './httpCacheStorage';
import { TTLManager } from './ttlManager';
import { HttpCacheGuard } from './httpCacheGuard';

@Injectable()
export class HttpCacheFacade {
  constructor(
    private guard: HttpCacheGuard,
    private storage: HttpCacheStorage,
    private ttlManager: TTLManager,
    @Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig
  ) {}

  set(request: HttpRequest<any>, response: HttpResponse<any>, ttl: number) {
    this.storage.set(request, response);
    this.ttlManager.set(request, ttl);
  }

  validate(request: HttpRequest<any>) {
    const has = this.storage.has(request);
    const isValid = this.ttlManager.isValid(request);
    if (has && isValid) return true;

    this.storage.delete(request);
    return false;
  }

  get(request: HttpRequest<any>) {
    return this.storage.get(request);
  }

  delete(url: string | RegExp): void {
    return this.storage.delete(url);
  }

  isCacheable(cache: any) {
    const strategy = this.config.strategy;
    if (strategy === 'explicit') {
      return cache;
    }

    if (strategy === 'implicit') {
      return cache !== false;
    }

    return false;
  }

  canActivate(request: HttpRequest<any>) {
    return this.guard.canActivate(request);
  }
}
