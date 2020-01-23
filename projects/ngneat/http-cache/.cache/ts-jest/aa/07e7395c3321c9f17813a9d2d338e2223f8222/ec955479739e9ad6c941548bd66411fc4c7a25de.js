"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ttlManager_1 = require("../ttlManager");
var mocks_spec_1 = require("./mocks.spec");
describe('ttlManager', function () {
    var ttlManager;
    var ttl = 1000;
    // const getTime = spyOn(Date.prototype, 'getTime');
    beforeEach(function () {
        ttlManager = new ttlManager_1.DefaultTTLManager(mocks_spec_1.config);
    });
    // describe('valid', () => {
    //   it('should be valid if has a key and ', () => {
    //     expect(ttlManager.has(notExistingKey)).toBeFalsy();
    //   });
    //   it('should return false', () => {
    //     expect(ttlManager.has(existingKey)).toBeTruthy();
    //   });
    // });
    fdescribe('set', function () {
        it('should get the cached response', function () {
            ttlManager.set('key', 1000);
            expect(ttlManager.isValid('key')).toBeTruthy();
        });
        it('should should not be valid after ttl is over', testing_1.fakeAsync(function () {
            ttlManager.set('key', 1000);
            testing_1.tick(1001);
            expect(ttlManager.isValid('key')).toBeFalsy();
        }));
    });
    describe('delete', function () {
        it('should clear storage when call without a key', function () {
            spyOn(ttlManager.cache, 'clear');
            ttlManager.delete();
            expect(ttlManager.cache.clear).toHaveBeenCalled();
        });
        it('should call delete when given key', function () {
            spyOn(ttlManager.cache, 'delete');
            ttlManager.delete('key');
            expect(ttlManager.cache.delete).toHaveBeenCalled();
        });
        it('should delete by regex', function () {
            var key = 'aaa';
            ttlManager.set(key, ttl);
            var regex = new RegExp('aa');
            ttlManager.delete(regex);
            expect(ttlManager.isValid(key)).toBeFalsy();
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFx0dGxNYW5hZ2VyLnNwZWMudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBc0Q7QUFDdEQsNENBQTREO0FBQzVELDJDQUFrRDtBQUVsRCxRQUFRLENBQUMsWUFBWSxFQUFFO0lBRXJCLElBQUksVUFBc0IsQ0FBQztJQUMzQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDakIsb0RBQW9EO0lBRXBELFVBQVUsQ0FBQztRQUNULFVBQVUsR0FBRyxJQUFJLDhCQUFpQixDQUFDLG1CQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztJQUVILDRCQUE0QjtJQUM1QixvREFBb0Q7SUFDcEQsMERBQTBEO0lBQzFELFFBQVE7SUFDUixzQ0FBc0M7SUFDdEMsd0RBQXdEO0lBQ3hELFFBQVE7SUFDUixNQUFNO0lBRU4sU0FBUyxDQUFDLEtBQUssRUFBRTtRQUNmLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtZQUNuQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDhDQUE4QyxFQUFFLG1CQUFTLENBQUM7WUFDM0QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUIsY0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ2pCLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtZQUNqRCxLQUFLLENBQUUsVUFBa0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDMUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLE1BQU0sQ0FBRSxVQUFrQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO1lBQ3RDLEtBQUssQ0FBRSxVQUFrQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMzQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBRSxVQUFrQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHdCQUF3QixFQUFFO1lBQzNCLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQztZQUNsQixVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSXRheVxccHJvamVjdHNcXG9wZW5zb3VyY2VzXFxodHRwLWNhY2hlXFxwcm9qZWN0c1xcbmduZWF0XFxodHRwLWNhY2hlXFxzcmNcXGxpYlxcdGVzdFxcdHRsTWFuYWdlci5zcGVjLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZmFrZUFzeW5jLCB0aWNrfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuaW1wb3J0IHtUVExNYW5hZ2VyLCBEZWZhdWx0VFRMTWFuYWdlcn0gZnJvbSAnLi4vdHRsTWFuYWdlcic7XG5pbXBvcnQge2h0dHBSZXNwb25zZSwgY29uZmlnfSBmcm9tICcuL21vY2tzLnNwZWMnO1xuXG5kZXNjcmliZSgndHRsTWFuYWdlcicsICgpID0+IHtcblxuICBsZXQgdHRsTWFuYWdlcjogVFRMTWFuYWdlcjtcbiAgY29uc3QgdHRsID0gMTAwMDtcbiAgLy8gY29uc3QgZ2V0VGltZSA9IHNweU9uKERhdGUucHJvdG90eXBlLCAnZ2V0VGltZScpO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHR0bE1hbmFnZXIgPSBuZXcgRGVmYXVsdFRUTE1hbmFnZXIoY29uZmlnKTtcbiAgfSk7XG5cbiAgLy8gZGVzY3JpYmUoJ3ZhbGlkJywgKCkgPT4ge1xuICAvLyAgIGl0KCdzaG91bGQgYmUgdmFsaWQgaWYgaGFzIGEga2V5IGFuZCAnLCAoKSA9PiB7XG4gIC8vICAgICBleHBlY3QodHRsTWFuYWdlci5oYXMobm90RXhpc3RpbmdLZXkpKS50b0JlRmFsc3koKTtcbiAgLy8gICB9KTtcbiAgLy8gICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZScsICgpID0+IHtcbiAgLy8gICAgIGV4cGVjdCh0dGxNYW5hZ2VyLmhhcyhleGlzdGluZ0tleSkpLnRvQmVUcnV0aHkoKTtcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG5cbiAgZmRlc2NyaWJlKCdzZXQnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGNhY2hlZCByZXNwb25zZScsICgpID0+IHtcbiAgICAgIHR0bE1hbmFnZXIuc2V0KCdrZXknLCAxMDAwKTtcbiAgICAgIGV4cGVjdCh0dGxNYW5hZ2VyLmlzVmFsaWQoJ2tleScpKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBzaG91bGQgbm90IGJlIHZhbGlkIGFmdGVyIHR0bCBpcyBvdmVyJywgZmFrZUFzeW5jKCgpID0+IHtcbiAgICAgIHR0bE1hbmFnZXIuc2V0KCdrZXknLCAxMDAwKTtcbiAgICAgIHRpY2soMTAwMSk7XG4gICAgICBleHBlY3QodHRsTWFuYWdlci5pc1ZhbGlkKCdrZXknKSkudG9CZUZhbHN5KCk7XG4gICAgfSkpO1xuICB9KTtcblxuICBkZXNjcmliZSgnZGVsZXRlJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgY2xlYXIgc3RvcmFnZSB3aGVuIGNhbGwgd2l0aG91dCBhIGtleScsICgpID0+IHtcbiAgICAgIHNweU9uKCh0dGxNYW5hZ2VyIGFzIGFueSkuY2FjaGUsICdjbGVhcicpO1xuICAgICAgdHRsTWFuYWdlci5kZWxldGUoKTtcbiAgICAgIGV4cGVjdCgodHRsTWFuYWdlciBhcyBhbnkpLmNhY2hlLmNsZWFyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIGRlbGV0ZSB3aGVuIGdpdmVuIGtleScsICgpID0+IHtcbiAgICAgIHNweU9uKCh0dGxNYW5hZ2VyIGFzIGFueSkuY2FjaGUsICdkZWxldGUnKTtcbiAgICAgIHR0bE1hbmFnZXIuZGVsZXRlKCdrZXknKTtcbiAgICAgIGV4cGVjdCgodHRsTWFuYWdlciBhcyBhbnkpLmNhY2hlLmRlbGV0ZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZGVsZXRlIGJ5IHJlZ2V4JywgKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ2FhYSc7XG4gICAgICB0dGxNYW5hZ2VyLnNldChrZXksIHR0bCk7XG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJ2FhJyk7XG4gICAgICB0dGxNYW5hZ2VyLmRlbGV0ZShyZWdleCk7XG4gICAgICBleHBlY3QodHRsTWFuYWdlci5pc1ZhbGlkKGtleSkpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuICB9KVxufSk7XG4iXSwidmVyc2lvbiI6M30=