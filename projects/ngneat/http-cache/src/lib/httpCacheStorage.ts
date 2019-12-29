import { HttpRequest, HttpResponse } from '@angular/common/http';
import { KeySerializer } from './keySerializer';
import { Injectable } from '@angular/core';

export abstract class HttpCacheStorage {
  abstract has(request: HttpRequest<any>): boolean;
  abstract get(request: HttpRequest<any>): HttpResponse<any>;
  abstract set(request: HttpRequest<any>, response: HttpResponse<any>): void;
  abstract delete(key: string): void;
}

@Injectable()
export class DefaultHttpCacheStorage implements HttpCacheStorage {
  private cache = new Map<string, HttpResponse<any>>();

  constructor(private keySerializer: KeySerializer) {}

  has(request: HttpRequest<any>): boolean {
    return this.cache.has(this.keySerializer.serialize(request));
  }

  get(request: HttpRequest<any>) {
    return this.cache.get(this.keySerializer.serialize(request));
  }

  set(request: HttpRequest<any>, response: HttpResponse<any>): void {
    this.cache.set(this.keySerializer.serialize(request), response);
  }

  delete(url: string | RegExp): void {
    if (typeof url === 'string') {
      this.cache.delete(url);
    }

    for (const [key] of Array.from(this.cache)) {
      if ((url as RegExp).test(key)) {
        this.cache.delete(key);
        break;
      }
    }
  }
}
