import { HttpRequest } from '@angular/common/http';

export function requestDataChanged(previousRequest: HttpRequest<any> | undefined, currentRequest: HttpRequest<any>) {
  return (
    previousRequest?.urlWithParams !== currentRequest.urlWithParams ||
    JSON.stringify(previousRequest?.body) !== JSON.stringify(currentRequest.body)
  );
}
