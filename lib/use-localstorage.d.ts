export declare type LocalStorageNullableReturnValue<TValue> = [
    TValue | null,
    (newValue: TValue | null) => void,
    () => void
];
export declare type LocalStorageReturnValue<TValue> = [
    TValue,
    (newValue: TValue | null) => void,
    () => void
];
/**
 * React hook to enable updates to state via localStorage.
 * This updates when the {writeStorage} function is used, when the returned function
 * is called, or when the "storage" event is fired from another tab in the browser.
 * This function takes an optional default value to start off with.
 *
 * @example
 * ```js
 * const MyComponent = () => {
 *   const [myStoredItem, setMyStoredItem] = useLocalStorage('myStoredItem');
 *   return (
 *     <p>{myStoredItem}</p>
 *   );
 * };
 * ```
 *
 * @export
 * @template TValue The type of the given default value.
 * @param {string} key The key in the localStorage that you wish to watch.
 * @param {TValue} defaultValue Optional default value to start with.
 * @returns {[TValue | null, Dispatch<TValue>, Dispatch<void>]} An array containing the value
 * associated with the key in position 0, a function to set the value in position 1,
 * and a function to delete the value from localStorage in position 2.
 */
export declare function useLocalStorage<TValue = string>(key: string): LocalStorageNullableReturnValue<TValue>;
export declare function useLocalStorage<TValue = string>(key: string, defaultValue: TValue): LocalStorageReturnValue<TValue>;
//# sourceMappingURL=use-localstorage.d.ts.map