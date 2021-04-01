export const add = (a: number) => (b: number): number => a + b;

export const div = (a: number) => (b: number): number => a / b;

export const subtr = (a: number) => (b: number): number => a - b;

export const mult = (a: number) => (b: number): number => a * b;

export const append = <T>(list: T[], newElement: T): T[] => [
  ...list,
  newElement
];

export const apply = <T>(fn: (...xs: T[]) => T, xs: T[]): T => fn(...xs);

export const assoc = <T>(
  k: string,
  v: T,
  obj: Record<string, unknown>
): Record<string, unknown> => ({ ...obj, [k]: v });

export const assocPath = <T>(path: string[]) => (
  v: T,
  obj: Record<string, unknown>
): Record<string, unknown> => {
  const setValue = (
    [head, ...tail]: string[],
    o: Record<string, unknown>
  ): Record<string, unknown> =>
    tail.length
      ? {
          ...o,
          [head]: setValue(tail, o[head] as Record<string, unknown>)
        }
      : {
          ...o,
          [head]: v
        };
  return setValue(path, obj);
};

export const concat = <T>(list1: T[], list2: T[]): T[] => [...list1, ...list2];

export const dec = (x: number): number => x - 1;

export const dissoc = <T extends Record<string, unknown>>(
  k: keyof T,
  obj: T
): T => {
  delete obj[k];
  return obj;
};

export const dissocPath = (
  path: string[],
  obj: Record<string, unknown>
): Record<string, unknown> => {
  const setValue = (
    [head, ...tail]: string[],
    o: Record<string, unknown>
  ): Record<string, unknown> => {
    if (!tail.length) {
      if (o && head in o) {
        delete o[head];
      }
      return o;
    }
    return setValue(tail, {
      ...o,
      [head]: setValue(tail, o[head] as Record<string, unknown>)
    });
  };

  return setValue(path, obj);
};

export function every<T>(
  fn: (x: T, i: number, arr: T[]) => boolean,
  list: T[]
): boolean {
  return list.reduce(
    (isSomeElementTrue: boolean, element: T, i: number, arr: T[]): boolean =>
      !isSomeElementTrue ? false : fn(element, i, arr),
    true
  );
}

export const flatten = <T>(li: T[][]): T[] =>
  li.reduce((acc, v) => acc.concat(v), []);

export const head = <T>(li: T[]): T | undefined =>
  li.length > 0 ? li[0] : undefined;

export const tail = <T>(li: T[]): T[] | undefined =>
  li.length > 0 ? li.slice(1) : [];

export const id = <T>(x: T): T => x;

export const inc = (x: number): number => x + 1;

export function includes<T>(el: T, list: T[]): boolean {
  return list.indexOf(el) >= 0 ? true : false;
}

export const join = <T>(list: T[], delimiter = ''): string => {
  return list.reduce(
    (acc, v, i, arr) => `${acc}${v}${i !== arr.length - 1 ? delimiter : ''}`,
    ''
  );
};

type NoContent = undefined;

export function find<T>(
  fn: (x: T, i: number, arr: T[]) => boolean,
  list: T[]
): T | NoContent {
  return list.reduce(
    (firstFound: T | undefined, element: T, i: number, arr: T[]) =>
      !firstFound && fn(element, i, arr) ? element : firstFound,
    undefined
  );
}

type NotFound = -1;

export function findIndex<T>(
  fn: (x: T, i: number, arr: T[]) => boolean,
  list: T[]
): number | NotFound {
  return list.reduce(
    (firstFound: number, element: T, i: number, arr: T[]) =>
      firstFound === -1 && fn(element, i, arr) ? i : firstFound,
    -1
  );
}

export const len = <T>(list: T[]): number =>
  list.reduce((listLength) => listLength + 1, 0);

export function compose<T>(...fns: ((...xs: T[]) => T)[]): (...a: T[]) => T {
  // | ((f: (a: T) => T) => (...a: T[]) => T) {
  return fns.reduceRight((f, g) => (...args): T => g(f(...args)));
}

export function map<T>(
  fn: (x: T, i?: number, arr?: T[]) => T,
  list: T[]
): T[] | ((a: T[]) => T[]) {
  const _map = (_l: T[]) =>
    _l.reduce(
      (acc: T[], x: T, i: number, arr: T[]) => [...acc, fn(x, i, arr)],
      []
    );
  return list === undefined ? (l: T[]): T[] => _map(l) : _map(list);
}

export function filter<T>(
  fn: (x: T, i: number, arr: T[]) => boolean,
  list: T[]
): T[] | ((a: T[]) => T[]) {
  const _filter = (li: T[]) =>
    li.reduce(
      (acc: T[], x: T, i: number, arr: T[]) =>
        fn(x, i, arr) ? [...acc, x] : acc,
      []
    );
  return list === undefined ? (l: T[]): T[] => _filter(l) : _filter(list);
}

export const reverse = <T>(list: T[]): T[] =>
  list.reduce((acc: T[], v: T) => [v, ...acc], []);

export function some<T>(
  fn: (x: T, i: number, arr: T[]) => boolean,
  list: T[]
): boolean {
  return list.reduce(
    (isSomeElementTrue: boolean, element: T, i: number, arr: T[]): boolean =>
      !isSomeElementTrue ? fn(element, i, arr) : true,
    false
  );
}

export const sum = (...ns: number[]): number =>
  ns.reduce((acc, v) => acc + v, 0);

export const tee = <T>(fn: (x: T) => void) => (v: T): T => {
  fn(v);
  return v;
};

export const uniq = <T>(list: T[]): T[] =>
  list.filter((v, i, a) => a.indexOf(v) === i);

export const zip = <T, U>(list1: T[], list2: U[]): [T, U][] =>
  list1.reduce(
    (acc: [T, U][], v: T, i: number): [T, U][] => [...acc, [v, list2[i]]],
    []
  );

export const range = (a: number, b: number): number[] =>
  Array.from({ length: b - a }, (_, i) => i + a);

export const repeat = <T>(el: T, n: number): T[] =>
  Array.from({ length: n }, () => el);

export const isEmpty = <T>(list: T[]): boolean => !list.length;

export const not = (el: boolean | 0 | 1): boolean => !el;

export const startsWith = (str1: string, str2: string): boolean =>
  str1 === str2.slice(0, str1.length);

export const endsWith = (str1: string, str2: string): boolean =>
  str1 === str2.slice(str2.length - str1.length);

export const drop = <T>(n: number, list: T[]): T[] => list.slice(n);

export const dropLast = <T>(n: number, list: T[]): T[] =>
  list.slice(0, list.length - n);

export const dropWhile = <T>(
  predicate: (x: T) => boolean,
  [head, ...tail]: T[]
): T[] => (predicate(head) ? dropWhile(predicate, tail) : [head, ...tail]);

export const trim = (str: string): string => str.trim();

export const take = <T>(n: number, list: T[]): T[] => list.slice(0, n);

export const once = <T>(fn: (a: T) => T): ((a: T) => T) => {
  let isDone = false;
  return (v: T): T => {
    if (!isDone) {
      isDone = true;
      return fn(v);
    }
    return v;
  };
};
