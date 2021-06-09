import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class RequestsCache extends Map<string, HttpRequest<any>> {}
