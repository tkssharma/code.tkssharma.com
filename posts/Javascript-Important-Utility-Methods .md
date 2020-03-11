---
tags:
  - javascript
published: true
date: 2020-03-06T13:54:07.809Z
title: Javascript Important Utility Methods 
---

### Like sleep method delay the execution for n-ms

```javascript
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


async function sleepyWork() {
  console.log("I'm going to sleep for 1 second.");
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
```

### Converts an asynchronous function to return a promise.

In Node 8+, you can use util.promisify

Use currying to return a function returning a Promise that calls the original function. Use the ...rest operator to pass in all the parameters.

```javascript 
const promisify = (fn) =>  {
  return (...args) => {
    return fn(...args,  (err, results) => {
      return new Promise((resolve, reject) => (err ? reject(err) : resolve(result));
      })
    })
  }
}

```

```javascript
function demo(data, cb){
  db(data);
}

demo(data, function(data1){
    console.log(data1)
})
promisify(demo(data, cb)).then((data)=> {})

const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s
```

### run Promises in Series 

Use Array.prototype.reduce() to create a promise chain, where each promise returns the next promise when resolved.

let's use reduce method for doing this

```javascript
let array = [1,2,3,4,5,6];

array.reduce((a, b) => {
      return  a + b;   
}, 0)

array.reduce((accum, next) => {
      return accum.then(next); 
}, Promise.resolve())

// resolve first Promise and return another promise 
const runPromisesInSeries = (promises) => promises.reduce((accum) => accum.then(next), Promise.resolve());
runPromisesInSeries([ () => Promise.resolve('2'), () => Promise.resolve('3')])


```


