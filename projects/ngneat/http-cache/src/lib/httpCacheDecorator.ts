import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ShareReplayConfig } from 'rxjs/src/internal/operators/shareReplay';

/**
 * This decorator will cache the observable's last result,
 * so the next time we call the function it will return the last result instantly.
 *
 * @example
 * ```
 * @HttpCache()
 * fetchUsers() {
 *   return this.http.get('/api/users');
 * }
 * ```
 *
 */
export function HttpCache<T = any>(config: ShareReplayConfig = { bufferSize: 1, refCount: false }, ttl?: number) {
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
