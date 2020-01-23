"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var KeySerializer = /** @class */ (function () {
    function KeySerializer() {
    }
    return KeySerializer;
}());
exports.KeySerializer = KeySerializer;
var DefaultKeySerializer = /** @class */ (function (_super) {
    tslib_1.__extends(DefaultKeySerializer, _super);
    function DefaultKeySerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultKeySerializer.prototype.serialize = function (request) {
        return request.customKey || request.urlWithParams;
    };
    return DefaultKeySerializer;
}(KeySerializer));
exports.DefaultKeySerializer = DefaultKeySerializer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFxrZXlTZXJpYWxpemVyLnRzIiwibWFwcGluZ3MiOiI7OztBQUVBO0lBQUE7SUFFQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZxQixzQ0FBYTtBQUluQztJQUEwQyxnREFBYTtJQUF2RDs7SUFJQSxDQUFDO0lBSEMsd0NBQVMsR0FBVCxVQUFVLE9BQXlCO1FBQ2pDLE9BQU8sT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3BELENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFKRCxDQUEwQyxhQUFhLEdBSXREO0FBSlksb0RBQW9CIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSXRheVxccHJvamVjdHNcXG9wZW5zb3VyY2VzXFxodHRwLWNhY2hlXFxwcm9qZWN0c1xcbmduZWF0XFxodHRwLWNhY2hlXFxzcmNcXGxpYlxca2V5U2VyaWFsaXplci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2FjaGVSZXF1ZXN0IH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBLZXlTZXJpYWxpemVyIHtcbiAgYWJzdHJhY3Qgc2VyaWFsaXplKHJlcXVlc3Q6IEh0dHBDYWNoZVJlcXVlc3QpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0S2V5U2VyaWFsaXplciBleHRlbmRzIEtleVNlcmlhbGl6ZXIge1xuICBzZXJpYWxpemUocmVxdWVzdDogSHR0cENhY2hlUmVxdWVzdCkge1xuICAgIHJldHVybiByZXF1ZXN0LmN1c3RvbUtleSB8fCByZXF1ZXN0LnVybFdpdGhQYXJhbXM7XG4gIH1cbn1cbiJdLCJ2ZXJzaW9uIjozfQ==