import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, throwError, timer } from 'rxjs';
import { catchError, mapTo, mergeMap } from 'rxjs/operators';
import { HttpCacheInterceptor } from '../cache-interceptor';
import { cacheBucket, config, frame, httpCacheManager, httpRequest, keySerializer, ttl } from './mocks';
import { ContextOptions, withCache } from '../cache-context';

jest.useFakeTimers();

describe('HttpCacheInterceptor', () => {
  let httpCacheInterceptor: HttpCacheInterceptor;
  let handler: HttpHandler;

  const request = (options: ContextOptions, params: object = {}, method = 'GET', url = 'api/mock') => {
    return httpRequest(method, { context: withCache(options), ...params }, url);
  };

  const httpHandler = (response = {}): HttpHandler => ({
    handle: jest.fn(() => timer(frame).pipe(mapTo(new HttpResponse({ body: response }))))
  });

  const call = (req, times = 2, delay = frame) => {
    for (let i = 0; i < times; i++) {
      httpCacheInterceptor.intercept(req, handler).subscribe();
      jest.advanceTimersByTime(delay);
    }
  };

  beforeEach(() => {
    handler = httpHandler();
    httpCacheInterceptor = new HttpCacheInterceptor(httpCacheManager(), keySerializer(), config);
    expect.hasAssertions();
  });

  it('should cache a request', () => {
    call(request({ cache: true }));
    expect(handler.handle).toHaveBeenCalledTimes(1);
  });

  it('should not cache when cache is falsy', () => {
    call(request({ cache: false }));
    expect(handler.handle).toHaveBeenCalledTimes(2);
  });

  it('should not cache request of type POST', () => {
    call(request({ cache: false }, {}, 'POST'));
    expect(handler.handle).toHaveBeenCalledTimes(2);
  });

  it('should cache request of type POST when cache$ is implicitly true', () => {
    call(request({ cache: true }, {}, 'POST'));
    expect(handler.handle).toHaveBeenCalledTimes(1);
  });

  it('should cache a return a serialized request when passing a serializer', () => {
    const responseSerializer = jest.fn(v => 'serialized');
    const cacheManager: any = httpCacheManager({ ...config, responseSerializer });
    httpCacheInterceptor = new HttpCacheInterceptor(cacheManager, keySerializer(), config);
    call(request({ cache: true }));
    expect(handler.handle).toHaveBeenCalledTimes(1);
    /* The serializer is called when adding the value to the cache and when retrieving it */
    expect(responseSerializer).toHaveBeenCalledTimes(2);
    expect(cacheManager.storage.get('api/mock').body).toBe('serialized');
  });

  it('should cache the request by default on implicit strategy', () => {
    httpCacheInterceptor = new HttpCacheInterceptor(
      httpCacheManager({ ...config, strategy: 'implicit' }),
      keySerializer(),
      config
    );
    call(request({}));
    expect(handler.handle).toHaveBeenCalledTimes(1);
  });

  it('should not cache the request on implicit strategy and cache$ if falsy', () => {
    httpCacheInterceptor = new HttpCacheInterceptor(
      httpCacheManager({ ...config, strategy: 'implicit' }),
      keySerializer(),
      config
    );
    call(request({ cache: false }));
    expect(handler.handle).toHaveBeenCalledTimes(2);
  });

  it('should return a cached request', () => {
    const cacheSpy = jest.spyOn((httpCacheInterceptor as any).httpCacheManager, 'get');
    call(request({ cache: true }));
    expect(cacheSpy).toHaveBeenCalledTimes(1);
  });

  it('should return a queued request', () => {
    const cacheSpy = jest.spyOn((httpCacheInterceptor as any).httpCacheManager.queue, 'get');
    call(request({ cache: true }), 2, 0);
    expect(cacheSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(frame);
  });

  it('should not queue requests that error', () => {
    const handler = {
      handle: jest.fn(() =>
        timer(frame).pipe(
          mergeMap(() => {
            return throwError('Not Found');
          })
        )
      )
    };
    const queueSpy = jest.spyOn((httpCacheInterceptor as any).httpCacheManager.queue, 'delete');

    httpCacheInterceptor
      .intercept(request({ cache: true }), handler)
      .pipe(
        catchError(error => {
          return EMPTY;
        })
      )
      .subscribe();
    jest.advanceTimersByTime(frame);

    expect(queueSpy).toHaveBeenCalledTimes(1);
  });

  it('should refetch after ttl has passed', () => {
    call(request({ cache: true }), 2, ttl + frame);
    expect(handler.handle).toHaveBeenCalledTimes(2);
  });

  it('should not cache a request of same url and different params', () => {
    call(request({ cache: true }), 1);
    call(request({ cache: true }, { params: { paramA: false } }), 1);
    expect(handler.handle).toHaveBeenCalledTimes(2);
  });

  it('should cache a request of same url and same params', () => {
    call(request({ cache: true }, { params: { paramA: true } }), 2);
    expect(handler.handle).toHaveBeenCalledTimes(1);
  });

  it('should cache a request of same url and same params in queue ', () => {
    call(request({ cache: true }, { params: { paramA: true } }), 2, 0);
    expect(handler.handle).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(frame);
  });

  it('should fetch twice for different url', () => {
    call(request({ cache: true }, {}, 'GET', 'url1'), 1);
    call(request({ cache: true }, {}, 'GET', 'url2'), 1);
    jest.advanceTimersByTime(frame);
    expect(handler.handle).toHaveBeenCalledTimes(2);
  });

  it('should add a request to cacheBucket', () => {
    const bucket = cacheBucket();
    jest.spyOn(bucket, 'add');
    call(request({ cache: true, bucket: bucket, key: 'foo' }), 1);
    expect(bucket.add).toHaveBeenCalledWith('foo');
  });

  it('should allow callback for a key', () => {
    call(request({ cache: true, key: req => req.url }), 1);
    expect(handler.handle).toHaveBeenCalledTimes(1);
  });

  describe('clearCachePredicate', () => {
    it('should NOT clear the cache when return false', () => {
      call(
        request({
          clearCachePredicate<T>(currentRequest: HttpRequest<T>, nextRequest: HttpRequest<T>): boolean {
            expect(nextRequest).toBeInstanceOf(HttpRequest);
            return false;
          }
        })
      );

      expect(handler.handle).toHaveBeenCalledTimes(1);
    });

    it('should clear the cache when return true', () => {
      call(
        request({
          clearCachePredicate<T>(currentRequest: HttpRequest<T>, nextRequest: HttpRequest<T>): boolean {
            return true;
          }
        })
      );

      expect(handler.handle).toHaveBeenCalledTimes(2);
    });
  });
});
