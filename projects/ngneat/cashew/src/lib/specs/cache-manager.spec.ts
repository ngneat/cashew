import { HttpCacheGuard } from '../cache-guard';
import { HttpCacheManager } from '../cache-manager.service';
import { HttpCacheStorage } from '../cache-storage';
import { RequestsQueue } from '../requests-queue';
import { TTLManager } from '../ttl-manager';
import {
  config,
  requestQueue,
  httpCacheStorage,
  httpCacheGuard,
  ttlManager as makeTTL,
  cacheBucket
} from './mocks';
import SpyInstance = jest.SpyInstance;
import { RequestsCache } from '../requests-cache';
import { LocalStorageVersionsManager } from '../local-storage/local-storage-versions';

describe('HttpCacheManager', () => {
  let httpCache: HttpCacheManager;
  let queue: RequestsQueue;
  let storage: HttpCacheStorage;
  let guard: HttpCacheGuard;
  let ttlManager: TTLManager;

  beforeEach(() => {
    queue = requestQueue();
    storage = httpCacheStorage();
    guard = httpCacheGuard();
    ttlManager = makeTTL();

    httpCache = new HttpCacheManager(queue, storage, guard, ttlManager, new RequestsCache(), new LocalStorageVersionsManager(), config);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate', () => {
    let has: SpyInstance;
    let isValid: SpyInstance;
    let storageDelete: SpyInstance;

    beforeEach(() => {
      has = jest.spyOn(storage, 'has');
      isValid = jest.spyOn(ttlManager, 'isValid');
      storageDelete = jest.spyOn(storage, 'delete');
    });

    it('should return true when cache is valid', () => {
      has.mockImplementation(() => true);
      isValid.mockImplementation(() => true);
      expect(httpCache.validate('valid key')).toBeTruthy();
    });

    it('should return false when cache is invalid', () => {
      has.mockImplementation(() => true);
      isValid.mockImplementation(() => false);
      expect(httpCache.validate('invalid key')).toBeFalsy();
    });

    it('should return false when key is not exist', () => {
      has.mockImplementation(() => false);
      isValid.mockImplementation(() => true);
      expect(httpCache.validate('invalid key')).toBeFalsy();
    });

    it('should call delete from storage when key is valid', () => {
      has.mockImplementation(() => false);
      isValid.mockImplementation(() => false);
      httpCache.validate('valid key');
      expect(storage.delete).toHaveBeenCalledWith('valid key');
    });
  });

  describe('add', () => {
    it('should add key to bucket', () => {
      const bucket = cacheBucket();
      jest.spyOn(bucket, 'add');
      httpCache.set('key', {}, { bucket: bucket });
      expect(bucket.add).toHaveBeenCalledWith('key');
    });

    it('should set the key', () => {
      jest.spyOn(storage, 'set');
      jest.spyOn(ttlManager, 'set');
      httpCache.set('key', {}, {});
      expect(storage.set).toHaveBeenCalled();
      expect(ttlManager.set).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete the key from storage and ttl', () => {
      jest.spyOn(storage, 'delete');
      jest.spyOn(ttlManager, 'delete');
      httpCache.delete('key');
      expect(storage.delete).toHaveBeenCalledWith('key');
      expect(ttlManager.delete).toHaveBeenCalledWith('key');
    });

    it('should clear a given cache bucket', () => {
      const bucket = cacheBucket();
      jest.spyOn(bucket, 'clear');
      httpCache.delete(bucket);
      expect(bucket.clear).toHaveBeenCalled();
    });

    it('should delete every key of the bucket', () => {
      jest.spyOn(httpCache, 'delete');
      const bucket = cacheBucket();
      bucket.add('a');
      bucket.add('b');
      bucket.add('c');
      httpCache.delete(bucket);
      expect(httpCache.delete).toHaveBeenCalledTimes(4);
    });
  });

  describe('get', () => {
    it('should return the cached value by default', () => {
      httpCache.set('a', 'value');
      expect(httpCache.get('a').body).toBe('value');
    });

    it('should pass the cached value through the serializer', () => {
      const responseSerializer = jest.fn(v => 'serialized');
      const httpCache: any = new HttpCacheManager(queue, storage, guard, ttlManager, new RequestsCache(), new LocalStorageVersionsManager(), { ...config, responseSerializer });
      httpCache.set('a', 'value');
      const serialized = httpCache.get('a');
      const newResponse = serialized !== httpCache.storage.get('a');
      expect(responseSerializer).toHaveBeenCalledTimes(1);
      expect(serialized.body).toBe('serialized');
      expect(newResponse).toBe(true);
    });
  });
});
