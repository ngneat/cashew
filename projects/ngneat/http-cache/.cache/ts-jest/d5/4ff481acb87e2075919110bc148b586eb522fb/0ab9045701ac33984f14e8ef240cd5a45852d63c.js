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
        expect.hasAssertions();
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
            jest.advanceTimersByTime(tick * 3);
            dummyClass.getWithTTL().subscribe(function (data2) {
                console.log(data === data2);
                expect(data).not.toBe(data2);
            });
            jest.advanceTimersByTime(tick);
        });
        jest.advanceTimersByTime(tick);
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVEZWNvcmF0b3Iuc3BlYy50cyIsIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBMkI7QUFDM0IsNENBQW1DO0FBQ25DLDREQUFnRDtBQUVoRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFFbEI7SUFBQTtJQVdBLENBQUM7SUFSQyx3QkFBRyxHQUFIO1FBQ0UsT0FBTyxZQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsK0JBQVUsR0FBVjtRQUNFLE9BQU8sWUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsY0FBTSxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQVBEO1FBREMsOEJBQVMsRUFBRTs7Ozt5Q0FHWDtJQUdEO1FBREMsOEJBQVMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUM7Ozs7Z0RBR3ZEO0lBQ0gsaUJBQUM7Q0FBQSxBQVhELElBV0M7QUFFRCxRQUFRLENBQUMsV0FBVyxFQUFFO0lBRXBCLElBQUksVUFBc0IsQ0FBQztJQUUzQixVQUFVLENBQUM7UUFDVCxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM3QixNQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUU7UUFDN0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDN0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7Z0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRTtRQUMzQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNwQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25DLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO2dCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFSixDQUFDLENBQUMsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJDOlxcVXNlcnNcXEl0YXlcXHByb2plY3RzXFxvcGVuc291cmNlc1xcaHR0cC1jYWNoZVxccHJvamVjdHNcXG5nbmVhdFxcaHR0cC1jYWNoZVxcc3JjXFxsaWJcXHRlc3RcXGh0dHBDYWNoZURlY29yYXRvci5zcGVjLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dGltZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7SHR0cENhY2hlfSBmcm9tICcuLi9odHRwQ2FjaGVEZWNvcmF0b3InO1xuXG5jb25zdCB0aWNrID0gMTAwMDtcblxuY2xhc3MgRHVtbXlDbGFzcyB7XG5cbiAgQEh0dHBDYWNoZSgpXG4gIGdldCgpIHtcbiAgICByZXR1cm4gdGltZXIodGljaykucGlwZShtYXAoKCkgPT4gKHsgZm9vOiAnYmFyJyB9KSkpO1xuICB9XG5cbiAgQEh0dHBDYWNoZSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiBmYWxzZSB9LCB0aWNrICogMilcbiAgZ2V0V2l0aFRUTCgpIHtcbiAgICByZXR1cm4gdGltZXIodGljaykucGlwZShtYXAoKCkgPT4gKHsgZm9vOiAnYmFyJyB9KSkpO1xuICB9XG59XG5cbmRlc2NyaWJlKCdIdHRwQ2FjaGUnLCAoKSA9PiB7XG5cbiAgbGV0IGR1bW15Q2xhc3M6IER1bW15Q2xhc3M7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgZHVtbXlDbGFzcyA9IG5ldyBEdW1teUNsYXNzKCk7XG4gICAgKGV4cGVjdCBhcyBhbnkpLmhhc0Fzc2VydGlvbnMoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBjYWNoZSB0aGUgcmVxdWVzdCcsICgpID0+IHtcbiAgICBkdW1teUNsYXNzLmdldCgpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGR1bW15Q2xhc3MuZ2V0KCkuc3Vic2NyaWJlKGRhdGEyID0+IHtcbiAgICAgICAgZXhwZWN0KGRhdGEpLnRvQmUoZGF0YTIpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgICBqZXN0LmFkdmFuY2VUaW1lcnNCeVRpbWUodGljayk7XG4gIH0pO1xuXG4gIGZpdCgnc2hvdWxkIGJ1c3QgdGhlIGNhY2hlIHdoZW4gdHRsIGFycml2ZScsICgpID0+IHtcbiAgICBkdW1teUNsYXNzLmdldFdpdGhUVEwoKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBqZXN0LmFkdmFuY2VUaW1lcnNCeVRpbWUodGljayAqIDMpO1xuICAgICAgZHVtbXlDbGFzcy5nZXRXaXRoVFRMKCkuc3Vic2NyaWJlKGRhdGEyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSA9PT0gZGF0YTIpO1xuICAgICAgICBleHBlY3QoZGF0YSkubm90LnRvQmUoZGF0YTIpO1xuICAgICAgfSlcbiAgICAgIGplc3QuYWR2YW5jZVRpbWVyc0J5VGltZSh0aWNrKTtcbiAgICB9KTtcbiAgICBqZXN0LmFkdmFuY2VUaW1lcnNCeVRpbWUodGljayk7XG4gIH0pXG5cbn0pO1xuIl0sInZlcnNpb24iOjN9