import { HttpResponse, HttpContextToken, HttpContext, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, Injectable, Inject, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { tap, finalize, share } from 'rxjs/operators';

class KeySerializer {
}
class DefaultKeySerializer extends KeySerializer {
    serialize(request, context) {
        var _a;
        return (_a = context.key) !== null && _a !== void 0 ? _a : request.urlWithParams;
    }
}

const defaultConfig = {
    strategy: 'explicit',
    ttl: 3600000,
    localStorageKey: 'httpCache'
};
function cashewConfig(config = defaultConfig) {
    var _a, _b, _c;
    return {
        strategy: (_a = config.strategy) !== null && _a !== void 0 ? _a : defaultConfig.strategy,
        ttl: (_b = config.ttl) !== null && _b !== void 0 ? _b : defaultConfig.ttl,
        localStorageKey: (_c = config.localStorageKey) !== null && _c !== void 0 ? _c : defaultConfig.localStorageKey,
        responseSerializer: config.responseSerializer
    };
}
const HTTP_CACHE_CONFIG = new InjectionToken('HTTP_CACHE_CONFIG');

function deleteByRegex(pattern, cache) {
    for (const [key] of Array.from(cache)) {
        if (pattern.test(key)) {
            cache.delete(key);
            break;
        }
    }
}

class HttpCacheStorage {
}
class DefaultHttpCacheStorage {
    constructor() {
        this.cache = new Map();
    }
    has(key) {
        return this.cache.has(key);
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, response) {
        this.cache.set(key, response);
    }
    delete(key) {
        if (!key) {
            this.cache.clear();
            return;
        }
        if (typeof key === 'string') {
            this.cache.delete(key);
            return;
        }
        deleteByRegex(key, this.cache);
    }
}
DefaultHttpCacheStorage.decorators = [
    { type: Injectable }
];

class TTLManager {
}
class DefaultTTLManager {
    constructor(config) {
        this.config = config;
        this.cache = new Map();
    }
    isValid(key) {
        return this.cache.get(key) > new Date().getTime();
    }
    set(key, ttl) {
        let resolveTTL = ttl || this.config.ttl;
        this.cache.set(key, new Date().setMilliseconds(resolveTTL));
    }
    delete(key) {
        if (!key) {
            this.cache.clear();
            return;
        }
        if (typeof key === 'string') {
            this.cache.delete(key);
            return;
        }
        deleteByRegex(key, this.cache);
    }
}
DefaultTTLManager.decorators = [
    { type: Injectable }
];
DefaultTTLManager.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [HTTP_CACHE_CONFIG,] }] }
];

class HttpCacheGuard {
}
class DefaultHttpCacheGuard {
    canActivate(request) {
        return request.method === 'GET' && request.responseType === 'json';
    }
}

class RequestsQueue {
    constructor() {
        this.queue = new Map();
    }
    get(key) {
        return this.queue.get(key);
    }
    has(key) {
        return this.queue.has(key);
    }
    set(key, shared) {
        this.queue.set(key, shared);
    }
    delete(key) {
        this.queue.delete(key);
    }
}
RequestsQueue.decorators = [
    { type: Injectable }
];

class CacheBucket {
    constructor() {
        this.keys = new Set();
    }
    add(key) {
        this.keys.add(key);
    }
    has(key) {
        return this.keys.has(key);
    }
    forEach(cb) {
        this.keys.forEach(cb);
    }
    delete(key) {
        this.keys.delete(key);
    }
    clear() {
        this.keys.clear();
    }
}

class HttpCacheManager {
    constructor(queue, storage, guard, ttlManager, config) {
        this.queue = queue;
        this.storage = storage;
        this.guard = guard;
        this.ttlManager = ttlManager;
        this.config = config;
    }
    validate(key) {
        const has = this.storage.has(key);
        const isValid = this.ttlManager.isValid(key);
        if (has && isValid)
            return true;
        this.storage.delete(key);
        return false;
    }
    get(key) {
        return this._resolveResponse(this.storage.get(key));
    }
    has(key) {
        return this.storage.has(key);
    }
    set(key, body, { ttl, bucket } = {}) {
        let response = body;
        if (!(body instanceof HttpResponse)) {
            response = new HttpResponse({
                body,
                status: 200,
                url: key
            });
        }
        this._set(key, response, ttl);
        bucket && bucket.add(key);
    }
    delete(key) {
        if (key instanceof CacheBucket) {
            key.forEach(value => this.delete(value));
            key.clear();
            return;
        }
        this.storage.delete(key);
        this.ttlManager.delete(key);
    }
    _getQueue() {
        return this.queue;
    }
    _isCacheable(canActivate, cache) {
        const strategy = this.config.strategy;
        if (strategy === 'explicit') {
            return cache;
        }
        if (canActivate && strategy === 'implicit') {
            return cache !== false;
        }
        return false;
    }
    _set(key, response, ttl) {
        this.storage.set(key, response);
        this.ttlManager.set(key, ttl);
    }
    _canActivate(request) {
        return this.guard.canActivate(request);
    }
    _resolveResponse(event) {
        return this.config.responseSerializer ? event.clone({ body: this.config.responseSerializer(event.body) }) : event;
    }
}
HttpCacheManager.decorators = [
    { type: Injectable }
];
HttpCacheManager.ctorParameters = () => [
    { type: RequestsQueue },
    { type: HttpCacheStorage },
    { type: HttpCacheGuard },
    { type: TTLManager },
    { type: undefined, decorators: [{ type: Inject, args: [HTTP_CACHE_CONFIG,] }] }
];

const CACHE_CONTEXT = new HttpContextToken(() => undefined);
function withCache(options = {}) {
    return new HttpContext().set(CACHE_CONTEXT, Object.assign({ cache: true }, options));
}

class HttpCacheInterceptor {
    constructor(httpCacheManager, keySerializer, config) {
        this.httpCacheManager = httpCacheManager;
        this.keySerializer = keySerializer;
        this.config = config;
    }
    intercept(request, next) {
        const context = request.context.get(CACHE_CONTEXT);
        if (context === undefined) {
            return next.handle(request);
        }
        const { cache, ttl, bucket } = context;
        const canActivate = this.httpCacheManager._canActivate(request);
        if (this.httpCacheManager._isCacheable(canActivate, cache)) {
            const queue = this.httpCacheManager._getQueue();
            const key = this.keySerializer.serialize(request, context);
            bucket && bucket.add(key);
            if (queue.has(key)) {
                return queue.get(key);
            }
            if (this.httpCacheManager.validate(key)) {
                return of(this.httpCacheManager.get(key));
            }
            const shared = next.handle(request).pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    const cache = this.httpCacheManager._resolveResponse(event);
                    this.httpCacheManager._set(key, cache, +ttl);
                }
            }), finalize(() => queue.delete(key)), share());
            queue.set(key, shared);
            return shared;
        }
        return next.handle(request);
    }
}
HttpCacheInterceptor.decorators = [
    { type: Injectable }
];
HttpCacheInterceptor.ctorParameters = () => [
    { type: HttpCacheManager },
    { type: KeySerializer },
    { type: undefined, decorators: [{ type: Inject, args: [HTTP_CACHE_CONFIG,] }] }
];

class HttpCacheInterceptorModule {
    static forRoot(config = {}) {
        return {
            providers: [
                { provide: HTTP_CACHE_CONFIG, useValue: Object.assign(Object.assign({}, defaultConfig), config) },
                { provide: KeySerializer, useClass: DefaultKeySerializer },
                { provide: HttpCacheStorage, useClass: DefaultHttpCacheStorage },
                { provide: TTLManager, useClass: DefaultTTLManager },
                { provide: HttpCacheGuard, useClass: DefaultHttpCacheGuard },
                { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },
                HttpCacheManager,
                RequestsQueue
            ],
            ngModule: HttpCacheInterceptorModule
        };
    }
}
HttpCacheInterceptorModule.decorators = [
    { type: NgModule, args: [{},] }
];

function setCacheInStorage(key, storage) {
    localStorage.setItem(key, JSON.stringify(mapToObj(storage)));
}
function getStorageCache(key) {
    const storage = JSON.parse(localStorage.getItem(key) || '{}');
    const map = new Map();
    Object.keys(storage).forEach(key => map.set(key, storage[key]));
    return map;
}
function clearStorageCache(key) {
    localStorage.removeItem(key);
}
function mapToObj(map) {
    return Array.from(map).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
}

class HttpCacheLocalStorage {
    constructor(config) {
        this.config = config;
        this.cache = new DefaultHttpCacheStorage();
        this.storageKey = config.localStorageKey;
    }
    has(key) {
        return this.cache.has(key) || getStorageCache(this.storageKey).has(key);
    }
    get(key) {
        const cacheValue = this.cache.get(key);
        if (cacheValue) {
            return cacheValue;
        }
        const value = getStorageCache(this.storageKey).get(key);
        if (value) {
            const response = new HttpResponse(value);
            this.cache.set(key, response);
        }
        return this.cache.get(key);
    }
    set(key, response) {
        const storage = getStorageCache(this.storageKey);
        storage.set(key, response);
        setCacheInStorage(this.storageKey, storage);
        this.cache.set(key, response);
    }
    delete(key) {
        this.cache.delete(key);
        if (!key) {
            clearStorageCache(this.storageKey);
            return;
        }
        const storage = getStorageCache(this.storageKey);
        if (typeof key === 'string') {
            storage.delete(key);
            setCacheInStorage(this.storageKey, storage);
            return;
        }
        deleteByRegex(key, storage);
        setCacheInStorage(this.storageKey, storage);
    }
}
HttpCacheLocalStorage.decorators = [
    { type: Injectable }
];
HttpCacheLocalStorage.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [HTTP_CACHE_CONFIG,] }] }
];

class LocalStorageTTLManager {
    constructor(config) {
        this.config = config;
        this.ttlStorageKey = `${config.localStorageKey}TTL`;
        this.ttl = new DefaultTTLManager(config);
    }
    isValid(key) {
        const valid = this.ttl.isValid(key);
        if (valid) {
            return true;
        }
        const localStorageTimeStamp = getStorageCache(this.ttlStorageKey).get(key);
        const validInStorage = localStorageTimeStamp > new Date().getTime();
        if (validInStorage) {
            this.ttl.set(key, localStorageTimeStamp - new Date().getTime());
        }
        return validInStorage;
    }
    set(key, ttl) {
        const resolveTTL = ttl || this.config.ttl;
        const storage = getStorageCache(this.ttlStorageKey);
        storage.set(key, new Date().setMilliseconds(resolveTTL));
        setCacheInStorage(this.ttlStorageKey, storage);
        this.ttl.set(key, resolveTTL);
    }
    delete(key) {
        this.ttl.delete(key);
        if (!key) {
            clearStorageCache(this.ttlStorageKey);
            return;
        }
        if (typeof key === 'string') {
            const storage = getStorageCache(this.ttlStorageKey);
            storage.delete(key);
            setCacheInStorage(this.ttlStorageKey, storage);
            return;
        }
        const storage = getStorageCache(this.ttlStorageKey);
        deleteByRegex(key, storage);
        setCacheInStorage(this.ttlStorageKey, storage);
    }
}
LocalStorageTTLManager.decorators = [
    { type: Injectable }
];
LocalStorageTTLManager.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [HTTP_CACHE_CONFIG,] }] }
];

const useHttpCacheLocalStorage = [
    { provide: HttpCacheStorage, useClass: HttpCacheLocalStorage },
    { provide: TTLManager, useClass: LocalStorageTTLManager }
];

/**
 * Generated bundle index. Do not edit.
 */

export { CacheBucket, DefaultHttpCacheGuard, DefaultHttpCacheStorage, DefaultKeySerializer, DefaultTTLManager, HTTP_CACHE_CONFIG, HttpCacheGuard, HttpCacheInterceptor, HttpCacheInterceptorModule, HttpCacheManager, HttpCacheStorage, KeySerializer, TTLManager, cashewConfig, defaultConfig, useHttpCacheLocalStorage, RequestsQueue as ɵa, HttpCacheLocalStorage as ɵb, LocalStorageTTLManager as ɵc };
//# sourceMappingURL=ngneat-cashew.js.map
