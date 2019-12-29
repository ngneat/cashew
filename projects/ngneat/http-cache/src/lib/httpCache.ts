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
    @Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig,
  ) {}

  set(request: HttpRequest<any>, response: HttpResponse<any>) {
    this.storage.set(request, response);
    this.ttlManager.set(request);
  }

  isCached(request: HttpRequest<any>) {
    return this.storage.has(request) && this.ttlManager.isValid(request);
  }

  get(request: HttpRequest<any>) {
    return this.storage.get(request);
  }

  isCacheable(request: HttpRequest<any>) {
    return this.guard.isCacheable(request);
  }
}
