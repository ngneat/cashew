import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export abstract class HttpCacheStorage {
  abstract has(key: string): boolean;

  abstract get(key: string): HttpResponse<any>;

  abstract set(key: string, response: HttpResponse<any>): void;

  abstract delete(key?: string): void;

  abstract forEach(cb: (value: HttpResponse<any>, key: string) => void): void;
}

@Injectable()
export class DefaultHttpCacheStorage implements HttpCacheStorage {
  private cache = new Map<string, HttpResponse<any>>();

  has(key: string): boolean {
    return this.cache.has(key);
  }

  get(key: string) {
    return this.cache.get(key)!;
  }

  set(key: string, response: HttpResponse<any>): void {
    this.cache.set(key, response);
  }

  delete(key?: string): void {
    if(!key) {
      this.cache.clear();
      return;
    }

    this.cache.delete(key as string);

  }

  forEach(cb: any) {
    this.cache.forEach(cb);
  }
}
