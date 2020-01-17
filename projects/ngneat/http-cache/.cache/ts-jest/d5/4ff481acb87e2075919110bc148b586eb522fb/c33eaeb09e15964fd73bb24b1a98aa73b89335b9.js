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
            ttl && setTimeout(function () {
                cache.delete(key);
                console.log('ddddddddddddddddddddddddddddddd');
            }, ttl);
            return call$;
        };
    };
}
exports.HttpCache = HttpCache;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFxodHRwQ2FjaGVEZWNvcmF0b3IudHMiLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBNkM7QUFFN0MsU0FBZ0IsU0FBUyxDQUFVLE1BQTJDLEVBQUUsR0FBWTtJQUF6RCx1QkFBQSxFQUFBLFdBQVcsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0lBQzVFLElBQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO0lBRS9DLE9BQU8sVUFBUyxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtRQUM5RSxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBRWhDLFVBQVUsQ0FBQyxLQUFLLEdBQUc7WUFDakIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlCLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFFRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsR0FBRyxDQUFFLENBQUE7WUFDeEQsR0FBRyxJQUFJLFVBQVUsQ0FBQztnQkFDaEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBRSxDQUFBO1lBQy9DLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVSLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXpCRCw4QkF5QkMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFxodHRwQ2FjaGVEZWNvcmF0b3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBIdHRwQ2FjaGU8VCA9IGFueT4oY29uZmlnID0geyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSwgdHRsPzogbnVtYmVyKSB7XG4gIGNvbnN0IGNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIE9ic2VydmFibGU8VD4+KCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgICBjb25zdCBtZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xuXG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKCk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgY29uc3Qga2V5ID0gSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzKTtcbiAgICAgIGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChrZXkpO1xuXG4gICAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNhbGwkID0gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykucGlwZShzaGFyZVJlcGxheShjb25maWcpKTtcbiAgICAgIGNhY2hlLnNldChrZXksIGNhbGwkKTtcbiAgICAgIGNvbnNvbGUubG9nKCdhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYScsIHR0bCApXG4gICAgICB0dGwgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNhY2hlLmRlbGV0ZShrZXkpXG4gICAgICBjb25zb2xlLmxvZygnZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZCcgKVxuICAgICAgfSwgdHRsKTtcblxuICAgICAgcmV0dXJuIGNhbGwkO1xuICAgIH07XG4gIH07XG59XG4iXSwidmVyc2lvbiI6M30=