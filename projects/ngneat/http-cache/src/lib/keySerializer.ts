import { HttpRequest } from '@angular/common/http';

export abstract class KeySerializer {
  abstract serialize(request: HttpRequest<any>): string;
}

export class DefaultKeySerializer extends KeySerializer {
  serialize(request: HttpRequest<any>) {
    return request.urlWithParams;
  }
}
