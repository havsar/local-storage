"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const local_storage_events_1 = require("./local-storage-events");
const storage_1 = require("./storage");
const react_1 = require("react");
/**
 * This exists for trying to serialize the value back to JSON.
 * If it cannot serialize it, then it was a string value given.
 *
 * @param value the value you wish to try to parse
 */
function tryParse(value) {
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
}
function useLocalStorage(key, defaultValue = null) {
    const [localState, updateLocalState] = (0, react_1.useState)(storage_1.storage.getItem(key) === null
        ? defaultValue
        : tryParse(storage_1.storage.getItem(key)));
    const onLocalStorageChange = (event) => {
        // An event value can be of TValue when `localStorage.setItem` is called, or null when
        // `localStorage.removeItem` is called.
        if ((0, local_storage_events_1.isTypeOfLocalStorageChanged)(event)) {
            if (event.detail.key === key) {
                updateLocalState(event.detail.value);
            }
        }
        else {
            if (event.key === key) {
                updateLocalState(event.newValue === null ? null : tryParse(event.newValue));
            }
        }
    };
    (0, react_1.useEffect)(() => {
        // The custom storage event allows us to update our component
        // when a change occurs in localStorage outside of our component
        const listener = (e) => onLocalStorageChange(e);
        window.addEventListener(local_storage_events_1.LocalStorageChanged.eventName, listener);
        // The storage event only works in the context of other documents (eg. other browser tabs)
        window.addEventListener("storage", listener);
        // Write default value to the local storage if there currently isn't any value there.
        // Don't however write a defaultValue that is null otherwise it'll trigger infinite updates.
        if (storage_1.storage.getItem(key) === null && defaultValue !== null) {
            (0, local_storage_events_1.writeStorage)(key, defaultValue);
        }
        return () => {
            window.removeEventListener(local_storage_events_1.LocalStorageChanged.eventName, listener);
            window.removeEventListener("storage", listener);
        };
    }, [key]);
    const writeState = (0, react_1.useCallback)((value) => (0, local_storage_events_1.writeStorage)(key, value), [key]);
    const deleteState = (0, react_1.useCallback)(() => (0, local_storage_events_1.deleteFromStorage)(key), [key]);
    const state = localState !== null && localState !== void 0 ? localState : defaultValue;
    return [state, writeState, deleteState];
}
exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=use-localstorage.js.map