---
tags:
  - typescript
  - javascript
  - web development
  - React
  - Angular
published: true
date: 2020-03-24T13:54:07.809Z
title: Typescript Interview Questions
---

JavaScript is an integral part of Web Development. It is an era of new client-side frameworks or technologies like AngularJs, Gulp, Grunt, Yeoman, etc., that provide a better user experience. TypeScript is another important part of JavaScript that lets you write the code the way you really want to and addresses JavaScript issues .I believe that you are already aware of these facts and this has made you land on this TypeScript Interview Questions article.

So, if you are planning to start your career in Web Development and you wish to know the skills related to it, now is the right time to dive in, when the technology is in its blossoming state. TypeScript Interview Questions will provide you with in-depth knowledge and help you prepare for your interviews.

 
## Q1. What are the Differences between TypeScript and JavaScript?
TypeScript	JavaScript
TypeScript is an Object-Oriented language

* JavaScript is a Scripting language

*TS It has a feature known as Static typing

* TS It does not have static typing

* TypeScript gives support for modules

* JavaScript does not support modules

* It supports optional parameter function

* It does not support optional parameter function


## Q2. What is TypeScript?
typescript logo - typescript interview questions- TS

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It is pure object-oriented with classes, interfaces and statically typed programming languages like C# or Java. You will need a compiler to compile and generate the code in the JavaScript file. Basically, TypeScript is the ES6 version of JavaScript with some additional features.
```javascript
var message:string = "Welcome to TS!"
console.log(message)
```
A TypeScript code is written in a file with .ts extension and then compiled into JavaScript using the compiler. You can write the file in any code editor and the compiler needs to be installed on your platform. After the installation, the command tsc <filename>.ts compiles the TypeScript code into a plain JavaScript file.

## Why do we need TypeScript?
There are different reasons why a JavaScript developer should consider using TypeScript. Some of them include:

Using new features of ECMAScript: TypeScript supports new ECMAScript standards and transpile them to ECMAScript targets of your choice. So, you can use features of ES2015 and beyond.

- Static Typing: JavaScript is dynamically typed and does not know what type a variable is until it is actually instantiated at run-time. TypeScript adds type support to JavaScript.

- Type Inference: TypeScript makes typing a bit easier and a lot less explicit by the usage of type inference. Even if you don’t explicitly type the types, they are still there to save you from doing something which otherwise would result in a run-time error.

- Better IDE Support: The development experience with TypeScript is a great improvement over JavaScript. There is a wide range of IDEs that have excellent support for TypeScript, like Visual Studio & VS code, Atom, Sublime, and IntelliJ/WebStorm.

- Strict Null Checking: Errors, like cannot read property ‘x’ of undefined, is common in JavaScript programming. You can avoid most of these kinds of errors since one cannot use a variable that is not known to the TypeScript compiler.

- Interoperability: TypeScript is closely related to JavaScript so it has great interoperability capabilities, but some extra work is required to work with JavaScript libraries in TypeScript.


## Mention some of the features of TypeScript
features - typescript interview questions- TS


Cross-Platform:  The TypeScript compiler can be installed on any Operating System such as Windows, MacOS, and Linux.

Object-Oriented Language: TypeScript provides features like Classes, Interfaces, and Modules. Thus, it can write object-oriented code for client-side as well as server-side development.

Static Type-Checking: TypeScript uses static typing and helps type checking at compile time. Thus, you can find errors while writing the code without running the script.

Optional Static Typing: TypeScript also allows optional static typing in case you are using the dynamic typing of JavaScript.

DOM Manipulation: You can use TypeScript to manipulate the DOM for adding or removing elements.

ES 6 Features: TypeScript includes most features of planned ECMAScript 2015 (ES 6, 7) such as class, interface, Arrow functions, etc.

 

## What are the Benefits of using TypeScript?
The Benefits of using TypeScript are:

TypeScript is fast, simple, easy to learn and runs on any browser or JavaScript engine.

It is similar to JavaScript and uses the same syntax and semantics.

This helps backend developers write front-end code faster.

You can call the TypeScript code from an existing JavaScript code. Also, it works with existing JavaScript frameworks and libraries without any issues.

The Definition file, with .d.ts extension, provides support for existing JavaScript libraries like Jquery, D3.js, etc.

It includes features from ES6 and ES7 that can run in ES5-level JavaScript engines like Node.js.

 

## What are the Disadvantages of TypeScript?
TypeScript has the following disadvantages:

TypeScript takes a long time to compile the code.

It does not support abstract classes.

If we run the TypeScript application in the browser, a compilation step is required to transform TypeScript into JavaScript.

Web developers are using JavaScript for decades and TypeScript doesn’t bring anything new.

To use any third party library, the definition file is a must.

Quality of type definition files is a concern.

 

## What are the Components of TypeScript?
There are three different types of components in TypeScript which includes:

Language − It comprises of the syntax, keywords, and type annotations.

The TypeScript Compiler − This compiler (tsc) converts the instructions written in TypeScript to its JavaScript equivalent.

The TypeScript Language Service − The Language Service exposes an additional layer around the core compiler pipeline, editor-like applications. The language service supports the common set of typical editor operations.

 

##  Who developed Typescript and what is the current stable version available?
Anders Hejlsberg developed TypeScript. Also, he is one of the core members of the development team of C# language. The typescript was first released in the month of October 1st, 2012 and was labeled version 0.8. But, it is developed and maintained by Microsoft under the Apache 2 license. It was designed for the development of a large application.

The current stable version of TypeScript is 3.2 which was released on September 30, 2018. Typescript compiles to simple JavaScript code which runs on any browser that supports the ECMAScript 2015 framework. Also, it offers support for the latest and evolving JavaScript features.

 
## How to install TypeScript?
There are two main ways to install TypeScript tools such as:

```javascript
npm install -g typescript
```
By installing TypeScript via Visual Studio.

If you use Visual Studio or VS Code IDE, the easiest way to add to Visual Studio or VS Code is to search and add a package or download from the TypeScript website. Also, you can download TypeScript Tools for Visual Studio.

install - typescript interview questions - TS

##  How do you compile TypeScript files?
The extension for any TypeScript file is .ts. And any JavaScript file is a TypeScript file as it is a superset of JavaScript. So, once you change the extension of “.js” to “.ts”, your TypeScript file is ready. To compile any .ts file into .js use the following command:

tsc index.ts

For example, to compile “TS.ts”

tsc TS.ts

And the result would be TS.js


## Can we combine multiple .ts files into a single .js file?
Yes, we can combine multiple files. While compiling, we need to add –outFILE [filename] option.

tsc --outFile comman.js file1.ts file2.ts file3.ts

This will compile all 3 “.ts” file and output into a single “comman.js” file.

tsc --outFile file1.ts file2.ts file3.ts

If you don’t provide an output file name, file2.ts and file3.ts will be compiled and the output will be placed in file1.ts. So now your file1.ts contains JavaScript code.

## Q12. What are the different types of TypeScript?
The Type System represents the different types of values supported by the language. It checks the validity of the supplied values before they are stored or manipulated by the program.

types of typescript - typescript interview questions - TS

It can be classified into two types such as:

Built-in: This includes number, string, boolean, void, null and undefined.
User-defined: It includes Enumerations (enums), classes, interfaces, arrays, and tuple.
 

## Q13. List out the built-in data types in TypeScript.
In TypeScript, the built-in data types are also known as primitive data types and the list include:

Number: This represents number type values. The numbers are stored as floating-point values in TypeScript.

String: A string represents a sequence of characters stored as Unicode UTF-16 code.

Boolean: This represents a logical value. When we use the Boolean type, we get the output only in true or false.

Null: Null represents a variable whose value is undefined. It is not possible to directly reference the null type value itself.

Undefined: The Undefined type denotes all uninitialized variables.

Void: A void is the return type of the functions that do not return any type of value.


## Q14. What are Variables in TypeScript and how to create them?
A variable is a named space in the memory which is used to store values. The type syntax for declaring a variable in TypeScript includes a colon (:) after the variable name, followed by its type. Similar to JavaScript, we use the var keyword to declare a variable. While declaring a variable in Typescript, certain rules must be followed-

Course Curriculum
Full Stack Web Developer Masters Program
The variable name must be an alphabet or numeric digits.
You cannot start the name with digits.
It cannot contain spaces and special characters, except the underscore(_) and the dollar($) sign.
 

## Q15. What are the different ways of declaring a Variable?
There are four ways of declaring a variable:

1
var [identifier] : [type-annotation] = value; //Declaring type and value in a single statement
1
var [identifier] : [type-annotation]; //Declaring type without value
1
var [identifier] = value; //Declaring its value without type
1
var [identifier]; //Declaring without value and type
 

## Q16. Is it possible to compile .ts automatically with real-time changes in the .ts file?
Yes,  we can compile “.ts” automatically with real-time changes in the .ts file. This can be done by using –watch compiler option:

tsc --watch file1.ts

The above command first compiles file1.ts in file1.js and watch for the file changes. If there is any change detected, it will compile the file once again. Here, we need to ensure that the command prompt must not be closed on running with –watch option.


## Q17. What are the object-oriented terms supported by TypeScript?
TypeScript supports the following object-oriented terms:

- Modules
- Classes
- Interfaces
- Inheritance
- Data Types
- Member functions
 
## Q18. What are Interfaces in TypeScript?
The interface is a structure that defines the contract in your application. It defines the syntax for classes to follow. It contains only the declaration of the members and it is the responsibility of the deriving class to define the members. The TypeScript compiler uses interface for type-checking and checks whether the object has a specific structure or not.

Syntax:
```javascript
interface interface_name {
// variables' declaration
// methods' declaration
}
```

## Q19. What are Classes in TypeScript? List out some of the features.
TypeScript introduced classes so that they can avail the benefits of object-oriented techniques like encapsulation and abstraction. The class in TypeScript is compiled to plain JavaScript functions by the TypeScript compiler to work across platforms and browsers.

A class includes the following:

- Constructor
- Properties
- Methods

```javascript
class Employee {
empID: number;
empName: string;
 
constructor(ID: number, name: string) {
this.empName = name;
this.empID = ID;
}
 
getSalary() : number {
return 40000;
}
```
Some of the features of a class are:

- Inheritance
- Encapsulation
- Polymorphism
- Abstraction
 

## Q20. What are the access modifiers supported by TypeScript?
TypeScript supports access modifiers public, private and protected which determine the accessibility of a class member as given below:

Public – All the members of the class, its child classes, and the instance of the class can access.

Protected – All the members of the class and its child classes can access them. But the instance of the class can not access.

Private – Only the members of the class can access them.

If an access modifier is not specified it is implicitly public as that matches the convenient nature of JavaScript.

 

## Q21. How is TypeScript an optionally statically typed language?
TypeScript is referred to as optionally statically typed, which means you can ask the compiler to ignore the type of a variable. Using any data type, we can assign any type of value to the variable. TypeScript will not give any error checking during compilation.

Example:
```javascript
var unknownType: any = 4;
unknownType = "Welcome to TS"; //string
unknownType = false; // A boolean.
```

## Q22. What are modules in TypeScript?
A module is a powerful way of creating a group of related variables, functions, classes, and interfaces, etc. It can be executed within its own scope, but not in the global scope. Basically, you cannot access the variables, functions, classes, and interfaces declared in a module outside the module directly.

A module can be created by using the export keyword and can be used in other modules by using the import keyword.
```javascript
module module_name{
class xyz{
export sum(x, y){
return x+y;
   }
}
```

## Q23. What is the difference between the internal module and the external module?
Internal Module	External Module
Internal modules group the classes, interfaces, functions, variables into a single unit and can be exported in another module.

External modules are useful in hiding the internal statements of the module definitions and show only the methods and parameters associated with the declared variable.

Internal modules were a part of the earlier version of Typescript.
External modules are known as a module in the latest version.
These are local or exported members of other modules.
These are separately loaded bodies of code referenced using external module names.
Internal modules are declared using ModuleDeclarations that specify their name and body.
An external module is written as a separate source file that contains at least one import or export declaration.

 

## Q24. What is namespace in Typescript and how to declare it?
Namespace groups functionalities logically. These maintain the legacy code of typescript internally. It encapsulates the features and objects that share certain relationships. A namespace is also known as internal modules. A namespace can also include interfaces, classes, functions, and variables to support a group of related functionalities.

```javascript
namespace <namespace_name> {
export interface I1 { }
export class c1{ }
}
```

## Q25. Does TypeScript support function overloading?
Yes, TypeScript supports function overloading. But the implementation is odd. So, when you overload in TypeScript you only have one implementation with multiple signatures.

```javascript
class Customer {
    name: string;
    Id: number;
    add(Id: number);
    add(name:string);
    add(value: any) {
if (value && typeof value == "number") {
//Do something
  }
if (value && typeof value == "string") {
//Do Something
  }
}
```
The first signature has one parameter of type number whereas the second signature has a parameter of type string. The third function contains the actual implementation and has a parameter of type any. The implementation then checks for the type of the supplied parameter and executes a different piece of code based on the supplier parameter type.

 
## Q26. Explain Decorators in TypeScript.
A Decorator is a special kind of declaration that can be applied to classes, methods, accessor, property, or parameter. Decorators are functions that are prefixed @expression symbol, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

TypeScript Decorators serves the purpose of adding both annotations and metadata to the existing code in a declarative way. To enable experimental support for decorators,you need to enable the experimentalDecorators compiler option either on the command line or in our tsconfig.json:

Command Line

$tsc --target ES5 --experimentalDecorators

tsconfig.json
```json
{
"compilerOptions": {
"target": "ES5",
"experimentalDecorators": true
}
}
```
