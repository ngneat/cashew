export function getLocalStorage(key: string): Map<string, any> {
  const storageString = localStorage.getItem(key) || '{}';
  const storage = JSON.parse(storageString);
  return new Map(
    Object.keys(storage).map<[string, any]>(key => [key, storage[key]])
  );
}
