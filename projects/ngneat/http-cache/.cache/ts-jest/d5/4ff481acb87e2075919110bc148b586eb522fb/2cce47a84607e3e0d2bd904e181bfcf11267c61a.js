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
            dummyClass.get().subscribe(function (data2) {
                expect(data).toBe(data2);
            });
        });
        jest.advanceTimersByTime(tick);
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVEZWNvcmF0b3Iuc3BlYy50cyIsIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBMkI7QUFDM0IsNENBQW1DO0FBQ25DLDREQUFnRDtBQUVoRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFFbEI7SUFBQTtJQVdBLENBQUM7SUFSQyx3QkFBRyxHQUFIO1FBQ0UsT0FBTyxZQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsK0JBQVUsR0FBVjtRQUNFLE9BQU8sWUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsY0FBTSxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQVBEO1FBREMsOEJBQVMsRUFBRTs7Ozt5Q0FHWDtJQUdEO1FBREMsOEJBQVMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUM7Ozs7Z0RBR3ZEO0lBQ0gsaUJBQUM7Q0FBQSxBQVhELElBV0M7QUFFRCxTQUFTLENBQUMsV0FBVyxFQUFFO0lBRXJCLElBQUksVUFBc0IsQ0FBQztJQUUzQixVQUFVLENBQUM7UUFDVCxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtRQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUosQ0FBQyxDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVEZWNvcmF0b3Iuc3BlYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3RpbWVyfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0h0dHBDYWNoZX0gZnJvbSAnLi4vaHR0cENhY2hlRGVjb3JhdG9yJztcblxuY29uc3QgdGljayA9IDEwMDA7XG5cbmNsYXNzIER1bW15Q2xhc3Mge1xuXG4gIEBIdHRwQ2FjaGUoKVxuICBnZXQoKSB7XG4gICAgcmV0dXJuIHRpbWVyKHRpY2spLnBpcGUobWFwKCgpID0+ICh7IGZvbzogJ2JhcicgfSkpKTtcbiAgfVxuXG4gIEBIdHRwQ2FjaGUoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSwgdGljayAqIDIpXG4gIGdldFdpdGhUVEwoKSB7XG4gICAgcmV0dXJuIHRpbWVyKHRpY2spLnBpcGUobWFwKCgpID0+ICh7IGZvbzogJ2JhcicgfSkpKTtcbiAgfVxufVxuXG5mZGVzY3JpYmUoJ0h0dHBDYWNoZScsICgpID0+IHtcblxuICBsZXQgZHVtbXlDbGFzczogRHVtbXlDbGFzcztcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBkdW1teUNsYXNzID0gbmV3IER1bW15Q2xhc3MoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBjYWNoZSB0aGUgcmVxdWVzdCcsICgpID0+IHtcbiAgICBkdW1teUNsYXNzLmdldCgpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGR1bW15Q2xhc3MuZ2V0KCkuc3Vic2NyaWJlKGRhdGEyID0+IHtcbiAgICAgICAgZXhwZWN0KGRhdGEpLnRvQmUoZGF0YTIpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgICBqZXN0LmFkdmFuY2VUaW1lcnNCeVRpbWUodGljayk7XG4gIH0pXG5cbn0pO1xuIl0sInZlcnNpb24iOjN9