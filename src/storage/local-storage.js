export const APP_LOCAL_STORAGE_KEY = 'my-keep-data';

export const saveState =(state) => {
  try {
    localStorage.setItem(APP_LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (_e) {
  }
};

export const loadState = () => {
  try {
    const persistedSate = localStorage.getItem(APP_LOCAL_STORAGE_KEY);
    if (persistedSate === null) {
      return undefined;
    }
    return JSON.parse(persistedSate);
  } catch (_e) {
    return undefined;
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem(APP_LOCAL_STORAGE_KEY);
  } catch (_e) {
  }
}
