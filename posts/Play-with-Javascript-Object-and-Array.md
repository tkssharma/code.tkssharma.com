---
tags:
  - javascript
published: true
date: 2020-03-08T13:54:07.809Z
title: Play with Javascript Object and Array
---

## count number of iteration for array elements

Returns an object with the unique values of an array as keys and their frequencies as the values.

Use Array.prototype.reduce() to map unique values to an object's keys, adding to existing keys every time the same value is encountered.

```javascript
const array = [1,2,2,2,1,3,4,5,5,5,6,7,8,9];

const frequencies = array => {
  array.reduce((accum, item) => {
      accum[item] = accum[item] ? accum[item]  + 1: 1;
      return accum;
  },{})
}

```

## Get the size of object, array, string

```javascript
const size = val =>
  Array.isArray(val)
    ? val.length
    : val && typeof val === 'object'
      ? val.size || val.length || Object.keys(val).length
      : typeof val === 'string'
        ? new Blob([val]).size
        : 0;
size([1, 2, 3, 4, 5]); // 5
size('size'); // 4
size({ one: 1, two: 2, three: 3 }); // 3
```
