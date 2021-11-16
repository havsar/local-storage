/**
 * Test if localStorage API is available
 * From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
 * @returns {boolean}
 */
import { EncryptStorage } from "encrypt-storage"

interface IProxyStorage {
    getItem(key: string): string | null
    setItem(Key: string, value: string): void
    removeItem(key: string): void
}

export class LocalStorageProxy implements IProxyStorage {
    getItem(key: string): string | null {
        return localStorage.getItem(key)
    }

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value)
    }

    removeItem(key: string): void {
        localStorage.removeItem(key)
    }
}

export class EncryptedLocalStorageProxy implements IProxyStorage {
    private encryptStorage = new EncryptStorage("secret-key")

    getItem(key: string) {
        return this.encryptStorage.getItem(key)
    }

    setItem(key: string, value: string): void {
        this.encryptStorage.setItem(key, value)
    }

    removeItem(key: string): void {
        this.encryptStorage.removeItem(key)
    }
}

const proxyStorageFrom = () => new EncryptedLocalStorageProxy()

export const storage = proxyStorageFrom()
