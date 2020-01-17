import {HttpCacheManager} from '../httpCacheManager.service';
import {httpCacheGuard, httpCacheStorage, ttlManager, config, httpRequest, httpResponse, requestQueue} from './mocks.spec';

describe('HttpCacheManager', () => {

  let httpCache: HttpCacheManager;
  beforeEach(() => {
    httpCache = new HttpCacheManager(requestQueue, httpCacheStorage, httpCacheGuard, ttlManager, config);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate', () => {
    it('should return true when cache is valid', () => {
      (httpCacheStorage.has as any).mockReturnValue(true);
      (ttlManager.isValid as any).mockReturnValue(true);
      expect(httpCache.validate).toBeTruthy();
    });
    it('should call delete and return false', () => {
      (httpCacheStorage.has as any).mockReturnValue(false);
      (ttlManager.isValid as any).mockReturnValue(false);
      expect(httpCache.validate('key')).toBeFalsy();
      expect(httpCacheStorage.delete).toHaveBeenCalled();
    })
  });

  describe('get', () => {
    it('should work', () => {
      httpCache.get('key');
      expect(httpCacheStorage.get).toHaveBeenCalled();
    })
  });

  describe('has', () => {
    it('should work', () => {
      // expect(httpCache.has());
    })
  });

  describe('add', () => {
    it('should work', () => {
      // expect(httpCache.add());
    })
  });

  describe('delete', () => {
    it('should work', () => {
      // expect(httpCache.add());
    })
  });

});
