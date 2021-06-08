(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ngneat/cashew', ['exports', '@angular/common/http', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ngneat = global.ngneat || {}, global.ngneat.cashew = {}), global.ng.common.http, global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, http, core, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var KeySerializer = /** @class */ (function () {
        function KeySerializer() {
        }
        return KeySerializer;
    }());
    var DefaultKeySerializer = /** @class */ (function (_super) {
        __extends(DefaultKeySerializer, _super);
        function DefaultKeySerializer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DefaultKeySerializer.prototype.serialize = function (request, context) {
            var _a;
            return (_a = context.key) !== null && _a !== void 0 ? _a : request.urlWithParams;
        };
        return DefaultKeySerializer;
    }(KeySerializer));

    var defaultConfig = {
        strategy: 'explicit',
        ttl: 3600000,
        localStorageKey: 'httpCache'
    };
    function cashewConfig(config) {
        if (config === void 0) { config = defaultConfig; }
        var _a, _b, _c;
        return {
            strategy: (_a = config.strategy) !== null && _a !== void 0 ? _a : defaultConfig.strategy,
            ttl: (_b = config.ttl) !== null && _b !== void 0 ? _b : defaultConfig.ttl,
            localStorageKey: (_c = config.localStorageKey) !== null && _c !== void 0 ? _c : defaultConfig.localStorageKey,
            responseSerializer: config.responseSerializer
        };
    }
    var HTTP_CACHE_CONFIG = new core.InjectionToken('HTTP_CACHE_CONFIG');

    function deleteByRegex(pattern, cache) {
        var e_1, _a;
        try {
            for (var _b = __values(Array.from(cache)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 1), key = _d[0];
                if (pattern.test(key)) {
                    cache.delete(key);
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }

    var HttpCacheStorage = /** @class */ (function () {
        function HttpCacheStorage() {
        }
        return HttpCacheStorage;
    }());
    var DefaultHttpCacheStorage = /** @class */ (function () {
        function DefaultHttpCacheStorage() {
            this.cache = new Map();
        }
        DefaultHttpCacheStorage.prototype.has = function (key) {
            return this.cache.has(key);
        };
        DefaultHttpCacheStorage.prototype.get = function (key) {
            return this.cache.get(key);
        };
        DefaultHttpCacheStorage.prototype.set = function (key, response) {
            this.cache.set(key, response);
        };
        DefaultHttpCacheStorage.prototype.delete = function (key) {
            if (!key) {
                this.cache.clear();
                return;
            }
            if (typeof key === 'string') {
                this.cache.delete(key);
                return;
            }
            deleteByRegex(key, this.cache);
        };
        return DefaultHttpCacheStorage;
    }());
    DefaultHttpCacheStorage.decorators = [
        { type: core.Injectable }
    ];

    var TTLManager = /** @class */ (function () {
        function TTLManager() {
        }
        return TTLManager;
    }());
    var DefaultTTLManager = /** @class */ (function () {
        function DefaultTTLManager(config) {
            this.config = config;
            this.cache = new Map();
        }
        DefaultTTLManager.prototype.isValid = function (key) {
            return this.cache.get(key) > new Date().getTime();
        };
        DefaultTTLManager.prototype.set = function (key, ttl) {
            var resolveTTL = ttl || this.config.ttl;
            this.cache.set(key, new Date().setMilliseconds(resolveTTL));
        };
        DefaultTTLManager.prototype.delete = function (key) {
            if (!key) {
                this.cache.clear();
                return;
            }
            if (typeof key === 'string') {
                this.cache.delete(key);
                return;
            }
            deleteByRegex(key, this.cache);
        };
        return DefaultTTLManager;
    }());
    DefaultTTLManager.decorators = [
        { type: core.Injectable }
    ];
    DefaultTTLManager.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [HTTP_CACHE_CONFIG,] }] }
    ]; };

    var HttpCacheGuard = /** @class */ (function () {
        function HttpCacheGuard() {
        }
        return HttpCacheGuard;
    }());
    var DefaultHttpCacheGuard = /** @class */ (function () {
        function DefaultHttpCacheGuard() {
        }
        DefaultHttpCacheGuard.prototype.canActivate = function (request) {
            return request.method === 'GET' && request.responseType === 'json';
        };
        return DefaultHttpCacheGuard;
    }());

    var RequestsQueue = /** @class */ (function () {
        function RequestsQueue() {
            this.queue = new Map();
        }
        RequestsQueue.prototype.get = function (key) {
            return this.queue.get(key);
        };
        RequestsQueue.prototype.has = function (key) {
            return this.queue.has(key);
        };
        RequestsQueue.prototype.set = function (key, shared) {
            this.queue.set(key, shared);
        };
        RequestsQueue.prototype.delete = function (key) {
            this.queue.delete(key);
        };
        return RequestsQueue;
    }());
    RequestsQueue.decorators = [
        { type: core.Injectable }
    ];

    var CacheBucket = /** @class */ (function () {
        function CacheBucket() {
            this.keys = new Set();
        }
        CacheBucket.prototype.add = function (key) {
            this.keys.add(key);
        };
        CacheBucket.prototype.has = function (key) {
            return this.keys.has(key);
        };
        CacheBucket.prototype.forEach = function (cb) {
            this.keys.forEach(cb);
        };
        CacheBucket.prototype.delete = function (key) {
            this.keys.delete(key);
        };
        CacheBucket.prototype.clear = function () {
            this.keys.clear();
        };
        return CacheBucket;
    }());

    var HttpCacheManager = /** @class */ (function () {
        function HttpCacheManager(queue, storage, guard, ttlManager, config) {
            this.queue = queue;
            this.storage = storage;
            this.guard = guard;
            this.ttlManager = ttlManager;
            this.config = config;
        }
        HttpCacheManager.prototype.validate = function (key) {
            var has = this.storage.has(key);
            var isValid = this.ttlManager.isValid(key);
            if (has && isValid)
                return true;
            this.storage.delete(key);
            return false;
        };
        HttpCacheManager.prototype.get = function (key) {
            return this._resolveResponse(this.storage.get(key));
        };
        HttpCacheManager.prototype.has = function (key) {
            return this.storage.has(key);
        };
        HttpCacheManager.prototype.set = function (key, body, _a) {
            var _b = _a === void 0 ? {} : _a, ttl = _b.ttl, bucket = _b.bucket;
            var response = body;
            if (!(body instanceof http.HttpResponse)) {
                response = new http.HttpResponse({
                    body: body,
                    status: 200,
                    url: key
                });
            }
            this._set(key, response, ttl);
            bucket && bucket.add(key);
        };
        HttpCacheManager.prototype.delete = function (key) {
            var _this = this;
            if (key instanceof CacheBucket) {
                key.forEach(function (value) { return _this.delete(value); });
                key.clear();
                return;
            }
            this.storage.delete(key);
            this.ttlManager.delete(key);
        };
        HttpCacheManager.prototype._getQueue = function () {
            return this.queue;
        };
        HttpCacheManager.prototype._isCacheable = function (canActivate, cache) {
            var strategy = this.config.strategy;
            if (strategy === 'explicit') {
                return cache;
            }
            if (canActivate && strategy === 'implicit') {
                return cache !== false;
            }
            return false;
        };
        HttpCacheManager.prototype._set = function (key, response, ttl) {
            this.storage.set(key, response);
            this.ttlManager.set(key, ttl);
        };
        HttpCacheManager.prototype._canActivate = function (request) {
            return this.guard.canActivate(request);
        };
        HttpCacheManager.prototype._resolveResponse = function (event) {
            return this.config.responseSerializer ? event.clone({ body: this.config.responseSerializer(event.body) }) : event;
        };
        return HttpCacheManager;
    }());
    HttpCacheManager.decorators = [
        { type: core.Injectable }
    ];
    HttpCacheManager.ctorParameters = function () { return [
        { type: RequestsQueue },
        { type: HttpCacheStorage },
        { type: HttpCacheGuard },
        { type: TTLManager },
        { type: undefined, decorators: [{ type: core.Inject, args: [HTTP_CACHE_CONFIG,] }] }
    ]; };

    var CACHE_CONTEXT = new http.HttpContextToken(function () { return undefined; });
    function withCache(options) {
        if (options === void 0) { options = {}; }
        return new http.HttpContext().set(CACHE_CONTEXT, Object.assign({ cache: true }, options));
    }

    var HttpCacheInterceptor = /** @class */ (function () {
        function HttpCacheInterceptor(httpCacheManager, keySerializer, config) {
            this.httpCacheManager = httpCacheManager;
            this.keySerializer = keySerializer;
            this.config = config;
        }
        HttpCacheInterceptor.prototype.intercept = function (request, next) {
            var _this = this;
            var context = request.context.get(CACHE_CONTEXT);
            if (context === undefined) {
                return next.handle(request);
            }
            var cache = context.cache, ttl = context.ttl, bucket = context.bucket;
            var canActivate = this.httpCacheManager._canActivate(request);
            if (this.httpCacheManager._isCacheable(canActivate, cache)) {
                var queue_1 = this.httpCacheManager._getQueue();
                var key_1 = this.keySerializer.serialize(request, context);
                bucket && bucket.add(key_1);
                if (queue_1.has(key_1)) {
                    return queue_1.get(key_1);
                }
                if (this.httpCacheManager.validate(key_1)) {
                    return rxjs.of(this.httpCacheManager.get(key_1));
                }
                var shared = next.handle(request).pipe(operators.tap(function (event) {
                    if (event instanceof http.HttpResponse) {
                        var cache_1 = _this.httpCacheManager._resolveResponse(event);
                        _this.httpCacheManager._set(key_1, cache_1, +ttl);
                    }
                }), operators.finalize(function () { return queue_1.delete(key_1); }), operators.share());
                queue_1.set(key_1, shared);
                return shared;
            }
            return next.handle(request);
        };
        return HttpCacheInterceptor;
    }());
    HttpCacheInterceptor.decorators = [
        { type: core.Injectable }
    ];
    HttpCacheInterceptor.ctorParameters = function () { return [
        { type: HttpCacheManager },
        { type: KeySerializer },
        { type: undefined, decorators: [{ type: core.Inject, args: [HTTP_CACHE_CONFIG,] }] }
    ]; };

    var HttpCacheInterceptorModule = /** @class */ (function () {
        function HttpCacheInterceptorModule() {
        }
        HttpCacheInterceptorModule.forRoot = function (config) {
            if (config === void 0) { config = {}; }
            return {
                providers: [
                    { provide: HTTP_CACHE_CONFIG, useValue: Object.assign(Object.assign({}, defaultConfig), config) },
                    { provide: KeySerializer, useClass: DefaultKeySerializer },
                    { provide: HttpCacheStorage, useClass: DefaultHttpCacheStorage },
                    { provide: TTLManager, useClass: DefaultTTLManager },
                    { provide: HttpCacheGuard, useClass: DefaultHttpCacheGuard },
                    { provide: http.HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },
                    HttpCacheManager,
                    RequestsQueue
                ],
                ngModule: HttpCacheInterceptorModule
            };
        };
        return HttpCacheInterceptorModule;
    }());
    HttpCacheInterceptorModule.decorators = [
        { type: core.NgModule, args: [{},] }
    ];

    function setCacheInStorage(key, storage) {
        localStorage.setItem(key, JSON.stringify(mapToObj(storage)));
    }
    function getStorageCache(key) {
        var storage = JSON.parse(localStorage.getItem(key) || '{}');
        var map = new Map();
        Object.keys(storage).forEach(function (key) { return map.set(key, storage[key]); });
        return map;
    }
    function clearStorageCache(key) {
        localStorage.removeItem(key);
    }
    function mapToObj(map) {
        return Array.from(map).reduce(function (obj, _a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            obj[key] = value;
            return obj;
        }, {});
    }

    var HttpCacheLocalStorage = /** @class */ (function () {
        function HttpCacheLocalStorage(config) {
            this.config = config;
            this.cache = new DefaultHttpCacheStorage();
            this.storageKey = config.localStorageKey;
        }
        HttpCacheLocalStorage.prototype.has = function (key) {
            return this.cache.has(key) || getStorageCache(this.storageKey).has(key);
        };
        HttpCacheLocalStorage.prototype.get = function (key) {
            var cacheValue = this.cache.get(key);
            if (cacheValue) {
                return cacheValue;
            }
            var value = getStorageCache(this.storageKey).get(key);
            if (value) {
                var response = new http.HttpResponse(value);
                this.cache.set(key, response);
            }
            return this.cache.get(key);
        };
        HttpCacheLocalStorage.prototype.set = function (key, response) {
            var storage = getStorageCache(this.storageKey);
            storage.set(key, response);
            setCacheInStorage(this.storageKey, storage);
            this.cache.set(key, response);
        };
        HttpCacheLocalStorage.prototype.delete = function (key) {
            this.cache.delete(key);
            if (!key) {
                clearStorageCache(this.storageKey);
                return;
            }
            var storage = getStorageCache(this.storageKey);
            if (typeof key === 'string') {
                storage.delete(key);
                setCacheInStorage(this.storageKey, storage);
                return;
            }
            deleteByRegex(key, storage);
            setCacheInStorage(this.storageKey, storage);
        };
        return HttpCacheLocalStorage;
    }());
    HttpCacheLocalStorage.decorators = [
        { type: core.Injectable }
    ];
    HttpCacheLocalStorage.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [HTTP_CACHE_CONFIG,] }] }
    ]; };

    var LocalStorageTTLManager = /** @class */ (function () {
        function LocalStorageTTLManager(config) {
            this.config = config;
            this.ttlStorageKey = config.localStorageKey + "TTL";
            this.ttl = new DefaultTTLManager(config);
        }
        LocalStorageTTLManager.prototype.isValid = function (key) {
            var valid = this.ttl.isValid(key);
            if (valid) {
                return true;
            }
            var localStorageTimeStamp = getStorageCache(this.ttlStorageKey).get(key);
            var validInStorage = localStorageTimeStamp > new Date().getTime();
            if (validInStorage) {
                this.ttl.set(key, localStorageTimeStamp - new Date().getTime());
            }
            return validInStorage;
        };
        LocalStorageTTLManager.prototype.set = function (key, ttl) {
            var resolveTTL = ttl || this.config.ttl;
            var storage = getStorageCache(this.ttlStorageKey);
            storage.set(key, new Date().setMilliseconds(resolveTTL));
            setCacheInStorage(this.ttlStorageKey, storage);
            this.ttl.set(key, resolveTTL);
        };
        LocalStorageTTLManager.prototype.delete = function (key) {
            this.ttl.delete(key);
            if (!key) {
                clearStorageCache(this.ttlStorageKey);
                return;
            }
            if (typeof key === 'string') {
                var storage_1 = getStorageCache(this.ttlStorageKey);
                storage_1.delete(key);
                setCacheInStorage(this.ttlStorageKey, storage_1);
                return;
            }
            var storage = getStorageCache(this.ttlStorageKey);
            deleteByRegex(key, storage);
            setCacheInStorage(this.ttlStorageKey, storage);
        };
        return LocalStorageTTLManager;
    }());
    LocalStorageTTLManager.decorators = [
        { type: core.Injectable }
    ];
    LocalStorageTTLManager.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [HTTP_CACHE_CONFIG,] }] }
    ]; };

    var useHttpCacheLocalStorage = [
        { provide: HttpCacheStorage, useClass: HttpCacheLocalStorage },
        { provide: TTLManager, useClass: LocalStorageTTLManager }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CacheBucket = CacheBucket;
    exports.DefaultHttpCacheGuard = DefaultHttpCacheGuard;
    exports.DefaultHttpCacheStorage = DefaultHttpCacheStorage;
    exports.DefaultKeySerializer = DefaultKeySerializer;
    exports.DefaultTTLManager = DefaultTTLManager;
    exports.HTTP_CACHE_CONFIG = HTTP_CACHE_CONFIG;
    exports.HttpCacheGuard = HttpCacheGuard;
    exports.HttpCacheInterceptor = HttpCacheInterceptor;
    exports.HttpCacheInterceptorModule = HttpCacheInterceptorModule;
    exports.HttpCacheManager = HttpCacheManager;
    exports.HttpCacheStorage = HttpCacheStorage;
    exports.KeySerializer = KeySerializer;
    exports.TTLManager = TTLManager;
    exports.cashewConfig = cashewConfig;
    exports.defaultConfig = defaultConfig;
    exports.useHttpCacheLocalStorage = useHttpCacheLocalStorage;
    exports.ɵa = RequestsQueue;
    exports.ɵb = HttpCacheLocalStorage;
    exports.ɵc = LocalStorageTTLManager;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngneat-cashew.umd.js.map
