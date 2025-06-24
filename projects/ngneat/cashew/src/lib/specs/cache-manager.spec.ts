import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CacheBucket } from '../cache-bucket';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from '../cache-config';
import { HttpCacheGuard } from '../cache-guard';
import { HttpCacheManager } from '../cache-manager.service';
import { DefaultHttpCacheStorage } from '../cache-storage';
import { RequestsCache } from '../requests-cache';
import { RequestsQueue } from '../requests-queue';
import { DefaultTTLManager } from '../ttl-manager';
import { HttpCacheVersions } from '../versions';

const configMock: HttpCacheConfig = {
  ttl: 1000,
  strategy: 'implicit',
  mode: 'cache'
};

describe('HttpCacheManager (memory strategy)', () => {
  let httpCache: HttpCacheManager;
  let queue: RequestsQueue;
  let storage: DefaultHttpCacheStorage;
  let guard: HttpCacheGuard;
  let ttlManager: DefaultTTLManager;
  let requests: RequestsCache;

  beforeEach(() => {
    queue = { clear: jest.fn(), delete: jest.fn() } as any;
    storage = {
      has: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      clear: jest.fn()
    } as any;
    guard = { canActivate: jest.fn() } as any;
    ttlManager = {
      isValid: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      clear: jest.fn()
    } as any;
    requests = { clear: jest.fn(), delete: jest.fn() } as any;

    TestBed.configureTestingModule({
      providers: [
        HttpCacheManager,
        HttpCacheVersions,
        { provide: RequestsQueue, useValue: queue },
        { provide: DefaultHttpCacheStorage, useValue: storage },
        { provide: DefaultTTLManager, useValue: ttlManager },
        { provide: HttpCacheGuard, useValue: guard },
        { provide: RequestsCache, useValue: requests },
        { provide: HTTP_CACHE_CONFIG, useValue: configMock }
      ]
    });

    httpCache = TestBed.inject(HttpCacheManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate', () => {
    it('should return true when cache is valid', () => {
      (storage.has as jest.Mock).mockReturnValue(true);
      (ttlManager.isValid as jest.Mock).mockReturnValue(true);
      expect(httpCache.validate('valid key')).toBeTruthy();
    });

    it('should return false when cache is invalid', () => {
      (storage.has as jest.Mock).mockReturnValue(true);
      (ttlManager.isValid as jest.Mock).mockReturnValue(false);
      expect(httpCache.validate('invalid key')).toBeFalsy();
    });

    it('should return false when key does not exist', () => {
      (storage.has as jest.Mock).mockReturnValue(false);
      (ttlManager.isValid as jest.Mock).mockReturnValue(true);
      expect(httpCache.validate('invalid key')).toBeFalsy();
    });

    it('should call delete from storage when key is not valid', () => {
      (storage.has as jest.Mock).mockReturnValue(false);
      (ttlManager.isValid as jest.Mock).mockReturnValue(false);
      httpCache.validate('valid key');
      expect(storage.delete).toHaveBeenCalledWith('valid key');
    });
  });

  describe('set', () => {
    it('should add key to bucket', () => {
      const bucket = new CacheBucket();
      jest.spyOn(bucket, 'add');
      httpCache.set('key', {}, { bucket });
      expect(bucket.add).toHaveBeenCalledWith('key');
    });

    it('should set the key', () => {
      httpCache.set('key', 'body');
      expect(storage.set).toHaveBeenCalled();
      expect(ttlManager.set).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete the key from storage and ttl', () => {
      httpCache.delete('key');
      expect(storage.delete).toHaveBeenCalledWith('key');
      expect(ttlManager.delete).toHaveBeenCalledWith('key');
    });

    it('should clear a given cache bucket', () => {
      const bucket = new CacheBucket();
      jest.spyOn(bucket, 'clear');
      httpCache.delete(bucket);
      expect(bucket.clear).toHaveBeenCalled();
    });

    it('should delete every key of the bucket', () => {
      const bucket = new CacheBucket();
      jest.spyOn(httpCache, 'delete');
      bucket.add('a');
      bucket.add('b');
      bucket.add('c');
      httpCache.delete(bucket);
      // 3 keys + 1 call for the bucket itself
      expect((httpCache.delete as jest.Mock).mock.calls.length).toBe(4);
    });
  });

  describe('get', () => {
    it('should return the cached value by default', () => {
      const response = new HttpResponse({ body: 'value', status: 200 });
      (storage.get as jest.Mock).mockReturnValue(response);
      expect(httpCache.get('a').body).toBe('value');
    });

    it('should pass the cached value through the serializer', () => {
      const responseSerializer = jest.fn(() => 'serialized');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          HttpCacheManager,
          HttpCacheVersions,
          { provide: RequestsQueue, useValue: queue },
          { provide: DefaultHttpCacheStorage, useValue: storage },
          { provide: DefaultTTLManager, useValue: ttlManager },
          { provide: HttpCacheGuard, useValue: guard },
          { provide: RequestsCache, useValue: requests },
          { provide: HTTP_CACHE_CONFIG, useValue: { ...configMock, responseSerializer } }
        ]
      });
      httpCache = TestBed.inject(HttpCacheManager);

      const response = new HttpResponse({ body: 'value', status: 200 });
      (storage.get as jest.Mock).mockReturnValue(response);
      const serialized = httpCache.get('a');
      expect(responseSerializer).toHaveBeenCalledTimes(1);
      expect(serialized.body).toBe('serialized');
      expect(serialized).not.toBe(response);
    });
  });

  describe('has', () => {
    it('should return true if the key exists in storage', () => {
      (storage.has as jest.Mock).mockReturnValue(true);
      expect(httpCache.has('some-key')).toBe(true);
    });

    it('should return false if the key does not exist in storage', () => {
      (storage.has as jest.Mock).mockReturnValue(false);
      expect(httpCache.has('missing-key')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear storage, ttlManager, versions, queue, and requests for memory strategy', () => {
      httpCache.clear('memory');
      expect(storage.clear).toHaveBeenCalled();
      expect(ttlManager.clear).toHaveBeenCalled();
      expect(queue.clear).toHaveBeenCalled();
      expect(requests.clear).toHaveBeenCalled();
    });
  });
});
