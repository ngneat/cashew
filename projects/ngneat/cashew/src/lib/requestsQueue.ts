import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { deleteByRegex } from './deleteByRegex';

@Injectable()
export class RequestsQueue extends Map<string, Observable<HttpEvent<any>>> {
  remove(key?: string | RegExp): void {
    if (typeof key === 'string') {
      this.delete(key as string);
      return;
    }

    deleteByRegex(key as RegExp, this);
  }
}
