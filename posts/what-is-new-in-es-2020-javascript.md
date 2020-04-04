---
tags:
  - javascript
published: true
date: 2020-03-14T13:54:07.809Z
title: Javascript's new features in 2020
---

Javascript's new features in 2020
--------------------------------

ECMAScript 2015, also known as ES6, was a major release that took six years to finalize. Since then, Technical Committee 39 (TC39), the body in charge of developing the ECMAScript standard, has been releasing a new edition of the standard every year. This annual release cycle has streamlined the process and made new features rapidly available, which the JavaScript community has welcomed.

This year, ECMAScript 2020 (or ES2020 for short) will be released. The new features include ``Object.fromEntries(), trimStart(), trimEnd(), flat(), flatMap()``, description property for symbol objects, optional catch binding, and more.x

The good news is that these features have already been implemented in the latest versions of Firefox and Chrome, and they can also be transpiled so that older browsers are able to process them. In this post, we will take a good look at these features and see how they upgrade the language.

Object.fromEntries()
-------------------

Transforming data from one format to another is very common in JavaScript. To facilitate the conversion of objects into arrays, ES2017 introduced the Object.entries() method. This method takes an object as an argument and returns an array of the object’s own enumerable string-keyed property pairs in the form of [key, value]. For example:

```javascript
const obj = {one: 1, two: 2, three: 3};

console.log(Object.entries(obj));    
// => [["one", 1], ["two", 2], ["three", 3]]
```

As you can see, Object.fromEntries() is simply the reverse of Object.entries(). While it was previously possible to achieve the same result, it wasn’t very straightforward:
```javascript
const myArray = [['one', 1], ['two', 2], ['three', 3]];
const obj = Array.from(myArray).reduce((acc, [key, val]) => Object.assign(acc, {[key]: val}), {});

console.log(obj);    // => {one: 1, two: 2, three: 3}
```

Keep in mind that the argument passed to Object.fromEntries()can be any object that implements the iterable protocol as long as it returns a two-element, array-like object.

For example, in the following code, Object.fromEntries() takes a Map object as an argument and creates a new object whose keys and corresponding values are given by the pairs in the Map:

```javascript
const map = new Map();
map.set('one', 1);
map.set('two', 2);

const obj = Object.fromEntries(map);

console.log(obj);    // => {one: 1, two: 2}
```
The Object.fromEntries() method is also very useful for transforming objects. Consider the following code:

```javascript
const obj = {a: 4, b: 9, c: 16};
// convert the object into an array
const arr = Object.entries(obj);
// get the square root of the numbers
const map = arr.map(([key, val]) => [key, Math.sqrt(val)]);
// convert the array back to an object
const obj2 = Object.fromEntries(map);
console.log(obj2);  // => {a: 2, b: 3, c: 4}
```
trimStart() and trimEnd()
-------------------------

The trimStart() and trimEnd() methods are technically the same as trimLeft() and trimRight(). These methods are currently stage 4 proposals and will be added to the specification for consistency with padStart() and padEnd(). Let’s look at some examples:
```javascript
const str = "   string   ";

// es2019
console.log(str.trimStart());    // => "string   "
console.log(str.trimEnd());      // => "   string"

// the same as
console.log(str.trimLeft());     // => "string   "
console.log(str.trimRight());    // => "   string"
```

flat() and flatMap()
--------------------

The flat() method enables you to easily concatenate all sub-array elements of an array. Consider the following example:
```javascript
const arr = ['a', 'b', ['c', 'd']];
const flattened = arr.flat();

console.log(flattened);    // => ["a", "b", "c", "d"]
```
Previously, you’d have to use reduce() or concat() to get a flat array:
```javascript
const arr = ['a', 'b', ['c', 'd']];
const flattened = [].concat.apply([], arr);

// or
// const flattened =  [].concat(...arr);

console.log(flattened);    // => ["a", "b", "c", "d"]
```
Note that if there are any empty slots in the provided array, they will be discarded:
```javascript
const arr = ['a', , , 'b', ['c', 'd']];
const flattened = arr.flat();

console.log(flattened);    // => ["a", "b", "c", "d"]`
```
flat() also accepts an optional argument that specifies the number of levels a nested array should be flattened. If no argument is provided, the default value of 1 will be used:
```javascript
const arr = [10, [20, [30]]];

console.log(arr.flat());     // => [10, 20, [30]]
console.log(arr.flat(1));    // => [10, 20, [30]]
console.log(arr.flat(2));    // => [10, 20, 30]
```
The ``flatMap()`` method combines ``map() and flat()`` into one method. It first creates a new array with the return value of a provided function and then concatenates all sub-array elements of the array. An example should make this clearer:
```javascript
const arr = [4.25, 19.99, 25.5];
console.log(arr.map(value => [Math.round(value)]));    
// => [[4], [20], [26]]
console.log(arr.flatMap(value => [Math.round(value)]));    
// => [4, 20, 26]
```
The depth level that the array will be flattened is 1. If you want to remove an item from the result, simply return an empty array:
```javascript
const arr = [[7.1], [8.1], [9.1], [10.1], [11.1]];

// do not include items bigger than 9
arr.flatMap(value => {
  if (value >= 10) {
    return [];
  } else {
    return Math.round(value);
  }
});  

// returns:
// => [7, 8, 9]
```
