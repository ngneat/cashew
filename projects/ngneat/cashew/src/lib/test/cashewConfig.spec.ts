import { cashewConfig, defaultConfig } from '../httpCacheConfig';

describe('cashewConfig', () => {
  const responseSerializer = v => '';

  it('should return the default config when called with an empty object', () => {
    expect(cashewConfig({})).toEqual(defaultConfig);
  });

  it('should retain additional parameters passed in the config, such as responseSerializer', () => {
    const configWithResponseSerializer = cashewConfig({ responseSerializer });
    expect(configWithResponseSerializer.responseSerializer({ a: 'a' })).toEqual('');
  });
});
