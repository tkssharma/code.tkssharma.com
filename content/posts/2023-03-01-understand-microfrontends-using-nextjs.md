---
date: 2023-03-01
title: 'Understanding Micro Frontend Architecture using Next JS'
template: post
featuredImage: '../thumbnails/nextjs.png'
thumbnail: '../thumbnails/nextjs.png'
slug: understanding-micro-frontends-using-nextjs
categories:
  - nextjs
  - nodejs
  - MicroFrontend
  - javascript
tags:
  - nextjs
  - nodejs
  - MicroFrontend
  - javascript
---

Understanding Micro Frontend Architecture using Next JS
================================

![](https://i.ytimg.com/vi/fbvb_52sTq0/maxresdefault.jpg)


Lets see how it all started and how its going these days ...
## Micro Frontends in 2016

ThoughtWorks began assessing a new technique known as "micro frontends" to gain similar benefits that microservices offered, but for the front end.

"An architectural style where independently deliverable frontend applications are composed into a greater whole"

In the November 2016 issue of the Thoughtworks technology radar, we listed micro frontends as a technique that organisations should Assess. We later promoted it into Trial, and finally into Adopt, which means that we see it as a proven approach that you should be using when it makes sense to do so.


## Micro Frontends in 2020

Webpack 5 was released and its Module Federation feature has opened the doors to new possibilities in the relatively young micro frontend paradigm.

### Micro frontends in a NextJS app

So micro frontends have actually been around for a while now and have been implemented in various ways. One of the newer and exciting additions to the ecosystem is Webpack 5 and its module federation feature.

Micro frontends are an architectural pattern that has become a hot topic in recent years for many good reasons. It has helped organisations break complex UI applications into smaller, more manageable pieces, as well as enabling teams to work end-to-end across a well-defined product or business domain whilst maintaining a consistent user experience across the entire app.

One of the key benefits of this approach is that it enables teams to be autonomous, working independently on deployable UI applications, reducing the risk of accidental coupling and defining clear boundaries around delimited contexts, minimising dependencies.


### module federation making it possible 

One of the module federation authors also created a library as a solution to allow Next.js applications to expose and consume remote modules. The example works like a charm when you run it… locally. The moment you want to deploy each application on separate hosts, it all falls apart. The problem is that the example relies on a local disk copy of the remote module when it is rendered on the server, which defeats the purpose of separate deployments for micro frontends.

It’s all about tradeoffs and if the server-side rendering of your remote modules isn’t critical, there’s a way to make it work. Let’s dive in. This is one of the common reference architectures of a micro frontends application:

Independent deployable apps are loaded in a single container to orchestrate a consistent user experience

![](https://cogent.co/wp-content/uploads/2021/06/microfrontends.png)

There is a “shell” or “container” that serves as the web platform for the individual micro frontends. Each application is deployed on separate hosts and can be modified without the need to rebuild the entire system. Let’s build 3 different application, here is the link of Github Repo 

Link https://github.com/tkssharma/nextjs-micro-frontends

We just have simple example where we are showing two components coming from two different applications to main container application 

Our components are simple 

### First Application

```javascript
import Image from 'next/image'
import styles from '../styles/Mario.module.css'

const Mario = () => {
  return (
    <main className={styles.main}>
      <Image
        src="https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png"
        alt="Mario"
        width={240}
        height={413}
      />
      <h1 className={styles.title}>
        G'day! I'm Mario, a microfrontend.
      </h1>
      <span>I'm hosted at <a target="_blank" href="https://mf-micro-front-end-activate.vercel.app">https://mf-micro-front-end-activate.vercel.app</a></span>
    </main>
  )
}

export default Mario
```

Our next config file

```javascript
const {
  withModuleFederation,
} = require("@module-federation/nextjs-mf");
module.exports = {
  future: { webpack5: true },
  images: {
    domains: ['upload.wikimedia.org'],
  },
  webpack: (config, options) => {
    const { isServer } = options;
    const mfConf = {
      mergeRuntime: true, //experimental
      name: "app2",
      library: {
        type: config.output.libraryTarget,
        name: "app2",
      },
      filename: "static/runtime/app2remoteEntry.js",
      remotes: {
      },
      exposes: {
        "./mario": "./components/mario",
      },
    };
    config.cache = false;
    withModuleFederation(config, options, mfConf);

    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
```

## Second Application 

```javascript
import Image from 'next/image'
import styles from '../styles/Luigi.module.css'

const Luigi = () => {
  return (
    <main className={styles.main}>
      <Image
        src="https://upload.wikimedia.org/wikipedia/en/7/73/Luigi_NSMBUDX.png"
        alt="Luigi"
        width={240}
        height={413}
      />
      <h1 className={styles.title}>
        G'day! I'm Luigi, a microfrontend.
      </h1>
      <span>I'm hosted at <a target="_blank" href="https://mf-micro-front-end-main.vercel.app">https://mf-micro-front-end-main.vercel.app</a></span>
    </main>
  )
}

export default Luigi
```

Next JS config 

```javascript
const {
  withModuleFederation,
} = require("@module-federation/nextjs-mf");
module.exports = {
  future: { webpack5: true },
  images: {
    domains: ['upload.wikimedia.org'],
  },
  webpack: (config, options) => {
    const { isServer } = options;
    const mfConf = {
      mergeRuntime: true, //experimental
      name: "app1",
      library: {
        type: config.output.libraryTarget,
        name: "app1",
      },
      filename: "static/runtime/app1RemoteEntry.js",
      remotes: {
      },
      exposes: {
        "./luigi": "./components/luigi",
      },
    };
    config.cache = false;
    withModuleFederation(config, options, mfConf);

    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
```

Now we will get both components on shell container components 

```javascript
const {
  withModuleFederation,
} = require("@module-federation/nextjs-mf");

module.exports = {
  future: { webpack5: true },
  images: {
    domains: ['upload.wikimedia.org'],
  },
  webpack: (config, options) => {
    const mfConf = {
      name: "shell",
      library: {
        type: config.output.libraryTarget,
        name: "shell",
      },
      remotes: {
        app1: "app1",
        app2: "app2",
      },
      exposes: {
      },
    };
    config.cache = false;
    withModuleFederation(config, options, mfConf);

    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
```
Import Module in container application 

```javascript

import dynamic from 'next/dynamic'

const RemoteLuigi = dynamic(
  () => import("app1/luigi"),
  { ssr: false }
)

const App2 = () => (<RemoteLuigi />)

export default App2


// another page 

import dynamic from 'next/dynamic'

const RemoteMario = dynamic(
  () => import('app2/mario'),
  { ssr: false }
)

const App1 = () => (<RemoteMario />)

export default App1

```
### How to Test setup 

```sh
cd micro-front-end-activate
npm install 
nbpm run build
npm run dev


cd micro-front-end-main
npm install
npm run build
npm run dev


cd micro-front-end-shell
npm install 
npm run build 
npm run dev 

```

## Testing setup

- localhost:3000/mario will render mario component from app2
- localhost:3000/luigi will render luigi component from app1 

Module federation allows a JavaScript application to dynamically load code from another application — in the process, sharing dependencies, if an application consuming a federated module does not have a dependency needed by the federated code — Webpack will download the missing dependency from that federated build origin.

This demo was only to showcase how it works, i have created demo also on the same Here 

[![](https://i.ytimg.com/vi/fbvb_52sTq0/maxresdefault.jpg)](https://www.youtube.com/watch?v=fbvb_52sTq0&t=1s)
