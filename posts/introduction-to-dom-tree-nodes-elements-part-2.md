---
tags:
  - javascript
published: true
date: 2020-03-10T13:54:07.809Z
title: Introduction to the DOM, DOM Tree, Nodes and Elements Part-1
---

In Understanding the DOM Tree and Nodes, we went over how the DOM is structured as a tree of objects called nodes, and that nodes can be text, comments, or elements. Usually when we access content in the DOM, it will be through an HTML element node.

In order to be proficient at accessing elements in the DOM, it is necessary to have a working knowledge of CSS selectors, syntax and terminology as well as an understanding of HTML elements. In this tutorial, we will go over several ways to access elements in the DOM: by ID, class, tag, and query selectors.


Here is a table overview of the five methods we will cover in this tutorial.

Gets	Selector Syntax	Method
* ID	#demo	getElementById()
* Class	.demo	getElementsByClassName()
* Tag	demo	getElementsByTagName()
* Selector (single)		querySelector()
* Selector (all)		querySelectorAll()
It is important when studying the DOM to type the examples on your own computer to ensure that you are understanding and retaining the information you learn.

You can save this HTML file, access.html, to your own project to work through the examples along with this article. If you are unsure how to work with JavaScript and HTML locally, review our How To Add JavaScript to HTML tutorial.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Accessing Elements in the DOM</title>

  <style>
    html { font-family: sans-serif; color: #333; }
    body { max-width: 500px; margin: 0 auto; padding: 0 15px; }
    div, article { padding: 10px; margin: 5px; border: 1px solid #dedede; }
  </style>

</head>

<body>

  <h1>Accessing Elements in the DOM</h1>
  <h2>ID (#demo)</h2>
  <div id="demo">Access me by ID</div>
  <h2>Class (.demo)</h2>
  <div class="demo">Access me by class (1)</div>
  <div class="demo">Access me by class (2)</div>
  <h2>Tag (article)</h2>
  <article>Access me by tag (1)</article>
  <article>Access me by tag (2)</article>
  <h2>Query Selector</h2>
  <div id="demo-query">Access me by query</div>
  <h2>Query Selector All</h2>
  <div class="demo-query-all">Access me by query all (1)</div>
  <div class="demo-query-all">Access me by query all (2)</div>
</body>
```
In this HTML file, we have many elements that we will access with different document methods. When we render the file in a browser, it will look similar to this:

### Accessing Elements by ID
The easiest way to access a single element in the DOM is by its unique ID. We can grab an element by ID with the getElementById() method of the document object.
```html
document.getElementById();
```
In order to be accessed by ID, the HTML element must have an id attribute. We have a div element with an ID of demo.
```html
<div id="demo">Access me by ID</div>
```
In the Console, let’s get the element and assign it to the demoId variable.

const demoId = document.getElementById('demo');
Logging demoId to the console will return our entire HTML element.
```html
console.log(demoId);
Output
<div id="demo">Access me by ID</div>
```
We can be sure we’re accessing the correct element by changing the border property to purple.
```javascript
demoId.style.border = '1px solid purple';
```

Accessing Elements by Class
----------------------------

The class attribute is used to access one or more specific elements in the DOM. We can get all the elements with a given class name with the getElementsByClassName() method.

document.getElementsByClassName();
Now we want to access more than one element, and in our example we have two elements with a demo class.
```html
<div class="demo">Access me by class (1)</div>
<div class="demo">Access me by class (2)</div>
```
Let’s access our elements in the Console and put them in a variable called demoClass.

const demoClass = document.getElementsByClassName('demo');
At this point, you might think you can modify the elements the same way you did with the ID example. However, if we try to run the following code and change the border property of the class demo elements to orange, we will get an error.
```javascript
demoClass.style.border = '1px solid orange';
Output
Uncaught TypeError: Cannot set property 'border' of undefined
The reason this doesn’t work is because instead of just getting one element, we have an array-like object of elements.

console.log(demoClass);
//Output
// (2) [div.demo, div.demo]
```
JavaScript arrays must be accessed with an index number. We can therefore change the first element of this array by using an index of 0.
```javascript
demoClass[0].style.border = '1px solid orange';
```
Generally when accessing elements by class, we want to apply a change to all the elements in the document with that particular class, not just one. We can do this by creating a for loop, and looping through every item in the array.
```javascript
for (i = 0; i < demoClass.length; i++) {
  demoClass[i].style.border = '1px solid orange';
}
```
Accessing Elements by Tag
-------------------------

A less specific way to access multiple elements on the page would be by its HTML tag name. We access an element by tag with the getElementsByTagName() method.

document.getElementsByTagName();
For our tag example, we’re using article elements.
```html
<article>Access me by tag (1)</article>
<article>Access me by tag (2)</article>
```
Just like accessing an element by its class, getElementsByTagName() will return an array-like object of elements, and we can modify every tag in the document with a for loop.
```javascript
const demoTag = document.getElementsByTagName('article');

for (i = 0; i < demoTag.length; i++) {
  demoTag[i].style.border = '1px solid blue';
}
```

Using the query selector methods is extremely powerful, as you can access any element or group of elements in the DOM the same way you would in a CSS file. For a complete list of selectors, review CSS Selectors on the Mozilla Developer Network.

### Complete JavaScript Code
Below is the complete script of the work we did above. You can use it to access all the elements on our example page. Save the file as access.js and load it in to the HTML file right before the closing body tag.

```javascript
access.js
// Assign all elements
const demoId = document.getElementById('demo');
const demoClass = document.getElementsByClassName('demo');
const demoTag = document.getElementsByTagName('article');
const demoQuery = document.querySelector('#demo-query');
const demoQueryAll = document.querySelectorAll('.demo-query-all');

// Change border of ID demo to purple
demoId.style.border = '1px solid purple';

// Change border of class demo to orange
for (i = 0; i < demoClass.length; i++) {
  demoClass[i].style.border = '1px solid orange';
}

// Change border of tag demo to blue
for (i = 0; i < demoTag.length; i++) {
  demoTag[i].style.border = '1px solid blue';
}

// Change border of ID demo-query to red
demoQuery.style.border = '1px solid red';

// Change border of class query-all to green
demoQueryAll.forEach(query => {
  query.style.border = '1px solid green';
});
```