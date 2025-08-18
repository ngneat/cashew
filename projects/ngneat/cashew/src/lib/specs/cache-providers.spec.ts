import { TestBed } from '@angular/core/testing';
import { HTTP_CACHE_CONFIG, HttpCacheConfig } from '../cache-config';
import { provideHttpCache } from '../cache-interceptor.providers';
import { withLocalStorage } from '../local-storage/local-storage-providers';

describe('provideHttpCache with custom config', () => {
  it('should handle empty provideHttpCache()', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpCache()]
    });

    const config = TestBed.inject(HTTP_CACHE_CONFIG);

    expect(config.strategy).toBe('explicit');
    expect(config.mode).toBe('cache');
    expect(config.ttl).toBe(3600000);
    expect(config.responseSerializer).toBeUndefined();
  });

  it('should handle config-only setup without extensions', () => {
    const customConfig: Partial<HttpCacheConfig> = {
      strategy: 'implicit',
      responseSerializer: value => JSON.parse(JSON.stringify(value))
    };

    TestBed.configureTestingModule({
      providers: [provideHttpCache(customConfig)]
    });

    const config = TestBed.inject(HTTP_CACHE_CONFIG);

    expect(config.strategy).toBe('implicit');
    expect(config.mode).toBe('cache'); // default
    expect(config.ttl).toBe(3600000); // default
    expect(config.responseSerializer).toBeDefined();
  });

  it('should handle extensions-only setup without config', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpCache(withLocalStorage())]
    });

    const config = TestBed.inject(HTTP_CACHE_CONFIG);

    expect(config.strategy).toBe('explicit'); // default
    expect(config.mode).toBe('cache'); // default
    expect(config.ttl).toBe(3600000); // default
    expect(config.responseSerializer).toBeUndefined(); // default
  });

  it('should handle config and extensions setup', () => {
    const customConfig: Partial<HttpCacheConfig> = {
      responseSerializer(value) {
        return structuredClone(value);
      },
      ttl: 5000
    };

    TestBed.configureTestingModule({
      providers: [provideHttpCache(customConfig, withLocalStorage())]
    });

    const config = TestBed.inject(HTTP_CACHE_CONFIG);

    expect(config.strategy).toBe('explicit'); // default
    expect(config.mode).toBe('cache'); // default
    expect(config.ttl).toBe(5000); // custom
    expect(config.responseSerializer).toBeDefined(); // custom
    expect(typeof config.responseSerializer).toBe('function');
  });
});
