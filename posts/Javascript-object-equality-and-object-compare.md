---
tags:
  - javascript
  - nodejs
published: true
date: 2020-03-13T13:54:07.809Z
title: Javascript Object equality and Compare
---
Kinds of Equality
-----------------

In JavaScript, there are several kinds of equality. If you’ve been writing JavaScript for a while, you’re probably familiar with at least two of them:
- Strict Equality: a === b (triple equals).
- Loose Equality: a == b (double equals).
- Same Value Equality: Object.is(a, b).



Same Value Equality: Object.is(a, b)
In JavaScript, Object.is(a, b) tells us if a and b are the same value:
```javascript
console.log(Object.is(2, 2)); // true
console.log(Object.is({}, {})); // false
```
This is called Same Value Equality.

What does “same value” means, exactly, in our mental model? You might already know this intuitively, but let’s verify your understanding.
Check Your Intuition
Consider this example from the Counting the Values exercises:
```javascript
let dwarves = 7;
let continents = '7';
let worldWonders = 3 + 4;
```

Now try to answer these questions using the diagram above:
- console.log(Object.is(dwarves, continents)); // ?
- console.log(Object.is(continents, worldWonders)); // ?
- console.log(Object.is(worldWonders, dwarves)); // ?


Object.is(dwarves, continents) is false because dwarves and continents point at different values.
Object.is(continents, worldWonders) is false because continents and worldWonders point at different values.
Object.is(worldWonders, dwarves) is true because worldWonders and dwarves point at the same value.

``Equality`` is one of the most initially confusing aspects of JavaScript. The behavior of ``== versus ===``, the order of type coercions, etc. all serve to complicate the subject. Today we'll be looking at another facet: how object equality works.

You might suppose that if two objects have the same ``properties`` and all of their properties have the same value, they would be considered equal. Let's take a look and see what happens.
```javascript
var jangoFett = {
    occupation: "Bounty Hunter",
    genetics: "superb"
};

var bobaFett = {
    occupation: "Bounty Hunter",
    genetics: "superb"
};

// Outputs: false
// memory location different for both reference
console.log(bobaFett === jangoFett);
The properties of bobaFett and jangoFett are identical, yet the objects themselves aren't considered equal. Perhaps it's because we're using triple equals? Let's test that theory.

// Outputs: false
console.log(bobaFett == jangoFett);
// memory location different
```

The reason for this is that internally JavaScript actually has two different approaches for testing equality. Primitives like strings and numbers are compared by their value, while objects like arrays, dates, and plain objects are compared by their reference. That comparison by reference basically checks to see if the objects given refer to the same location in memory. Here is an example of how that works.

```javascript
var jangoFett = {
    occupation: "Bounty Hunter",
    genetics: "superb"
};

var bobaFett = {
    occupation: "Bounty Hunter",
    genetics: "superb"
};

var callMeJango = jangoFett;

// Outputs: false
console.log(bobaFett === jangoFett);

// Outputs: true
// common reference same memory location
console.log(callMeJango === jangoFett);
```
On the one hand, the variables jangoFett and bobaFett refer to two objects with identical properties, but they are each distinct instances. On the other hand jangoFett and callMeJango both refer to the same instance.

Here is a very basic approach to checking an object's "value equality".
* === value equality for data compare for premitive types
* === value compare when memory or refernce matters like compating two instance having same reference 

To check for object equality you need to have a clear idea about what sort of equality you are interested in. 
- Do you want to check that these two things are the exact same instance? Then you can use JavaScript's built-in equality operators
- Or do you want to check that these two objects are the "same value?" If that's the case, then you'll need to do a bit more work.

Here is a very basic approach to checking an object's "value equality".
```javascript
function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    // If we made it this far, objects
    // are considered equivalent
    return true;
}
// Outputs: true
console.log(isEquivalent(bobaFett, jangoFett));
```

For a robust method of checking objects' "value equality" it is better to rely on a well-tested library that covers the various edge cases. Both Underscore and Lo-Dash have implementations named _.isEqual which handle deep object comparisons well. You can use them like this:
```javascript
// Outputs: true
console.log(_.isEqual(bobaFett, jangoFett));
```

examples 

```javascript
//Primitive Type Comparison
var a = 1;
var b = 1;
var c = a;

console.log(a == b);  //true
console.log(a === b); //true
console.log(a == c);  //true
console.log(a === c); //true
```

```javascript
//Object comparison
var a = { blah: 1 };
var b = { blah: 1 };
var c = a;

console.log(a == b);    //false
console.log(a === b);   //false
console.log(a == c);	  //true
console.log(a === c);   //true
```

Reference equality, shallow equality and deep equality
-----------------------------------------------------
First of all, let’s look at why we need a deep comparison instead of just using ===.

-  Reference equality
-  shallow equality 
-  deep equality

In this example I’m using the shallowEquals and deepEqual libraries. Since deep-equal on NPM requires a module loader I’ve used the bower version instead.
```javascript
user1 = {
    name: "John",
    address: {
        line1: "55 Green Park Road",
        line2: "Purple Valley"  
    }
}
```
This is the object we are going to compare against.
```javascript
user2 = user1;
console.log("user1 === user2", user1 === user2);
console.log("shallowEqual(user1, user2)", shallowEqual(user1, user2));
console.log("deepEqual(user1, user2)", deepEqual(user1, user2));

// user1 === user2 true
// shallowEqual(user1, user2) true
// deepEqual(user1, user2) true
```
Since both user1 and user2 ultimately refer to the same object all our comparisons return true.
However, there are many cases where two objects have the same content but don’t reference the same object.
```javascript
user2 = {
    name: "John",
    address: user1.address
}
console.log("user1 === user2", user1 === user2);
console.log("shallowEqual(user1, user2)", shallowEqual(user1, user2));
console.log("deepEqual(user1, user2)", deepEqual(user1, user2));

// user1 === user2 false
// shallowEqual(user1, user2) true
// deepEqual(user1, user2) true
```

Here the objects have the same data but are not referentially equal.
Finally, let’s not directly re-use any references from user1 and just re-type the same object literal.
```javascript
user2 = {
    name: "John",
    address: {
        line1: "55 Green Park Road",
        line2: "Purple Valley" 
    }
}
console.log("user1 === user2", user1 === user2);
console.log("shallowEqual(user1, user2)", shallowEqual(user1, user2));
console.log("deepEqual(user1, user2)", deepEqual(user1, user2));

// user1 === user2 false
// shallowEqual(user1, user2) false
// deepEqual(user1, user2) true
```

shallowEqual works by comparing each object property of the two users using ===. That means that when it reaches the address object, it doesn’t go deeper to compare the contents and relies on the two objects having the same reference.

As a result shallowEqual thinks the two objects are equal in the second example but not in the third.

deepEqual on the other hand goes deeper into the object when it reaches the address. It compares the strings for ``line1 and line2 with === and decides that the two objects are equal``.

### Checking for equality with JSON.stringify
Another way to compare two objects is to convert them to JSON and check if the resulting strings are equal:
```javascript
function jsonEqual(a,b) {
    return JSON.stringify(a) === JSON.stringify(b);
}
jsonEqual(user1, user2) // true in all three cases above

```
Like deepEqual this method cares about the contents of the object, rather than referential equality.
in this case all cases will return true 