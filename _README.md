<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

> Caching is nut a problem
    
<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)


## Features

✅ HTTP Caching <br>
✅ Handles Simultaneous Requests<br>
✅ Automatic & Manual Cache Busting <br>
✅ Hackable <br>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Config Options](#config-options)
  - [strategy](#strategy)
  - [ttl](#ttl)
- [API](#api)
  - [withCache](#with-cache)
  - [CacheManager](#cache-manager)
  - [CacheBucket](#cache-bucket)
- [Hack the Library](hack-the-library)

A light-weight straight forward API to cache HTTP requests in Angular applications

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
  imports: [
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot()
  ],
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
   return this.http.get('api/users', withCache()) 
 }
}
```

That's simple as that.

## Config Options

Using the library, you might need to change the default behavior of the caching mechanism. You could do that by passing a configuration object to the static `forRoot` method of the `HttpCacheInterceptorModule` module.

Let's go over each of the configuration options:

#### `strategy`
Defines the caching behavior. The library supports two different strategies:

* `implicit (default)` - **only** caches API requests when explicitly uses the `withCache` function
* `explicit` - caches API requests that are of type `GET` and the response type is `JSON`. You can change this behavior by overriding the `HttpCacheGuard` provider. (See the [Hackable](#hackable) section)

```ts
HttpCacheInterceptorModule.forRoot({
  strategy: 'explicit'
})
```

#### `ttl`
Define the cache TTL (time to live) in milliseconds: (defaults to one hour)

```ts
HttpCacheInterceptorModule.forRoot({
  ttl: number
})
```

### `responseSerializer`
By default, the registry returns the `original` response object. It can be dangerous if, for some reason, you mutate it. To change this behavior, you can clone the response before getting it:

```ts
HttpCacheInterceptorModule.forRoot({
  responseSerializer(body) {
    return cloneDeep(body);
  }
})
```

## API

### WithCache
Currently, there is no way in Angular to pass `metadata` to an interceptor. The `withCache` function uses the `params` object to pass the `config` and removes it afterward in the interceptor. The function receives four optional params that are postfixed with a `$` sign so it'll not conflicts with others:

- `cache$` - Whether to cache the request (defaults to `true`)
- `ttl$` - TTL that will override the global
- `key$` - Custom key. (defaults to the request URL including any query params)
- `bucket$` - The [bucket](#cache-bucket) in which we save the keys

```ts
@Injectable()
export class UsersService {

 constructor(private http: HttpClient) {}

 getUsers() {
   return this.http.get('api/users', withCache({
     withCache$: false,
     ttl$: 40000,
     key$: 'yourkey'
   })) 
 }
}
```

In addition to that, you can pass any query parameter that you need:

```ts
@Injectable()
export class UsersService {

 constructor(private http: HttpClient) {}

 getUser(id) {
   return this.http.get('api/users', withCache({
     id,
     ttl$: 40000
   })) 
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
   return this.http.get(`todos/${id}`, withCache({
     bucket$: this.todosBucket
   }))
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

