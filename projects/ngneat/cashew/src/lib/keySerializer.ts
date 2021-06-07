import { HttpRequest } from '@angular/common/http';
import { ContextOptions } from './cacheContext';

export abstract class KeySerializer {
  abstract serialize(request: HttpRequest<any>, context: ContextOptions): string;
}

export class DefaultKeySerializer extends KeySerializer {
  serialize(request: HttpRequest<any>, context: ContextOptions) {
    return context.key ?? request.urlWithParams;
  }
}
