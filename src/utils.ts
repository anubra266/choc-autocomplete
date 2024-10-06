import { Dict } from "src/types";

export function getFirstItem<T>(array: T[]): T | undefined {
  return array?.[0];
}

export function getLastItem<T>(array: T[]): T | undefined {
  return array?.length ? array[array.length - 1] : undefined;
}

/**
 * Get the next index based on the current index and step.
 *
 * @param currentIndex - The current index.
 * @param length - The total length or count of items.
 * @param step - The number of steps to move (positive or negative).
 * @param loop - Whether to loop around when the index exceeds boundaries.
 */
export function getNextIndex(
  currentIndex: number,
  length: number,
  step = 1,
  loop = true
): number {
  if (length === 0) return -1;

  let nextIndex = currentIndex + step;

  if (currentIndex === -1) {
    nextIndex = step > 0 ? 0 : length - 1;
  }

  if (loop) {
    nextIndex = ((nextIndex % length) + length) % length;
  } else {
    nextIndex = Math.max(0, Math.min(nextIndex, length - 1));
  }

  return nextIndex;
}

/**
 * Gets the previous index based on the current index.
 * Mostly used for keyboard navigation.
 *
 * @param currentIndex - The current index.
 * @param length - The total length or count of items.
 * @param loop - Whether to loop around when the index exceeds boundaries.
 */
export function getPrevIndex(
  currentIndex: number,
  length: number,
  loop = true
): number {
  return getNextIndex(currentIndex, length, -1, loop);
}

export function getNextItem<T>(
  currentIndex: number,
  array: T[],
  loop = true
): T | undefined {
  const nextIndex = getNextIndex(currentIndex, array.length, 1, loop);
  return array[nextIndex];
}

export function getPrevItem<T>(
  currentIndex: number,
  array: T[],
  loop = true
): T | undefined {
  const prevIndex = getPrevIndex(currentIndex, array.length, loop);
  return array[prevIndex];
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value);
}

export function isEmptyArray(value: any): boolean {
  return isArray(value) && value.length === 0;
}

export function isObject(value: any): value is Dict {
  return value !== null && typeof value === "object" && !isArray(value);
}

export function isEmptyObject(value: any): boolean {
  return isObject(value) && Object.keys(value).length === 0;
}

export function isEmpty(value: any): boolean {
  if (isArray(value)) return isEmptyArray(value);
  if (isObject(value)) return isEmptyObject(value);
  return value == null || value === "";
}

export function isUndefined(value: any): value is undefined {
  return typeof value === "undefined";
}

export function isDefined<T>(value: T): value is Exclude<T, undefined> {
  return typeof value !== "undefined";
}

export function pick<T extends Dict, K extends keyof T>(
  object: T,
  keys: K[]
): { [P in K]: T[P] } {
  const result = {} as { [P in K]: T[P] };

  keys.forEach(key => {
    if (key in object) {
      result[key] = object[key];
    }
  });

  return result;
}

export function omit<T extends Dict, K extends keyof T>(
  object: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...object };

  keys.forEach(key => {
    delete result[key];
  });

  return result;
}

export function isFunction<T extends Function = Function>(
  value: any
): value is T {
  return typeof value === "function";
}

export type MaybeFunction<T, Args extends unknown[] = []> =
  | T
  | ((...args: Args) => T);

export function runIfFn<T, Args extends unknown[]>(
  valueOrFn: MaybeFunction<T, Args>,
  ...args: Args
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
