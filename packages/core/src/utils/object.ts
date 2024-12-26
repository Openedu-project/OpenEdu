export interface NestedObject {
  [key: string]: NestedObject | unknown;
}

type PathValue<T, P extends string[]> = P extends [infer K, ...infer R]
  ? K extends keyof T
    ? R extends string[]
      ? PathValue<T[K], R>
      : T[K]
    : undefined
  : T;

type Path = string | ReadonlyArray<string | number>;
type SplitPath<T extends string> = T extends `${infer A}.${infer B}` ? [A, ...SplitPath<B>] : [T];

const REGEX = /^(?:0|[1-9]\d*)$/;

function isKey(value: unknown): value is string | number | symbol {
  const type = typeof value;
  return (
    type === 'number' ||
    type === 'boolean' ||
    value == null ||
    (type === 'string' && (value as string).length > 0 && REGEX.test(value as string)) ||
    (type === 'symbol' && Symbol.keyFor(value as symbol) !== undefined)
  );
}

function castPath(value: Path): Array<string | number> {
  if (Array.isArray(value)) {
    return value.map(String);
  }
  if (typeof value === 'string') {
    return value.split('.');
  }
  return [String(value)];
}

/**
 * const obj = { a: [{ b: { c: 3 } }], d: 'd', e: { f: 'f' } };
 * console.log("getNestedValue(obj, 'd')", getNestedValue(obj, 'd')); // d
 * console.log("getNestedValue(obj, 'e.f')", getNestedValue(obj, 'e.f')); // f
 * console.log("getNestedValue(obj, ['a', '0', 'b', 'c'])", getNestedValue(obj, ['a', '0', 'b', 'c'])); // 3
 * console.log("getNestedValue(obj, 'a.b.c', 'default')", getNestedValue(obj, 'a.b.c', 'default')); // 'default'
 * console.log("getNestedValue(obj, 'x.y.z', 'not found')", getNestedValue(obj, 'x.y.z', 'not found')); //
 */

export function getNestedValue<T extends NestedObject, P extends Path, D = undefined>(
  object: T,
  path: P,
  defaultValue?: D
): P extends string[] ? PathValue<T, P> | D : P extends string ? PathValue<T, SplitPath<P>> | D : D {
  if (object == null) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return defaultValue as any;
  }

  const keys = isKey(path) ? [path] : castPath(path);
  let result: unknown = object;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    result = (result as NestedObject)[key as string | number];

    if (result === undefined) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return defaultValue as any;
    }

    if (result === null && i !== keys.length - 1) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return defaultValue as any;
    }
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return result as any;
}

const ARRAY_REGEX = /^\d+$/;
export function setNestedValue(
  obj: NestedObject,
  path: string | (string | number)[],
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  value: any,
  createPath = true
): NestedObject {
  const keys = Array.isArray(path) ? path : path.replace(/\[(\w+)\]/g, '.$1').split('.');

  const result = JSON.parse(JSON.stringify(obj));

  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (key && current[key] === undefined) {
      if (!createPath) {
        return obj;
      }

      const nextKey = keys[i + 1] as string;
      current[key] = ARRAY_REGEX.test(nextKey) ? [] : {};
    }

    current = current[key as string];

    if (current == null) {
      return obj;
    }
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey as string] = value;

  return result;
}

export function deleteNestedValue(
  obj: NestedObject,
  path: string | (string | number)[],
  cleanupEmpty = false
): NestedObject {
  // Convert string path to array
  const keys = Array.isArray(path) ? path : path.replace(/\[(\w+)\]/g, '.$1').split('.');

  // Create a deep copy of the original object
  const result = JSON.parse(JSON.stringify(obj));

  let current = result;
  const stack: { obj: NestedObject; key: string | number | undefined }[] = [];

  // Traverse to the second-to-last key
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (current[key as string] == null) {
      return result; // Path doesn't exist, return copy of original
    }

    stack.push({ obj: current, key });
    current = current[key as string];
  }

  const lastKey = keys[keys.length - 1];

  // If the path doesn't exist, return the original object copy
  if (current[lastKey as string] === undefined) {
    return result;
  }

  // Handle array deletion
  if (Array.isArray(current)) {
    const index = Number.parseInt(lastKey as string, 10);
    if (!Number.isNaN(index)) {
      current.splice(index, 1);
    }
  } else {
    // Delete the property
    delete current[lastKey as string];
  }

  // Clean up empty objects/arrays if requested
  if (cleanupEmpty && stack.length > 0) {
    for (let i = stack.length - 1; i >= 0; i--) {
      const { obj, key } = stack[i] as { obj: NestedObject; key: string | number | undefined };
      const value = obj[key as string];

      if (Array.isArray(value)) {
        if (value.length === 0) {
          delete obj[key as string];
        }
      } else if (typeof value === 'object' && value !== null) {
        if (Object.keys(value).length === 0) {
          delete obj[key as string];
        }
      }
    }
  }

  return result;
}

export const createQueryParams = <T extends Record<string, unknown>>(obj: T): string =>
  Object.entries(obj)
    .flatMap(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        return [];
      }
      if (Array.isArray(value)) {
        return value.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
      }
      return [`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`];
    })
    .join('&');

export function isEmptyValue(value: string | NestedObject): boolean {
  return value === undefined || value === null || value === '';
}

export function deepMergeWithCleanup(source: NestedObject, target: NestedObject, useSourceValue = true): NestedObject {
  const result = { ...target };

  for (const key in result) {
    if (!(key in source)) {
      delete result[key];
    }
  }

  for (const key in source) {
    if (!(key in result)) {
      result[key] = useSourceValue ? (source[key] as NestedObject) : (result[key] as NestedObject);
    } else if (typeof source[key] === 'object' && !isEmptyValue(source[key] as string | NestedObject)) {
      result[key] = deepMergeWithCleanup(source[key] as NestedObject, result[key] as NestedObject);
    }
  }

  return result;
}

export function deepMerge(source: NestedObject, target: NestedObject): NestedObject {
  const result: NestedObject = {};

  const allKeys = new Set([...Object.keys(source), ...Object.keys(target)]);

  for (const key of allKeys) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (typeof sourceValue === 'object' && typeof targetValue === 'object') {
      result[key] = deepMerge(sourceValue as NestedObject, targetValue as NestedObject);
    } else if (typeof sourceValue === 'object') {
      result[key] = sourceValue;
    } else if (typeof targetValue === 'object') {
      result[key] = targetValue;
    } else if (!isEmptyValue(targetValue as string | NestedObject)) {
      result[key] = targetValue;
    } else if (!isEmptyValue(sourceValue as string | NestedObject)) {
      result[key] = sourceValue;
    }
  }

  return result;
}
