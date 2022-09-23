---
tags:
  - javascript
  - nodejs
  - react
published: true
date: 2020-03-04T13:54:07.809Z
title: Javascript Coding Questions Array Intrersection
---

### Javascript Coding Questions Array Intrersection
1. option-1

```javascript

const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};
intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

```
1. option-2

```javascript

const intersection = (a, b) => {
const x1 = [... new Set(a)];
const x2 = [... new Set(b)]
return x1.filter(i => x2.indexOf(i) !== -1)
};
intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

```

1. option-3

```javascript

const intersection = (a, b) => {
  let x = {}
  let out = [];
  for(var i=0;i < a.length ; i++) {
     x[a[i]] = 1;
  }
   for(var j=0;i < b.length ; j++) {
     if(x[b[j]] && x[b[j]] === 1){
        out.push(b[j])
     }
  }
  return out;
};
intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

```

1. option-4

```javascript
Array.prototype.findDiff = function(b){
      return this.filter(x => b.includes(x)); 
}
[1, 2, 3].findDiff([2, 3])
```

Q. How to check if JavaScript Object is empty

With JavaScript, it can be difficult to check whether an object is empty. With Arrays, you can easily check with myArray.length, but on the other hand, objects do not work that way.

The best way to check if an object is empty is by using a utility function like the one below.

```javacript
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
```
So if you have an empty object, you can check whether it is empty by using the above function.

```javacript
var myObj = {}; // Empty Object
if(isEmpty(myObj)) {
    // Object is empty (Would return true in this example)
} else {
    // Object is NOT empty
}
```
Alternatively, you can write the isEmpty function on the Object prototype.

```javacript
Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}
Then you can easily check if the object is empty like so.

var myObj = {
    myKey: "Some Value"
}

if(myObj.isEmpty()) {
    // Object is empty
} else {
    // Object is NOT empty (would return false in this example)
}
```
Extending the object prototype is not the best thing to do as it can cause some browser issues and other issues with certain frameworks (it's also not always reliable in certain environments). The example I gave is pretty much framework agnostic although.