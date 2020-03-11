---
tags:
  - javascript
published: true
date: 2020-03-07T13:54:07.809Z
title: Deep clone object in Javascript | Fun with Objects
---

## clonning Objects in Javascript

Cloning an object in JavaScript a task that is almost always used in any project, to clone everything from simple objects to the most complicated ones.

As it may seem simple for not seasoned JavaScript developers, it actually has some pitfalls that would hurt you in the bones if you didn’t know the proper way to do it.
Talk is cheap, show me the code

The first way that could cross a developer’s mind is to deeply iterate through a source object’s properties and copy them one by one on the target object. It may seem good at the beginning, but it is not a performance-friendly solution potential bottlenecks come when working with large or deep objects.

Deep copy using iteration
--------------------------

Note: To copy deeply, we need to recursively detect if the value is yet another object (object literal in this case, functions and arrays will be treated normally) or not.

Deep Copy 

```javascript
function isObject(obj){
  let type = typeof obj;
  return (type === 'function' || (type === 'object' && !!obj))
}
function deepCopy(object){
  let target = {};
  if(!object){
    return null;
  }
  for(var i in object){
    if(object.hasOwnProperty(i)){
      if(isObject(object[i])){
        target[i] = deepCopy(object[i])
      } else {
        target[i] = object[i]
      }
    }
  }
  return target;
}
```
Converting to JSON and back
---------------------------
```javascript
function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
}
const source = {a:1, b:2, c:3};
const target = jsonCopy(source);
console.log(target); // {a:1, b:2, c:3}
// Check if clones it and not changing it
source.a = 'a';
console.log(source.a); // 'a'
console.log(target.a); // 1
```
Using Object.assign
--------------------

This method has a flaw that it only does a shallow copy. It means that nested properties are still going to be copied by reference. Be careful about it.

This way is the best and the safest way I personally consume in my projects. It’s leveraging a built-in static method on the Object object and is handled and provided by the language. So use this one!

```javascript
function bestCopyEver(src) {
  return Object.assign({}, src);
}

const source = {a:1, b:2, c:3};
const target = deepCopy(source);
console.log(target); // {a:1, b:2, c:3}
// Check if clones it and not changing it
source.a = 'a';
console.log(source.a); // 'a'
```

let's write deep copy using Object.assign

```javascript 
function deepcopy(object){
  if(!object) return null;
  if(typeof object === 'object'){
     let target = Object.assign({}, object);
      // target is not adeep copy
      Object.keys(target).forEach(i => {
         target[i] = typeof target[i] === 'object' ? deepCopy(target[i]) : target[i]
      })
  }
  return Array.isArray(object) && object.length
    ? (target.length = object.length) && Array.from(target)
    : Array.isArray(object)
    ? Array.from(object)
    : target;
}
```

