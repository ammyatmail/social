import * as React from 'react';

export function useLocalStorageSettings<T>(
  storageKey: string,
  defaults: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getLocalStorageSettings = React.useCallback((): T => {
    const storedSettings = localStorage.getItem(storageKey);

    if (!storedSettings) {
      return defaults;
    }

    let parsed = JSON.parse(storedSettings);

    // Merge in defaults for objects
    if (typeof parsed === 'object' && !Array.isArray(parsed)) {
      parsed = Object.assign({}, defaults, parsed);
    }

    return parsed;
  }, [storageKey, defaults]);

  const [settings, setSettings] = React.useState(getLocalStorageSettings());

  // Keep local storage in sync
  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [storageKey, settings]);

  return [settings, setSettings];
}
