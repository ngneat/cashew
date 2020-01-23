import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from './httpCacheConfig';
import { HttpCacheStorage } from './httpCacheStorage';
import { TTLManager } from './ttlManager';
import { HttpCacheGuard } from './httpCacheGuard';
import { RequestsQueue } from './requestsQueue';
import { HttpCacheRequest } from './types';
import { CacheBucket } from './cacheBucket';

@Injectable()
export class HttpCacheManager {
  constructor(
    private queue: RequestsQueue,
    private storage: HttpCacheStorage,
    private guard: HttpCacheGuard,
    private ttlManager: TTLManager,
    @Inject(HTTP_CACHE_CONFIG) private config: HttpCacheConfig
  ) {}

  validate(key: string) {
    const has = this.storage.has(key);
    const isValid = this.ttlManager.isValid(key);
    if (has && isValid) return true;

    this.storage.delete(key);
    return false;
  }

  get(key: string) {
    return this.storage.get(key);
  }

  has(key: string) {
    return this.storage.has(key);
  }

  //TODO: { ttl, bucket } needs to be optional
  add(key: string, body: HttpResponse<any> | any, { ttl, bucket }: { ttl?: number; bucket?: CacheBucket }) {
    let response = body;

    if (!(body instanceof HttpResponse)) {
      response = new HttpResponse({
        body,
        status: 200,
        url: key
      });
    }

    this._set(key, response, ttl);
    if (bucket) {
      bucket.add(key);
    }
  }

  delete(key?: string | RegExp | CacheBucket): void {
    if (key instanceof CacheBucket) {
      key.forEach(value => this.delete(value));
      key.clear();
      return;
    }

    this.storage.delete(key);
    this.ttlManager.delete(key);
  }

  //TODO: add types
  _isCacheable(canActivate: boolean, cache: any) {
    const strategy = this.config.strategy;
    if (strategy === 'explicit') {
      return cache;
    }

    if (canActivate && strategy === 'implicit') {
      return cache !== false;
    }

    return false;
  }

  _set(key: string, response: HttpResponse<any>, ttl: number) {
    this.storage.set(key, response);
    this.ttlManager.set(key, ttl);
    //TODO: I would move it out to the interceptor
    this.queue.delete(key);
  }

  _canActivate(request: HttpCacheRequest) {
    return this.guard.canActivate(request);
  }
}
