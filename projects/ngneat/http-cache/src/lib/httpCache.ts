import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';
import { HttpCacheStorage } from './httpCacheStorage';
import { TTLManager } from './ttlManager';
import { HttpCacheGuard } from './httpCacheGuard';
import { KeySerializer } from './keySerializer';
import { RequestsQueue } from './requestsQueue';

@Injectable()
export class HttpCacheFacade {
  constructor(
    public queue: RequestsQueue,
    public storage: HttpCacheStorage,

    private guard: HttpCacheGuard,
    private ttlManager: TTLManager,
    private keySerializer: KeySerializer,
    @Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig
  ) {}

  set(request: HttpRequest<any>, response: HttpResponse<any>, ttl: number) {
    this.storage.set(request, response);
    this.ttlManager.set(request, ttl);
    this.queue.delete(request);
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

  delete(url?: string | RegExp): void {
    this.storage.delete(url);
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
