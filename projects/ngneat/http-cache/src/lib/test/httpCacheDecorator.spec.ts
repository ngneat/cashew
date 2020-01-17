import {fakeAsync, tick} from '@angular/core/testing';
import {timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpCache} from '../httpCacheDecorator';

const frame = 1000;

class DummyClass {

  @HttpCache()
  get() {
    return timer(frame).pipe(map(() => ({ foo: 'bar' })));
  }

  @HttpCache({ bufferSize: 1, refCount: false }, frame * 2)
  getWithTTL() {
    return timer(frame).pipe(map(() => ({ foo: 'bar' })));
  }
}

describe('HttpCache', () => {

  let dummyClass: DummyClass;

  beforeEach(() => {
    dummyClass = new DummyClass();
  });

  it('should cache the request', () => {
    dummyClass.get().subscribe(data => {
      dummyClass.get().subscribe(data2 => {
        expect(data).toBe(data2);
      })
    });
  });

  fit('should bust the cache when ttl arrive', fakeAsync(() => {
    dummyClass.getWithTTL().subscribe(data => {
      dummyClass.getWithTTL().subscribe(data2 => {
        console.log(data === data2);
        expect(data).not.toBe(data2);
      })
    });
    tick(1000);
  }))

});
