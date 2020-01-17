"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var httpCacheDecorator_1 = require("../httpCacheDecorator");
var tick = 1000;
var DummyClass = /** @class */ (function () {
    function DummyClass() {
    }
    DummyClass.prototype.get = function () {
        return rxjs_1.timer(tick).pipe(operators_1.map(function () { return ({ foo: 'bar' }); }));
    };
    DummyClass.prototype.getWithTTL = function () {
        return rxjs_1.timer(tick).pipe(operators_1.map(function () { return ({ foo: 'bar' }); }));
    };
    tslib_1.__decorate([
        httpCacheDecorator_1.HttpCache(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], DummyClass.prototype, "get", null);
    tslib_1.__decorate([
        httpCacheDecorator_1.HttpCache({ bufferSize: 1, refCount: false }, tick * 2),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], DummyClass.prototype, "getWithTTL", null);
    return DummyClass;
}());
describe('HttpCache', function () {
    var dummyClass;
    beforeEach(function () {
        dummyClass = new DummyClass();
    });
    it('should cache the request', function () {
        dummyClass.get().subscribe(function (data) {
            dummyClass.get().subscribe(function (data2) {
                expect(data).toBe(data2);
            });
        });
        jest.advanceTimersByTime(tick);
    });
    fit('should bust the cache when ttl arrive', function () {
        dummyClass.getWithTTL().subscribe(function (data) {
            dummyClass.getWithTTL().subscribe(function (data2) {
                console.log(data === data2);
                expect(data).not.toBe(data2);
            });
        });
        jest.advanceTimersByTime(tick * 4);
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVEZWNvcmF0b3Iuc3BlYy50cyIsIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBMkI7QUFDM0IsNENBQW1DO0FBQ25DLDREQUFnRDtBQUVoRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFFbEI7SUFBQTtJQVdBLENBQUM7SUFSQyx3QkFBRyxHQUFIO1FBQ0UsT0FBTyxZQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsK0JBQVUsR0FBVjtRQUNFLE9BQU8sWUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsY0FBTSxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQVBEO1FBREMsOEJBQVMsRUFBRTs7Ozt5Q0FHWDtJQUdEO1FBREMsOEJBQVMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUM7Ozs7Z0RBR3ZEO0lBQ0gsaUJBQUM7Q0FBQSxBQVhELElBV0M7QUFFRCxRQUFRLENBQUMsV0FBVyxFQUFFO0lBRXBCLElBQUksVUFBc0IsQ0FBQztJQUUzQixVQUFVLENBQUM7UUFDVCxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtRQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLHVDQUF1QyxFQUFFO1FBQzNDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3BDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO2dCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUE7QUFFSixDQUFDLENBQUMsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJDOlxcVXNlcnNcXEl0YXlcXHByb2plY3RzXFxvcGVuc291cmNlc1xcaHR0cC1jYWNoZVxccHJvamVjdHNcXG5nbmVhdFxcaHR0cC1jYWNoZVxcc3JjXFxsaWJcXHRlc3RcXGh0dHBDYWNoZURlY29yYXRvci5zcGVjLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dGltZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7SHR0cENhY2hlfSBmcm9tICcuLi9odHRwQ2FjaGVEZWNvcmF0b3InO1xuXG5jb25zdCB0aWNrID0gMTAwMDtcblxuY2xhc3MgRHVtbXlDbGFzcyB7XG5cbiAgQEh0dHBDYWNoZSgpXG4gIGdldCgpIHtcbiAgICByZXR1cm4gdGltZXIodGljaykucGlwZShtYXAoKCkgPT4gKHsgZm9vOiAnYmFyJyB9KSkpO1xuICB9XG5cbiAgQEh0dHBDYWNoZSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiBmYWxzZSB9LCB0aWNrICogMilcbiAgZ2V0V2l0aFRUTCgpIHtcbiAgICByZXR1cm4gdGltZXIodGljaykucGlwZShtYXAoKCkgPT4gKHsgZm9vOiAnYmFyJyB9KSkpO1xuICB9XG59XG5cbmRlc2NyaWJlKCdIdHRwQ2FjaGUnLCAoKSA9PiB7XG5cbiAgbGV0IGR1bW15Q2xhc3M6IER1bW15Q2xhc3M7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgZHVtbXlDbGFzcyA9IG5ldyBEdW1teUNsYXNzKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgY2FjaGUgdGhlIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgZHVtbXlDbGFzcy5nZXQoKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBkdW1teUNsYXNzLmdldCgpLnN1YnNjcmliZShkYXRhMiA9PiB7XG4gICAgICAgIGV4cGVjdChkYXRhKS50b0JlKGRhdGEyKTtcbiAgICAgIH0pXG4gICAgfSk7XG4gICAgamVzdC5hZHZhbmNlVGltZXJzQnlUaW1lKHRpY2spO1xuICB9KTtcblxuICBmaXQoJ3Nob3VsZCBidXN0IHRoZSBjYWNoZSB3aGVuIHR0bCBhcnJpdmUnLCAoKSA9PiB7XG4gICAgZHVtbXlDbGFzcy5nZXRXaXRoVFRMKCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgZHVtbXlDbGFzcy5nZXRXaXRoVFRMKCkuc3Vic2NyaWJlKGRhdGEyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSA9PT0gZGF0YTIpO1xuICAgICAgICBleHBlY3QoZGF0YSkubm90LnRvQmUoZGF0YTIpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgICBqZXN0LmFkdmFuY2VUaW1lcnNCeVRpbWUodGljayAqIDQpO1xuICB9KVxuXG59KTtcbiJdLCJ2ZXJzaW9uIjozfQ==