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
        it('should not be valid after ttl is over', testing_1.fakeAsync(function () {
            ttlManager.set('key', 1000);
            testing_1.tick(1001);
            expect(ttlManager.isValid('key')).toBeFalsy();
        }));
        it('should use the config ttl if non has been passed', function () {
            spyOn(Date.prototype, 'setMilliseconds');
            ttlManager.set('key');
            expect(Date.prototype.setMilliseconds).toHaveBeenCalledWith(mocks_spec_1.config.ttl.default);
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFx0dGxNYW5hZ2VyLnNwZWMudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBc0Q7QUFDdEQsNENBQTREO0FBQzVELDJDQUFrRDtBQUVsRCxRQUFRLENBQUMsWUFBWSxFQUFFO0lBRXJCLElBQUksVUFBc0IsQ0FBQztJQUMzQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDakIsb0RBQW9EO0lBRXBELFVBQVUsQ0FBQztRQUNULFVBQVUsR0FBRyxJQUFJLDhCQUFpQixDQUFDLG1CQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztJQUVILDRCQUE0QjtJQUM1QixvREFBb0Q7SUFDcEQsMERBQTBEO0lBQzFELFFBQVE7SUFDUixzQ0FBc0M7SUFDdEMsd0RBQXdEO0lBQ3hELFFBQVE7SUFDUixNQUFNO0lBRU4sU0FBUyxDQUFDLEtBQUssRUFBRTtRQUNmLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtZQUNuQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHVDQUF1QyxFQUFFLG1CQUFTLENBQUM7WUFDcEQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUIsY0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ0osRUFBRSxDQUFDLGtEQUFrRCxFQUFFO1lBQ3JELEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDekMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNqQixFQUFFLENBQUMsOENBQThDLEVBQUU7WUFDakQsS0FBSyxDQUFFLFVBQWtCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQixNQUFNLENBQUUsVUFBa0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtZQUN0QyxLQUFLLENBQUUsVUFBa0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0MsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUUsVUFBa0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtZQUMzQixJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDbEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekIsSUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJDOlxcVXNlcnNcXEl0YXlcXHByb2plY3RzXFxvcGVuc291cmNlc1xcaHR0cC1jYWNoZVxccHJvamVjdHNcXG5nbmVhdFxcaHR0cC1jYWNoZVxcc3JjXFxsaWJcXHRlc3RcXHR0bE1hbmFnZXIuc3BlYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Zha2VBc3luYywgdGlja30gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7VFRMTWFuYWdlciwgRGVmYXVsdFRUTE1hbmFnZXJ9IGZyb20gJy4uL3R0bE1hbmFnZXInO1xuaW1wb3J0IHtodHRwUmVzcG9uc2UsIGNvbmZpZ30gZnJvbSAnLi9tb2Nrcy5zcGVjJztcblxuZGVzY3JpYmUoJ3R0bE1hbmFnZXInLCAoKSA9PiB7XG5cbiAgbGV0IHR0bE1hbmFnZXI6IFRUTE1hbmFnZXI7XG4gIGNvbnN0IHR0bCA9IDEwMDA7XG4gIC8vIGNvbnN0IGdldFRpbWUgPSBzcHlPbihEYXRlLnByb3RvdHlwZSwgJ2dldFRpbWUnKTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICB0dGxNYW5hZ2VyID0gbmV3IERlZmF1bHRUVExNYW5hZ2VyKGNvbmZpZyk7XG4gIH0pO1xuXG4gIC8vIGRlc2NyaWJlKCd2YWxpZCcsICgpID0+IHtcbiAgLy8gICBpdCgnc2hvdWxkIGJlIHZhbGlkIGlmIGhhcyBhIGtleSBhbmQgJywgKCkgPT4ge1xuICAvLyAgICAgZXhwZWN0KHR0bE1hbmFnZXIuaGFzKG5vdEV4aXN0aW5nS2V5KSkudG9CZUZhbHN5KCk7XG4gIC8vICAgfSk7XG4gIC8vICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XG4gIC8vICAgICBleHBlY3QodHRsTWFuYWdlci5oYXMoZXhpc3RpbmdLZXkpKS50b0JlVHJ1dGh5KCk7XG4gIC8vICAgfSk7XG4gIC8vIH0pO1xuXG4gIGZkZXNjcmliZSgnc2V0JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgZ2V0IHRoZSBjYWNoZWQgcmVzcG9uc2UnLCAoKSA9PiB7XG4gICAgICB0dGxNYW5hZ2VyLnNldCgna2V5JywgMTAwMCk7XG4gICAgICBleHBlY3QodHRsTWFuYWdlci5pc1ZhbGlkKCdrZXknKSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IGJlIHZhbGlkIGFmdGVyIHR0bCBpcyBvdmVyJywgZmFrZUFzeW5jKCgpID0+IHtcbiAgICAgIHR0bE1hbmFnZXIuc2V0KCdrZXknLCAxMDAwKTtcbiAgICAgIHRpY2soMTAwMSk7XG4gICAgICBleHBlY3QodHRsTWFuYWdlci5pc1ZhbGlkKCdrZXknKSkudG9CZUZhbHN5KCk7XG4gICAgfSkpO1xuICAgIGl0KCdzaG91bGQgdXNlIHRoZSBjb25maWcgdHRsIGlmIG5vbiBoYXMgYmVlbiBwYXNzZWQnLCAoKSA9PiB7XG4gICAgICBzcHlPbihEYXRlLnByb3RvdHlwZSwgJ3NldE1pbGxpc2Vjb25kcycpO1xuICAgICAgdHRsTWFuYWdlci5zZXQoJ2tleScpO1xuICAgICAgZXhwZWN0KERhdGUucHJvdG90eXBlLnNldE1pbGxpc2Vjb25kcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoY29uZmlnLnR0bC5kZWZhdWx0KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2RlbGV0ZScsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNsZWFyIHN0b3JhZ2Ugd2hlbiBjYWxsIHdpdGhvdXQgYSBrZXknLCAoKSA9PiB7XG4gICAgICBzcHlPbigodHRsTWFuYWdlciBhcyBhbnkpLmNhY2hlLCAnY2xlYXInKTtcbiAgICAgIHR0bE1hbmFnZXIuZGVsZXRlKCk7XG4gICAgICBleHBlY3QoKHR0bE1hbmFnZXIgYXMgYW55KS5jYWNoZS5jbGVhcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2FsbCBkZWxldGUgd2hlbiBnaXZlbiBrZXknLCAoKSA9PiB7XG4gICAgICBzcHlPbigodHRsTWFuYWdlciBhcyBhbnkpLmNhY2hlLCAnZGVsZXRlJyk7XG4gICAgICB0dGxNYW5hZ2VyLmRlbGV0ZSgna2V5Jyk7XG4gICAgICBleHBlY3QoKHR0bE1hbmFnZXIgYXMgYW55KS5jYWNoZS5kZWxldGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGRlbGV0ZSBieSByZWdleCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdhYWEnO1xuICAgICAgdHRsTWFuYWdlci5zZXQoa2V5LCB0dGwpO1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCdhYScpO1xuICAgICAgdHRsTWFuYWdlci5kZWxldGUocmVnZXgpO1xuICAgICAgZXhwZWN0KHR0bE1hbmFnZXIuaXNWYWxpZChrZXkpKS50b0JlRmFsc3koKTtcbiAgICB9KTtcbiAgfSlcbn0pO1xuIl0sInZlcnNpb24iOjN9