import { HttpRequest } from '@angular/common/http';
import { ContextOptions } from './cache-context';

export abstract class KeySerializer {
  abstract serialize(request: HttpRequest<any>, context: ContextOptions): string;
}

export class DefaultKeySerializer extends KeySerializer {
  serialize(request: HttpRequest<any>, context: ContextOptions) {
    const { key } = context;

    if (key) {
      return typeof key === 'function' ? key(request) : key;
    }

    return request.urlWithParams;
  }
}
