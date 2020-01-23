"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var httpCacheManager_service_1 = require("./httpCacheManager.service");
var cloneWithoutParams_1 = require("./cloneWithoutParams");
var keySerializer_1 = require("./keySerializer");
var HttpCacheInterceptor = /** @class */ (function () {
    function HttpCacheInterceptor(httpCacheManager, keySerializer) {
        this.httpCacheManager = httpCacheManager;
        this.keySerializer = keySerializer;
    }
    HttpCacheInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var canActivate = this.httpCacheManager._canActivate(request);
        var cache = request.params.get('cache$');
        var ttl = request.params.get('ttl$');
        var customKey = request.params.get('key$');
        var bucket = request.params.get('bucket$');
        var clone = cloneWithoutParams_1.cloneWithoutParams(request, customKey);
        var key = this.keySerializer.serialize(clone);
        if (this.httpCacheManager._isCacheable(canActivate, cache)) {
            bucket && bucket.add(key);
            // TODO: wouldn't _queue be better instead of ts-ignore it.
            // @ts-ignore
            if (this.httpCacheManager.queue.has(key)) {
                // @ts-ignore
                return this.httpCacheManager.queue.get(key);
            }
            if (this.httpCacheManager.validate(key)) {
                return rxjs_1.of(this.httpCacheManager.get(key));
            }
            //TODO: I would split that to function (for readability sake).
            var shared = next.handle(clone).pipe(operators_1.tap(function (event) {
                if (event instanceof http_1.HttpResponse) {
                    _this.httpCacheManager._set(key, event, +ttl);
                }
            }), operators_1.share());
            // @ts-ignore
            this.httpCacheManager.queue.set(key, shared);
            return shared;
        }
        return next.handle(clone);
    };
    HttpCacheInterceptor = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [httpCacheManager_service_1.HttpCacheManager, keySerializer_1.KeySerializer])
    ], HttpCacheInterceptor);
    return HttpCacheInterceptor;
}());
exports.HttpCacheInterceptor = HttpCacheInterceptor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFxodHRwQ2FjaGVJbnRlcmNlcHRvci50cyIsIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQTBHO0FBQzFHLDZCQUFzQztBQUN0Qyw0Q0FBNEM7QUFFNUMsdUVBQThEO0FBQzlELDJEQUEwRDtBQUMxRCxpREFBZ0Q7QUFJaEQ7SUFDRSw4QkFBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUcsQ0FBQztJQUVoRyx3Q0FBUyxHQUFULFVBQVUsT0FBeUIsRUFBRSxJQUFpQjtRQUF0RCxpQkF1Q0M7UUF0Q0MsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRSxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxJQUFNLE1BQU0sR0FBUSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsRCxJQUFNLEtBQUssR0FBRyx1Q0FBa0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUMxRCxNQUFNLElBQUssTUFBc0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsMkRBQTJEO1lBQzNELGFBQWE7WUFDYixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QyxhQUFhO2dCQUNiLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0M7WUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZDLE9BQU8sU0FBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMzQztZQUNELDhEQUE4RDtZQUM5RCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDcEMsZUFBRyxDQUFDLFVBQUEsS0FBSztnQkFDUCxJQUFJLEtBQUssWUFBWSxtQkFBWSxFQUFFO29CQUNqQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDOUM7WUFDSCxDQUFDLENBQUMsRUFDRixpQkFBSyxFQUFFLENBQ1IsQ0FBQztZQUVGLGFBQWE7WUFDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBMUNVLG9CQUFvQjtRQURoQyxpQkFBVSxFQUFFO2lEQUUyQiwyQ0FBZ0IsRUFBeUIsNkJBQWE7T0FEakYsb0JBQW9CLENBMkNoQztJQUFELDJCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7QUEzQ1ksb0RBQW9CIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSXRheVxccHJvamVjdHNcXG9wZW5zb3VyY2VzXFxodHRwLWNhY2hlXFxwcm9qZWN0c1xcbmduZWF0XFxodHRwLWNhY2hlXFxzcmNcXGxpYlxcaHR0cENhY2hlSW50ZXJjZXB0b3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNoYXJlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEh0dHBDYWNoZU1hbmFnZXIgfSBmcm9tICcuL2h0dHBDYWNoZU1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBjbG9uZVdpdGhvdXRQYXJhbXMgfSBmcm9tICcuL2Nsb25lV2l0aG91dFBhcmFtcyc7XG5pbXBvcnQgeyBLZXlTZXJpYWxpemVyIH0gZnJvbSAnLi9rZXlTZXJpYWxpemVyJztcbmltcG9ydCB7IENhY2hlQnVja2V0IH0gZnJvbSAnLi9jYWNoZUJ1Y2tldCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwQ2FjaGVJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENhY2hlTWFuYWdlcjogSHR0cENhY2hlTWFuYWdlciwgcHJpdmF0ZSBrZXlTZXJpYWxpemVyOiBLZXlTZXJpYWxpemVyKSB7fVxuXG4gIGludGVyY2VwdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCBjYW5BY3RpdmF0ZSA9IHRoaXMuaHR0cENhY2hlTWFuYWdlci5fY2FuQWN0aXZhdGUocmVxdWVzdCk7XG4gICAgY29uc3QgY2FjaGUgPSByZXF1ZXN0LnBhcmFtcy5nZXQoJ2NhY2hlJCcpO1xuICAgIGNvbnN0IHR0bCA9IHJlcXVlc3QucGFyYW1zLmdldCgndHRsJCcpO1xuICAgIGNvbnN0IGN1c3RvbUtleSA9IHJlcXVlc3QucGFyYW1zLmdldCgna2V5JCcpO1xuICAgIGNvbnN0IGJ1Y2tldDogYW55ID0gcmVxdWVzdC5wYXJhbXMuZ2V0KCdidWNrZXQkJyk7XG5cbiAgICBjb25zdCBjbG9uZSA9IGNsb25lV2l0aG91dFBhcmFtcyhyZXF1ZXN0LCBjdXN0b21LZXkpO1xuICAgIGNvbnN0IGtleSA9IHRoaXMua2V5U2VyaWFsaXplci5zZXJpYWxpemUoY2xvbmUpO1xuXG4gICAgaWYgKHRoaXMuaHR0cENhY2hlTWFuYWdlci5faXNDYWNoZWFibGUoY2FuQWN0aXZhdGUsIGNhY2hlKSkge1xuICAgICAgYnVja2V0ICYmIChidWNrZXQgYXMgQ2FjaGVCdWNrZXQpLmFkZChrZXkpO1xuICAgICAgLy8gVE9ETzogd291bGRuJ3QgX3F1ZXVlIGJlIGJldHRlciBpbnN0ZWFkIG9mIHRzLWlnbm9yZSBpdC5cbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGlmICh0aGlzLmh0dHBDYWNoZU1hbmFnZXIucXVldWUuaGFzKGtleSkpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2FjaGVNYW5hZ2VyLnF1ZXVlLmdldChrZXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5odHRwQ2FjaGVNYW5hZ2VyLnZhbGlkYXRlKGtleSkpIHtcbiAgICAgICAgcmV0dXJuIG9mKHRoaXMuaHR0cENhY2hlTWFuYWdlci5nZXQoa2V5KSk7XG4gICAgICB9XG4gICAgICAvL1RPRE86IEkgd291bGQgc3BsaXQgdGhhdCB0byBmdW5jdGlvbiAoZm9yIHJlYWRhYmlsaXR5IHNha2UpLlxuICAgICAgY29uc3Qgc2hhcmVkID0gbmV4dC5oYW5kbGUoY2xvbmUpLnBpcGUoXG4gICAgICAgIHRhcChldmVudCA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICB0aGlzLmh0dHBDYWNoZU1hbmFnZXIuX3NldChrZXksIGV2ZW50LCArdHRsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBzaGFyZSgpXG4gICAgICApO1xuXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLmh0dHBDYWNoZU1hbmFnZXIucXVldWUuc2V0KGtleSwgc2hhcmVkKTtcblxuICAgICAgcmV0dXJuIHNoYXJlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUoY2xvbmUpO1xuICB9XG59XG4iXSwidmVyc2lvbiI6M30=