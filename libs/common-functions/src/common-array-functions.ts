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
