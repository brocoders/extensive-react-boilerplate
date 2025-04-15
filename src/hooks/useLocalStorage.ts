import { useState, useEffect } from "react";

/***************************  HOOKS - LOCAL STORAGE  ***************************/

/**
 * Custom hook to manage localStorage with React state synchronization.
 *
 * This hook provides a convenient way to:
 * - Read an initial value from localStorage (or use a default value if none exists).
 * - Synchronize the value with localStorage whenever it changes.
 * - Listen for changes to the same key in localStorage from other browser tabs or windows.
 *
 * @template ValueType - The type of the stored value.
 * @param {string} key - The key used to store the value in localStorage.
 * @param {ValueType} defaultValue - The default value used if no value exists in localStorage.
 * @returns {[ValueType, (newValue: ValueType | ((currentValue: ValueType) => ValueType)) => void]}
 *   An array with the current value and a function to update it.
 */

export default function useLocalStorage(key: string, defaultValue: unknown) {
  const [value, setValue] = useState(() => {
    const storedValue =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    // Define a listener to update the state when the same key in localStorage changes
    const listener = (e: StorageEvent) => {
      if (
        typeof window !== "undefined" &&
        e.storageArea === localStorage &&
        e.key === key
      ) {
        setValue(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key, defaultValue]);

  // Function to update both the local state and localStorage
  const setValueInLocalStorage = (newValue: (arg0: any) => any) => {
    setValue((currentValue: any) => {
      const result =
        typeof newValue === "function" ? newValue(currentValue) : newValue;
      if (typeof window !== "undefined")
        localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  // Return the current value and the function to update it
  return [value, setValueInLocalStorage];
}
