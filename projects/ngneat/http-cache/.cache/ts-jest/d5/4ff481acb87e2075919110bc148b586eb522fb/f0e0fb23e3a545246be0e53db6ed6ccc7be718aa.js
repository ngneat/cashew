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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVEZWNvcmF0b3Iuc3BlYy50cyIsIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBMkI7QUFDM0IsNENBQW1DO0FBQ25DLDREQUFnRDtBQUVoRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFFbEI7SUFBQTtJQVdBLENBQUM7SUFSQyx3QkFBRyxHQUFIO1FBQ0UsT0FBTyxZQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsK0JBQVUsR0FBVjtRQUNFLE9BQU8sWUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsY0FBTSxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQVBEO1FBREMsOEJBQVMsRUFBRTs7Ozt5Q0FHWDtJQUdEO1FBREMsOEJBQVMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUM7Ozs7Z0RBR3ZEO0lBQ0gsaUJBQUM7Q0FBQSxBQVhELElBV0M7QUFFRCxRQUFRLENBQUMsV0FBVyxFQUFFO0lBRXBCLElBQUksVUFBc0IsQ0FBQztJQUUzQixVQUFVLENBQUM7UUFDVCxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtRQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLHVDQUF1QyxFQUFFO1FBQzNDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3BDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7Z0JBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVKLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSXRheVxccHJvamVjdHNcXG9wZW5zb3VyY2VzXFxodHRwLWNhY2hlXFxwcm9qZWN0c1xcbmduZWF0XFxodHRwLWNhY2hlXFxzcmNcXGxpYlxcdGVzdFxcaHR0cENhY2hlRGVjb3JhdG9yLnNwZWMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt0aW1lcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtIdHRwQ2FjaGV9IGZyb20gJy4uL2h0dHBDYWNoZURlY29yYXRvcic7XG5cbmNvbnN0IHRpY2sgPSAxMDAwO1xuXG5jbGFzcyBEdW1teUNsYXNzIHtcblxuICBASHR0cENhY2hlKClcbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aW1lcih0aWNrKS5waXBlKG1hcCgoKSA9PiAoeyBmb286ICdiYXInIH0pKSk7XG4gIH1cblxuICBASHR0cENhY2hlKHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IGZhbHNlIH0sIHRpY2sgKiAyKVxuICBnZXRXaXRoVFRMKCkge1xuICAgIHJldHVybiB0aW1lcih0aWNrKS5waXBlKG1hcCgoKSA9PiAoeyBmb286ICdiYXInIH0pKSk7XG4gIH1cbn1cblxuZGVzY3JpYmUoJ0h0dHBDYWNoZScsICgpID0+IHtcblxuICBsZXQgZHVtbXlDbGFzczogRHVtbXlDbGFzcztcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBkdW1teUNsYXNzID0gbmV3IER1bW15Q2xhc3MoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBjYWNoZSB0aGUgcmVxdWVzdCcsICgpID0+IHtcbiAgICBkdW1teUNsYXNzLmdldCgpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGR1bW15Q2xhc3MuZ2V0KCkuc3Vic2NyaWJlKGRhdGEyID0+IHtcbiAgICAgICAgZXhwZWN0KGRhdGEpLnRvQmUoZGF0YTIpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgICBqZXN0LmFkdmFuY2VUaW1lcnNCeVRpbWUodGljayk7XG4gIH0pO1xuXG4gIGZpdCgnc2hvdWxkIGJ1c3QgdGhlIGNhY2hlIHdoZW4gdHRsIGFycml2ZScsICgpID0+IHtcbiAgICBkdW1teUNsYXNzLmdldFdpdGhUVEwoKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBqZXN0LmFkdmFuY2VUaW1lcnNCeVRpbWUodGljayAqIDMpO1xuICAgICAgZHVtbXlDbGFzcy5nZXRXaXRoVFRMKCkuc3Vic2NyaWJlKGRhdGEyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSA9PT0gZGF0YTIpO1xuICAgICAgICBleHBlY3QoZGF0YSkubm90LnRvQmUoZGF0YTIpO1xuICAgICAgfSlcbiAgICAgIGplc3QuYWR2YW5jZVRpbWVyc0J5VGltZSh0aWNrKTtcbiAgICB9KTtcbiAgICBqZXN0LmFkdmFuY2VUaW1lcnNCeVRpbWUodGljayk7XG4gIH0pXG5cbn0pO1xuIl0sInZlcnNpb24iOjN9