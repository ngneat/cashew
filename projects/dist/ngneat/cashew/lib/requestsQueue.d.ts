import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class RequestsQueue {
    private queue;
    get(key: string): any;
    has(key: string): boolean;
    set(key: string, shared: Observable<HttpEvent<any>>): void;
    delete(key: string): void;
}
