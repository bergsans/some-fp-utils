# TypeScript functional programming utilities


Currently, I am brushing up on some TypeScript, and I've implemented a set of
functions used in functional programming for practice. They are perhaps of
interest to someone else, someone learning about functional programming or wanting to
use it with TypeScript. Each definition includes a test case written with
Jest demonstrating the feature. For all definitions I've aimed for clarity,
not performance.

*  [add](#add)
*  [append](#append)
*  [apply](#apply)
*  [assoc](#assoc)
*  [assocPath](#assocPath)
*  [concat](#concat)
*  [dec](#dec)
*  [dissoc](#dissoc)
*  [dissocPath](#dissocPath)
*  [div](#div)
*  [drop](#drop)
*  [dropLast](#dropLast)
*  [dropWhile](#dropWhile)
*  [endsWith](#endsWith)
*  [every](#every)
*  [filter](#filter)
*  [find](#find)
*  [findIndex](#findIndex)
*  [flatten](#flatten)
*  [head](#head)
*  [id](#id)
*  [inc](#inc)
*  [includes](#includes)
*  [isEmpty](#isEmpty)
*  [join](#join)
*  [len](#len)
*  [map](#map)
*  [mult](#mult)
*  [not](#not)
*  [once](#once)
*  [range](#range)
*  [repeat](#repeat)
*  [reverse](#reverse)
*  [some](#some)
*  [startsWith](#startsWith)
*  [subtr](#subtr)
*  [sum](#sum)
*  [tail](#tail)
*  [take](#take)
*  [tee](#tee)
*  [trim](#trim)
*  [uniq](#uniq)
*  [zip](#zip)

## Implementations
For some test I use this helper.

```javascript
const str = <T>(x: T): string => JSON.stringify(x);
```


##  add

```javascript
test('add', () => expect(add(1)(1)).toEqual(2));

const add = (a: number) => (b: number): number => a + b;
```


##  append

```javascript
test('append', () => expect(str(append([1, 2], 3))).toBe(str([1, 2, 3])));

const append = <T>(list: T[], newElement: T): T[] => [
  ...list,
  newElement
];
```


##  apply
```javascript

test('apply', () => expect(apply(Math.max, [1, 2, 3])).toBe(3));

 const apply = <T>(fn: (...xs: T[]) => T, xs: T[]): T => fn(...xs);
```

## assoc
```javascript
test('assoc', () =>
  expect(str(assoc('b', 2, { a: 1 }))).toEqual(str({ a: 1, b: 2 })));

const assoc = <T>(
  k: string,
  v: T,
  obj: Record<string, unknown>
): Record<string, unknown> => ({ ...obj, [k]: v });
```

## assocPath
```javascript
test('assocPath', () => {
  const someObject = {
    a: {
      b: {
        c: 3
      },
      d: 2
    },
    e: 1
  };

  const modifyPropC = assocPath(['a', 'b', 'c']);

  expect(str(modifyPropC(10, someObject))).toEqual(
    str({
      a: {
        b: {
          c: 10
        },
        d: 2
      },
      e: 1
    })
  );
});

const assocPath = <T>(path: string[]) => (
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

```

##  concat
```javascript
test('concat', () => {
  expect(str(concat([1, 2], [3, 4]))).toEqual(str([1, 2, 3, 4]));
  expect(str(concat([1, 2], [3, 4]))).toEqual(str([1, 2, 3, 4]));
});

const concat = <T>(list1: T[], list2: T[]): T[] => [...list1, ...list2];
```

##  dec
```javascript
test('dec', () => expect(dec(3)).toEqual(2));

const dec = (x: number): number => x - 1;
```

##  dissoc
```javascript
test('dissoc', () =>
  expect(str(dissoc('c', { a: 1, b: 2, c: 3 }))).toEqual(str({ a: 1, b: 2 })));

const dissoc = <T extends Record<string, unknown>>(
  k: keyof T,
  obj: T
): T => {
  delete obj[k];
  return obj;
};
```

##  dissocPath
```javascript
test('dissocPath', () => {
  expect(
    str(dissocPath(['a', 'b', 'c'], { a: { b: { c: 2, d: 2 }, e: 2 } }))
  ).toEqual(str({ a: { b: { d: 2 }, e: 2 } }));
  expect(
    str(dissocPath(['a', 'b'], { a: { b: { c: 2, d: 2 }, e: 2 } }))
  ).toEqual(str({ a: { e: 2 } }));
});

const dissocPath = (
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

```

##  div
```javascript
test('div', () => expect(div(2)(1)).toEqual(2));

const div = (a: number) => (b: number): number => a / b;
```

##  drop
```javascript
test('drop', () =>
  expect(str(drop(2, [1, 2, 3, 4, 5]))).toEqual(str([3, 4, 5])));

const drop = <T>(n: number, list: T[]): T[] => list.slice(n);
```

##  dropLast
```javascript
test('dropLast', () =>
  expect(str(dropLast(2, [1, 2, 3, 4, 5]))).toEqual(str([1, 2, 3])));

const dropLast = <T>(n: number, list: T[]): T[] =>
  list.slice(0, list.length - n);
```

##  dropWhile
```javascript
const lesserThan3 = (x: number): boolean => x < 3;

test('dropWhile', () =>
  expect(
    str(dropWhile(lesserThan3, [1, 2, 3, 4, 5]))
  ).toEqual(str([3, 4, 5])));

const dropWhile = <T>(
  predicate: (x: T) => boolean,
  [head, ...tail]: T[]
): T[] => (predicate(head) ? dropWhile(predicate, tail) : [head, ...tail]);
```

##  endsWith
```javascript
test('endsWith', () => {
  expect(endsWith('world', 'hello, world')).toBeTruthy();
  expect(endsWith('welt', 'hello, world')).toBeFalsy();
});

const endsWith = (str1: string, str2: string): boolean =>
  str1 === str2.slice(str2.length - str1.length);
```

##  every
```javascript
test('every', () => {
  expect(every(isEven, [2, 2, 2])).toBe(true);
 expect(every(isEven, [1, 2, 3])).toBe(false)
});

function every<T>(
  fn: (x: T, i: number, arr: T[]) => boolean,
  list: T[]
): boolean {
  return list.reduce(
    (isSomeElementTrue: boolean, element: T, i: number, arr: T[]): boolean =>
      !isSomeElementTrue ? false : fn(element, i, arr),
    true
  );
}
```

##  filter
```javascript
test('filter', () => expect(filter(isEven, [1, 2, 3, 4, 5])).toEqual([2, 4]));

function filter<T>(
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
```

##  find
```javascript
test('find', () => expect(find(isEven, [1, 2, 3, 4])).toEqual(2));

type NoContent = undefined;

function find<T>(
  fn: (x: T, i: number, arr: T[]) => boolean,
  list: T[]
): T | NoContent {
  return list.reduce(
    (firstFound: T | undefined, element: T, i: number, arr: T[]) =>
      !firstFound && fn(element, i, arr) ? element : firstFound,
    undefined
  );
}
```

##  findIndex
```javascript
test('findIndex', () => expect(findIndex(isEven, [1, 2, 3, 4])).toEqual(1));

type NotFound = -1;

function findIndex<T>(
  fn: (x: T, i: number, arr: T[]) => boolean,
  list: T[]
): number | NotFound {
  return list.reduce(
    (firstFound: number, element: T, i: number, arr: T[]) =>
      firstFound === -1 && fn(element, i, arr) ? i : firstFound,
    -1
  );
}
```

##  flatten
```javascript
test('flatten', () => {
  expect(
    str(
      flatten([
        [1, 2],
        [3, 4]
      ])
    )
  ).toEqual(str([1, 2, 3, 4]));
  expect(str(flatten([[[1, 2]], [[3, 4]]]))).toEqual(
    str([
      [1, 2],
      [3, 4]
    ])
  );
});

const flatten = <T>(li: T[][]): T[] =>
  li.reduce((acc, v) => acc.concat(v), []);
```

##  head
```javascript
test('head', () => expect(head(['a', 'b'])).toEqual('a'));

const head = <T>(li: T[]): T | undefined =>
  li.length > 0 ? li[0] : undefined;
```

##  id
```javascript
test('id', () => expect(id(3)).toEqual(3));

const id = <T>(x: T): T => x;
```

##  inc
```javascript
test('inc', () => expect(inc(3)).toEqual(4));

const inc = (x: number): number => x + 1;
```

##  includes
```javascript
test('includes', () => {
  expect(includes(3, [1, 2, 3, 4])).toBeTruthy();
  expect(includes(5, [1, 2, 3, 4])).toBeFalsy();
});

function includes<T>(el: T, list: T[]): boolean {
  return list.indexOf(el) >= 0 ? true : false;
}
```

##  isEmpty
```javascript
test('isEmpty', () => {
  expect(isEmpty([1, 2])).toBeFalsy();
  expect(isEmpty([])).toBeTruthy();
});

const isEmpty = <T>(list: T[]): boolean => !list.length;
```

##  join
```javascript
test('join', () =>
  expect(join(['hello,', 'world'], ' ')).toEqual('hello, world'));

const join = <T>(list: T[], delimiter = ''): string => {
  return list.reduce(
    (acc, v, i, arr) => `${acc}${v}${i !== arr.length - 1 ? delimiter : ''}`,
    ''
  );
};
```

##  len
```javascript
test('len', () => expect(len([1, 2, 3])).toEqual(3));

const len = <T>(list: T[]): number =>
  list.reduce((listLength) => listLength + 1, 0);
```

##  map
```javascript
test('map', () => expect(str(map(add1, [1, 2, 3]))).toEqual(str([2, 3, 4])));

export function map<T, U>(
  fn: (x: T, i?: number, arr?: T[]) => U,
  list: T[]
): U[] | ((a: T[]) => U[]) {
  const _map = (_l: T[]): U[] =>
    _l.reduce(
      (acc: U[], x: T, i: number, arr: T[]) => [...acc, fn(x, i, arr)],
      []
    );
  return list === undefined ? (l) => _map(l) : _map(list);
}

```

##  mult
```javascript
test('mult', () => expect(mult(1)(2)).toEqual(2));

const mult = (a: number) => (b: number): number => a * b;
```

##  not
```javascript
test('not', () => {
  expect(not(0)).toBeTruthy();
  expect(not(1)).toBeFalsy();
  expect(not(false)).toBeTruthy();
  expect(not(true)).toBeFalsy();
});

const not = (el: boolean | 0 | 1): boolean => !el;
```

## once
```

const once = <T, U>(fn: (...as: T[]) => U): ((...vs: T[]) => U) => {
  let _v: U;
  return (...args: T[]) => {
    _v ||= fn(...args);
    return _v;
  };
};
```

## pluck
```
const pluck = <T, U extends keyof T>(obj: T, k: U): T[U] => {
  return obj[k];
};
```

##  range
```javascript
test('range', () => expect(str(range(2, 8))).toEqual(str([2, 3, 4, 5, 6, 7])));

const range = (a: number, b: number): number[] =>
  Array.from({ length: b - a }, (_, i) => i + a);
```

##  repeat
```javascript
test('repeat', () => expect(
    str(repeat('*', 3))
  ).toEqual(str(['*', '*', '*']))
);

const repeat = <T>(el: T, n: number): T[] =>
  Array.from({ length: n }, () => el);
```

##  reverse
```javascript
test('reverse', () => expect(str(reverse([1, 2, 3]))).toEqual(str([3, 2, 1])));

const reverse = <T>(input: string | T[]): string | T[] => {
  const _rev = <T>(inp: T[]) => inp.reduce((acc: T[], v: T) => [v, ...acc], []);
  return typeof input === 'string'
    ? _rev(input.split('')).join('')
    : _rev(input);
};
```

##  some
```javascript
test('some', () => {
  expect(some(isEven, [1, 1, 1])).toBe(false);
  expect(some(isEven, [1, 2, 3])).toBe(true);
});

function some<T>(
  fn: (x: T, i: number, arr: T[]) => boolean,
  list: T[]
): boolean {
  return list.reduce(
    (isSomeElementTrue: boolean, element: T, i: number, arr: T[]): boolean =>
      !isSomeElementTrue ? fn(element, i, arr) : true,
    false
  );
}
```

##  startsWith
```javascript
test('startsWith', () => {
  expect(startsWith('hello', 'hello, world')).toBeTruthy();
  expect(startsWith('bonjour', 'hello, world')).toBeFalsy();
});

const startsWith = (str1: string, str2: string): boolean =>
  str1 === str2.slice(0, str1.length);
```

##  subtr
```javascript
test('subtr', () => expect(subtr(1)(1)).toEqual(0));

const subtr = (a: number) => (b: number): number => a - b;
```

##  sum
```javascript
test('sum', () => expect(sum(1, 1, 1, 1, 1)).toEqual(5));

const sum = (...ns: number[]): number =>
  ns.reduce((acc, v) => acc + v, 0);
```

##  tail
```javascript
test('tail', () => expect(tail(['a', 'b', 'c'])).toEqual(['b', 'c']));

const tail = <T>(li: T[]): T[] | undefined =>
  li.length > 0 ? li.slice(1) : [];
```

##  take
```javascript
test('take', () => expect(str(take(2, [1, 2, 3, 4, 5]))).toEqual(str([1, 2])));

const take = <T>(n: number, list: T[]): T[] => list.slice(0, n);

```
##  tee
```javascript
test('tee', () => {
  let isChanged1 = false;
  const mockFn = <T>(_: T) => (isChanged1 = true);
  expect(tee(mockFn)(2)).toEqual(2);
  expect(isChanged1).toBeTruthy();
  let isChanged2 = false;
  const mockFn2 = <T>(_: T) => (isChanged2 = true);
  expect(tee(mockFn2)([1, 2, 3])).toEqual([1, 2, 3]);
  expect(isChanged2).toBeTruthy();
});

const tee = <T>(fn: (x: T) => void) => (v: T): T => {
  fn(v);
  return v;
};

```
##  trim
```javascript
test('trim', () => expect(trim('  hello, world!  ')).toEqual('hello, world!'));

const trim = (str: string): string => str.trim();
```
##  uniq
```javascript
test('uniq', () =>
  expect(str(uniq([1, 1, 1, 1, 2, 3, 1, 1]))).toEqual(str([1, 2, 3])));

const uniq = <T>(list: T[]): T[] =>
  list.filter((v, i, a) => a.indexOf(v) === i);
```

##  zip
```javascript
test('zip', () =>
  expect(str(zip(['a', 'b'], [1, 2]))).toEqual(
    str([
      ['a', 1],
      ['b', 2]
    ])
  ));

const zip = <T, U>(list1: T[], list2: U[]): [T, U][] =>
  list1.reduce(
    (acc: [T, U][], v: T, i: number): [T, U][] => [...acc, [v, list2[i]]],
    []
  );
```
