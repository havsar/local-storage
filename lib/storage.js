"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.EncryptedLocalStorageProxy = exports.LocalStorageProxy = void 0;
/**
 * Test if localStorage API is available
 * From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
 * @returns {boolean}
 */
var encrypt_storage_1 = require("encrypt-storage");
var LocalStorageProxy = /** @class */ (function () {
    function LocalStorageProxy() {
    }
    LocalStorageProxy.prototype.getItem = function (key) {
        return localStorage.getItem(key);
    };
    LocalStorageProxy.prototype.setItem = function (key, value) {
        localStorage.setItem(key, value);
    };
    LocalStorageProxy.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    return LocalStorageProxy;
}());
exports.LocalStorageProxy = LocalStorageProxy;
var EncryptedLocalStorageProxy = /** @class */ (function () {
    function EncryptedLocalStorageProxy() {
        this.encryptStorage = new encrypt_storage_1.EncryptStorage("secret-key");
    }
    EncryptedLocalStorageProxy.prototype.getItem = function (key) {
        return this.encryptStorage.getItem(key);
    };
    EncryptedLocalStorageProxy.prototype.setItem = function (key, value) {
        this.encryptStorage.setItem(key, value);
    };
    EncryptedLocalStorageProxy.prototype.removeItem = function (key) {
        this.encryptStorage.removeItem(key);
    };
    return EncryptedLocalStorageProxy;
}());
exports.EncryptedLocalStorageProxy = EncryptedLocalStorageProxy;
var proxyStorageFrom = function () { return new EncryptedLocalStorageProxy(); };
exports.storage = proxyStorageFrom();
//# sourceMappingURL=storage.js.map