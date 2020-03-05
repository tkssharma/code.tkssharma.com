---
tags:
  - javascript
published: true
date: 2020-03-04T13:54:07.809Z
title: Javascript Coding Questions 15 min code
---

## Answer Questions : Deep concepts

1. what will be the output of this code 
```javascript
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();
// output 1 undefined 2 
```

2. what will be the output of this code 
```javascript
var length = 10;
function fn() {
    console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);
// output 10, 2
```

3. what is the closure with example 

A closure is an inner function that has access to the variables in the outer (enclosing) function’s scope chain. The closure has access to variables in three scopes; specifically: (1) variable in its own scope, (2) variables in the enclosing function’s scope, and (3) global variables.


```javascript
var globalVar = "xyz";

(function outerFunc(outerArg) {
    var outerVar = 'a';
    
    (function innerFunc(innerArg) {
    var innerVar = 'b';
    
    console.log(
        "outerArg = " + outerArg + "\n" +
        "innerArg = " + innerArg + "\n" +
        "outerVar = " + outerVar + "\n" +
        "innerVar = " + innerVar + "\n" +
        "globalVar = " + globalVar);
    
    })(456);
})(123);
```
4. what will be the output of this code
```javascript
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```
The code sample shown will not display the values 0, 1, 2, 3, and 4 as might be expected; rather, it will display 5, 5, 5, 5, and 5.
The reason for this is that each function executed within the loop will be executed after the entire loop has completed and all will therefore reference the last value stored in i, which was 5.

Closures can be used to prevent this problem by creating a unique scope for each iteration, storing each unique value of the variable within its scope, as follows:
```javascript
for (var i = 0; i < 5; i++) {
    (function(x) {
        setTimeout(function() { console.log(x); }, x * 1000 );
    })(i);
}
```
This will produce the presumably desired result of logging 0, 1, 2, 3, and 4 to the console.

In an ES2015 context, you can simply use let instead of var in the original code:
```javascript
for (let i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```

5. How can you clone an Object 

```javascript
var obj = {a: 1 ,b: 2}
var objclone = Object.assign({},obj);
```
Now the value of objclone is {a: 1 ,b: 2} but points to a different object than obj.
Note the potential pitfall, though: Object.clone() will just do a shallow copy, not a deep copy. This means that nested objects aren’t copied. They still refer to the same nested objects as the original:

```javascript
let obj = {
    a: 1,
    b: 2,
    c: {
        age: 30
    }
};
```

```javascript
var objclone = Object.assign({},obj);
console.log('objclone: ', objclone);
obj.c.age = 45;
console.log('After Change - obj: ', obj);           // 45 - This also changes
console.log('After Change - objclone: ', objclone); // 45
```