import { Injectable } from '@angular/core';

export abstract class HttpCacheVersions extends Map<string, string> {
}

@Injectable()
export class DefaultHttpVersions extends HttpCacheVersions {
}
