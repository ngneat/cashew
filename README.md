<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

> Caching is nut a problem!

<br />

[![@ngneat/cashew](https://github.com/ngneat/cashew/actions/workflows/ci.yml/badge.svg)](https://github.com/ngneat/cashew/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![coc-badge](https://img.shields.io/badge/codeof-conduct-ff69b4.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)

## Features

✅ HTTP Caching <br>
✅ State Management Mode<br>
✅ Local Storage Support <br>
✅ Handles Simultaneous Requests<br>
✅ Automatic & Manual Cache Busting <br>
✅ Hackable <br>

A flexible and straightforward library that caches HTTP requests in Angular

## Installation

```shell script
$ npm install @ngneat/cashew
```

## Usage

Use the `provideHttpCache` provider along with `withHttpCacheInterceptor` in your application providers:

```ts
import { provideHttpCache, withHttpCacheInterceptor } from '@ngneat/cashew';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([withHttpCacheInterceptor()])), provideHttpCache()]
});
```

And you're done! Now, when using Angular `HttpClient`, you can pass the `withCache` function as context, and it'll cache the response:

```ts
import { withCache } from '@ngneat/cashew';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('api/users', {
      context: withCache()
    });
  }
}
```

It's as simple as that.

## State Management Mode

When working with state management like `Akita` or `ngrx`, there is no need to save the data both in the cache and in the store because the store is the single source of truth. In such a case, the only thing we want is an indication of whether the data is in the cache.

We can change the mode option to `stateManagement`:

```ts
import { withCache } from '@ngneat/cashew';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('api/users', {
      context: withCache({
        mode: 'stateManagement'
      })
    });
  }
}
```

Now instead of saving the actual response in the cache, it'll save a `boolean` and will return by default an `EMPTY` observable when the `boolean` resolves to `true`. You can change the returned source by using the `returnSource` option.

## Local Storage

By default, caching is done to app memory. To switch to using local storage instead simply add:

```ts
import { provideHttpCache, withHttpCacheInterceptor, provideHttpCacheLocalStorageStrategy } from '@ngneat/cashew';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([withHttpCacheInterceptor()])),
    provideHttpCache(),
    provideHttpCacheLocalStorageStrategy()
  ]
});
```

To your providers list. Note that `ttl` will also be calculated via local storage in this instance.

### Versioning

When working with `localstorage`, it's recommended to add a version:

```ts
import { withCache } from '@ngneat/cashew';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('api/users', {
      context: withCache({
        version: 'v1',
        key: 'users'
      })
    });
  }
}
```

When you have a breaking change, change the version, and it'll delete the current cache automatically.

## Config Options

Using the library, you might need to change the default behavior of the caching mechanism. You could do that by passing a configuration to the `provideHttpCache` function:

```ts
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([withHttpCacheInterceptor()])), provideHttpCache(config)]
});
```

Let's go over each of the configuration options:

#### `strategy`

Defines the caching behavior. The library supports two different strategies:

- `explicit` (default) - **only** caches API requests that explicitly use the `withCache` function
- `implicit` - caches API requests that are of type `GET` and the response type is `JSON`. You can change this behavior by overriding the `HttpCacheGuard` provider. (See the [Hackable](#hack-the-library) section)

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([withHttpCacheInterceptor()])),
    provideHttpCache({ strategy: 'implicit' })
  ]
});
```

#### `ttl`

Define the cache TTL (time to live) in milliseconds: (defaults to one hour)

```ts
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([withHttpCacheInterceptor()])), provideHttpCache({ ttl: number })]
});
```

#### `responseSerializer`

By default, the registry returns the `original` response object. It can be dangerous if, for some reason, you mutate it. To change this behavior, you can clone the response before getting it:

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([withHttpCacheInterceptor()])),
    provideHttpCache({
      responseSerializer(body) {
        return cloneDeep(body);
      }
    })
  ]
});
```

## API

### WithCache

Currently, there is no way in Angular to pass `metadata` to an interceptor. The `withCache` function uses the `params` object to pass the `config` and removes it afterward in the interceptor. The function receives four optional params that are postfixed with a `$` sign so it'll not conflicts with others:

- `cache` - Whether to cache the request (defaults to `true`)
- `ttl` - TTL that will override the global
- `key` - Custom key. (defaults to the request URL including any query params)
- `bucket` - The [bucket](#cachebucket) in which we save the keys
- `version` - To use when working with `localStorage` (see [Versioning](#Versioning)).
- `clearCachePredicate(previousRequest, currentRequest)` - Return `true` to clear the cache for this key
- `context` - Allow chaining function call that returns an `HttpContext`.

```ts
import { requestDataChanged, withCache } from '@ngneat/cashew';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('api/users', {
      context: withCache({
        withCache: false,
        ttl: 40000,
        key: 'users',
        clearCachePredicate: requestDataChanged
      })
    });
  }
}
```

When you need to call another function that returns an `HttpContext`, you can provide the context option.

```ts
import { withCache } from '@ngneat/cashew';
import { withLoadingSpinner } from '@another/library'; // <-- function that returns an HttpContext

@Injectable()
export class TodosService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get('api/todos', {
      context: withCache({
        context: withLoadingSpinner()
      })
    });
  }
}
```

### CacheManager

The `CacheManager` provider, exposes an API to update and query the cache registry:

- `get<T>(key: string): HttpResponse<T>` - Get the `HttpResponse` from the cache
- `has(key: string)` - Returns a `boolean` indicates whether the provided `key` exists in the cache
- `set(key: string, body: any, { ttl, bucket })` - Set manually a new entry in the cache
- `delete(key: string | CacheBucket)` - Delete from the cache

### CacheBucket

`CacheBucket` can be useful when we need to buffer multiple requests and invalidate them at some point. For example:

```ts
import { withCache, CacheBucket } from '@ngneat/cashew';

@Injectable()
export class TodosService {
  todosBucket = new CacheBucket();

  constructor(
    private http: HttpClient,
    private manager: HttpCacheManager
  ) {}

  getTodo(id) {
    return this.http.get(`todos/${id}`, {
      context: withCache({
        bucket: this.todosBucket
      })
    });
  }

  invalidateTodos() {
    this.manager.delete(this.todosBucket);
  }
}
```

Now when we call the `invalidateTodos` method, it'll automatically delete all the `ids` that it buffered. `CacheBucket` also exposes the `add`, `has`, `delete`, and `clear` methods.

## Hack the Library

- `HttpCacheStorage` - The storage to use: (defaults to in-memory storage)

```ts
abstract class HttpCacheStorage {
  abstract has(key: string): boolean;
  abstract get(key: string): HttpResponse<any>;
  abstract set(key: string, response: HttpResponse<any>): void;
  abstract delete(key?: string): void;
}
```

- `KeySerializer` - Generate the cache key based on the request: (defaults to `request.urlWithParams`)

```ts
export abstract class KeySerializer {
  abstract serialize(request: HttpRequest): string;
}
```

- `HttpCacheGuard` - When using the **`implicit`** strategy it first verifies that `canActivate` is truthy:

```ts
export abstract class HttpCacheGuard {
  abstract canActivate(request: HttpCacheHttpRequestRequest): boolean;
}
```

It defaults to `request.method === 'GET' && request.responseType === 'json'`.

- `TTLManager` - A class responsible for managing the requests TTL:

```ts
abstract class TTLManager {
  abstract isValid(key: string): boolean;
  abstract set(key: string, ttl?: number): void;
  abstract delete(key?: string): void;
}
```

## Compatability matrix

| Cashew | Angular      |
| ------ | ------------ |
| ^4.0.0 | ^17.0.0      |
| 3.1.0  | >13.0.0 < 17 |
| 3.0.0  | ^13.0.0      |
| ^2.0.0 | ^12.0.0      |
| ^1.0.0 | ^10.0.0      |

## Contributors ✨

Thanks go to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.netbasal.com"><img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;" alt=""/><br /><sub><b>Netanel Basal</b></sub></a><br /><a href="https://github.com/ngneat/cashew/commits?author=NetanelBasal" title="Code">💻</a> <a href="#design-NetanelBasal" title="Design">🎨</a> <a href="https://github.com/ngneat/cashew/commits?author=NetanelBasal" title="Documentation">📖</a> <a href="#ideas-NetanelBasal" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-NetanelBasal" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/itayod"><img src="https://avatars2.githubusercontent.com/u/6719615?v=4" width="100px;" alt=""/><br /><sub><b>Itay Oded</b></sub></a><br /><a href="https://github.com/ngneat/cashew/commits?author=itayod" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/shaharkazaz"><img src="https://avatars2.githubusercontent.com/u/17194830?v=4" width="100px;" alt=""/><br /><sub><b>Shahar Kazaz</b></sub></a><br /><a href="https://github.com/ngneat/cashew/commits?author=shaharkazaz" title="Code">💻</a></td>
    <td align="center"><a href="https://indepth.dev/author/layzee/"><img src="https://avatars1.githubusercontent.com/u/6364586?v=4" width="100px;" alt=""/><br /><sub><b>Lars Gyrup Brink Nielsen</b></sub></a><br /><a href="https://github.com/ngneat/cashew/commits?author=LayZeeDK" title="Documentation">📖</a></td>
    <td align="center"><a href="https://raisiqueira.dev"><img src="https://avatars1.githubusercontent.com/u/2914170?v=4" width="100px;" alt=""/><br /><sub><b>Raí Siqueira</b></sub></a><br /><a href="#content-raisiqueira" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/theblushingcrow"><img src="https://avatars3.githubusercontent.com/u/638818?v=4" width="100px;" alt=""/><br /><sub><b>Inbal Sinai</b></sub></a><br /><a href="https://github.com/ngneat/cashew/commits?author=theblushingcrow" title="Code">💻</a> <a href="https://github.com/ngneat/cashew/commits?author=theblushingcrow" title="Documentation">📖</a></td>
    <td align="center"><a href="https://binary.com.au"><img src="https://avatars2.githubusercontent.com/u/175909?v=4" width="100px;" alt=""/><br /><sub><b>James Manners</b></sub></a><br /><a href="https://github.com/ngneat/cashew/commits?author=jmannau" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mokipedia"><img src="https://avatars3.githubusercontent.com/u/11502273?v=4" width="100px;" alt=""/><br /><sub><b>mokipedia</b></sub></a><br /><a href="https://github.com/ngneat/cashew/commits?author=mokipedia" title="Code">💻</a> <a href="https://github.com/ngneat/cashew/commits?author=mokipedia" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
