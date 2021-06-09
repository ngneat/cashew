import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestsQueue extends Map<string, Observable<HttpEvent<any>>> {
}

