import { defaultConfig } from '../httpCacheConfig';
import { httpResponse, localStorageMock } from './mocks';
import { HttpCacheLocalStorage } from '../localstorage/httpCacheLocalStorage';

describe('httpCacheLocalStorage', () => {
  let storage: HttpCacheLocalStorage;
  const existingKey = 'existingKey';
  const notExistingKey = 'notExistingKey';
  const response = httpResponse();
  localStorageMock();

  beforeEach(() => {
    storage = new HttpCacheLocalStorage(defaultConfig);
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

    it('should not access local storage when key is found in memory', () => {
      jest.spyOn(localStorage, 'setItem');
      storage.get(existingKey);
      expect((storage as any).cache.get(existingKey)).toEqual(response);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should clear storage when call without a key', () => {
      jest.spyOn((storage as any).cache, 'delete');
      jest.spyOn(localStorage, 'removeItem');
      storage.delete();
      expect((storage as any).cache.delete).toHaveBeenCalled();
      expect(localStorage.removeItem).toHaveBeenCalled();
    });

    it('should call delete when given key', () => {
      jest.spyOn((storage as any).cache, 'delete');
      jest.spyOn(localStorage, 'setItem');
      storage.delete(existingKey);
      expect((storage as any).cache.delete).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should delete by regex', () => {
      const key = 'aaa';
      storage.set(key, response);
      const regex = new RegExp('aa');
      storage.delete(regex);
      expect(storage.has(key)).toBeFalsy();
    });
  });
});
