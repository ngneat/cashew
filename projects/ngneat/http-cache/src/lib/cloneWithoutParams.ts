import { HttpParams, HttpRequest } from '@angular/common/http';
import { filterParams } from './filterParams';

export function cloneWithoutParams(request: HttpRequest<any>) {
  const filteredParams = filterParams(request);

  return request.clone({
    params: new HttpParams({ fromObject: filteredParams })
  });
}
