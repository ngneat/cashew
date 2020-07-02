import { HttpParameterCodec, HttpParams } from '@angular/common/http';
import { filterParams } from './filterParams';
import { HttpCacheRequest } from './types';

export function cloneWithoutParams(
  request: HttpCacheRequest,
  customKey: string,
  parameterCodec?: HttpParameterCodec
): HttpCacheRequest {
  const filteredParams = filterParams(request);

  const clone = request.clone({
    params: new HttpParams({
      fromObject: filteredParams,
      ...(parameterCodec && { encoder: parameterCodec })
    })
  });

  (clone as HttpCacheRequest).customKey = customKey;

  return clone as HttpCacheRequest;
}
