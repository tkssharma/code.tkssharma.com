---
date: 2022-07-09
title: 'Getting Started with building reusable packages for NestJS'
template: post
featuredImage: '../thumbnails/nestjs.png'
thumbnail: '../thumbnails/nestjs.png'
slug: building-nestjs-typescript-package
categories:
  - nodejs
  - express
  - nestjs
tags:
  - nodejs
  - express
  - nestjs
---


Getting Started with building reusable packages for NestJS. (Step-By-Step)
==========================================================================

![](https://miro.medium.com/max/1400/1*D9gQKEj2aUVX6gZ-Mi4qyQ.png)

For any node js developer NPM registry is like a weapon for a gladiator but against the gladiator that knows what his weapon was created with, it isn’t so necessary to know background details when we run npm install!

But that is not the end of the story, sometimes we need to directly interact with the NPM registry in order to publish our reusable packages for private usage across teams or even as an open source idea, so this time you need to act like a gladiator and enjoy publishing your package for the first time.

There are several articles about how to build and publish our reusable NestJS packages into the NPM registry around the net but I have tried to provide a quickest start as I can.

Setting up package
==================

Run `npm init` to initialize an empty npm package. The terminal will ask for the details of the project such as name and description so fill them as your desire according to your idea. Then just replace.

Install nestJS dependencies
===========================

npm install @nestjs/common rxjs  
npm install -d @types/node rimraf typescript

Edit package.json file
======================

After installing the dependencies of NestJS package go to your `package.json` file and add/edit following lines

"main": "dist/index.js",  
"types": "dist/index.d.ts",  
"scripts": {  
  "test": "echo "Error: no test specified" && exit 1",  
  "build": "rimraf dist && tsc",  
  "prepublish": "npm run build"  
},

Typescript config
=================

Create `tsconfig.json` in your application root directory and add the following code to it

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "target": "es2017",
    "module": "commonjs",
    "lib": ["es2017", "es7", "es6"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noImplicitAny": false,
    "strictNullChecks": false,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

Scaffolding
===========

Now it is time to scaffold our project , create a `src` folder and we will add our nest logic in this folder.

After all add an `index.ts` which will responsible to export our modules and services as well

here I am going to create a module and service for our example :

```sh
Project  
└─── src  
│   └───index.ts  
│   └─── …..  
└─── package.json  
└─── tsconfig.json
```

Add our code
============

In this example we will use dynamic modules and `useValue` method to create our package’s module.
NestJS providers: useValue, useClass and useFactory


### Providers in NestJS are one of the most important parts when it comes to writing fully configurable modules in both…

First we are going to add our module register options DTO, so create a folder named dto and add a file named `gladiator-options.dto.ts` on it.

Second, we’ll define a `GladiatorModule` to provide and export a `GladiatorService`. `GladiatorModule` is the host module for `GladiatorService`.

```js
import { Module, DynamicModule } from '@nestjs/common';
import { GladiatorService } from './gladiator.service';
import { GladiatorOptionsDto } from './dto/gladiator-options.dto';

@Module({})
export class GladiatorModule {
  static register(options: GladiatorOptionsDto) : DynamicModule {
    return {
      module: GladiatorModule,
      providers: [
        {
          provide: 'GLADIATOR_OPTIONS',
          useValue: options,
        },
        GladiatorService
      ],
      exports: [GladiatorService],
    }
  }
}
```

Now it is time to create our gladiator service

```js
import { Injectable, Inject } from '@nestjs/common';
import { GladiatorOptionsDto } from './dto/gladiator-options.dto';

@Injectable()
export class GladiatorService {

	constructor(
		@Inject('GLADIATOR_OPTIONS') 
		private gladiatorOptions: GladiatorOptionsDto
	) 
	{}

	async IsUsingSword(): Promise<boolean> {
		return this.gladiatorOptions.weapon == 'Sword'
	}
}
```

The final scaffolding will look like above:

```sh
GladiatorProject  
└─── src  
│   └───index.ts  
│   └─── gladiator.module.ts  
│   └─── gladiator.service.ts  
│   └─── dto  
│     └─── gladiator-options.ts  
└─── package.json  
└─── tsconfig.json
```
Export Application
==================

To make our code accessible for other applications we need to export our code, so add the following code in index.ts to make it possible.

```js
export * from './gladiator.module.ts';
export * from './gladiator.service.ts';
```

Build The Gladiator
===================

Now it is time to build our project by

```sh
npm install  
npm run build
```

This will compile our code into the dist folder.
Now we can use this package in our application by running this command :

```sh
npm i PATH_TO_OUR_PACKAGE
```

We should now register our gladiator package’s module into our main application module like this :

```js
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GladiatorModule } from 'gladiator'

@Module({
  imports: [GladiatorModule.register({
    weapon: "Sword",
    name: "Nikolaus",
    Level : 19
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

After registering module we can inject `GladiatorService` from gladiator package into our main application’s service or controller :


```js
import { Injectable } from '@nestjs/common';
import { GladiatorService } from 'gladiator';

@Injectable()
export class AppService {
  constructor(private readonly gladiatorService: GladiatorService) 
  {}

  async getGladiator(): Promise<boolean> {
    return await this.gladiatorService.IsUsingSword()
  }
}
```

Calling `this.gladiatorService.IsUsingSword()` should return true as we have passed `weapon: “Sword”` in module registration

The package is ready now you can enjoy by publishing it :D

Publish Package
===============

The are so many tutorials about publish package into npm registry , so here I am going to explain them in nutshell

> To complete this step, you’ll need a free account at [www.npmjs.com](https://www.npmjs.com/). If you don’t have one, go to the [signup page](https://www.npmjs.com/signup) to get one.

- Set a name for your package

you should chose a unique name for you package or just use scoped names. scoped names are useful for unique namespace, for example if any one publishes gladiator package, who ever publishes first the package will own the gladiator name.

with scoped name you can name your package like `@romans/gladiator`and any one that attends to install it will use : `npm i @romans/gladiator`

- Edit package.json


`package.json` is like an identity to your reusable library, so open up it and change the values like name, version and author name, you can also give a link into package git repository.

if you need more information about how to versioning your package in publishing/republishing go through this [semantic versioning (“semver”)](https://semver.org/) and it is best practice for npm packages.

- Publish Package

Go to [https://www.npmjs.com/signup](https://www.npmjs.com/signup) and register your account then run `npm login` in console. in the root of your package you can now run `npm run publish` to make a birthday for your new born package ;)
