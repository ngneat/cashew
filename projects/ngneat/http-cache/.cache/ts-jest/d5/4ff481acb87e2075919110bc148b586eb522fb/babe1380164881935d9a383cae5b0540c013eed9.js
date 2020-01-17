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
            mocks_spec_1.ttlManager.isValid.and.returnValue(true);
            expect(httpCache.validate('key')).toBeTruthy();
        });
        it('should call delete and return false', function () {
            mocks_spec_1.httpCacheStorage.has.mockReturnValue(false);
            mocks_spec_1.ttlManager.isValid.and.returnValue(false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVNYW5hZ2VyLnNwZWMudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3RUFBNkQ7QUFDN0QsMkNBQTJIO0FBRTNILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtJQUUzQixJQUFJLFNBQTJCLENBQUM7SUFDaEMsVUFBVSxDQUFDO1FBQ1QsU0FBUyxHQUFHLElBQUksMkNBQWdCLENBQUMseUJBQVksRUFBRSw2QkFBZ0IsRUFBRSwyQkFBYyxFQUFFLHVCQUFVLEVBQUUsbUJBQU0sQ0FBQyxDQUFDO0lBQ3ZHLENBQUMsQ0FBQyxDQUFDO0lBQ0gsU0FBUyxDQUFDO1FBQ1IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNuQixFQUFFLENBQUMsd0NBQXdDLEVBQUU7WUFDMUMsNkJBQWdCLENBQUMsR0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCx1QkFBVSxDQUFDLE9BQWUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMscUNBQXFDLEVBQUU7WUFDdkMsNkJBQWdCLENBQUMsR0FBVyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCx1QkFBVSxDQUFDLE9BQWUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDOUMsTUFBTSxDQUFDLDZCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEtBQUssRUFBRTtRQUNkLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDaEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsNkJBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEtBQUssRUFBRTtRQUNkLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDaEIsMkJBQTJCO1FBQzdCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2QsRUFBRSxDQUFDLGFBQWEsRUFBRTtZQUNoQiwyQkFBMkI7UUFDN0IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDakIsRUFBRSxDQUFDLGFBQWEsRUFBRTtZQUNoQiwyQkFBMkI7UUFDN0IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSXRheVxccHJvamVjdHNcXG9wZW5zb3VyY2VzXFxodHRwLWNhY2hlXFxwcm9qZWN0c1xcbmduZWF0XFxodHRwLWNhY2hlXFxzcmNcXGxpYlxcdGVzdFxcaHR0cENhY2hlTWFuYWdlci5zcGVjLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SHR0cENhY2hlTWFuYWdlcn0gZnJvbSAnLi4vaHR0cENhY2hlTWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7aHR0cENhY2hlR3VhcmQsIGh0dHBDYWNoZVN0b3JhZ2UsIHR0bE1hbmFnZXIsIGNvbmZpZywgaHR0cFJlcXVlc3QsIGh0dHBSZXNwb25zZSwgcmVxdWVzdFF1ZXVlfSBmcm9tICcuL21vY2tzLnNwZWMnO1xuXG5kZXNjcmliZSgnSHR0cENhY2hlTWFuYWdlcicsICgpID0+IHtcblxuICBsZXQgaHR0cENhY2hlOiBIdHRwQ2FjaGVNYW5hZ2VyO1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBodHRwQ2FjaGUgPSBuZXcgSHR0cENhY2hlTWFuYWdlcihyZXF1ZXN0UXVldWUsIGh0dHBDYWNoZVN0b3JhZ2UsIGh0dHBDYWNoZUd1YXJkLCB0dGxNYW5hZ2VyLCBjb25maWcpO1xuICB9KTtcbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBqZXN0LmNsZWFyQWxsTW9ja3MoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3ZhbGlkYXRlJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgd2hlbiBjYWNoZSBpcyB2YWxpZCcsICgpID0+IHtcbiAgICAgIChodHRwQ2FjaGVTdG9yYWdlLmhhcyBhcyBhbnkpLm1vY2tSZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICh0dGxNYW5hZ2VyLmlzVmFsaWQgYXMgYW55KS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICBleHBlY3QoaHR0cENhY2hlLnZhbGlkYXRlKCdrZXknKSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2FsbCBkZWxldGUgYW5kIHJldHVybiBmYWxzZScsICgpID0+IHtcbiAgICAgIChodHRwQ2FjaGVTdG9yYWdlLmhhcyBhcyBhbnkpLm1vY2tSZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAodHRsTWFuYWdlci5pc1ZhbGlkIGFzIGFueSkuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgIGV4cGVjdChodHRwQ2FjaGUudmFsaWRhdGUoJ2tleScpKS50b0JlRmFsc3koKTtcbiAgICAgIGV4cGVjdChodHRwQ2FjaGVTdG9yYWdlLmRlbGV0ZSgpKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSlcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldCcsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHdvcmsnLCAoKSA9PiB7XG4gICAgICBodHRwQ2FjaGUuZ2V0KCdrZXknKTtcbiAgICAgIGV4cGVjdChodHRwQ2FjaGVTdG9yYWdlLmdldCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pXG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdoYXMnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCB3b3JrJywgKCkgPT4ge1xuICAgICAgLy8gZXhwZWN0KGh0dHBDYWNoZS5oYXMoKSk7XG4gICAgfSlcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2FkZCcsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHdvcmsnLCAoKSA9PiB7XG4gICAgICAvLyBleHBlY3QoaHR0cENhY2hlLmFkZCgpKTtcbiAgICB9KVxuICB9KTtcblxuICBkZXNjcmliZSgnZGVsZXRlJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgd29yaycsICgpID0+IHtcbiAgICAgIC8vIGV4cGVjdChodHRwQ2FjaGUuYWRkKCkpO1xuICAgIH0pXG4gIH0pO1xuXG59KTtcbiJdLCJ2ZXJzaW9uIjozfQ==