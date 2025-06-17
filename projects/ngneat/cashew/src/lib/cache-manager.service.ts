import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject, Injector } from '@angular/core';
import { injectCacheConfig } from './cache-config';
import { DefaultHttpCacheStorage, HttpCacheStorage } from './cache-storage';
import { DefaultTTLManager, TTLManager } from './ttl-manager';
import { HttpCacheGuard } from './cache-guard';
import { RequestsQueue } from './requests-queue';
import { CacheBucket } from './cache-bucket';
import { RequestsCache } from './requests-cache';
import { HttpCacheVersions } from './versions';
import { CacheStorageStrategy } from './cache-context';
import { LocalStorageHttpCacheStorage } from './local-storage/local-storage-cache';
import { LocalStorageTTLManager } from './local-storage/local-storage-ttl';
import { LocalStorageVersionsManager } from './local-storage/local-storage-versions';

interface ResolvedCacheServices {
  storage: HttpCacheStorage;
  ttlManager: TTLManager;
  versions: HttpCacheVersions;
}

@Injectable()
export class HttpCacheManager {
  private config = injectCacheConfig();
  private queue = inject(RequestsQueue);
  private guard = inject(HttpCacheGuard);
  private requests = inject(RequestsCache);
  private injector = inject(Injector);

  private _getCacheServices(storageStrategy?: CacheStorageStrategy): ResolvedCacheServices {
    if (storageStrategy === 'localStorage') {
      const lsStorage = this.injector.get(LocalStorageHttpCacheStorage, null, { optional: true });
      const lsTtl = this.injector.get(LocalStorageTTLManager, null, { optional: true });
      const lsVersions = this.injector.get(LocalStorageVersionsManager, null, { optional: true });

      if (lsStorage && lsTtl && lsVersions) {
        return { storage: lsStorage, ttlManager: lsTtl, versions: lsVersions };
      } else {
        throw new Error(
          'HttpCacheManager: LocalStorage strategy chosen, but not available. Did you forget to configure it via `withLocalStorage()`?'
        );
      }
    }

    // default to memory strategy
    return {
      storage: this.injector.get(DefaultHttpCacheStorage),
      ttlManager: this.injector.get(DefaultTTLManager),
      versions: this.injector.get(HttpCacheVersions)
    };
  }

  validate(key: string, strategy?: CacheStorageStrategy) {
    const { storage, ttlManager } = this._getCacheServices(strategy);
    const has = storage.has(key);
    const isValid = ttlManager.isValid(key);

    if (has && isValid) return true;

    storage.delete(key);

    return false;
  }

  get<T = any>(key: string, strategy?: CacheStorageStrategy): HttpResponse<T> {
    const { storage } = this._getCacheServices(strategy);
    return this._resolveResponse<T>(storage.get(key)! as HttpResponse<any>);
  }

  has(key: string, strategy?: CacheStorageStrategy) {
    const { storage } = this._getCacheServices(strategy);
    return storage.has(key);
  }

  set(
    key: string,
    body: HttpResponse<any> | any,
    { ttl, bucket, strategy }: { ttl?: number; bucket?: CacheBucket; strategy?: CacheStorageStrategy } = {}
  ) {
    let response = body;

    if (!(body instanceof HttpResponse)) {
      response = new HttpResponse({
        body,
        status: 200,
        url: key
      });
    }

    this._set(key, response, ttl ?? this.config.ttl, strategy);
    bucket && bucket.add(key);
  }

  delete(
    key: string | CacheBucket,
    {
      deleteRequests,
      deleteVersions,
      strategy
    }: { deleteVersions?: boolean; deleteRequests?: boolean; strategy?: CacheStorageStrategy } = {}
  ): void {
    if (key instanceof CacheBucket) {
      key.forEach(value => this.delete(value, { deleteRequests, deleteVersions, strategy }));
      key.clear();
      return;
    }

    const { storage, ttlManager, versions: versionsManager } = this._getCacheServices(strategy);

    storage.delete(key);
    ttlManager.delete(key);
    this.queue.delete(key);

    if (deleteRequests) {
      this._getRequests().delete(key);
    }

    if (deleteVersions) {
      versionsManager.delete(key);
    }
  }

  /**
   * If a strategy is provided, will clear the cache for that specific storage strategy.
   * Defaults to clear all storages.
   * @param strategy - The storage strategy to clear (memory or localStorage).
   */
  clear(strategy?: CacheStorageStrategy) {
    if (strategy) {
      const { storage, ttlManager, versions: versionsManager } = this._getCacheServices(strategy);
      storage.clear();
      ttlManager.clear();
      versionsManager.clear();
    } else {
      // Clear all storages (memory and localStorage if available)
      // Memory
      const { storage, ttlManager, versions: versionsManager } = this._getCacheServices('memory');
      storage.clear();
      ttlManager.clear();
      versionsManager.clear();
      // LocalStorage (if available)
      try {
        const { storage, ttlManager, versions: versionsManager } = this._getCacheServices('localStorage');
        storage.clear();
        ttlManager.clear();
        versionsManager.clear();
      } catch {
        // Ignore if localStorage services are not available
      }
    }
    this.queue.clear();
    this._getRequests().clear();
  }

  _getQueue() {
    return this.queue;
  }

  _getRequests() {
    return this.requests;
  }

  _getVersions(strategy?: CacheStorageStrategy): HttpCacheVersions {
    return this._getCacheServices(strategy).versions;
  }

  _isCacheable(canActivate: boolean, cache: boolean) {
    const strategy = this.config.strategy;

    if (strategy === 'explicit') {
      return cache;
    }

    if (canActivate && strategy === 'implicit') {
      return cache;
    }

    return false;
  }

  _set(key: string, response: HttpResponse<any> | boolean, ttl: number, strategy?: CacheStorageStrategy) {
    const { storage, ttlManager } = this._getCacheServices(strategy);
    storage.set(key, response);
    ttlManager.set(key, ttl);
  }

  _canActivate(request: HttpRequest<any>) {
    return this.guard.canActivate(request);
  }

  _resolveResponse<T = any>(event: HttpResponse<T>): HttpResponse<T> {
    return this.config.responseSerializer ? event.clone({ body: this.config.responseSerializer(event.body) }) : event;
  }
}
