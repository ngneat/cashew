export function setLocalStorage(key: string, storage: Map<string, any>) {
  const storageObj = Array.from(storage.entries()).reduce((main, [key, value]) => ({ ...main, [key]: value }), {});
  localStorage.setItem(key, JSON.stringify(storageObj));
}
