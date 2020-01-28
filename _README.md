<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

> Cache your application for free.
    
<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)


## Features

✅ Easy to Use <br>
✅ Automatic & Manual Cache Busting <br>
✅ Cache Bucket <br>
✅ Hackable <br>
✅ Configurable <br>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

An Http cache library for angular that provides a light-wight straight forward API to cache your Http requests. 

## Installation

#### NPM

```shell script
$ npm install @ngneat/http-cache
```

#### Yarn

```shell script
yarn add @ngneat/http-cache
```

## Usage

First, inject `HttpCacheInterceptorModule` along with `HttpClientModule` into you root module:

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpCacheInterceptorModule } from '@ngneat/http-cache';

@NgModule({
  imports: [
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot({})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Now, you can use the cache in your API `service` using `withCache` function: 

```typescript
import {HttpClient} from '@angular/common/http'; 
import { Injectable } from '@angular/core'; import {withCache} from '@ngneat/http-cache';

@Injectable()
export class ApiService {

 constructor(private http: HttpClient) { }

 getUsers() {
   // this will save the http response in a cache storage.
   return this.http.get('api/users', withCache()) 
 }

}
```

## Config Options

Using the library, you might need to change the default behaviour of the caching mechanism, you could do that by passing a configuration object to the static `forRoot` method of the `HttpCacheInterceptorModule` module.

Let's go over and explain each of the configuration options:

#### `strategy`
Define the default caching behaviour, http-cache declare two different strategies:

* `implicit` - (default) will only cache API requests when that uses the `withCache` function.
* `explicit` - will cache API requests by default.

#### `ttl`
Define the cache's time to leave (the cache life time) **in seconds**.
```typescript
  ttl: {
    // the default set to 3600 (One hour).
    default?: number;
  };
```

## API

### WithCache
...

### CacheManager
...

## Hack the Library
...

## CacheReplay Decorator
...

