import { HttpHandler, HttpResponse, HttpParams } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { HttpCacheInterceptor } from '../httpCacheInterceptor';
import { httpCacheManager, keySerializer, httpRequest, config, frame, ttl, cacheBucket } from './mocks.spec';

describe('HttpCacheInterceptor', () => {
  let httpCacheInterceptor: HttpCacheInterceptor;
  let handler: HttpHandler;
  let request = (params, method = 'GET', url = 'api/mock') =>
    httpRequest(method, { params: new HttpParams({ fromObject: params }) }, url);
  const httpHandler = (response = {}): HttpHandler => ({
    handle: jest.fn(() => timer(frame).pipe(mapTo(new HttpResponse({ body: response }))))
  });
  const call = (req, times = 2, delay = frame) => {
    for (let i = 0; i < times; i++) {
      httpCacheInterceptor.intercept(req, handler).subscribe();
      tick(delay);
    }
  };

  beforeEach(() => {
    handler = httpHandler();
    httpCacheInterceptor = new HttpCacheInterceptor(httpCacheManager(), keySerializer());
    expect.hasAssertions();
  });

  it('should cache a request', fakeAsync(() => {
    call(request({ cache$: true }));
    expect(handler.handle).toHaveBeenCalledTimes(1);
  }));

  it('should not cache when cache$ is falsy', fakeAsync(() => {
    call(request({ cache$: false }));
    expect(handler.handle).toHaveBeenCalledTimes(2);
  }));

  it('should not cache request of type POST', fakeAsync(() => {
    call(request({}, 'POST'));
    expect(handler.handle).toHaveBeenCalledTimes(2);
  }));

  it('should cache request of type POST when cache$ is implicitly true', fakeAsync(() => {
    call(request({ cache$: true }, 'POST'));
    expect(handler.handle).toHaveBeenCalledTimes(1);
  }));

  it('should not cache the request by default on explicit strategy', fakeAsync(() => {
    call(request({}));
    expect(handler.handle).toHaveBeenCalledTimes(2);
  }));

  it('should cache the request by default on implicit strategy', fakeAsync(() => {
    httpCacheInterceptor = new HttpCacheInterceptor(
      httpCacheManager({ ...config, strategy: 'implicit' }),
      keySerializer()
    );
    call(request({}));
    expect(handler.handle).toHaveBeenCalledTimes(1);
  }));

  it('should not cache the request on implicit strategy and cache$ if falsy', fakeAsync(() => {
    httpCacheInterceptor = new HttpCacheInterceptor(
      httpCacheManager({ ...config, strategy: 'implicit' }),
      keySerializer()
    );
    call(request({ cache$: false }));
    expect(handler.handle).toHaveBeenCalledTimes(2);
  }));

  it('should return a cached request', fakeAsync(() => {
    const cacheSpy = spyOn((httpCacheInterceptor as any).httpCacheManager, 'get');
    call(request({ cache$: true, paramA: true }));
    expect(cacheSpy).toHaveBeenCalledTimes(1);
  }));

  it('should return a queued request', fakeAsync(() => {
    const cacheSpy = spyOn((httpCacheInterceptor as any).httpCacheManager.queue, 'get').and.callThrough();
    call(request({ cache$: true }), 2, 0);
    expect(cacheSpy).toHaveBeenCalledTimes(1);
    tick(frame);
  }));

  it('should refetch after ttl has passed', fakeAsync(() => {
    call(request({ cache$: true }), 2, ttl + frame);
    expect(handler.handle).toHaveBeenCalledTimes(2);
  }));

  it('should not cache a request of same url and different params', fakeAsync(() => {
    call(request({ cache$: true, paramA: true }), 1);
    call(request({ cache$: true, paramA: false }), 1);
    expect(handler.handle).toHaveBeenCalledTimes(2);
  }));

  it('should cache a request of same url and same params', fakeAsync(() => {
    call(request({ cache$: true, paramA: true }), 2);
    expect(handler.handle).toHaveBeenCalledTimes(1);
  }));

  it('should cache a request of same url and same params in queue ', fakeAsync(() => {
    call(request({ cache$: true, paramA: true }), 2, 0);
    expect(handler.handle).toHaveBeenCalledTimes(1);
    tick(frame);
  }));

  it('should fetch twice for different url', fakeAsync(() => {
    call(request({ cache$: true }, 'GET', 'url1'), 1);
    call(request({ cache$: true }, 'GET', 'url2'), 1);
    tick(frame);
    expect(handler.handle).toHaveBeenCalledTimes(2);
  }));

  it('should add a request to cacheBucket', fakeAsync(() => {
    const bucket = cacheBucket();
    spyOn(bucket, 'add');
    call(request({ cache$: true, bucket$: bucket, key$: 'foo' }), 1);
    expect(bucket.add).toHaveBeenCalledWith('foo');
  }));
});
