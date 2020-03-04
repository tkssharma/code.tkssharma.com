---
tags:
  - graphql
  - javascript
  - react
  - Angular
published: true
date: 2020-02-02T13:54:07.809Z
title: Javascript Interview Questions 02
---

## Coding Question and problem solving (Arrays)

- Write a code to flatten Given Array 

```javascript
const array = [1,2,3,4,[5,6,7],[5,6,7,8]];
function flatenArray(array){
  const result = array.reduce((accum, item) => {
    if(Array.isArray(item)){
      accum = accum.concat(flatArray(item))
    } else {
      accum = accum.concat(item)
    }
    return accum;
  })
}
```

- Flaten only on level 

```javascript
var myNewArray = myArray.reduce(function(prev, curr) {
  return prev.concat(curr);
});
// [1, 2, 3, 4, 5, 6, 7, 8, 9]


var myNewArray3 = [];
for (var i = 0; i < myArray.length; ++i) {
  for (var j = 0; j < myArray[i].length; ++j)
    myNewArray3.push(myArray[i][j]);
}
console.log(myNewArray3);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Lets do it JS Way 

ES2019 introduced two new methods to the Array prototype: flat and flatMap. They are both very useful to what we want to do: flatten an array.

Let’s see how they work.

But first, a word of warning: only Firefox 62+, Chrome 69+, Edge 76+ and Safari 12+ do already support those 2 methods, as they are fairly recent. Check the current browser support, and remember you can use Babel to backport your code to a previous ES version, if you need to support older browsers.

If you don’t want to deal with Babel, and you don’t have a build step already, it might make more sense to use the flatten(), flattenDeep() and flattenDepth() functions provided by Lodash.

The cool thing about Lodash is that you don’t need to import the whole library. You can use those functions individually using those packages:
```javascript
lodash.flatten
lodash.flattendeep
lodash.flattendepth
```
Here’s how to flatten an array using lodash.flatten:
```javascript
const flatten = require('lodash.flatten')
const animals = ['Dog', ['Sheep', 'Wolf']]
flatten(animals)
//['Dog', 'Sheep', 'Wolf']
```

Let’s now talk about the native flat() and flatMap() JavaScript methods now.

flat() is a new array instance method that can create a one-dimensional array from a multidimensional array.

Example:
```javascript
['Dog', ['Sheep', 'Wolf']].flat()
//[ 'Dog', 'Sheep', 'Wolf' ]
```
By default it only “flats” up to one level.

You can add a parameter to flat() to set the number of levels you want to flat the array to.

Set it to Infinity to have unlimited levels:
```javascript
['Dog', ['Sheep', ['Wolf']]].flat()
//[ 'Dog', 'Sheep', [ 'Wolf' ] ]

['Dog', ['Sheep', ['Wolf']]].flat(2)
//[ 'Dog', 'Sheep', 'Wolf' ]

['Dog', ['Sheep', ['Wolf']]].flat(Infinity)
//[ 'Dog', 'Sheep', 'Wolf' ]
```
If you are familiar with the JavaScript map() method of an array, you know that using it you can execute a function on every element of an array.

If not, check my JavaScript map() tutorial.

flatMap() is a new Array prototype method that combines flat() with map(). It’s useful when calling a function that returns an array in the map() callback, but you want your resulted array to be flat:
```javascript
['My dog', 'is awesome'].map(words => words.split(' '))
//[ [ 'My', 'dog' ], [ 'is', 'awesome' ] ]

['My dog', 'is awesome'].flatMap(words => words.split(' '))
//[ 'My', 'dog', 'is', 'awesome' ]
```