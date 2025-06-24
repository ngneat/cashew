import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { storage as localStorage } from '../local-storage/local-storage';
import { BrowserStorageHttpCacheStorage } from '../storage/browser-storage-cache';
import { httpResponse, localStorageMock } from './mocks';

describe('httpCacheLocalStorage', () => {
  let storage: BrowserStorageHttpCacheStorage;
  const existingKey = 'existingKey';
  const notExistingKey = 'notExistingKey';
  const response = httpResponse();
  localStorageMock();
  const mockStorage = localStorage;

  beforeEach(() => {
    storage = new BrowserStorageHttpCacheStorage(mockStorage);
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
      jest.spyOn(mockStorage, 'getItem');
      const value = storage.get(existingKey);
      expect(value).toEqual(response);
      expect(mockStorage.getItem).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should clear storage when call without a key', () => {
      expect(storage.has(existingKey)).toBeTruthy();
      jest.spyOn(mockStorage, 'clearItem');
      storage.clear();
      expect(mockStorage.clearItem).toHaveBeenCalled();
      expect(storage.has(existingKey)).toBeFalsy();
    });

    it('should call delete when given key', () => {
      expect(storage.has(existingKey)).toBeTruthy();
      jest.spyOn(mockStorage, 'clearItem');
      storage.delete(existingKey);
      expect(mockStorage.clearItem).toHaveBeenCalled();
      expect(storage.has(existingKey)).toBeFalsy();
    });
  });
});
