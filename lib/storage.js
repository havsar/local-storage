"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.storage =
    exports.EncryptedLocalStorageProxy =
    exports.LocalStorageProxy =
        void 0
/**
 * Test if localStorage API is available
 * From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
 * @returns {boolean}
 */
const encrypt_storage_1 = require("encrypt-storage")
class LocalStorageProxy {
    getItem(key) {
        return localStorage.getItem(key)
    }
    setItem(key, value) {
        localStorage.setItem(key, value)
    }
    removeItem(key) {
        localStorage.removeItem(key)
    }
}
exports.LocalStorageProxy = LocalStorageProxy
class EncryptedLocalStorageProxy {
    constructor() {
        this.encryptStorage = new encrypt_storage_1.EncryptStorage("__esModule")
    }
    getItem(key) {
        return this.encryptStorage.getItem(key)
    }
    setItem(key, value) {
        this.encryptStorage.setItem(key, value)
    }
    removeItem(key) {
        this.encryptStorage.removeItem(key)
    }
}
exports.EncryptedLocalStorageProxy = EncryptedLocalStorageProxy
const proxyStorageFrom = () => new EncryptedLocalStorageProxy()
exports.storage = proxyStorageFrom()
//# sourceMappingURL=storage.js.map
