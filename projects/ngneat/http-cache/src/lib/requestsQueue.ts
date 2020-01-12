import { Injectable } from '@angular/core';
import { KeySerializer } from './keySerializer';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpCacheRequest } from './types';

@Injectable()
export class RequestsQueue {
  private queue = new Map();

  constructor(private keySerializer: KeySerializer) {}

  get(request: HttpCacheRequest) {
    return this.queue.get(this.keySerializer.serialize(request));
  }

  has(request: HttpCacheRequest) {
    return this.queue.has(this.keySerializer.serialize(request));
  }

  set(request: HttpCacheRequest, shared: Observable<HttpEvent<any>>) {
    this.queue.set(this.keySerializer.serialize(request), shared);
  }

  delete(request: HttpCacheRequest) {
    this.queue.delete(this.keySerializer.serialize(request));
  }
}
