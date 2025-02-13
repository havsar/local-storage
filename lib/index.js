"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = exports.LocalStorageChanged = exports.deleteFromStorage = exports.writeStorage = void 0;
const use_localstorage_1 = require("./use-localstorage");
Object.defineProperty(exports, "useLocalStorage", { enumerable: true, get: function () { return use_localstorage_1.useLocalStorage; } });
var local_storage_events_1 = require("./local-storage-events");
Object.defineProperty(exports, "writeStorage", { enumerable: true, get: function () { return local_storage_events_1.writeStorage; } });
Object.defineProperty(exports, "deleteFromStorage", { enumerable: true, get: function () { return local_storage_events_1.deleteFromStorage; } });
Object.defineProperty(exports, "LocalStorageChanged", { enumerable: true, get: function () { return local_storage_events_1.LocalStorageChanged; } });
exports.default = use_localstorage_1.useLocalStorage;
//# sourceMappingURL=index.js.map