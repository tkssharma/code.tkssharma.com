---
tags:
  - javascript
published: true
date: 2020-03-03T13:54:07.809Z
title: Javascript Interview Questions Advanced
---

## Write your own debounce method for some event 

```javascript
function debouce(fn, time){
   let timeoutId;

    return function() {
      // Check for existing calls
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        // Invoke fn
        fn.apply(this, arguments);
        // Clear timeout
        timeoutId = null;

      }, time);
    }
}
```

##  Remove Duplicate String (basic)

```javascript
function removeDuplicates(str) {
    const arr = str.split(' ');
    return [...new Set(arr)].join(' ');
}

```

## flatten Array in JS without using flat(n)

```javascript
function flatten(arr) {
	return arr.reduce(function(prev, curr) {
		if (Array.isArray(curr)) {
			prev = prev.concat(flatten(curr));
		} else {
            prev.push(curr);
		}
		return prev;
	}, []);
}

```

### Reverse a given String 

```javascript
function reverse(str) {
    return str.split('').reverse().join('');
}
// Readable reverse
function reverse(str) {
    return str.split(' ').reverse().join(' ');
}

```
### convert timeout function into a promise Implementation

```javascript 
const sleep = time => new Promise((resolve) => {
    setTimeout(()=>{
        resolve();
    }, time);
});

```

## Write your own bind method (using apply to wrap bind method)

```javascript 
function bind(fn, context){
  return () => {
    fn.apply(content, agruments);
  }
}
// exiasitng es5 function
Function.prototype.bind = function(context) {
    const _this = this;
    return function() {
        _this.apply(context);
    }
}
```
## explain call apply and Bind
Up until now we have treated functions as objects that are composed of a name (optional, can also be an anonymous function) and the code it executes when it is invoked. But that isn’t the entire truth. As a truth loving person, I must let you know that a function actually looks closer to the following image:

bind()
------

The official docs say: The bind() method creates a new function that, when called, has its this keyword set to the provided value. (It actually talks about even more stuff, but we’ll leave that for another time :) )
This is extremely powerful. It let’s us explicitly define the value of this when calling a function

```javascript
var pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};
var pokemonName = function() {
    console.log(this.getPokeName() + 'I choose you!');
};
var logPokemon = pokemonName.bind(pokemon);
logPokemon(); // 'Pika Chu I choose you!'
```

Let’s break it down. When we use the bind() method:
the JS engine is creating a new pokemonName instance and binding pokemon as its this variable. It is important to understand that it copies the pokemonName function.

After creating a copy of the pokemonName function it is able to call logPokemon(), although it wasn’t on the pokemon object initially. It will now recognizes its properties (Pika and Chu) and its methods.
And the cool thing is, after we bind() a value we can use the function just like it was any other normal function. We could even update the function to accept parameters, and pass them like so:
```javascript
var pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

var pokemonName = function(snack, hobby) {
    console.log(this.getPokeName() + 'I choose you!');
    console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
};

var logPokemon = pokemonName.bind(pokemon); // creates new object and binds pokemon. 'this' of pokemon === pokemon now
logPokemon('sushi', 'algorithms');
```

call(), apply(), fn.call(context, args)
---------------------------------------

The official docs for call() say: The call() method calls a function with a given this value and arguments provided individually.

What that means, is that we can call any function, and explicitly specify what this should reference within the calling function. Really similar to the bind() method! This can definitely save us from writing hacky code (even though we are all still hackerzzz).
- The main differences between bind() and call() is that the call() method: Accepts additional parameters as well
- Executes the function it was called upon right away.
The call() method does not make a copy of the function it is being called on.
call() and apply() serve the exact same purpose. The only difference between how they work is that call() expects all parameters to be passed in individually, whereas apply() expects an array of all of our parameters. Example:

```javascript
var pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};
var pokemonName = function(snack, hobby) {
    console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
};
pokemonName.call(pokemon,'sushi', 'algorithms'); // Pika Chu  loves sushi and algorithms
pokemonName.apply(pokemon,['sushi', 'algorithms']);
```