import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export abstract class HttpCacheStorage extends Map<string, HttpResponse<any> | boolean> {}

@Injectable()
export class DefaultHttpCacheStorage extends HttpCacheStorage {}
