---
tags:
  - javascript
published: true
date: 2020-03-20T13:54:07.809Z
title: Introduction to the DOM, DOM Tree, Nodes and Elements Part-1
---


Introduction to the DOM
-----------------------
The Document Object Model, usually referred to as the DOM, is an essential part of making websites interactive. It is an interface that allows a programming language to manipulate the content, structure, and style of a website. JavaScript is the client-side scripting...

Understanding the DOM Tree and Nodes
------------------------------------
The DOM is often referred to as the DOM tree, and consists of a tree of objects called nodes. In the Introduction to the DOM, we went over what the Document Object Model (DOM) is, how to access...

How To Access Elements in the DOM
---------------------------------
In order to be proficient at accessing elements in the DOM, it is necessary to have a working knowledge of CSS selectors, syntax and terminology as well as an understanding of HTML elements. In this tutorial, we will go over several ways to access elements in the DOM: by ID, class, tag, and query selectors.

How To Traverse the DOM
----------------------
This tutorial will go over how to traverse the DOM (also known as walking or navigating the DOM) with parent, child, and sibling properties.

How To Make Changes to the DOM
------------------------------
In this tutorial, we will go over how to create new nodes and insert them into the DOM, replace existing nodes, and remove nodes.

How To Modify Attributes, Classes, and Styles in the DOM
---------------------------------------------------------
In this tutorial, we will learn how to further alter the DOM by modifying styles, classes, and other attributes of HTML element nodes. This will give you a greater understanding of how to manipulate essential elements within the DOM.

Understanding Events in JavaScript
----------------------------------
Events are actions that take place in the browser that can be initiated by either the user or the browser itself. In this JavaScript aticle, we will go over event handlers, event listeners, and event objects. We'll also go over three different ways to write code to handle events, and a few of the most common events. By learning about events, you'll be able to make a more interactive web experience for end users.

What is the DOM?
---------------

At the most basic level, a website consists of an HTML document. The browser that you use to view the website is a program that interprets HTML and CSS and renders the style, content, and structure into the page that you see.

In addition to parsing the style and structure of the HTML and CSS, the browser creates a representation of the document known as the Document Object Model. This model allows JavaScript to access the text content and elements of the website document as objects.

JavaScript is an interactive language, and it is easier to understand new concepts by doing. Let’s create a very basic website. Create an index.html file and save it in a new project directory.

### The Document Object
The document object is a built-in object that has many properties and methods that we can use to access and modify websites. In order to understand how to work with the DOM, you must understand how objects work in JavaScript. Review Understanding Objects in JavaScript if you don’t feel comfortable with the concept of objects.

In Developer Tools on index.html, move to the Console tab. Type document into the console and press ENTER. You will see that what is output is the same as what you see in the Elements tab.

document;
Output
#document
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Learning the DOM</title>
  </head>
  <body>
    <h1>Document Object Model</h1>
  </body>
</html>
```

document is an object, body is a property of that object that we have accessed with dot notation. Submitting document.body to the console outputs the body element and everything inside of it.

In the console, we can change some of the live properties of the body object on this website. We’ll edit the style attribute, changing the background color to fuchsia. Type this into the console:
```javascript
document.body.style.backgroundColor = 'tks';
```
After typing and submitting the above code, you’ll see the live update to the site, as the background color changes.

``Note:`` In order to change the background-color CSS property, we had to type backgroundColor in the JavaScript. Any hyphenated CSS property will be written in camelCase in JavaScript.

lets explore more on DOM 

For more in-depth information on the DOM, review the Document Object Model (DOM) page on the Mozilla Developer Network.

The DOM is often referred to as the DOM tree, and consists of a tree of objects called nodes. In the Introduction to the DOM, we went over what the Document Object Model (DOM) is, how to access the document object and modify its properties with the console, and the difference between HTML source code and the DOM.

In this tutorial, we will review HTML terminology, which is essential to working with JavaScript and the DOM, and we will learn about the DOM tree, what nodes are, and how to identify the most common node types. Finally, we will move beyond the console and create a JavaScript program to interactively modify the DOM.

- HTML Terminology
Understanding HTML and JavaScript terminology is essential to understanding how to work with the DOM. Let’s briefly review some HTML terminology.

To begin, let’s take a look at this HTML element.
```html
<a href="index.html">Home</a>
```
Here we have an anchor element, which is a link to index.html.

- a is the tag
- href is the attribute
- index.html is the attribute value
- Home is the text.
- Everything between the opening and closing tag combined make the entire HTML element.

We’ll be working with the index.html from the previous tutorial:
```html
index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Learning the DOM</title>
  </head>
  <body>
    <h1>Document Object Model</h1>
  </body>
</html>
```
The simplest way to access an element with JavaScript is by the id attribute. Let’s add the link we have above into our index.html file with an id of nav.

index.html
```html
<body>
  <h1>Document Object Model</h1>
  <a id="nav" href="index.html">Home</a>
</body>
```
Load or reload the page in your browser window and look at the DOM to ensure that the code has been updated.

We’re going to use the getElementById() method to access the entire element. In the console, type the following:
```javascript
document.getElementById('nav');
// <a id="nav" href="index.html">Home</a>
```
We have retrieved the entire element using getElementById(). Now, instead of typing that object and method every time we want to access the nav link, we can place the element into a variable to work with it more easily.
```javascript
let navLink = document.getElementById('nav');
navLink.href = 'https://www.wikipedia.org';
navLink.textContent = 'Navigate to Wikipedia';
```
The navLink variable contains our anchor element. From here, we can easily modify attributes and values. For example, we can change where the link goes by changing the href attribute:

We can also change the text content by reassigning the textContent property:
Now when we view our element, either in the console or by checking the Elements tag, we can see how the element has been updated.
```html
<a id="nav" href="https://www.wikipedia.org/">Navigate to Wikipedia</a>
```
This is also reflected on the front-end of the website.