export const storage = {
  clearItem(key: string) {
    localStorage.removeItem(key);
  },
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key: string): any {
    const value = localStorage.getItem(key);

    if(!value) {
      return undefined;
    }

    return JSON.parse(value);
  }
};
