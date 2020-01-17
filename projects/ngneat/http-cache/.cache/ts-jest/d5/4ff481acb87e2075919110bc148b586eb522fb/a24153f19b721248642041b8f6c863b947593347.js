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
            expect(httpCache.validate).toBeTruthy();
        });
        it('should call delete and return false', function () {
            mocks_spec_1.httpCacheStorage.has.mockReturnValue(false);
            mocks_spec_1.ttlManager.isValid.mockReturnValue(false);
            expect(httpCache.validate('key')).toBeFalsy();
            expect(mocks_spec_1.httpCacheStorage.delete).toHaveBeenCalled();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVNYW5hZ2VyLnNwZWMudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3RUFBNkQ7QUFDN0QsMkNBQTJIO0FBRTNILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtJQUUzQixJQUFJLFNBQTJCLENBQUM7SUFDaEMsVUFBVSxDQUFDO1FBQ1QsU0FBUyxHQUFHLElBQUksMkNBQWdCLENBQUMseUJBQVksRUFBRSw2QkFBZ0IsRUFBRSwyQkFBYyxFQUFFLHVCQUFVLEVBQUUsbUJBQU0sQ0FBQyxDQUFDO0lBQ3ZHLENBQUMsQ0FBQyxDQUFDO0lBQ0gsU0FBUyxDQUFDO1FBQ1IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNuQixFQUFFLENBQUMsd0NBQXdDLEVBQUU7WUFDMUMsNkJBQWdCLENBQUMsR0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCx1QkFBVSxDQUFDLE9BQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtZQUN2Qyw2QkFBZ0IsQ0FBQyxHQUFXLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BELHVCQUFVLENBQUMsT0FBZSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzlDLE1BQU0sQ0FBQyw2QkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2QsRUFBRSxDQUFDLGFBQWEsRUFBRTtZQUNoQixTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2QsRUFBRSxDQUFDLGFBQWEsRUFBRTtZQUNoQiwyQkFBMkI7UUFDN0IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDZCxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ2hCLDJCQUEyQjtRQUM3QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNqQixFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ2hCLDJCQUEyQjtRQUM3QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVNYW5hZ2VyLnNwZWMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIdHRwQ2FjaGVNYW5hZ2VyfSBmcm9tICcuLi9odHRwQ2FjaGVNYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHtodHRwQ2FjaGVHdWFyZCwgaHR0cENhY2hlU3RvcmFnZSwgdHRsTWFuYWdlciwgY29uZmlnLCBodHRwUmVxdWVzdCwgaHR0cFJlc3BvbnNlLCByZXF1ZXN0UXVldWV9IGZyb20gJy4vbW9ja3Muc3BlYyc7XG5cbmRlc2NyaWJlKCdIdHRwQ2FjaGVNYW5hZ2VyJywgKCkgPT4ge1xuXG4gIGxldCBodHRwQ2FjaGU6IEh0dHBDYWNoZU1hbmFnZXI7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGh0dHBDYWNoZSA9IG5ldyBIdHRwQ2FjaGVNYW5hZ2VyKHJlcXVlc3RRdWV1ZSwgaHR0cENhY2hlU3RvcmFnZSwgaHR0cENhY2hlR3VhcmQsIHR0bE1hbmFnZXIsIGNvbmZpZyk7XG4gIH0pO1xuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIGplc3QuY2xlYXJBbGxNb2NrcygpO1xuICB9KTtcblxuICBkZXNjcmliZSgndmFsaWRhdGUnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIGNhY2hlIGlzIHZhbGlkJywgKCkgPT4ge1xuICAgICAgKGh0dHBDYWNoZVN0b3JhZ2UuaGFzIGFzIGFueSkubW9ja1JldHVyblZhbHVlKHRydWUpO1xuICAgICAgKHR0bE1hbmFnZXIuaXNWYWxpZCBhcyBhbnkpLm1vY2tSZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgIGV4cGVjdChodHRwQ2FjaGUudmFsaWRhdGUpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGNhbGwgZGVsZXRlIGFuZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XG4gICAgICAoaHR0cENhY2hlU3RvcmFnZS5oYXMgYXMgYW55KS5tb2NrUmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgKHR0bE1hbmFnZXIuaXNWYWxpZCBhcyBhbnkpLm1vY2tSZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICBleHBlY3QoaHR0cENhY2hlLnZhbGlkYXRlKCdrZXknKSkudG9CZUZhbHN5KCk7XG4gICAgICBleHBlY3QoaHR0cENhY2hlU3RvcmFnZS5kZWxldGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KVxuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgd29yaycsICgpID0+IHtcbiAgICAgIGh0dHBDYWNoZS5nZXQoJ2tleScpO1xuICAgICAgZXhwZWN0KGh0dHBDYWNoZVN0b3JhZ2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSlcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2hhcycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHdvcmsnLCAoKSA9PiB7XG4gICAgICAvLyBleHBlY3QoaHR0cENhY2hlLmhhcygpKTtcbiAgICB9KVxuICB9KTtcblxuICBkZXNjcmliZSgnYWRkJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgd29yaycsICgpID0+IHtcbiAgICAgIC8vIGV4cGVjdChodHRwQ2FjaGUuYWRkKCkpO1xuICAgIH0pXG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdkZWxldGUnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCB3b3JrJywgKCkgPT4ge1xuICAgICAgLy8gZXhwZWN0KGh0dHBDYWNoZS5hZGQoKSk7XG4gICAgfSlcbiAgfSk7XG5cbn0pO1xuIl0sInZlcnNpb24iOjN9