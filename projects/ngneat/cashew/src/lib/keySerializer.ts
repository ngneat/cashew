import { HttpCacheRequest } from './types';

export abstract class KeySerializer {
  abstract serialize(request: HttpCacheRequest): string;
}

export class DefaultKeySerializer extends KeySerializer {
  serialize(request: HttpCacheRequest) {
    return request.customKey || request.urlWithParams;
  }
}
