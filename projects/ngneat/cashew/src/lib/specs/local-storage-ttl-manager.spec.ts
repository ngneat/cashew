import { config, localStorageMock } from './mocks';
import { LocalStorageTTLManager } from '../local-storage/local-storage-ttl';
import * as cacheConfig from '../cache-config';

jest.useFakeTimers();

describe('localStorageTtlManager', () => {
  let ttlManager: LocalStorageTTLManager;
  localStorageMock();

  beforeAll(() => {
    jest.spyOn(cacheConfig, 'injectCacheConfig').mockReturnValue(config);
  });

  beforeEach(() => {
    ttlManager = new LocalStorageTTLManager();
  });

  describe('valid', () => {
    it('should not be valid if a key does not exist', () => {
      expect(ttlManager.isValid('notExistingKey')).toBeFalsy();
    });
  });

  describe('set', () => {
    it('should be valid', () => {
      ttlManager.set('key', 1000);
      expect(ttlManager.isValid('key')).toBeTruthy();
    });

    it('should not be valid after ttl is over', () => {
      ttlManager.set('key', 1000);
      jest.advanceTimersByTime(1001);
      expect(ttlManager.isValid('key')).toBeFalsy();
    });

    it('should use the config ttl if non has been passed', () => {
      jest.spyOn(Date.prototype, 'setMilliseconds');
      ttlManager.set('key', undefined);
      expect(Date.prototype.setMilliseconds).toHaveBeenCalledWith(config.ttl);
    });
  });

  describe('delete', () => {
    it('should clear storage when call without a key', () => {
      const key = 'foo';
      ttlManager.set(key, 33);
      jest.spyOn(localStorage, 'removeItem');
      ttlManager.clear();
      expect(localStorage.removeItem).toHaveBeenCalled();
      expect(ttlManager.has(key)).toBeFalsy();
    });

    it('should call delete when given key', () => {
      jest.spyOn((ttlManager as any).ttl, 'delete');
      jest.spyOn(localStorage, 'removeItem');
      ttlManager.delete('key');
      expect((ttlManager as any).ttl.delete).toHaveBeenCalled();
      expect(localStorage.removeItem).toHaveBeenCalled();
      expect(ttlManager.has('key')).toBeFalsy();
    });
  });
});
