---
date: 2023-03-22
title: 'What does AWS CDK bootstrap does'
shortTitle: 'What does AWS CDK bootstrap does'
description: 'What does AWS CDK bootstrap does'
template: post
featuredImage: '../thumbnails/featured/aws-cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: what-does-aws-cdk-bootstrap-do
categories:
  - aws-cdk
  - aws
  - nodejs
  - dynamodb
  - microservices
  - Highlight
tags:
  - aws-cdk
  - aws
  - nodejs
  - microservices
---


When comparing the performance of NestJS and Express, it's important to consider various factors that can affect their performance. Both frameworks are used for building server-side applications in Node.js, but they have different design philosophies and features.

Scalability: NestJS is built on top of Express and provides additional features like dependency injection, module system, and decorators. These features can help in organizing and scaling large applications. However, for smaller applications, the additional features might not offer significant performance benefits.

Middleware: Both NestJS and Express support middleware, which are functions that can be executed before processing the request. Express has a simpler middleware system compared to NestJS, which can make it slightly faster for simple middleware operations.

TypeScript: NestJS is built with TypeScript and promotes the use of strong typing and decorators. This can help catch errors at compile-time and improve overall code quality. However, the additional TypeScript compilation step can slightly affect the startup time of a NestJS application compared to an Express app.

Community Support: Express has been around for a longer time and has a large and mature community. This means that you can find a wide range of third-party middleware, plugins, and resources to optimize and enhance the performance of your Express application. While NestJS has a growing community, it may not have the same level of community support as Express.

Caching and Performance Optimization: Both frameworks can benefit from performance optimization techniques like caching, using efficient database queries, and implementing proper request/response handling. The performance of your application will depend on how well you implement these techniques, regardless of the framework you choose.

In general, the performance difference between NestJS and Express is likely to be negligible for most applications. The choice between the two should be based on factors like development preferences, the need for additional features provided by NestJS, and the existing skill set of the development team.

It's also worth noting that the performance of an application is not solely determined by the framework used. Factors like server infrastructure, database performance, code efficiency, and network latency can have a more significant impact on the overall performance of an application.


We are now running benchmarks for every new PR. One of the latest benchmarks can be found here: https://github.com/nestjs/nest/runs/482105333

               Req/sec  Trans/sec
Nest-Express    15370   3.17MB  
Nest-Fastify    30001   4.38MB  
Express         17208   3.53MB  
Fastify         33578   4.87MB      
That means Nest + FastifyAdapter is now almost 2 times faster than express.

UPDATE - 22.09.2018

Benchmarks directory has been added to the repository: https://github.com/nestjs/nest/blob/master/benchmarks/all_output.txt (you can run benchmarks on your machine as well).

UPDATE - 24.06.2018

Nest v5.0.0 supports fastify. Fastify + Nest integration is even more performant than plain(!) express.

The following list shows what Nest is doing in comparison to plain express route handler:

it surrounds your route handler body with try..catch blocks
it makes every route handler async
it creates a global express router
it creates a separated router for each controller
it binds error-handling middleware
it binds body-parser middleware (both json and extended urlencoded)
All of the mentioned things reflect a real-world example (probably 99.9% express apps have to do this as well, it's unavoidable). It means that if you want to compare Express and Nest performance, you should at least cover above points. The comparison with the example below:

app.get('/', (req, res, next) => res.status(200).send('Hello world'));
Is unfair in this case, because it's not enough. When I cover these points, this is what I received (express 4.16.2):

Running 10s test @ http://localhost:3000
1024 connections

Stat         Avg    Stdev   Max
Latency (ms) 225.67 109.97  762
Req/Sec      4560   1034.78 5335
Bytes/Sec    990 kB 226 kB  1.18 MB

46k requests in 10s, 9.8 MB read
Additionally, Nest has to:

recognize whether a result is a Promise/Observable/plain value
based on the result type, use send() or json() (+1 condition)
add 3 conditions (if statements) to check pipes, interceptors and guards
There's an output for Nest (4.5.8):

Running 10s test @ http://localhost:3000
1024 connections

Stat         Avg    Stdev   Max
Latency (ms) 297.79 55.5    593
Req/Sec      3433.2 367.84  3649
Bytes/Sec    740 kB 81.9 kB 819 kB

34k requests in 10s, 7.41 MB read
This implies that Nest performance is around 79% express (-21%). This is due to the reasons set out above, and moreover, because Nest is compatible with Node 6.11.x which means that it can't use async/await under the hood - it has to use generators.

Which conclusion is to be drawn based on those stats? None, because we aren't used to creating applications that only returns plain strings without any asynchronous stuff. The comparisons with Hello world means nothing, it's only a titbit :)

PS. I used autocannon library https://github.com/mcollina/autocannon

autocannon -c 1024 -t30 http://localhost:3000