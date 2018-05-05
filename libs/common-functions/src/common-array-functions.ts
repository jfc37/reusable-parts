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
