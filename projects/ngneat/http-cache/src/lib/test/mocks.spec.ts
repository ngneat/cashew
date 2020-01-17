import {defaultConfig} from '../httpCacheConfig';
import {HttpCacheGuard} from '../httpCacheGuard';
import {HttpCacheStorage} from '../httpCacheStorage';
import {RequestsQueue} from '../requestsQueue';
import {TTLManager} from '../ttlManager';
import {HttpRequest, HttpResponse} from '@angular/common/http';

export const httpRequest = (method: string = 'GET', url: string = 'api/mock') => new HttpRequest(method, url, {});
export const httpResponse = () => new HttpResponse();

export const httpCacheGuard: HttpCacheGuard = {
  canActivate: jest.fn()
};

export const httpCacheStorage: HttpCacheStorage = {
  has: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
};
export const ttlManager: TTLManager = {
  isValid: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
};
export const config = defaultConfig;
export const requestQueue = new RequestsQueue();
