import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';
import { HttpCacheStorage } from './httpCacheStorage';
import { TTLManager } from './ttlManager';
import { HttpCacheGuard } from './httpCacheGuard';
import { RequestsQueue } from './requestsQueue';
import { CacheBucket } from './cacheBucket';
import { RequestsCache } from './requestsCache';

@Injectable()
export class HttpCacheManager {
  constructor(
    private queue: RequestsQueue,
    private storage: HttpCacheStorage,
    private guard: HttpCacheGuard,
    private ttlManager: TTLManager,
    private requests: RequestsCache,
    @Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig
  ) {
  }

  validate(key: string) {
    const has = this.storage.has(key);
    const isValid = this.ttlManager.isValid(key);

    if(has && isValid) return true;

    this.storage.delete(key);

    return false;
  }

  get<T = any>(key: string): HttpResponse<T> {
    return this._resolveResponse<T>(this.storage.get(key));
  }

  has(key: string) {
    return this.storage.has(key);
  }

  set(key: string, body: HttpResponse<any> | any, { ttl, bucket }: { ttl?: number; bucket?: CacheBucket } = {}) {
    let response = body;

    if(!(body instanceof HttpResponse)) {
      response = new HttpResponse({
        body,
        status: 200,
        url: key
      });
    }

    this._set(key, response, ttl!);
    bucket && bucket.add(key);
  }

  delete(key?: string | RegExp | CacheBucket): void {
    if(key instanceof CacheBucket) {
      key.forEach(value => this.delete(value));
      key.clear();
      return;
    }

    this.storage.delete(key);
    this.ttlManager.delete(key);
    this.queue.remove(key);
  }

  _getQueue(): RequestsQueue {
    return this.queue;
  }

  _getRequests(): RequestsCache {
    return this.requests;
  }

  _isCacheable(canActivate: boolean, cache: boolean) {
    const strategy = this.config.strategy;

    if(strategy === 'explicit') {
      return cache;
    }

    if(canActivate && strategy === 'implicit') {
      return cache !== false;
    }

    return false;
  }

  _set(key: string, response: HttpResponse<any>, ttl: number) {
    this.storage.set(key, response);
    this.ttlManager.set(key, ttl);
  }

  _canActivate(request: HttpRequest<any>) {
    return this.guard.canActivate(request);
  }

  _resolveResponse<T = any>(event: HttpResponse<T>): HttpResponse<T> {
    return this.config.responseSerializer ? event.clone({ body: this.config.responseSerializer(event.body) }) : event;
  }
}
