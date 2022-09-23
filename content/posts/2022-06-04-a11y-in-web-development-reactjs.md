---
date: 2022-06-04
title: 'learning accessibility standards reactjs'
shortTitle: 'learning accessibility standards reactjs'
description: 'learning accessibility standards reactjs'
template: post
featuredImage: '../thumbnails/reactjs.png'
thumbnail: '../thumbnails/reactjs.png'
slug: web-accessibility-a11y-using-reactjs
categories:
  - a11y
  - reactjs
  - web-design
tags:
  - web-design
  - reactjs 
  - a11y
---


Achieving Accessibility in React Applications
=============================================
a11y stands for `ACCESSIBILITY`
The phrase '11 characters'. Arrows are pointing to the first letter c and the letter t in the word 'accessibility' to show how the numeronym is formed.
The A11Y Project is a community-driven effort to make digital accessibility easier.


### What is accessibility?
This article starts off the module with a good look at what accessibility actually is — this includes what groups of people we need to consider and why, what tools different people use to interact with the Web, and how we can make accessibility part of our web development workflow.

###  HTML: A good basis for accessibility
A great deal of web content can be made accessible just by making sure that the correct HTML elements are used for the correct purpose at all times. This article looks in detail at how HTML can be used to ensure maximum accessibility.

###  CSS and JavaScript accessibility best practices
CSS and JavaScript, when used properly, also have the potential to allow for accessible web experiences. They can significantly harm accessibility if misused. This article outlines some CSS and JavaScript best practices that should be considered to ensure that even complex content is as accessible as possible.

###  WAI-ARIA basics
Following on from the previous article, sometimes making complex UI controls that involve unsemantic HTML and dynamic JavaScript-updated content can be difficult. WAI-ARIA is a technology that can help with such problems by adding in further semantics that browsers and assistive technologies can recognize and let users know what is going on. Here we'll show how to use it at a basic level to improve accessibility.

###  Accessible multimedia
Another category of content that can create accessibility problems is multimedia — video, audio, and image content need to be given proper textual alternatives so that they can be understood by assistive technologies and their users. This article shows how.

###  Mobile accessibility
With web access on mobile devices being so popular and popular platforms such as iOS and Android having fully-fledged accessibility tools, it is important to consider the accessibility of your web content on these platforms. This article looks at mobile-specific accessibility considerations.


What is Web Accessibility (A11y)
================================

Web Accessibility is the design of pages, tools and technologies on the web that can be used by everyone. Everyone here includes people with auditory, cognitive, neurological, physical, speech and visual disabilities. Accessibility support is necessary to allow assistive technology to interpret web pages and applications.

A11y is a numero-nym that stands for _accessibility_ as “a" followed by 11 more letters, followed by “y". Web development with accessibility in mind, ensures total inclusion of the entire population that use the web.

Why Web Accessibility
=====================

Web Accessibility as a feature has been seen as a very wrong way of design thinking because by default it excludes a large number of web users. People who cannot see or for some reason cannot use a trackpad or a mouse pointer for instance should have as much rights and access as people who can. Inclusive design starts by thinking about every web user equally, this would easily make you see web accessibility as a must and not a feature. Web accessibility also benefits people without disabilities, these people may include:

*   people using mobile phones, smart watches, smart TVs, and other devices with small screens, different input modes, etc.
*   older people with changing abilities due to ageing.
*   people with “temporary disabilities" such as a broken arm or lost glasses
*   people with “situational limitations" such as in bright sunlight or in an environment where they cannot listen to audio
*   people using a slow Internet connection, or who have limited or expensive bandwidth

Accessibility Standards and Guidelines
======================================

These are guidelines that govern how accessibility is achieved while building for and using the web. These ensure that there is support for screen readers, keyboard usability and captions for photos. Some of them are:

WCAG: The [Web Content Accessibility Guidelines](https://www.w3.org/WAI/intro/wcag) provides guidelines for creating accessible web sites. WCAG is developed through the W3C process in cooperation with individuals and organisations around the world, with a goal of providing a single shared standard for web content accessibility that meets the needs of individuals, organisations, and governments internationally.

WAI-ARIA: The [Web Accessibility Initiative — Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) document contains techniques for building fully accessible JavaScript widgets. It especially helps with dynamic content and advanced user interface controls developed with Ajax, HTML, JavaScript, and related technologies like React.

Barrier to Building Accessible JS Framework Apps..
==================================================

I would argue that the most dominant issue we have when trying to build accessible apps is caused by _developers writing non-semantic code_. Using JSX in inefficient ways that when compiled, the code would not be exactly semantic HTML. And we know that whenever there is non semantic HTML, assistive technologies like screen readers find it difficult to parse the content as it was intended. This process ends up in making the apps non-accessible.


1. Casing and Reserved Words
=================================

Writing semantic HTML in your React components would require that you pay attention to casing of attributes. In react, most HTML attributes are written in camel case.

maxlength becomes maxLengthtabindex becomes tabIndexcontenteditable becomes contentEditable  

However, all `aria-*` HTML attributes are fully supported in JSX these attributes should be hyphen-cased kebab-cased as they are in plain HTML:

  aria-label={labelText}  
  aria-required="true"

For reserved words, we have that some reserved words mean entirely different things in HTML and in javascript words like class and for are practical examples, so in React we change them like thus:

for becomes htmlForclass becomes className

2. Setting Page Titles
===========================

Setting the page title is another very powerful step to making your react application very accessible. It is actually crucial for screen readers, the page title is the first thing screen readers announce. It updates the content currently showing in the browser tab helping to announce exactly where the users (who might depend on screen readers) are in your application. It is also really great for search engine optimisation. It is done like this:

componentDidMount() {  document.title = “this is the page title";}

There is also a plugin you can use instead, [react-helmet](https://github.com/nfl/react-helmet) where you essentially handle head tags per page/component. This can be done like this:

```javascript
import React from "react";  
import {Helmet} from "react-helmet";  
  
class Application extends React.Component {  
  render () {  
    return (  
        <div className="application">  
            <Helmet>  
                <meta charSet="utf-8" />  
                <title>My Title</title>  
                <link rel="canonical" href="http://mysite.com/example" />  
            </Helmet>  
            ...  
        </div>  
    );  
  }  
};
```

3. Write Semantic HTML
=======================

To ensure that every code block of yours is going to be accessible, write good HTML code. We all make the quick button mistake:

<div onClick={this.onClick}  className="button">   <span>Click on me</span></div>

This would render a button, but it is not an accessible HTML button, a screen reader would not be able to interpret this. A more accessible and semantic code that does the same thing is this:

<button onClick={this.onClick}>  Click on me</button>

4. Never Forget the text Alt of any content
================================================

This is very important for every non-text content. Text is the most optimal format for any content, so make sure to add text alternatives. For images, use the alt:

<img src="apple.png" alt=" A big picture of an Apple " />

> All non-text content that is presented to the user has a text alternative that serves the equivalent purpose — Ire Aderinokun

For user interfaces, use labels:

```html
<div role="navigation" aria-label="Primary">  
  <ul>  
    <li>...a list of links here ...</li>  
  </ul>   
</div>  
<div role="navigation" aria-label="Secondary">  
  <ul>  
   <li>...a list of links here ...</li>   
  </ul>  
</div>

```

5. Handling Headers
========================

It is very important for assistive technologies like screen readers to use headers the way it was intended to be used and not in any other (confusing) form.

<h1> Main Heading </h1> <h2> Sub Heading </h2>  <h3> Sub Sub Heading </h3>

Anytime you are tempted to just bring in a h1 tag because of font, kindly head to the css file and style the sub header font instead.

> _Make text content readable and understandable and make Web pages appear and operate in predictable ways_ — Ire Aderinokun

6. Handling Live Announcements
===================================

If your React application fetches any data from any external source like an API, it makes sense to put some kind of structure in place for people using assistive technologies to be aware of the fetching of data going on. We can achieve this with live announcements. Here is a sample live announcement component:

```javascript
import React from "react";  
  
  
class Announcements extends React.Component {  
  render () {  
    return (  
        <div aria-live="polite" aria-atomic="true"   
          className="visuallyhidden">  
          {this.props.message}  
        </div>  
    );  
  }  
};
export default Announcements;
```

*   aria-live with the polite value indicates that the screen reader waits till everything else is read before reading the updated content.
*   aria-atomic attribute set to true tells the screen reader that all page content would be announced, not just the updated content.

After the announcement component has been created, to use the live announcement we:

*   first create a state property in a parent component

`this.state = {  message: null; };`

*   then set message, optimally at the point where the API or fetch logic is:

`this.setState({  message: “this is currently happening mate!" });`

*   finally, include the announcement component in the parent component like this:

<Announcements message={this.state.message} /> 

This would now set up live announcements properly for screen readers at specified points of your code where fetching of data occurs.

7. Using Fragments
===================

Fragments shipped with React 16.2.0, it allows you to group together a list of child elements without adding more nodes to the DOM. We know react component templates MUST always be wrapped with a HTML element for rendering to work correctly. This has made developers get really lazy and continuously wrap their code blocks with elements like divs (I used to always do this) We always end up with non-semantic HTML most times with the abuse of divs; remember how important semantic HTML is for accessibility.

Take a look at this sample template from [my react.lazy tutorial](/lazy-loading-react-components-with-react-lazy-and-suspense-f05c4cfde10c)

```html
<div> {artists.map(artist =>(  <div>  
    <li>1. Davido</li>  
    <li>2. Burna Boy</li>  
  </div>  <div id="card-body" key={artist.id}>   <h1>MTV Base Headline Artists 2019</h1>  </div> )}<div/>
  ```

The highlighted div actually really looks harmless but might result to non-semantic and sometimes invalid HTML and even creation of extra nodes like this when compiled back to HTML:
```html
<ul>  
 <div>  
    <li>1. Davido</li>  
    <li>2. Burna Boy</li>  
  </div>   
</ul>
```
So using React Fragments is the right way to get around this problem I bet you must have had before. With fragments, we can now have the same template be like this:

```html
<React.Fragment>  
    <li>1. Davido</li>  
    <li>2. Burna Boy</li>  
</React.Fragment>
```
This results in really semantic HTML:
```html
<ul>  
    <li>1. Davido</li>  
    <li>2. Burna Boy</li>  
</ul>
```
For shortcut lovers like myself, there is an optional and simpler syntax for React fragments. It is the use of empty angle brackets:

```
<>  
    <li>1. Davido</li>  
    <li>2. Burna Boy</li>  
</>
```

It is JSX syntax and it looks neater yes!

8. Keyboard Focus with refs
============================

We can use ref functions to handle where we want the user to focus on in our application. As your react application is a single page application with routes, it is important that users with disabilities know when a new route renders in the DOM because screen readers are silent when routes change. A more modern type of ref was introduced with React 16.3.0 _React.createRef()_. Using the new ref, we can control the focus with the following steps:

*   Create a ref for the component you want to add focus on
*   Attach the created ref to the element to focus on
*   Set the focus with a lifecycle method.

A Few Helpful Tools..
=====================

*   You can install ESLint Plugin for Code Editors.
*   You can also install ESLint jsx-a11y plugin for your React projects to display accessibility rules you miss while building your application.

npm install eslint-plugin-jsx-a11y  -— save-dev

*   Update your eslint.rc file’s plugin and extends sections in your code editor. For plugin section:
```javascript
“plugin": [   “jsx-a11y" ]
```
In the extends section:
```javascript
“extends": [  “plugin: jsx-a11y/recommended"]
```

References
==========

*   Every quote in this article is from [Ire’s blog](https://bitsofco.de/the-accessibility-cheatsheet/), she is easily my favourite web developer.
*   I got some resources and insights from [w3.org](https://www.w3.org/WAI/standards-guidelines/aria/).
*   Some notes from a seminar from Scott Vinkle, Accessibility Advocate at Shopify.
*   The [React Official Documentation](https://reactjs.org/docs/accessibility.html).
* https://www.a11yproject.com/resources/#html-and-aria


Conclusion
==========

By going through this article, you must have picked up various steps that would not only improve your efficiency writing React, but would also make you a global citizen, one who thinks equality and does not discriminate while building for the web. Now go out there and become an accessibility advocate, happy coding! Feel free to comment and ask anything 👐

