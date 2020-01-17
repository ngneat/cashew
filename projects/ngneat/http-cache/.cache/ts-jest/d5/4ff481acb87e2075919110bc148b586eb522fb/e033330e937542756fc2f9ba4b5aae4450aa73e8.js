"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
function HttpCache(config, ttl) {
    if (config === void 0) { config = { bufferSize: 1, refCount: false }; }
    var cache = new Map();
    return function (target, propertyKey, descriptor) {
        var method = descriptor.value;
        descriptor.value = function () {
            var key = JSON.stringify(arguments);
            var cached = cache.get(key);
            if (cached) {
                return cached;
            }
            var call$ = method.apply(this, arguments).pipe(operators_1.shareReplay(config));
            cache.set(key, call$);
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', ttl);
            if (ttl) {
                setTimeout(function () {
                    cache.delete(key);
                    console.log('ddddddddddddddddddddddddddddddd');
                }, ttl);
            }
            return call$;
        };
    };
}
exports.HttpCache = HttpCache;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFxodHRwQ2FjaGVEZWNvcmF0b3IudHMiLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBNkM7QUFFN0MsU0FBZ0IsU0FBUyxDQUFVLE1BQTJDLEVBQUUsR0FBWTtJQUF6RCx1QkFBQSxFQUFBLFdBQVcsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0lBQzVFLElBQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO0lBRS9DLE9BQU8sVUFBUyxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtRQUM5RSxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBRWhDLFVBQVUsQ0FBQyxLQUFLLEdBQUc7WUFDakIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlCLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFFRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsR0FBRyxDQUFFLENBQUE7WUFDeEQsSUFBRyxHQUFHLEVBQUU7Z0JBQ04sVUFBVSxDQUFDO29CQUNULEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUUsQ0FBQTtnQkFDL0MsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ1Q7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUM7QUEzQkQsOEJBMkJDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSXRheVxccHJvamVjdHNcXG9wZW5zb3VyY2VzXFxodHRwLWNhY2hlXFxwcm9qZWN0c1xcbmduZWF0XFxodHRwLWNhY2hlXFxzcmNcXGxpYlxcaHR0cENhY2hlRGVjb3JhdG9yLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNoYXJlUmVwbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gSHR0cENhY2hlPFQgPSBhbnk+KGNvbmZpZyA9IHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IGZhbHNlIH0sIHR0bD86IG51bWJlcikge1xuICBjb25zdCBjYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBPYnNlcnZhYmxlPFQ+PigpO1xuXG4gIHJldHVybiBmdW5jdGlvbih0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgY29uc3QgbWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgIGNvbnN0IGtleSA9IEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50cyk7XG4gICAgICBjb25zdCBjYWNoZWQgPSBjYWNoZS5nZXQoa2V5KTtcblxuICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICByZXR1cm4gY2FjaGVkO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjYWxsJCA9IG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpLnBpcGUoc2hhcmVSZXBsYXkoY29uZmlnKSk7XG4gICAgICBjYWNoZS5zZXQoa2V5LCBjYWxsJCk7XG4gICAgICBjb25zb2xlLmxvZygnYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWEnLCB0dGwgKVxuICAgICAgaWYodHRsKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNhY2hlLmRlbGV0ZShrZXkpXG4gICAgICAgIGNvbnNvbGUubG9nKCdkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkJyApXG4gICAgICAgIH0sIHR0bCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYWxsJDtcbiAgICB9O1xuICB9O1xufVxuIl0sInZlcnNpb24iOjN9