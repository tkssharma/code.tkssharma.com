---
date: 2023-03-03
title: 'When you should use useCallback, useMemo React JS'
template: post
featuredImage: '../thumbnails/react.png'
thumbnail: '../thumbnails/react.png'
slug: when-use-usememo-usecallback
categories:
  - reactjs
  - nodejs
  - javascript
tags:
  - reactjs
  - nodejs
  - javascript
---

When you should use useCallback, useMemo React JS
==================================================

A common mistake React devs make is utilizing `useState` for every mutable value they need to persist between renders. `useState` is a good solution if the rendered output depends on the value, otherwise `useRef` would be a more optimal solution.

Consider the following example:

```javascript
const [firstName, setFirstName] = useState();  
return (  
  <form onSubmit={() => alert(firstName)}>  
    <input onChange={(e) => { setFirstName(e.target.value) }} />  
    <button>Submit</button>  
  </form>  
);
```


In this example every time the user types, the `firstName` state is updated. When a state is updated a re-render is triggered, meaning a re-render is happening every time the user types.

Since `firstName` isn’t being used in the rendered output we can replace it with `useRef`, and prevent the re-rendering.

```javascript
const firstName = useRef();  
return (  
  <form onSubmit={() => alert(firstName.current)}>  
    <input onChange={(e) => { firstName.current = e.target.value}}/>  
    <button>Submit</button>  
  </form>  
);
```

[memo](https://reactjs.org/docs/react-api.html#reactmemo)
=========================================================

One of the most important concepts to understand for optimizing React is [memoization](https://en.wikipedia.org/wiki/Memoization). Memoization is the process of caching the results of a function, and returning the cache for subsequent requests.

Re-rendering a component simply means calling the component’s function again. If that component has children components it will call those components’ functions, and so on all the way down the tree. The results are then diffed with the DOM to determine if the UI should be updated. This diffing process is called [reconciliation](https://reactjs.org/docs/reconciliation.html).

Since components are just functions though, they can be memoized using `React.memo()`. This prevents the component from re-rendering unless the dependencies (props) have changed. If you have a particularly heavy component then it is best to memoize it, but don’t memoize every component. Memoization uses memory and can be less performant in certain cases.

When a component is memoized, instead of re-rendering it, React diffs the component’s new props with its previous props. The trade off that needs to be considered here is how intensive it is to compare the props vs running the function. If you have a large object in your props, it could be less performant to memoize that component.

```javascript
const HeavyComponent: FC = () => { return <div/>}  
export const Heavy = React.memo(HeavyComponent);
```

ℹ️ [Use React.memo() wisely](https://dmitripavlutin.com/use-react-memo-wisely/).

[useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)
========================================================================

An important tool to prevent components that are memoized from re-rendering needlessly is `useCallback`. When passing a function into a memoized component you can unknowingly remove the memoizing effect by not memoizing that function using `useCallback`. The reason for this is [referential equality](https://dev.to/tylerthehaas/referential-equality-in-react-127h). As mentioned previously, every re-render calls a component’s function. This means if we’re declaring a function in the component, `a new function is created` every re-render. If we are passing that function as a prop to another component, even though the contents of the function do not actually change, the reference changes which causes the child component to re-render, even if it is memoized.

```javascript
export const ParentComponent = () => {  
  const handleSomething = () => {};  
  return <HeavyComponent onSomething={handleSomething} />  
};
```

In this example every time `ParentComponent` is re-rendered, `HeavyComponent` will re-render as well, even though it is `memoized`. We can fix this by using `useCallback` and prevent the reference from changing.

```javascript
export const ParentComponent = () => {  
  const handleSomething = useCallback(() => {}, []);  
  return <HeavyComponent onSomething={handleSomething} />  
};
```

ℹ️ It is important to know [when to use useCallback](https://kentcdodds.com/blog/usememo-and-usecallback), and when not.

[useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)
================================================================

By now we know that every `re-render means the component’s function is getting called` again. This means if your Component Function includes a call to an expensive function — that expensive function is being called every re-render. To avoid running the expensive function every re-render you can memoize it. The first render will call the function, and following re-renders will return the cached results of the function, rather than running it again.

The `useMemo` hook makes implementing memoization very simple:

const value = useMemo(() => expensiveFunction(aDep), [aDep]);

In our example value will be cached, and only updated when `aDep` changes.

ℹ️ It is important to know [when to use useMemo](https://kentcdodds.com/blog/usememo-and-usecallback), and when not.

[useState lazy initialization](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates)
==============================================================================================================

A lesser known feature of `useState` is the ability to lazily set the initial state. If you pass a function to `useState` it will only call the function when the component is initially rendered. This prevents the initial value from being set on every re-render, which is useful when your initial state is computationally heavy. If your initial value is not computationally heavy, lazy initialization is not recommended.

```javascript
const initialState = () => calculateSomethingExpensive(props);  
const [count, setCount] = useState(initialState);

```

ℹ️ [Read more](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates) about useState lazy initialization

Conclusion
==========

If this article was helpful to you, or if you know any tips to optimize performance in React, leave a message and let me know. 🙂