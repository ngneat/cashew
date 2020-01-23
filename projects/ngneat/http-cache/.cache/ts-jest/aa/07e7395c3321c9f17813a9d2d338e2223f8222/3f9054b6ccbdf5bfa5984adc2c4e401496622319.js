"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpCacheStorage_1 = require("../httpCacheStorage");
var mocks_spec_1 = require("./mocks.spec");
fdescribe('httpCacheStorage', function () {
    var storage;
    var existingKey = 'existingKey';
    var notExistingKey = 'notExistingKey';
    beforeEach(function () {
        storage = new httpCacheStorage_1.DefaultHttpCacheStorage();
        storage.set(existingKey, mocks_spec_1.httpResponse());
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
        it('should return false', function () {
            expect(false).toBeTruthy();
        });
    });
    // describe('set')
    // describe('delete')
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxzdGFtLnNwZWMudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSx3REFBNEQ7QUFDNUQsMkNBQTBDO0FBRTFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRTtJQUU1QixJQUFJLE9BQWdDLENBQUM7SUFDckMsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0lBQ2xDLElBQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDO0lBRXhDLFVBQVUsQ0FBQztRQUNULE9BQU8sR0FBRyxJQUFJLDBDQUF1QixFQUFFLENBQUM7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUseUJBQVksRUFBRSxDQUFDLENBQUE7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2QsRUFBRSxDQUFDLHFCQUFxQixFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMscUJBQXFCLEVBQUU7WUFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLEtBQUssRUFBRTtRQUNkLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNGLGtCQUFrQjtJQUNsQixxQkFBcUI7QUFDdkIsQ0FBQyxDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxzdGFtLnNwZWMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0SHR0cENhY2hlU3RvcmFnZX0gZnJvbSAnLi4vaHR0cENhY2hlU3RvcmFnZSc7XG5pbXBvcnQge2h0dHBSZXNwb25zZX0gZnJvbSAnLi9tb2Nrcy5zcGVjJztcblxuZmRlc2NyaWJlKCdodHRwQ2FjaGVTdG9yYWdlJywgKCkgPT4ge1xuXG4gIGxldCBzdG9yYWdlOiBEZWZhdWx0SHR0cENhY2hlU3RvcmFnZTtcbiAgY29uc3QgZXhpc3RpbmdLZXkgPSAnZXhpc3RpbmdLZXknO1xuICBjb25zdCBub3RFeGlzdGluZ0tleSA9ICdub3RFeGlzdGluZ0tleSc7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgc3RvcmFnZSA9IG5ldyBEZWZhdWx0SHR0cENhY2hlU3RvcmFnZSgpO1xuICAgIHN0b3JhZ2Uuc2V0KGV4aXN0aW5nS2V5LCBodHRwUmVzcG9uc2UoKSlcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2hhcycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZScsICgpID0+IHtcbiAgICAgIGV4cGVjdChzdG9yYWdlLmhhcyhub3RFeGlzdGluZ0tleSkpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KHN0b3JhZ2UuaGFzKGV4aXN0aW5nS2V5KSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KGZhbHNlKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gIH0pXG4gIC8vIGRlc2NyaWJlKCdzZXQnKVxuICAvLyBkZXNjcmliZSgnZGVsZXRlJylcbn0pO1xuIl0sInZlcnNpb24iOjN9