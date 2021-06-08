import { HttpRequest } from '@angular/common/http';
import { ContextOptions } from './cacheContext';
export declare abstract class KeySerializer {
    abstract serialize(request: HttpRequest<any>, context: ContextOptions): string;
}
export declare class DefaultKeySerializer extends KeySerializer {
    serialize(request: HttpRequest<any>, context: ContextOptions): string;
}
