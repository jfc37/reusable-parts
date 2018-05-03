/**
 * Are all arguments falsy?
 */
export function areAllArgumentsFalsy(...args) {
  return args.every(arg => !arg);
}
