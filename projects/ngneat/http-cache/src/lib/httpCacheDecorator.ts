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
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ShareReplayConfig } from 'rxjs/src/internal/operators/shareReplay';

export function HttpCache<T = any>(config: ShareReplayConfig = { bufferSize: 1, refCount: false }, ttl?: number) {
  let call$: Observable<T>;
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function(): Observable<T> {
      if (call$) {
        return call$;
      }
      call$ = method.apply(this, arguments).pipe(shareReplay(config));
      if (ttl) {
        setTimeout(() => {
          call$ = undefined;
        }, ttl);
      }
      return call$;
    };
  };
}
