"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CacheBucket = /** @class */ (function () {
    function CacheBucket() {
        this.keys = new Set();
    }
    CacheBucket.prototype.add = function (key) {
        this.keys.add(key);
    };
    CacheBucket.prototype.has = function (key) {
        return this.keys.has(key);
    };
    CacheBucket.prototype.forEach = function (cb) {
        this.keys.forEach(cb);
    };
    CacheBucket.prototype.delete = function (key) {
        this.keys.delete(key);
    };
    CacheBucket.prototype.clear = function () {
        this.keys.clear();
    };
    return CacheBucket;
}());
exports.CacheBucket = CacheBucket;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFxjYWNoZUJ1Y2tldC50cyIsIm1hcHBpbmdzIjoiOztBQUFBO0lBQUE7UUFDVSxTQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQXFCM0IsQ0FBQztJQW5CQyx5QkFBRyxHQUFILFVBQUksR0FBVztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCx5QkFBRyxHQUFILFVBQUksR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxFQUFFO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxHQUFXO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCwyQkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBdEJZLGtDQUFXIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSXRheVxccHJvamVjdHNcXG9wZW5zb3VyY2VzXFxodHRwLWNhY2hlXFxwcm9qZWN0c1xcbmduZWF0XFxodHRwLWNhY2hlXFxzcmNcXGxpYlxcY2FjaGVCdWNrZXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENhY2hlQnVja2V0IHtcbiAgcHJpdmF0ZSBrZXlzID0gbmV3IFNldCgpO1xuXG4gIGFkZChrZXk6IHN0cmluZykge1xuICAgIHRoaXMua2V5cy5hZGQoa2V5KTtcbiAgfVxuXG4gIGhhcyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmtleXMuaGFzKGtleSk7XG4gIH1cblxuICBmb3JFYWNoKGNiKSB7XG4gICAgdGhpcy5rZXlzLmZvckVhY2goY2IpO1xuICB9XG5cbiAgZGVsZXRlKGtleTogc3RyaW5nKSB7XG4gICAgdGhpcy5rZXlzLmRlbGV0ZShrZXkpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5rZXlzLmNsZWFyKCk7XG4gIH1cbn1cbiJdLCJ2ZXJzaW9uIjozfQ==