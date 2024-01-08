import { DefaultKeySerializer } from '../key-serializer';
import { httpRequest } from './mocks';

describe('key serializer', () => {
  it('serializes to string using the given number', () => {
    const serializer = new DefaultKeySerializer();
    const key = serializer.serialize(null, { key: 2 });
    expect(key).toEqual('2');
  });

  it('serializes to string using the given string', () => {
    const serializer = new DefaultKeySerializer();
    const key = serializer.serialize(null, { key: 'hello' });
    expect(key).toEqual('hello');
  });

  it('serializes to string using the given number producing function', () => {
    const serializer = new DefaultKeySerializer();
    const key = serializer.serialize(null, { key: () => 2 + 2 });
    expect(key).toEqual('4');
  });

  it('serializes to string using the given string producing function', () => {
    const serializer = new DefaultKeySerializer();
    const key = serializer.serialize(null, { key: () => 'hello' + 'world' });
    expect(key).toEqual('helloworld');
  });

  it('serializes to full url including parameters if key is absent', () => {
    const serializer = new DefaultKeySerializer();
    const request = httpRequest();
    const key = serializer.serialize(request, {});
    expect(key).toEqual(request.urlWithParams);
  });
});
