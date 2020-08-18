import { cashewConfig, defaultConfig } from '../httpCacheConfig';

describe('cashewConfig', () => {
  const responseSerializer = v => '';

  it('should return the default config when called with an empty object', () => {
    expect(cashewConfig({})).toEqual(defaultConfig);
  });

  it('should override the default config values when called with values in the config parameter', () => {
    const configWithStrategy = cashewConfig({ strategy: 'implicit' });
    expect(configWithStrategy.ttl).toEqual(defaultConfig.ttl);
    expect(configWithStrategy.localStorageKey).toEqual(defaultConfig.localStorageKey);
    expect(configWithStrategy.strategy).toEqual('implicit');

    const configWithTtl = cashewConfig({ ttl: 10000 });
    expect(configWithTtl.localStorageKey).toEqual(defaultConfig.localStorageKey);
    expect(configWithTtl.strategy).toEqual(defaultConfig.strategy);
    expect(configWithTtl.ttl).toEqual(10000);

    const configWithLocalStorageKey = cashewConfig({ localStorageKey: 'x' });
    expect(configWithLocalStorageKey.strategy).toEqual(defaultConfig.strategy);
    expect(configWithLocalStorageKey.ttl).toEqual(defaultConfig.ttl);
    expect(configWithLocalStorageKey.localStorageKey).toEqual('x');
  });

  it('should retain additional parameters passed in the config, such as responseSerializer', () => {
    const configWithResponseSerializer = cashewConfig({ responseSerializer });
    expect(configWithResponseSerializer.responseSerializer({ a: 'a' })).toEqual('');
  });
});
