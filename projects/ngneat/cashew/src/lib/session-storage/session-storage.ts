export const storage = {
  clearItem(key: string) {
    sessionStorage.removeItem(key);
  },
  setItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key: string): any {
    const value = sessionStorage.getItem(key);

    if (!value) {
      return undefined;
    }

    return JSON.parse(value);
  }
};
