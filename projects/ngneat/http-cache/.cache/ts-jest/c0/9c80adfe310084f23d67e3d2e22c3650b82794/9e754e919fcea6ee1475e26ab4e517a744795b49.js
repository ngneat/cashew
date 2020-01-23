"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var testing_1 = require("@angular/core/testing");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var httpCacheDecorator_1 = require("../httpCacheDecorator");
var frame = 1000;
var DummyClass = /** @class */ (function () {
    function DummyClass() {
    }
    DummyClass.prototype.get = function () {
        return rxjs_1.timer(frame).pipe(operators_1.map(function () { return ({ foo: 'bar' }); }));
    };
    DummyClass.prototype.getWithTTL = function () {
        return rxjs_1.timer(frame).pipe(operators_1.map(function () { return ({ foo: 'bar' }); }));
    };
    tslib_1.__decorate([
        httpCacheDecorator_1.HttpCache(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], DummyClass.prototype, "get", null);
    tslib_1.__decorate([
        httpCacheDecorator_1.HttpCache({ bufferSize: 1, refCount: false }, frame * 2),
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
    it('should cache the request', testing_1.fakeAsync(function () {
        dummyClass.get().subscribe(function (data) {
            dummyClass.get().subscribe(function (data2) {
                expect(data).toBe(data2);
            });
        });
        testing_1.tick(frame);
    }));
    it('should bust the cache when ttl arrive', testing_1.fakeAsync(function () {
        dummyClass.getWithTTL().pipe(operators_1.delay(frame * 2)).subscribe(function (data) {
            dummyClass.getWithTTL().subscribe(function (data2) {
                expect(data).not.toBe(data2);
                testing_1.tick(frame * 4);
            });
        });
        testing_1.tick(frame * 4);
    }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVEZWNvcmF0b3Iuc3BlYy50cyIsIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBc0Q7QUFDdEQsNkJBQTJCO0FBQzNCLDRDQUEyRDtBQUMzRCw0REFBZ0Q7QUFFaEQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBRW5CO0lBQUE7SUFXQSxDQUFDO0lBUkMsd0JBQUcsR0FBSDtRQUNFLE9BQU8sWUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsY0FBTSxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUdELCtCQUFVLEdBQVY7UUFDRSxPQUFPLFlBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLGNBQU0sT0FBQSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFQRDtRQURDLDhCQUFTLEVBQUU7Ozs7eUNBR1g7SUFHRDtRQURDLDhCQUFTLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O2dEQUd4RDtJQUNILGlCQUFDO0NBQUEsQUFYRCxJQVdDO0FBRUQsUUFBUSxDQUFDLFdBQVcsRUFBRTtJQUVwQixJQUFJLFVBQXNCLENBQUM7SUFFM0IsVUFBVSxDQUFDO1FBQ1QsVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUUsbUJBQVMsQ0FBQztRQUN2QyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0gsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxtQkFBUyxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQzNELFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO2dCQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0IsY0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0gsY0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRU4sQ0FBQyxDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVEZWNvcmF0b3Iuc3BlYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Zha2VBc3luYywgdGlja30gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7dGltZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXAsIHRha2UsIHN3aXRjaE1hcCwgZGVsYXl9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7SHR0cENhY2hlfSBmcm9tICcuLi9odHRwQ2FjaGVEZWNvcmF0b3InO1xuXG5jb25zdCBmcmFtZSA9IDEwMDA7XG5cbmNsYXNzIER1bW15Q2xhc3Mge1xuXG4gIEBIdHRwQ2FjaGUoKVxuICBnZXQoKSB7XG4gICAgcmV0dXJuIHRpbWVyKGZyYW1lKS5waXBlKG1hcCgoKSA9PiAoeyBmb286ICdiYXInIH0pKSk7XG4gIH1cblxuICBASHR0cENhY2hlKHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IGZhbHNlIH0sIGZyYW1lICogMilcbiAgZ2V0V2l0aFRUTCgpIHtcbiAgICByZXR1cm4gdGltZXIoZnJhbWUpLnBpcGUobWFwKCgpID0+ICh7IGZvbzogJ2JhcicgfSkpKTtcbiAgfVxufVxuXG5kZXNjcmliZSgnSHR0cENhY2hlJywgKCkgPT4ge1xuXG4gIGxldCBkdW1teUNsYXNzOiBEdW1teUNsYXNzO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGR1bW15Q2xhc3MgPSBuZXcgRHVtbXlDbGFzcygpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGNhY2hlIHRoZSByZXF1ZXN0JywgZmFrZUFzeW5jKCgpID0+IHtcbiAgICBkdW1teUNsYXNzLmdldCgpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGR1bW15Q2xhc3MuZ2V0KCkuc3Vic2NyaWJlKGRhdGEyID0+IHtcbiAgICAgICAgZXhwZWN0KGRhdGEpLnRvQmUoZGF0YTIpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgICB0aWNrKGZyYW1lKTtcbiAgfSkpO1xuXG4gIGl0KCdzaG91bGQgYnVzdCB0aGUgY2FjaGUgd2hlbiB0dGwgYXJyaXZlJywgZmFrZUFzeW5jKCgpID0+IHtcbiAgICBkdW1teUNsYXNzLmdldFdpdGhUVEwoKS5waXBlKGRlbGF5KGZyYW1lICogMikpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGR1bW15Q2xhc3MuZ2V0V2l0aFRUTCgpLnN1YnNjcmliZShkYXRhMiA9PiB7XG4gICAgICAgIGV4cGVjdChkYXRhKS5ub3QudG9CZShkYXRhMik7XG4gICAgICAgIHRpY2soZnJhbWUgKiA0KTtcbiAgICAgIH0pXG4gICAgfSk7XG4gICAgdGljayhmcmFtZSAqIDQpO1xuICB9KSk7XG5cbn0pO1xuIl0sInZlcnNpb24iOjN9