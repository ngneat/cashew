import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectCacheConfig } from './cache-config';
import { HttpCacheStorage } from './cache-storage';
import { TTLManager } from './ttl-manager';
import { HttpCacheGuard } from './cache-guard';
import { RequestsQueue } from './requests-queue';
import { CacheBucket } from './cache-bucket';
import { RequestsCache } from './requests-cache';
import { HttpCacheVersions } from './versions';

@Injectable()
export class HttpCacheManager {
  private config = injectCacheConfig();
  private queue = inject(RequestsQueue);
  private storage = inject(HttpCacheStorage);
  private guard = inject(HttpCacheGuard);
  private ttlManager = inject(TTLManager);
  private requests = inject(RequestsCache);
  private version = inject(HttpCacheVersions);

  validate(key: string) {
    const has = this.storage.has(key);
    const isValid = this.ttlManager.isValid(key);

    if (has && isValid) return true;

    this.storage.delete(key);

    return false;
  }

  get<T = any>(key: string): HttpResponse<T> {
    return this._resolveResponse<T>(this.storage.get(key)! as HttpResponse<any>);
  }

  has(key: string) {
    return this.storage.has(key);
  }

  set(key: string, body: HttpResponse<any> | any, { ttl, bucket }: { ttl?: number; bucket?: CacheBucket } = {}) {
    let response = body;

    if (!(body instanceof HttpResponse)) {
      response = new HttpResponse({
        body,
        status: 200,
        url: key
      });
    }

    this._set(key, response, ttl!);
    bucket && bucket.add(key);
  }

  delete(
    key: string | CacheBucket,
    { deleteRequests, deleteVersions }: { deleteVersions?: boolean; deleteRequests?: boolean } = {}
  ): void {
    if (key instanceof CacheBucket) {
      key.forEach(value => this.delete(value));
      key.clear();

      return;
    }

    this.storage.delete(key);
    this.ttlManager.delete(key);
    this.queue.delete(key);

    if (deleteRequests !== false) {
      this._getRequests().delete(key);
    }

    if (deleteVersions !== false) {
      this._getVersions().delete(key);
    }
  }

  clear() {
    this.storage.clear();
    this.ttlManager.clear();
    this.queue.clear();
    this._getVersions().clear();
    this._getRequests().clear();
  }

  _getQueue() {
    return this.queue;
  }

  _getRequests() {
    return this.requests;
  }

  _getVersions() {
    return this.version;
  }

  _isCacheable(canActivate: boolean, cache: boolean) {
    const strategy = this.config.strategy;

    if (strategy === 'explicit') {
      return cache;
    }

    if (canActivate && strategy === 'implicit') {
      return cache !== false;
    }

    return false;
  }

  _set(key: string, response: HttpResponse<any> | boolean, ttl: number) {
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
