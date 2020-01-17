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
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            ttl && setTimeout(function () {
                cache.delete(key);
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            }, ttl);
            return call$;
        };
    };
}
exports.HttpCache = HttpCache;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFxodHRwQ2FjaGVEZWNvcmF0b3IudHMiLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBNkM7QUFFN0MsU0FBZ0IsU0FBUyxDQUFVLE1BQTJDLEVBQUUsR0FBWTtJQUF6RCx1QkFBQSxFQUFBLFdBQVcsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0lBQzVFLElBQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO0lBRS9DLE9BQU8sVUFBUyxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtRQUM5RSxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBRWhDLFVBQVUsQ0FBQyxLQUFLLEdBQUc7WUFDakIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlCLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFFRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUUsQ0FBQTtZQUNuRCxHQUFHLElBQUksVUFBVSxDQUFDO2dCQUNoQixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFFLENBQUE7WUFDbkQsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRVIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBekJELDhCQXlCQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJDOlxcVXNlcnNcXEl0YXlcXHByb2plY3RzXFxvcGVuc291cmNlc1xcaHR0cC1jYWNoZVxccHJvamVjdHNcXG5nbmVhdFxcaHR0cC1jYWNoZVxcc3JjXFxsaWJcXGh0dHBDYWNoZURlY29yYXRvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGZ1bmN0aW9uIEh0dHBDYWNoZTxUID0gYW55Pihjb25maWcgPSB7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiBmYWxzZSB9LCB0dGw/OiBudW1iZXIpIHtcbiAgY29uc3QgY2FjaGUgPSBuZXcgTWFwPHN0cmluZywgT2JzZXJ2YWJsZTxUPj4oKTtcblxuICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgIGNvbnN0IG1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICBjb25zdCBrZXkgPSBKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpO1xuICAgICAgY29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KGtleSk7XG5cbiAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlZDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2FsbCQgPSBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKS5waXBlKHNoYXJlUmVwbGF5KGNvbmZpZykpO1xuICAgICAgY2FjaGUuc2V0KGtleSwgY2FsbCQpO1xuICAgICAgY29uc29sZS5sb2coJ2FhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhJyApXG4gICAgICB0dGwgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNhY2hlLmRlbGV0ZShrZXkpXG4gICAgICBjb25zb2xlLmxvZygnYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWEnIClcbiAgICAgIH0sIHR0bCk7XG5cbiAgICAgIHJldHVybiBjYWxsJDtcbiAgICB9O1xuICB9O1xufVxuIl0sInZlcnNpb24iOjN9