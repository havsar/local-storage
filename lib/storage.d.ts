interface IProxyStorage {
    getItem(key: string): string | null;
    setItem(Key: string, value: string): void;
    removeItem(key: string): void;
}
export declare class LocalStorageProxy implements IProxyStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
export declare class EncryptedLocalStorageProxy implements IProxyStorage {
    private encryptStorage;
    getItem(key: string): any;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
export declare const storage: EncryptedLocalStorageProxy;
export {};
//# sourceMappingURL=storage.d.ts.map