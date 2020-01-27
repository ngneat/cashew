import { HttpRequest } from '@angular/common/http';

export type HttpCacheRequest = HttpRequest<any> & { customKey?: string };
