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
fdescribe('HttpCache', function () {
    var dummyClass;
    beforeEach(function () {
        dummyClass = new DummyClass();
    });
    it('should cache the request', function () {
        dummyClass.get().subscribe(function (data) {
            expect(data).toBeTruthy();
        });
        jest.advanceTimersByTime(tick);
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVEZWNvcmF0b3Iuc3BlYy50cyIsIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBMkI7QUFDM0IsNENBQW1DO0FBQ25DLDREQUFnRDtBQUVoRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFFbEI7SUFBQTtJQVdBLENBQUM7SUFSQyx3QkFBRyxHQUFIO1FBQ0UsT0FBTyxZQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsK0JBQVUsR0FBVjtRQUNFLE9BQU8sWUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsY0FBTSxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQVBEO1FBREMsOEJBQVMsRUFBRTs7Ozt5Q0FHWDtJQUdEO1FBREMsOEJBQVMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUM7Ozs7Z0RBR3ZEO0lBQ0gsaUJBQUM7Q0FBQSxBQVhELElBV0M7QUFFRCxTQUFTLENBQUMsV0FBVyxFQUFFO0lBRXJCLElBQUksVUFBc0IsQ0FBQztJQUUzQixVQUFVLENBQUM7UUFDVCxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtRQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFSixDQUFDLENBQUMsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJDOlxcVXNlcnNcXEl0YXlcXHByb2plY3RzXFxvcGVuc291cmNlc1xcaHR0cC1jYWNoZVxccHJvamVjdHNcXG5nbmVhdFxcaHR0cC1jYWNoZVxcc3JjXFxsaWJcXHRlc3RcXGh0dHBDYWNoZURlY29yYXRvci5zcGVjLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dGltZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7SHR0cENhY2hlfSBmcm9tICcuLi9odHRwQ2FjaGVEZWNvcmF0b3InO1xuXG5jb25zdCB0aWNrID0gMTAwMDtcblxuY2xhc3MgRHVtbXlDbGFzcyB7XG5cbiAgQEh0dHBDYWNoZSgpXG4gIGdldCgpIHtcbiAgICByZXR1cm4gdGltZXIodGljaykucGlwZShtYXAoKCkgPT4gKHsgZm9vOiAnYmFyJyB9KSkpO1xuICB9XG5cbiAgQEh0dHBDYWNoZSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiBmYWxzZSB9LCB0aWNrICogMilcbiAgZ2V0V2l0aFRUTCgpIHtcbiAgICByZXR1cm4gdGltZXIodGljaykucGlwZShtYXAoKCkgPT4gKHsgZm9vOiAnYmFyJyB9KSkpO1xuICB9XG59XG5cbmZkZXNjcmliZSgnSHR0cENhY2hlJywgKCkgPT4ge1xuXG4gIGxldCBkdW1teUNsYXNzOiBEdW1teUNsYXNzO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGR1bW15Q2xhc3MgPSBuZXcgRHVtbXlDbGFzcygpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGNhY2hlIHRoZSByZXF1ZXN0JywgKCkgPT4ge1xuICAgIGR1bW15Q2xhc3MuZ2V0KCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgZXhwZWN0KGRhdGEpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgICBqZXN0LmFkdmFuY2VUaW1lcnNCeVRpbWUodGljayk7XG4gIH0pXG5cbn0pO1xuIl0sInZlcnNpb24iOjN9