import { HttpRequest } from '@angular/common/http';

export function requestDataChanged(currentRequest: HttpRequest<any>, nextRequest: HttpRequest<any>) {
  return (
    currentRequest?.urlWithParams !== nextRequest.urlWithParams ||
    JSON.stringify(currentRequest?.body) !== JSON.stringify(nextRequest.body)
  );
}
