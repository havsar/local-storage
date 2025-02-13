"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromStorage = exports.writeStorage = exports.isTypeOfLocalStorageChanged = exports.LocalStorageChanged = void 0;
const storage_1 = require("./storage");
(() => {
    if (typeof global.window === "undefined") {
        global.window = {};
    }
    if (typeof global.window.CustomEvent === "function") {
        return;
    }
    function CustomEvent(typeArg, params = { bubbles: false, cancelable: false }) {
        var _a, _b;
        const evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(typeArg, (_a = params === null || params === void 0 ? void 0 : params.bubbles) !== null && _a !== void 0 ? _a : false, (_b = params === null || params === void 0 ? void 0 : params.cancelable) !== null && _b !== void 0 ? _b : false, params === null || params === void 0 ? void 0 : params.detail);
        return evt;
    }
    window.CustomEvent = CustomEvent;
})();
/**
 * Used for creating new events for LocalStorage. This enables us to
 * have the ability of updating the LocalStorage from outside of the component,
 * but still update the component without prop drilling or creating a dependency
 * on a large library such as Redux.
 */
class LocalStorageChanged extends CustomEvent {
    constructor(payload) {
        super(LocalStorageChanged.eventName, { detail: payload });
    }
}
exports.LocalStorageChanged = LocalStorageChanged;
LocalStorageChanged.eventName = "onLocalStorageChange";
/**
 * Checks if the event that is passed in is the same type as LocalStorageChanged.
 *
 * @export
 * @template TValue
 * @param {*} evt the object you wish to assert as a LocalStorageChanged event.
 * @returns {evt is LocalStorageChanged<TValue>} if true, evt is asserted to be LocalStorageChanged.
 */
function isTypeOfLocalStorageChanged(evt) {
    return !!evt && evt.type === LocalStorageChanged.eventName;
}
exports.isTypeOfLocalStorageChanged = isTypeOfLocalStorageChanged;
/**
 * Use this instead of directly using localStorage.setItem
 * in order to correctly send events within the same window.
 *
 * @example
 * ```js
 * writeStorage('hello', JSON.stringify({ name: 'world' }));
 * const { name } = JSON.parse(localStorage.getItem('hello'));
 * ```
 *
 * @export
 * @param {string} key The key to write to in the localStorage.
 * @param {string} value The value to write to in the localStorage.
 */
function writeStorage(key, value) {
    try {
        storage_1.storage.setItem(key, typeof value === "object" ? JSON.stringify(value) : `${value}`);
        window.dispatchEvent(new LocalStorageChanged({ key, value }));
    }
    catch (err) {
        if (err instanceof TypeError &&
            err.message.includes("circular structure")) {
            throw new TypeError("The object that was given to the writeStorage function has circular references.\n" +
                "For more information, check here: " +
                "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value");
        }
        throw err;
    }
}
exports.writeStorage = writeStorage;
/**
 * Use this function to delete a value from localStorage.
 *
 * After calling this function, the localStorage value will be null.
 *
 * @example
 * ```js
 * const user = { name: 'John', email: 'John@fakemail.com' };
 *
 * // Add a user to your localStorage
 * writeStorage('user', JSON.stringify(user));
 *
 * // This will also trigger an update to the state of your component
 * deleteFromStorage('user');
 *
 * localStorage.getItem('user') === null // ✔ This is now null
 * ```
 *
 * @export
 * @param {string} key The key of the item you wish to delete from localStorage.
 */
function deleteFromStorage(key) {
    storage_1.storage.removeItem(key);
    window.dispatchEvent(new LocalStorageChanged({ key, value: null }));
}
exports.deleteFromStorage = deleteFromStorage;
//# sourceMappingURL=local-storage-events.js.map