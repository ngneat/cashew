export declare class CacheBucket {
    private keys;
    add(key: string): void;
    has(key: string): boolean;
    forEach(cb: any): void;
    delete(key: string): void;
    clear(): void;
}
