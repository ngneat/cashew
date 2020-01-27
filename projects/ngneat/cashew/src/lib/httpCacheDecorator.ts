import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export function HttpCache<T = any>(config = { bufferSize: 1, refCount: false }, ttl?: number) {
  const cache = new Map<string, Observable<T>>();

  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function(): Observable<T> {
      const key = JSON.stringify(arguments);
      const cached = cache.get(key);

      if (cached) {
        return cached;
      }

      const call$ = method.apply(this, arguments).pipe(shareReplay(config));
      cache.set(key, call$);
      if (ttl) {
        setTimeout(() => {
          cache.delete(key);
        }, ttl);
      }

      return call$;
    };
  };
}
