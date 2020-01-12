import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestsQueue {
  private queue = new Map();

  get(key: string) {
    return this.queue.get(key);
  }

  has(key: string) {
    return this.queue.has(key);
  }

  set(key: string, shared: Observable<HttpEvent<any>>) {
    this.queue.set(key, shared);
  }

  delete(key: string) {
    this.queue.delete(key);
  }
}
