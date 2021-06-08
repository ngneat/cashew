export function setCacheInStorage(key: string, storage: Map<string, any>) {
  localStorage.setItem(key, JSON.stringify(mapToObj(storage)));
}

export function getStorageCache(key: string): Map<string, any> {
  const storage = JSON.parse(localStorage.getItem(key) || '{}');
  const map = new Map();
  Object.keys(storage).forEach(key => map.set(key, storage[key]));

  return map;
}

export function clearStorageCache(key: string) {
  localStorage.removeItem(key);
}

function mapToObj(map: Map<any, any>) {
  return Array.from(map).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {} as Record<any, any>);
}
