<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

> Caching is nut a problem!

<br />

[![Build Status](https://img.shields.io/travis/datorama/akita.svg?style=flat-square)](https://travis-ci.org/ngneat/cashew)
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![coc-badge](https://img.shields.io/badge/codeof-conduct-ff69b4.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)

## Features

✅ HTTP Caching <br>
✅ Local Storage Support <br>
✅ Handles Simultaneous Requests<br>
✅ Automatic & Manual Cache Busting <br>
✅ Hackable <br>

A flexible and straightforward library that caches HTTP requests in Angular

<a href="https://www.buymeacoffee.com/basalnetanel" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Installation

#### NPM

```shell script
$ npm install @ngneat/cashew
```

## Usage

Inject the `HttpCacheInterceptorModule` module along with `HttpClientModule` into you root module:

```ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';

@NgModule({
  imports: [HttpClientModule, HttpCacheInterceptorModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

And you're done! Now, when using Angular `HttpClient`, you can call the `withCache` function, and it'll cache the response:

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('api/users', withCache());
  }
}
```

It's as simple as that.

## Local Storage

By default caching is done to app memory. To switch to using local storage instead simply add:

```ts
import { HttpCacheInterceptorModule, useHttpCacheLocalStorage } from '@ngneat/cashew';

@NgModule({
  imports: [HttpClientModule, HttpCacheInterceptorModule.forRoot()],
  providers: [useHttpCacheLocalStorage],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

To your `AppModule` providers list. Note that `ttl` will also be calculated via local storage in this instance.

## Config Options

Using the library, you might need to change the default behavior of the caching mechanism. You could do that by passing a configuration (a partial `HttpCacheConfig` object) to the static `forRoot` method of the `HttpCacheInterceptorModule` module.


**Important note:** View Engine users - instead of adding the config to the `forRoot()` method, add it in the app module providers in the following manner, using the supplied `cashewConfig()` method: 

```ts
{ provide: HTTP_CACHE_CONFIG, useValue: cashewConfig(config) }
``` 

Let's go over each of the configuration options:

#### `strategy`

Defines the caching behavior. The library supports two different strategies:

- `explicit` (default) - **only** caches API requests that explicitly use the `withCache` function
- `implicit` - caches API requests that are of type `GET` and the response type is `JSON`. You can change this behavior by overriding the `HttpCacheGuard` provider. (See the [Hackable](#hack-the-library) section)

```ts
HttpCacheInterceptorModule.forRoot({
  strategy: 'explicit'
});
```

#### `localStorageKey`

When using local storage for caching, this defines the key where the cache is stored (for ttl - with the "Ttl" suffix): (defaults to 'httpCache')

```ts
HttpCacheInterceptorModule.forRoot({
  localStorageKey: string
});
```

#### `ttl`

Define the cache TTL (time to live) in milliseconds: (defaults to one hour)

```ts
HttpCacheInterceptorModule.forRoot({
  ttl: number
});
```

#### `responseSerializer`

By default, the registry returns the `original` response object. It can be dangerous if, for some reason, you mutate it. To change this behavior, you can clone the response before getting it:

```ts
HttpCacheInterceptorModule.forRoot({
  responseSerializer(body) {
    return cloneDeep(body);
  }
});
```

#### `parameterCodec`

Define the `HttpParameterCodec` implementation if you need a different parameter encoder.

Example of custom implementation that uses `encodeURIComponent`:

<!-- prettier-ignore -->
```ts
import { HttpCacheInterceptorModule, useHttpCacheLocalStorage } from '@ngneat/cashew';
import { HttpParameterCodec } from '@angular/common/http';

class CustomHttpParameterCodec implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

@NgModule({
  imports: [
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot({ parameterCodec: new CustomHttpParameterCodec() })
  ],
  providers: [useHttpCacheLocalStorage],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

or per request:

```ts
class CustomHttpParameterCodec implements HttpParameterCodec {
  ...
}

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(
      'api/users',
      withCache({
        parameterCodec$: new CustomHttpParameterCodec(),
        ...
      })
    );
  }
}
```

## API

### WithCache

Currently, there is no way in Angular to pass `metadata` to an interceptor. The `withCache` function uses the `params` object to pass the `config` and removes it afterward in the interceptor. The function receives four optional params that are postfixed with a `$` sign so it'll not conflicts with others:

- `cache$` - Whether to cache the request (defaults to `true`)
- `ttl$` - TTL that will override the global
- `key$` - Custom key. (defaults to the request URL including any query params)
- `bucket$` - The [bucket](#cachebucket) in which we save the keys

```ts
@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(
      'api/users',
      withCache({
        withCache$: false,
        ttl$: 40000,
        key$: 'yourkey'
      })
    );
  }
}
```

In addition to that, you can pass any query parameter that you need:

```ts
@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUser(id) {
    return this.http.get(
      'api/users',
      withCache({
        id,
        ttl$: 40000
      })
    );
  }
}
```

### CacheManager

The `CacheManager` provider, exposes an API to update and query the cache registry:

- `get<T>(key: string): HttpResponse<T>` - Get the `HttpResponse` from the cache
- `has(key: string)` - Returns a `boolean` indicates whether the provided `key` exists in the cache
- `set(key: string, body: any, { ttl, bucket })` - Set manually a new entry in the cache
- `delete(key: string | RegExp | CacheBucket)` - Delete from the cache

### CacheBucket

`CacheBucket` can be useful when we need to buffer multiple requests and invalidate them at some point. For example:

```ts
import { withCache, CacheBucket } from '@ngneat/cashew';

@Injectable()
export class TodosService {
  todosBucket = new CacheBucket();

  constructor(private http: HttpClient, private manager: HttpCacheManager) {}

  getTodo(id) {
    return this.http.get(
      `todos/${id}`,
      withCache({
        bucket$: this.todosBucket
      })
    );
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
class HttpCacheStorage {
  abstract has(key: string): boolean;
  abstract get(key: string): HttpResponse<any>;
  abstract set(key: string, response: HttpResponse<any>): void;
  abstract delete(key?: string | RegExp): void;
}
```

- `KeySerializer` - Generate the cache key based on the request: (defaults to `request.urlWithParams`)

```ts
export abstract class KeySerializer {
  abstract serialize(request: HttpCacheRequest): string;
}
```

- `HttpCacheGuard` - When using the **`implicit`** strategy it first verifies that `canActivate` is truthy:

```ts
export abstract class HttpCacheGuard {
  abstract canActivate(request: HttpCacheRequest): boolean;
}
```

It defaults to `request.method === 'GET' && request.responseType === 'json'`.

- `TTLManager` - A class responsible for managing the requests TTL:

```ts
abstract class TTLManager {
  abstract isValid(key: string): boolean;
  abstract set(key: string, ttl?: number): void;
  abstract delete(key?: string | RegExp): void;
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

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
