"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var str = function (x) { return JSON.stringify(x); };
test('add', function () { return expect(lib_1.add(1)(1)).toEqual(2); });
test('mult', function () { return expect(lib_1.mult(1)(2)).toEqual(2); });
test('div', function () { return expect(lib_1.div(2)(1)).toEqual(2); });
test('subtr', function () { return expect(lib_1.subtr(1)(1)).toEqual(0); });
test('assoc', function () {
    return expect(str(lib_1.assoc('b', 2, { a: 1 }))).toEqual(str({ a: 1, b: 2 }));
});
test('assocPath', function () {
    var someObject = {
        a: {
            b: {
                c: 3
            },
            d: 2
        },
        e: 1
    };
    var modifyPropC = lib_1.assocPath(['a', 'b', 'c']);
    expect(str(modifyPropC(10, someObject))).toEqual(str({
        a: {
            b: {
                c: 10
            },
            d: 2
        },
        e: 1
    }));
});
test('append', function () { return expect(str(lib_1.append([1, 2], 3))).toBe(str([1, 2, 3])); });
test('apply', function () { return expect(lib_1.apply(Math.max, [1, 2, 3])).toBe(3); });
test('concat', function () {
    expect(str(lib_1.concat([1, 2], [3, 4]))).toEqual(str([1, 2, 3, 4]));
    expect(str(lib_1.concat([1, 2], [3, 4]))).toEqual(str([1, 2, 3, 4]));
});
test('dec', function () { return expect(lib_1.dec(3)).toEqual(2); });
test('dissoc', function () {
    return expect(str(lib_1.dissoc('c', { a: 1, b: 2, c: 3 }))).toEqual(str({ a: 1, b: 2 }));
});
test('dissocPath', function () {
    expect(str(lib_1.dissocPath(['a', 'b', 'c'], { a: { b: { c: 2, d: 2 }, e: 2 } }))).toEqual(str({ a: { b: { d: 2 }, e: 2 } }));
    expect(str(lib_1.dissocPath(['a', 'b'], { a: { b: { c: 2, d: 2 }, e: 2 } }))).toEqual(str({ a: { e: 2 } }));
});
test('flatten', function () {
    expect(str(lib_1.flatten([
        [1, 2],
        [3, 4]
    ]))).toEqual(str([1, 2, 3, 4]));
    expect(str(lib_1.flatten([[[1, 2]], [[3, 4]]]))).toEqual(str([
        [1, 2],
        [3, 4]
    ]));
});
test('head', function () { return expect(lib_1.head(['a', 'b'])).toEqual('a'); });
test('tail', function () { return expect(lib_1.tail(['a', 'b', 'c'])).toEqual(['b', 'c']); });
test('id', function () { return expect(lib_1.id(3)).toEqual(3); });
test('inc', function () { return expect(lib_1.inc(3)).toEqual(4); });
test('includes', function () {
    expect(lib_1.includes(3, [1, 2, 3, 4])).toBeTruthy();
    expect(lib_1.includes(5, [1, 2, 3, 4])).toBeFalsy();
});
test('join', function () {
    return expect(lib_1.join(['hello,', 'world'], ' ')).toEqual('hello, world');
});
var isEven = function (x) { return x % 2 === 0; };
test('filter', function () { return expect(lib_1.filter(isEven, [1, 2, 3, 4, 5])).toEqual([2, 4]); });
test('find', function () { return expect(lib_1.find(isEven, [1, 2, 3, 4])).toEqual(2); });
test('findIndex', function () { return expect(lib_1.findIndex(isEven, [1, 2, 3, 4])).toEqual(1); });
test('len', function () { return expect(lib_1.len([1, 2, 3])).toEqual(3); });
var add1 = function (x) { return x + 1; };
test('map', function () { return expect(str(lib_1.map(add1, [1, 2, 3]))).toEqual(str([2, 3, 4])); });
//expect(compose(add(1), add1, id, add(2))(3)).toEqual(7);
//test('compose', () => {
//  expect(compose(id, (s) => ({ ...s, b: 4 }), id)({ a: 3 })).toEqual({
//    a: 3,
//    b: 4
//  });
//  expect(str(compose(map(add1))([1, 2, 3]))).toEqual(str([2, 3, 4]));
//});
test('some', function () {
    expect(lib_1.some(isEven, [1, 1, 1])).toBe(false);
    expect(lib_1.some(isEven, [1, 2, 3])).toBe(true);
});
test('every', function () {
    expect(lib_1.every(isEven, [2, 2, 2])).toBe(true);
    expect(lib_1.every(isEven, [1, 2, 3])).toBe(false);
});
test('range', function () { return expect(str(lib_1.range(2, 8))).toEqual(str([2, 3, 4, 5, 6, 7])); });
test('reverse', function () { return expect(str(lib_1.reverse([1, 2, 3]))).toEqual(str([3, 2, 1])); });
test('repeat', function () { return expect(str(lib_1.repeat('*', 3))).toEqual(str(['*', '*', '*'])); });
test('not', function () {
    expect(lib_1.not(0)).toBeTruthy();
    expect(lib_1.not(1)).toBeFalsy();
    expect(lib_1.not(false)).toBeTruthy();
    expect(lib_1.not(true)).toBeFalsy();
});
test('isEmpty', function () {
    expect(lib_1.isEmpty([1, 2])).toBeFalsy();
    expect(lib_1.isEmpty([])).toBeTruthy();
});
test('sum', function () { return expect(lib_1.sum(1, 1, 1, 1, 1)).toEqual(5); });
test('startsWith', function () {
    expect(lib_1.startsWith('hello', 'hello, world')).toBeTruthy();
    expect(lib_1.startsWith('bonjour', 'hello, world')).toBeFalsy();
});
test('endsWith', function () {
    expect(lib_1.endsWith('world', 'hello, world')).toBeTruthy();
    expect(lib_1.endsWith('welt', 'hello, world')).toBeFalsy();
});
test('drop', function () {
    return expect(str(lib_1.drop(2, [1, 2, 3, 4, 5]))).toEqual(str([3, 4, 5]));
});
test('dropLast', function () {
    return expect(str(lib_1.dropLast(2, [1, 2, 3, 4, 5]))).toEqual(str([1, 2, 3]));
});
var lesserThan3 = function (x) { return x < 3; };
test('dropWhile', function () {
    return expect(str(lib_1.dropWhile(lesserThan3, [1, 2, 3, 4, 5]))).toEqual(str([3, 4, 5]));
});
test('take', function () { return expect(str(lib_1.take(2, [1, 2, 3, 4, 5]))).toEqual(str([1, 2])); });
test('tee', function () {
    var isChanged1 = false;
    var mockFn = function (_) { return (isChanged1 = true); };
    expect(lib_1.tee(mockFn)(2)).toEqual(2);
    expect(isChanged1).toBeTruthy();
    var isChanged2 = false;
    var mockFn2 = function (_) { return (isChanged2 = true); };
    expect(lib_1.tee(mockFn2)([1, 2, 3])).toEqual([1, 2, 3]);
    expect(isChanged2).toBeTruthy();
});
test('once', function () {
    var add1ToValue = lib_1.once(add1);
    var newValue;
    newValue = add1ToValue(0);
    newValue = add1ToValue(newValue);
    newValue = add1ToValue(newValue);
    expect(newValue).toEqual(1);
});
test('pluck', function () { return expect(lib_1.pluck({ a: 1, b: 2 }, 'a')).toBe(1); });
test('trim', function () { return expect(lib_1.trim('  hello, world!  ')).toEqual('hello, world!'); });
test('uniq', function () {
    return expect(str(lib_1.uniq([1, 1, 1, 1, 2, 3, 1, 1]))).toEqual(str([1, 2, 3]));
});
test('zip', function () {
    return expect(str(lib_1.zip(['a', 'b'], [1, 2]))).toEqual(str([
        ['a', 1],
        ['b', 2]
    ]));
});
