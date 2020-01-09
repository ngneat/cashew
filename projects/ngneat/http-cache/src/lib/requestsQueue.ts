import { Injectable } from '@angular/core';
import { KeySerializer } from './keySerializer';
import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestsQueue {
  private queue = new Map();

  constructor(private keySerializer: KeySerializer) {}

  get(request: HttpRequest<any>) {
    return this.queue.get(this.keySerializer.serialize(request));
  }

  has(request: HttpRequest<any>) {
    return this.queue.has(this.keySerializer.serialize(request));
  }

  set(request: HttpRequest<any>, shared: Observable<HttpEvent<any>>) {
    this.queue.set(this.keySerializer.serialize(request), shared);
  }

  delete(request: HttpRequest<any>) {
    this.queue.delete(this.keySerializer.serialize(request));
  }
}
