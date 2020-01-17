// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { share, tap } from 'rxjs/operators';
//
// import { HttpCacheManager } from './httpCacheManager.service';
// import { cloneWithoutParams } from './cloneWithoutParams';
// import { KeySerializer } from './keySerializer';
// import { CacheBucket } from './cacheBucket';
//
// @Injectable()
// export class HttpCacheInterceptor implements HttpInterceptor {
//   constructor(private cacheFacade: HttpCacheManager, private keySerializer: KeySerializer) {}
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const canActivate = this.cacheFacade._canActivate(request);
//     const cache = request.params.get('cache$');
//     const ttl = request.params.get('ttl$');
//     const customKey = request.params.get('key$');
//     const bucket: any = request.params.get('bucket$');
//
//     const clone = cloneWithoutParams(request, customKey);
//     const key = this.keySerializer.serialize(clone);
//
//     if (this.cacheFacade._isCacheable(canActivate, cache)) {
//       bucket && (bucket as CacheBucket).add(key);
//
//       // @ts-ignore
//       if (this.cacheFacade.queue.has(key)) {
//         // @ts-ignore
//         return this.cacheFacade.queue.get(key);
//       }
//
//       if (this.cacheFacade.validate(key)) {
//         return of(this.cacheFacade.get(key));
//       }
//
//       const shared = next.handle(clone).pipe(
//         tap(event => {
//           if (event instanceof HttpResponse) {
//             this.cacheFacade._set(key, event, +ttl);
//           }
//         }),
//         share()
//       );
//
//       // @ts-ignore
//       this.cacheFacade.queue.set(key, shared);
//
//       return shared;
//     }
//
//     return next.handle(clone);
//   }
// }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVJbnRlcmNlcHRvci5zcGVjLnRzIiwibWFwcGluZ3MiOiJBQUFBLDhDQUE4QztBQUM5Qyw2R0FBNkc7QUFDN0cseUNBQXlDO0FBQ3pDLCtDQUErQztBQUMvQyxFQUFFO0FBQ0YsaUVBQWlFO0FBQ2pFLDZEQUE2RDtBQUM3RCxtREFBbUQ7QUFDbkQsK0NBQStDO0FBQy9DLEVBQUU7QUFDRixnQkFBZ0I7QUFDaEIsaUVBQWlFO0FBQ2pFLGdHQUFnRztBQUNoRyxFQUFFO0FBQ0YsMEZBQTBGO0FBQzFGLGtFQUFrRTtBQUNsRSxrREFBa0Q7QUFDbEQsOENBQThDO0FBQzlDLG9EQUFvRDtBQUNwRCx5REFBeUQ7QUFDekQsRUFBRTtBQUNGLDREQUE0RDtBQUM1RCx1REFBdUQ7QUFDdkQsRUFBRTtBQUNGLCtEQUErRDtBQUMvRCxvREFBb0Q7QUFDcEQsRUFBRTtBQUNGLHNCQUFzQjtBQUN0QiwrQ0FBK0M7QUFDL0Msd0JBQXdCO0FBQ3hCLGtEQUFrRDtBQUNsRCxVQUFVO0FBQ1YsRUFBRTtBQUNGLDhDQUE4QztBQUM5QyxnREFBZ0Q7QUFDaEQsVUFBVTtBQUNWLEVBQUU7QUFDRixnREFBZ0Q7QUFDaEQseUJBQXlCO0FBQ3pCLGlEQUFpRDtBQUNqRCx1REFBdUQ7QUFDdkQsY0FBYztBQUNkLGNBQWM7QUFDZCxrQkFBa0I7QUFDbEIsV0FBVztBQUNYLEVBQUU7QUFDRixzQkFBc0I7QUFDdEIsaURBQWlEO0FBQ2pELEVBQUU7QUFDRix1QkFBdUI7QUFDdkIsUUFBUTtBQUNSLEVBQUU7QUFDRixpQ0FBaUM7QUFDakMsTUFBTTtBQUNOLElBQUkiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVJbnRlcmNlcHRvci5zcGVjLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbi8vIGltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG4vLyBpbXBvcnQgeyBzaGFyZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy9cbi8vIGltcG9ydCB7IEh0dHBDYWNoZU1hbmFnZXIgfSBmcm9tICcuL2h0dHBDYWNoZU1hbmFnZXIuc2VydmljZSc7XG4vLyBpbXBvcnQgeyBjbG9uZVdpdGhvdXRQYXJhbXMgfSBmcm9tICcuL2Nsb25lV2l0aG91dFBhcmFtcyc7XG4vLyBpbXBvcnQgeyBLZXlTZXJpYWxpemVyIH0gZnJvbSAnLi9rZXlTZXJpYWxpemVyJztcbi8vIGltcG9ydCB7IENhY2hlQnVja2V0IH0gZnJvbSAnLi9jYWNoZUJ1Y2tldCc7XG4vL1xuLy8gQEluamVjdGFibGUoKVxuLy8gZXhwb3J0IGNsYXNzIEh0dHBDYWNoZUludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbi8vICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYWNoZUZhY2FkZTogSHR0cENhY2hlTWFuYWdlciwgcHJpdmF0ZSBrZXlTZXJpYWxpemVyOiBLZXlTZXJpYWxpemVyKSB7fVxuLy9cbi8vICAgaW50ZXJjZXB0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuLy8gICAgIGNvbnN0IGNhbkFjdGl2YXRlID0gdGhpcy5jYWNoZUZhY2FkZS5fY2FuQWN0aXZhdGUocmVxdWVzdCk7XG4vLyAgICAgY29uc3QgY2FjaGUgPSByZXF1ZXN0LnBhcmFtcy5nZXQoJ2NhY2hlJCcpO1xuLy8gICAgIGNvbnN0IHR0bCA9IHJlcXVlc3QucGFyYW1zLmdldCgndHRsJCcpO1xuLy8gICAgIGNvbnN0IGN1c3RvbUtleSA9IHJlcXVlc3QucGFyYW1zLmdldCgna2V5JCcpO1xuLy8gICAgIGNvbnN0IGJ1Y2tldDogYW55ID0gcmVxdWVzdC5wYXJhbXMuZ2V0KCdidWNrZXQkJyk7XG4vL1xuLy8gICAgIGNvbnN0IGNsb25lID0gY2xvbmVXaXRob3V0UGFyYW1zKHJlcXVlc3QsIGN1c3RvbUtleSk7XG4vLyAgICAgY29uc3Qga2V5ID0gdGhpcy5rZXlTZXJpYWxpemVyLnNlcmlhbGl6ZShjbG9uZSk7XG4vL1xuLy8gICAgIGlmICh0aGlzLmNhY2hlRmFjYWRlLl9pc0NhY2hlYWJsZShjYW5BY3RpdmF0ZSwgY2FjaGUpKSB7XG4vLyAgICAgICBidWNrZXQgJiYgKGJ1Y2tldCBhcyBDYWNoZUJ1Y2tldCkuYWRkKGtleSk7XG4vL1xuLy8gICAgICAgLy8gQHRzLWlnbm9yZVxuLy8gICAgICAgaWYgKHRoaXMuY2FjaGVGYWNhZGUucXVldWUuaGFzKGtleSkpIHtcbi8vICAgICAgICAgLy8gQHRzLWlnbm9yZVxuLy8gICAgICAgICByZXR1cm4gdGhpcy5jYWNoZUZhY2FkZS5xdWV1ZS5nZXQoa2V5KTtcbi8vICAgICAgIH1cbi8vXG4vLyAgICAgICBpZiAodGhpcy5jYWNoZUZhY2FkZS52YWxpZGF0ZShrZXkpKSB7XG4vLyAgICAgICAgIHJldHVybiBvZih0aGlzLmNhY2hlRmFjYWRlLmdldChrZXkpKTtcbi8vICAgICAgIH1cbi8vXG4vLyAgICAgICBjb25zdCBzaGFyZWQgPSBuZXh0LmhhbmRsZShjbG9uZSkucGlwZShcbi8vICAgICAgICAgdGFwKGV2ZW50ID0+IHtcbi8vICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHRoaXMuY2FjaGVGYWNhZGUuX3NldChrZXksIGV2ZW50LCArdHRsKTtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pLFxuLy8gICAgICAgICBzaGFyZSgpXG4vLyAgICAgICApO1xuLy9cbi8vICAgICAgIC8vIEB0cy1pZ25vcmVcbi8vICAgICAgIHRoaXMuY2FjaGVGYWNhZGUucXVldWUuc2V0KGtleSwgc2hhcmVkKTtcbi8vXG4vLyAgICAgICByZXR1cm4gc2hhcmVkO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgcmV0dXJuIG5leHQuaGFuZGxlKGNsb25lKTtcbi8vICAgfVxuLy8gfVxuIl0sInZlcnNpb24iOjN9