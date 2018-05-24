/**
 * Is array empty?
 */
export function isArrayEmpty(array: any[]): boolean {
  return array.length === 0;
}

/**
 * Does array contain at least one item?
 */
export function isArrayNotEmpty(array: any[]): boolean {
  return array.length > 0;
}

/**
 * Returns the last item in an array
 */
export function getLastItemInArray(array: any[]) {
  return array[array.length - 1];
}

export function groupBy<T, U>(list: T[], keyGetter: (a: T) => U): Map<U, T[]> {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
