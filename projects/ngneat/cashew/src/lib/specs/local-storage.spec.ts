import { httpResponse, localStorageMock } from './mocks';
import { HttpCacheLocalStorage } from '../local-storage/local-storage-cache';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

describe('httpCacheLocalStorage', () => {
  let storage: HttpCacheLocalStorage;
  const existingKey = 'existingKey';
  const notExistingKey = 'notExistingKey';
  const response = httpResponse();
  localStorageMock();

  beforeEach(() => {
    storage = new HttpCacheLocalStorage();
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

    it('should get the cached response headers', () => {
      const { headers } = storage.get(existingKey) as HttpResponse<any>;
      expect(headers).toBeInstanceOf(HttpHeaders);
      expect(headers).toBe(response.headers);
    });

    it('should not access local storage when key is found in memory', () => {
      jest.spyOn(localStorage, 'setItem');
      const value = storage.get(existingKey);
      expect(value).toEqual(response);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should clear storage when call without a key', () => {
      expect(storage.has(existingKey)).toBeTruthy();
      jest.spyOn(localStorage, 'removeItem');
      storage.clear();
      expect(localStorage.removeItem).toHaveBeenCalled();
      expect(storage.has(existingKey)).toBeFalsy();
    });

    it('should call delete when given key', () => {
      expect(storage.has(existingKey)).toBeTruthy();
      jest.spyOn(localStorage, 'removeItem');
      storage.delete(existingKey);
      expect(localStorage.removeItem).toHaveBeenCalled();
      expect(storage.has(existingKey)).toBeFalsy();
    });
  });
});
