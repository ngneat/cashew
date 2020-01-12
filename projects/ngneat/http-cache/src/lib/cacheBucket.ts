export class CacheBucket {
  private keys = new Set();

  add(key: string) {
    this.keys.add(key);
  }

  has(key: string) {
    return this.keys.has(key);
  }

  forEach(cb) {
    this.keys.forEach(cb);
  }

  delete(key: string) {
    this.keys.delete(key);
  }

  clear() {
    this.keys.clear();
  }
}
