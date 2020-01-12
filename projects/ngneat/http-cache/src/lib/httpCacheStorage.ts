import { HttpRequest, HttpResponse } from '@angular/common/http';
import { KeySerializer } from './keySerializer';
import { Injectable } from '@angular/core';
import { HttpCacheRequest } from './types';

export abstract class HttpCacheStorage {
  abstract has(request: HttpCacheRequest): boolean;
  abstract get(request: HttpCacheRequest): HttpResponse<any>;
  abstract set(request: HttpCacheRequest, response: HttpResponse<any>): void;
  abstract delete(key?: string | RegExp | HttpCacheRequest): void;
}

@Injectable()
export class DefaultHttpCacheStorage implements HttpCacheStorage {
  private cache = new Map<string, HttpResponse<any>>();

  constructor(private keySerializer: KeySerializer) {}

  has(request: HttpCacheRequest): boolean {
    return this.cache.has(this.keySerializer.serialize(request));
  }

  get(request: HttpCacheRequest) {
    return this.cache.get(this.keySerializer.serialize(request));
  }

  set(request: HttpCacheRequest, response: HttpResponse<any>): void {
    this.cache.set(this.keySerializer.serialize(request), response);
  }

  delete(url?: string | RegExp): void {
    if (!url) {
      this.cache.clear();
      return;
    }

    let _url = url;

    if (url instanceof HttpRequest) {
      _url = this.keySerializer.serialize(url);
    }

    if (typeof _url === 'string') {
      this.cache.delete(_url as string);
      return;
    }

    for (const [key] of Array.from(this.cache)) {
      if ((_url as RegExp).test(key)) {
        this.cache.delete(key);
        break;
      }
    }
  }
}
