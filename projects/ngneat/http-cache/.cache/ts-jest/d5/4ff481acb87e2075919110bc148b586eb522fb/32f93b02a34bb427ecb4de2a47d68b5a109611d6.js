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
            expect(data).toBeTruthy();
        });
        testing_1.tick(frame);
    }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVEZWNvcmF0b3Iuc3BlYy50cyIsIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBc0Q7QUFDdEQsNkJBQTJCO0FBQzNCLDRDQUFtQztBQUNuQyw0REFBZ0Q7QUFFaEQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBRW5CO0lBQUE7SUFXQSxDQUFDO0lBUkMsd0JBQUcsR0FBSDtRQUNFLE9BQU8sWUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsY0FBTSxPQUFBLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUdELCtCQUFVLEdBQVY7UUFDRSxPQUFPLFlBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLGNBQU0sT0FBQSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFQRDtRQURDLDhCQUFTLEVBQUU7Ozs7eUNBR1g7SUFHRDtRQURDLDhCQUFTLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O2dEQUd4RDtJQUNILGlCQUFDO0NBQUEsQUFYRCxJQVdDO0FBRUQsUUFBUSxDQUFDLFdBQVcsRUFBRTtJQUVwQixJQUFJLFVBQXNCLENBQUM7SUFFM0IsVUFBVSxDQUFDO1FBQ1QsVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUUsbUJBQVMsQ0FBQztRQUN2QyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxjQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBRUwsQ0FBQyxDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0ZXN0XFxodHRwQ2FjaGVEZWNvcmF0b3Iuc3BlYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Zha2VBc3luYywgdGlja30gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7dGltZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7SHR0cENhY2hlfSBmcm9tICcuLi9odHRwQ2FjaGVEZWNvcmF0b3InO1xuXG5jb25zdCBmcmFtZSA9IDEwMDA7XG5cbmNsYXNzIER1bW15Q2xhc3Mge1xuXG4gIEBIdHRwQ2FjaGUoKVxuICBnZXQoKSB7XG4gICAgcmV0dXJuIHRpbWVyKGZyYW1lKS5waXBlKG1hcCgoKSA9PiAoeyBmb286ICdiYXInIH0pKSk7XG4gIH1cblxuICBASHR0cENhY2hlKHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IGZhbHNlIH0sIGZyYW1lICogMilcbiAgZ2V0V2l0aFRUTCgpIHtcbiAgICByZXR1cm4gdGltZXIoZnJhbWUpLnBpcGUobWFwKCgpID0+ICh7IGZvbzogJ2JhcicgfSkpKTtcbiAgfVxufVxuXG5kZXNjcmliZSgnSHR0cENhY2hlJywgKCkgPT4ge1xuXG4gIGxldCBkdW1teUNsYXNzOiBEdW1teUNsYXNzO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGR1bW15Q2xhc3MgPSBuZXcgRHVtbXlDbGFzcygpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGNhY2hlIHRoZSByZXF1ZXN0JywgZmFrZUFzeW5jKCgpID0+IHtcbiAgICBkdW1teUNsYXNzLmdldCgpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGV4cGVjdChkYXRhKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gICAgdGljayhmcmFtZSk7XG4gIH0pKVxuXG59KTtcbiJdLCJ2ZXJzaW9uIjozfQ==