export function getLocalStorage(key: string): Map<string, any> {
  const storageString = localStorage.getItem(key) || '{}';
  return JSON.parse(storageString);
}
