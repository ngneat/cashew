import { HttpContext, HttpContextToken } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { CACHE_CONTEXT, withCache } from '../cache-context';

describe('withCache', () => {
  const token = new HttpContextToken<number>(() => 0);

  it('should reuse existing HttpContext when provided', () => {
    const existingContext = new HttpContext().set(token, 42);

    const result = withCache({ cache: true, ttl: 60000, context: existingContext });
    expect(result === existingContext).toBeTruthy();
    const allTokens = Array.from(result.keys());
    expect(allTokens.length).toEqual(2);
    expect(result.get(CACHE_CONTEXT)).toEqual({ cache: true, ttl: 60000, returnSource: EMPTY });
    expect(result.get(token)).toEqual(42);
  });

  it('should create a new HttpContext when no existing context exists', () => {
    const result = withCache({ cache: true, ttl: 60000 });
    expect(result).toBeDefined();
    const allTokens = Array.from(result.keys());
    expect(allTokens.length).toEqual(1);
    expect(result.get(CACHE_CONTEXT)).toEqual({ cache: true, ttl: 60000, returnSource: EMPTY });
    expect(result.get(token)).toEqual(0);
  });
});
