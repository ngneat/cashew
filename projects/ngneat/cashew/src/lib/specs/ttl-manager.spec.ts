import { DefaultTTLManager, TTLManager } from '../ttl-manager';
import { config } from './mocks';

jest.useFakeTimers();

describe('ttlManager', () => {
  let ttlManager: TTLManager;
  const ttl = 1000;

  beforeEach(() => {
    ttlManager = new DefaultTTLManager(config);
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
});
