export function deleteByRegex(pattern: RegExp, cache: Map<any, any>) {
  for (const [key] of Array.from(cache)) {
    if ((pattern as RegExp).test(key)) {
      cache.delete(key);
      break;
    }
  }
}
