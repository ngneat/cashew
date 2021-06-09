import { DefaultHttpCacheStorage } from '../cache-storage';
import { httpResponse } from './mocks';

describe('httpCacheStorage', () => {
  let storage: DefaultHttpCacheStorage;
  const existingKey = 'existingKey';
  const notExistingKey = 'notExistingKey';
  const response = httpResponse();

  beforeEach(() => {
    storage = new DefaultHttpCacheStorage();
    storage.set(existingKey, response);
  });

  describe('has', () => {
    it('should return false if key does not exist', () => {
      expect(storage.has(notExistingKey)).toBeFalsy();
    });
    it('should return true if key exists', () => {
      expect(storage.has(existingKey)).toBeTruthy();
    });
  });

  describe('get', () => {
    it('should get the cached response', () => {
      expect(storage.get(existingKey)).toBe(response);
    });
  });

  describe('delete', () => {
    it('should clear storage when call without a key', () => {
      jest.spyOn((storage as any).cache, 'clear');
      storage.delete();
      expect((storage as any).cache.clear).toHaveBeenCalled();
    });

    it('should call delete when given key', () => {
      jest.spyOn((storage as any).cache, 'delete');
      storage.delete(existingKey);
      expect((storage as any).cache.delete).toHaveBeenCalled();
    });
  });
});
