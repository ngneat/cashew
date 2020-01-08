import { HttpRequest } from '@angular/common/http';

export function filterParams(request: HttpRequest<any>) {
  return request.params.keys().reduce((acc, key) => {
    if (key !== 'ttl$' && key !== 'cache$') {
      acc[key] = request.params.get(key);
    }

    return acc;
  }, {});
}
