"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpCacheManager_service_1 = require("../httpCacheManager.service");
var mocks_spec_1 = require("./mocks.spec");
describe('HttpCacheManager', function () {
    var httpCache;
    beforeEach(function () {
        httpCache = new httpCacheManager_service_1.HttpCacheManager(mocks_spec_1.requestQueue, mocks_spec_1.httpCacheStorage, mocks_spec_1.httpCacheGuard, mocks_spec_1.ttlManager, mocks_spec_1.config);
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    describe('validate', function () {
        it('should return true when cache is valid', function () {
            mocks_spec_1.httpCacheStorage.has.mockReturnValue(true);
            mocks_spec_1.ttlManager.isValid.mockReturnValue(true);
            expect(httpCache.validate('key')).toBeTruthy();
        });
        it('should call delete and return false', function () {
            mocks_spec_1.httpCacheStorage.has.mockReturnValue(false);
            mocks_spec_1.ttlManager.isValid.mockReturnValue(false);
            expect(httpCache.validate('key')).toBeFalsy();
            expect(mocks_spec_1.httpCacheStorage.delete()).toHaveBeenCalled();
        });
    });
    describe('get', function () {
        it('should work', function () {
            httpCache.get('key');
            expect(mocks_spec_1.httpCacheStorage.get).toHaveBeenCalled();
        });
    });
    describe('has', function () {
        it('should work', function () {
            // expect(httpCache.has());
        });
    });
    describe('add', function () {
        it('should work', function () {
            // expect(httpCache.add());
        });
    });
    describe('delete', function () {
        it('should work', function () {
            // expect(httpCache.add());
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVNYW5hZ2VyLnNwZWMudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3RUFBNkQ7QUFDN0QsMkNBQTJIO0FBRTNILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtJQUUzQixJQUFJLFNBQTJCLENBQUM7SUFDaEMsVUFBVSxDQUFDO1FBQ1QsU0FBUyxHQUFHLElBQUksMkNBQWdCLENBQUMseUJBQVksRUFBRSw2QkFBZ0IsRUFBRSwyQkFBYyxFQUFFLHVCQUFVLEVBQUUsbUJBQU0sQ0FBQyxDQUFDO0lBQ3ZHLENBQUMsQ0FBQyxDQUFDO0lBQ0gsU0FBUyxDQUFDO1FBQ1IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNuQixFQUFFLENBQUMsd0NBQXdDLEVBQUU7WUFDMUMsNkJBQWdCLENBQUMsR0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCx1QkFBVSxDQUFDLE9BQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtZQUN2Qyw2QkFBZ0IsQ0FBQyxHQUFXLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BELHVCQUFVLENBQUMsT0FBZSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzlDLE1BQU0sQ0FBQyw2QkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDZCxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ2hCLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDZCxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ2hCLDJCQUEyQjtRQUM3QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEtBQUssRUFBRTtRQUNkLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDaEIsMkJBQTJCO1FBQzdCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ2pCLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDaEIsMkJBQTJCO1FBQzdCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJDOlxcVXNlcnNcXEl0YXlcXHByb2plY3RzXFxvcGVuc291cmNlc1xcaHR0cC1jYWNoZVxccHJvamVjdHNcXG5nbmVhdFxcaHR0cC1jYWNoZVxcc3JjXFxsaWJcXHRlc3RcXGh0dHBDYWNoZU1hbmFnZXIuc3BlYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHBDYWNoZU1hbmFnZXJ9IGZyb20gJy4uL2h0dHBDYWNoZU1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQge2h0dHBDYWNoZUd1YXJkLCBodHRwQ2FjaGVTdG9yYWdlLCB0dGxNYW5hZ2VyLCBjb25maWcsIGh0dHBSZXF1ZXN0LCBodHRwUmVzcG9uc2UsIHJlcXVlc3RRdWV1ZX0gZnJvbSAnLi9tb2Nrcy5zcGVjJztcblxuZGVzY3JpYmUoJ0h0dHBDYWNoZU1hbmFnZXInLCAoKSA9PiB7XG5cbiAgbGV0IGh0dHBDYWNoZTogSHR0cENhY2hlTWFuYWdlcjtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgaHR0cENhY2hlID0gbmV3IEh0dHBDYWNoZU1hbmFnZXIocmVxdWVzdFF1ZXVlLCBodHRwQ2FjaGVTdG9yYWdlLCBodHRwQ2FjaGVHdWFyZCwgdHRsTWFuYWdlciwgY29uZmlnKTtcbiAgfSk7XG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgamVzdC5jbGVhckFsbE1vY2tzKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd2YWxpZGF0ZScsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gY2FjaGUgaXMgdmFsaWQnLCAoKSA9PiB7XG4gICAgICAoaHR0cENhY2hlU3RvcmFnZS5oYXMgYXMgYW55KS5tb2NrUmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAodHRsTWFuYWdlci5pc1ZhbGlkIGFzIGFueSkubW9ja1JldHVyblZhbHVlKHRydWUpO1xuICAgICAgZXhwZWN0KGh0dHBDYWNoZS52YWxpZGF0ZSgna2V5JykpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGNhbGwgZGVsZXRlIGFuZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XG4gICAgICAoaHR0cENhY2hlU3RvcmFnZS5oYXMgYXMgYW55KS5tb2NrUmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgKHR0bE1hbmFnZXIuaXNWYWxpZCBhcyBhbnkpLm1vY2tSZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICBleHBlY3QoaHR0cENhY2hlLnZhbGlkYXRlKCdrZXknKSkudG9CZUZhbHN5KCk7XG4gICAgICBleHBlY3QoaHR0cENhY2hlU3RvcmFnZS5kZWxldGUoKSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pXG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXQnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCB3b3JrJywgKCkgPT4ge1xuICAgICAgaHR0cENhY2hlLmdldCgna2V5Jyk7XG4gICAgICBleHBlY3QoaHR0cENhY2hlU3RvcmFnZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KVxuICB9KTtcblxuICBkZXNjcmliZSgnaGFzJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgd29yaycsICgpID0+IHtcbiAgICAgIC8vIGV4cGVjdChodHRwQ2FjaGUuaGFzKCkpO1xuICAgIH0pXG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdhZGQnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCB3b3JrJywgKCkgPT4ge1xuICAgICAgLy8gZXhwZWN0KGh0dHBDYWNoZS5hZGQoKSk7XG4gICAgfSlcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2RlbGV0ZScsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHdvcmsnLCAoKSA9PiB7XG4gICAgICAvLyBleHBlY3QoaHR0cENhY2hlLmFkZCgpKTtcbiAgICB9KVxuICB9KTtcblxufSk7XG4iXSwidmVyc2lvbiI6M30=