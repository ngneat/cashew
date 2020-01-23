"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpCacheStorage_1 = require("../httpCacheStorage");
var mocks_spec_1 = require("./mocks.spec");
fdescribe('httpCacheStorage', function () {
    var storage;
    var existingKey = 'existingKey';
    var notExistingKey = 'notExistingKey';
    var response = mocks_spec_1.httpResponse();
    beforeEach(function () {
        storage = new httpCacheStorage_1.DefaultHttpCacheStorage();
        storage.set(existingKey, response);
    });
    describe('has', function () {
        it('should return false', function () {
            expect(storage.has(notExistingKey)).toBeFalsy();
        });
        it('should return false', function () {
            expect(storage.has(existingKey)).toBeTruthy();
        });
    });
    describe('get', function () {
        it('should get the cached response', function () {
            expect(storage.get(existingKey)).toBe(response);
        });
    });
    describe('delete', function () {
        it('should clear storage when call without a key', function () {
            spyOn(storage.cache, 'clear');
            storage.delete();
            expect(storage.cache.clear).toHaveBeenCalled();
        });
        it('should call delete when given key', function () {
            spyOn(storage.cache, 'delete');
            storage.delete(notExistingKey);
            expect(storage.cache.delete).toHaveBeenCalled();
        });
        it('should delete by regex', function () {
            var key = 'aaa';
            storage.set(key, response);
            var regex = new RegExp('aa');
            storage.delete(regex);
            expect(storage.has(key)).toBeFalsy();
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxzdG9yYWdlLnNwZWMudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3REFBNEQ7QUFDNUQsMkNBQTBDO0FBRTFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRTtJQUU1QixJQUFJLE9BQWdDLENBQUM7SUFDckMsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0lBQ2xDLElBQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDO0lBQ3hDLElBQU0sUUFBUSxHQUFHLHlCQUFZLEVBQUUsQ0FBQztJQUVoQyxVQUFVLENBQUM7UUFDVCxPQUFPLEdBQUcsSUFBSSwwQ0FBdUIsRUFBRSxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEtBQUssRUFBRTtRQUNkLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUN4QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHFCQUFxQixFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDZCxFQUFFLENBQUMsZ0NBQWdDLEVBQUU7WUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDakIsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO1lBQ2pELEtBQUssQ0FBRSxPQUFlLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqQixNQUFNLENBQUUsT0FBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO1lBQ3RDLEtBQUssQ0FBRSxPQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFFLE9BQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtZQUMzQixJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJDOlxcVXNlcnNcXEl0YXlcXHByb2plY3RzXFxvcGVuc291cmNlc1xcaHR0cC1jYWNoZVxccHJvamVjdHNcXG5nbmVhdFxcaHR0cC1jYWNoZVxcc3JjXFxsaWJcXHRlc3RcXHN0b3JhZ2Uuc3BlYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RlZmF1bHRIdHRwQ2FjaGVTdG9yYWdlfSBmcm9tICcuLi9odHRwQ2FjaGVTdG9yYWdlJztcbmltcG9ydCB7aHR0cFJlc3BvbnNlfSBmcm9tICcuL21vY2tzLnNwZWMnO1xuXG5mZGVzY3JpYmUoJ2h0dHBDYWNoZVN0b3JhZ2UnLCAoKSA9PiB7XG5cbiAgbGV0IHN0b3JhZ2U6IERlZmF1bHRIdHRwQ2FjaGVTdG9yYWdlO1xuICBjb25zdCBleGlzdGluZ0tleSA9ICdleGlzdGluZ0tleSc7XG4gIGNvbnN0IG5vdEV4aXN0aW5nS2V5ID0gJ25vdEV4aXN0aW5nS2V5JztcbiAgY29uc3QgcmVzcG9uc2UgPSBodHRwUmVzcG9uc2UoKTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzdG9yYWdlID0gbmV3IERlZmF1bHRIdHRwQ2FjaGVTdG9yYWdlKCk7XG4gICAgc3RvcmFnZS5zZXQoZXhpc3RpbmdLZXksIHJlc3BvbnNlKVxuICB9KTtcblxuICBkZXNjcmliZSgnaGFzJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHN0b3JhZ2UuaGFzKG5vdEV4aXN0aW5nS2V5KSkudG9CZUZhbHN5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XG4gICAgICBleHBlY3Qoc3RvcmFnZS5oYXMoZXhpc3RpbmdLZXkpKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXQnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGNhY2hlZCByZXNwb25zZScsICgpID0+IHtcbiAgICAgIGV4cGVjdChzdG9yYWdlLmdldChleGlzdGluZ0tleSkpLnRvQmUocmVzcG9uc2UpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZGVsZXRlJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgY2xlYXIgc3RvcmFnZSB3aGVuIGNhbGwgd2l0aG91dCBhIGtleScsICgpID0+IHtcbiAgICAgIHNweU9uKChzdG9yYWdlIGFzIGFueSkuY2FjaGUsICdjbGVhcicpO1xuICAgICAgc3RvcmFnZS5kZWxldGUoKTtcbiAgICAgIGV4cGVjdCgoc3RvcmFnZSBhcyBhbnkpLmNhY2hlLmNsZWFyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIGRlbGV0ZSB3aGVuIGdpdmVuIGtleScsICgpID0+IHtcbiAgICAgIHNweU9uKChzdG9yYWdlIGFzIGFueSkuY2FjaGUsICdkZWxldGUnKTtcbiAgICAgIHN0b3JhZ2UuZGVsZXRlKG5vdEV4aXN0aW5nS2V5KTtcbiAgICAgIGV4cGVjdCgoc3RvcmFnZSBhcyBhbnkpLmNhY2hlLmRlbGV0ZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZGVsZXRlIGJ5IHJlZ2V4JywgKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ2FhYSc7XG4gICAgICBzdG9yYWdlLnNldChrZXksIHJlc3BvbnNlKTtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnYWEnKTtcbiAgICAgIHN0b3JhZ2UuZGVsZXRlKHJlZ2V4KTtcbiAgICAgIGV4cGVjdChzdG9yYWdlLmhhcyhrZXkpKS50b0JlRmFsc3koKTtcbiAgICB9KTtcbiAgfSlcbn0pO1xuIl0sInZlcnNpb24iOjN9