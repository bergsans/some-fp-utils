import {
  add,
  append,
  apply,
  assoc,
  assocPath,
  concat,
  compose,
  dec,
  dissoc,
  dissocPath,
  div,
  drop,
  dropLast,
  dropWhile,
  endsWith,
  every,
  filter,
  find,
  findIndex,
  flatten,
  foldr,
  foldl,
  head,
  id,
  inc,
  includes,
  isEmpty,
  join,
  len,
  map,
  mult,
  not,
  once,
  pluck,
  range,
  repeat,
  reverse,
  some,
  startsWith,
  subtr,
  sum,
  tail,
  take,
  tee,
  trim,
  uniq,
  zip
} from '../lib';

const str = <T>(x: T): string => JSON.stringify(x);

test('add', () => expect(add(1)(1)).toEqual(2));

test('mult', () => expect(mult(1)(2)).toEqual(2));

test('div', () => expect(div(2)(1)).toEqual(2));

test('subtr', () => expect(subtr(1)(1)).toEqual(0));

test('assoc', () =>
  expect(str(assoc('b', 2, { a: 1 }))).toEqual(str({ a: 1, b: 2 })));

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

test('append', () => expect(str(append([1, 2], 3))).toBe(str([1, 2, 3])));

test('apply', () => expect(apply(Math.max, [1, 2, 3])).toBe(3));

test('compose', () => {
  expect(compose(inc, inc, inc)(10)).toEqual(13);
  expect(compose(add(20), add(10))(10)).toEqual(40);
  //should not warn:
  expect(compose(map(inc), map(inc))([1, 2, 3])).toEqual([3, 4, 5]);
  // warns corretly:
  // expect(compose(inc, (x: string) => x + 'a', inc)(10)).toEqual(10);
  expect(
    compose(
      (pos: { x: number; y: number }) => ({ ...pos, x: pos.x + 1 }),
      (pos: { x: number; y: number }) => ({ ...pos, x: pos.x + 10 })
    )({
      x: 1,
      y: 1
    })
  ).toEqual({ x: 12, y: 1 });
});

test('concat', () => {
  expect(str(concat([1, 2], [3, 4]))).toEqual(str([1, 2, 3, 4]));
  expect(str(concat([1, 2], [3, 4]))).toEqual(str([1, 2, 3, 4]));
});

test('dec', () => expect(dec(3)).toEqual(2));

test('dissoc', () =>
  expect(str(dissoc('c', { a: 1, b: 2, c: 3 }))).toEqual(str({ a: 1, b: 2 })));

test('dissocPath', () => {
  expect(
    str(dissocPath(['a', 'b', 'c'], { a: { b: { c: 2, d: 2 }, e: 2 } }))
  ).toEqual(str({ a: { b: { d: 2 }, e: 2 } }));
  expect(
    str(dissocPath(['a', 'b'], { a: { b: { c: 2, d: 2 }, e: 2 } }))
  ).toEqual(str({ a: { e: 2 } }));
});

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

test('foldr', () => {
  expect(
    foldr((a: number, b: number): number => a + b, 0, [1, 2, 3, 4, 5])
  ).toEqual(15);
  expect(
    str(
      foldr(
        (acc: number[], v: number): number[] => [...acc, inc(v)],
        [],
        [1, 2, 3, 4, 5]
      )
    )
  ).toEqual(str([6, 5, 4, 3, 2]));
});

test('foldl', () => {
  expect(
    foldl((a: number, b: number): number => a + b, 0, [1, 2, 3, 4, 5])
  ).toEqual(15);
  expect(
    foldl(
      (acc: number[], v: number): number[] => [...acc, inc(v)],
      [],
      [1, 2, 3, 4, 5]
    )
  ).toEqual([2, 3, 4, 5, 6]);
  expect(
    foldl(
      (acc: { answer: number }, v: number): { answer: number } => ({
        answer: acc.answer + v
      }),
      { answer: 0 },
      [1, 2, 3]
    )
  ).toEqual({ answer: 6 });
});

test('head', () => expect(head(['a', 'b'])).toEqual('a'));

test('tail', () => expect(tail(['a', 'b', 'c'])).toEqual(['b', 'c']));

test('id', () => expect(id(3)).toEqual(3));

test('inc', () => expect(inc(3)).toEqual(4));

test('includes', () => {
  expect(includes(3, [1, 2, 3, 4])).toBeTruthy();
  expect(includes(5, [1, 2, 3, 4])).toBeFalsy();
});

test('join', () =>
  expect(join(['hello,', 'world'], ' ')).toEqual('hello, world'));

const isEven = (x: number): boolean => x % 2 === 0;

test('filter', () => expect(filter(isEven, [1, 2, 3, 4, 5])).toEqual([2, 4]));

test('find', () => expect(find(isEven, [1, 2, 3, 4])).toEqual(2));

test('findIndex', () => expect(findIndex(isEven, [1, 2, 3, 4])).toEqual(1));

test('len', () => expect(len([1, 2, 3])).toEqual(3));

const add1 = (x: number): number => x + 1;

test('map', () => {
  expect(str(map(add(10))([1, 2, 3]))).toEqual(str([11, 12, 13]));
  expect(str(map(add1)([1, 2, 3]))).toEqual(str([2, 3, 4]));
});

test('some', () => {
  expect(some(isEven, [1, 1, 1])).toBe(false);
  expect(some(isEven, [1, 2, 3])).toBe(true);
});

test('every', () => {
  expect(every(isEven, [2, 2, 2])).toBe(true);
  expect(every(isEven, [1, 2, 3])).toBe(false);
});

test('range', () => expect(str(range(2, 8))).toEqual(str([2, 3, 4, 5, 6, 7])));

test('reverse', () => {
  expect(str(reverse([1, 2, 3]))).toEqual(str([3, 2, 1]));
  expect(reverse('hello')).toEqual('olleh');
});

test('repeat', () => expect(str(repeat('*', 3))).toEqual(str(['*', '*', '*'])));

test('not', () => {
  expect(not(0)).toBeTruthy();
  expect(not(1)).toBeFalsy();
  expect(not(false)).toBeTruthy();
  expect(not(true)).toBeFalsy();
});

test('isEmpty', () => {
  expect(isEmpty([1, 2])).toBeFalsy();
  expect(isEmpty([])).toBeTruthy();
});

test('sum', () => expect(sum(1, 1, 1, 1, 1)).toEqual(5));

test('startsWith', () => {
  expect(startsWith('hello', 'hello, world')).toBeTruthy();
  expect(startsWith('bonjour', 'hello, world')).toBeFalsy();
});

test('endsWith', () => {
  expect(endsWith('world', 'hello, world')).toBeTruthy();
  expect(endsWith('welt', 'hello, world')).toBeFalsy();
});

test('drop', () =>
  expect(str(drop(2, [1, 2, 3, 4, 5]))).toEqual(str([3, 4, 5])));

test('dropLast', () =>
  expect(str(dropLast(2, [1, 2, 3, 4, 5]))).toEqual(str([1, 2, 3])));

const lesserThan3 = (x: number): boolean => x < 3;

test('dropWhile', () =>
  expect(str(dropWhile(lesserThan3, [1, 2, 3, 4, 5]))).toEqual(str([3, 4, 5])));

test('take', () => expect(str(take(2, [1, 2, 3, 4, 5]))).toEqual(str([1, 2])));

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

test('once', () => {
  const add1ToValue = once(add1);
  let newValue;
  newValue = add1ToValue(0);
  newValue = add1ToValue(newValue);
  newValue = add1ToValue(newValue);
  expect(newValue).toEqual(1);
  const add1ToList = (l: number[]) => l.map(add1);
  const add1ToListOnce = once(add1ToList);
  let newArray;
  newArray = add1ToListOnce([1, 2, 3]);
  newArray = add1ToListOnce(newArray);
  newArray = add1ToListOnce(newArray);
  expect(str(newArray)).toEqual(str([2, 3, 4]));
});

test('pluck', () => expect(pluck({ a: 1, b: 2 }, 'a')).toBe(1));

test('trim', () => expect(trim('  hello, world!  ')).toEqual('hello, world!'));

test('uniq', () =>
  expect(str(uniq([1, 1, 1, 1, 2, 3, 1, 1]))).toEqual(str([1, 2, 3])));

test('zip', () =>
  expect(str(zip(['a', 'b'], [1, 2]))).toEqual(
    str([
      ['a', 1],
      ['b', 2]
    ])
  ));
