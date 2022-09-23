---
date: 2022-05-25
shortTitle: 'Nest js with apollo federation for building microservice architecture 🚀 Part-1'
title: 'Nest js with apollo federation for building microservice architecture 🚀 Part-1'
description: 'Nest js with apollo federation for building microservice architecture 🚀 Part-1'
template: post
thumbnail: '../thumbnails/nestjs.png'
slug: nestjs-with-apollo-federation-for-microservices-part-1
categories:
  - graphql
  - nestjs
  - apollo
  - Highlight
tags:
  - graphql
  - nestjs
  - apollo
  - apollo-federation
---

## At the end of this blog services we should be able to 🚀

- write apollo graphql gateway in nestjs 🎉
- write graphql service exposting interface to graphql gateway 🎉
- we will understand how apollo federation is doing under the hood schema sticthing for your microservice sub-graphs and how we are able to manage everything using single end point 🎉
- we will finally know how this architecture with apollo federation gateway with multiple microservice is a game changer technology 🎉

This is a series of Blogs
- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-2
- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-3
- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-4

To understand the whole architecture we will be building all these services together

- gateway Nestjs service (Gateway-service)
- graphql User service (Microservice-1) Auth/Authz
- graphql Home manager service (Microservice-2) Schema First Graphql Service
- graphql Booking manager service (Microservice-3) Schema First Graphql Service

## What Is GraphQL federation?

Federated architecture brings different services together into one API endpoint. As an example, imagine you have an application that gives you an overview of Apollo missions and their crew members.

In a typical monolith scenario, you would have a single application that would give you all the needed information about the different missions and crew members. Instead, what you would want is one service to manage information about missions and another service to manage information about astronauts. In this case, you could easily split your monolith into two GraphQL instances. However, now, your frontend would no longer work because it would need to call two different APIs then stitch the information together.

![](https://raw.githubusercontent.com/rkudryashov/graphql-federation/master/architecture.png)

### Understanding Nest JS Apollo Federation with Nest JS

Introduction to Apollo Federation
Combine GraphQL APIs into a unified supergraph
📣 Apollo Federation 2 is generally available!

Apollo Federation is a powerful, open architecture that helps you create a unified supergraph that combines multiple GraphQL APIs:

With federation, you can responsibly share ownership of your supergraph across any number of teams. And even if you currently only have one GraphQL API, Apollo Federation is essential for scaling that API as you grow your features, user base, and organization.

Federation also supports a free managed mode with Apollo Studio, which helps you modify and grow your supergraph without any downtime.

### How it works

In a federated architecture, your individual GraphQL APIs are called subgraphs, and they're composed into a supergraph. By querying your supergraph, clients can query all of your subgraphs at the same time:

A gateway serves as the public access point for your supergraph. It receives incoming GraphQL operations and intelligently distributes them across your subgraphs. To clients, this looks exactly the same as querying any other GraphQL server—no special configuration is required.

```javascript
Users subgraph
type User {
  id: ID!
  name: String!
}
Products subgraph
type Product {
  upc: String!
  inStock: Boolean!
}
```

To communicate with all of your subgraphs, the gateway uses a special supergraph schema that combines these subgraph schemas.

To create a supergraph schema, you use a process called composition. Composition takes all of your subgraph schemas and intelligently combines them into one schema for your gateway:

```javascript
Supergraph schema (simplified)
type User {
  id: ID!
  name: String!
}
```

```javascript
type Product {
  upc: String!
  inStock: Boolean!
}
```

Lets combine together

```javascript
Supergraph schema (simplified)
type User {
  id: ID!
  name: String!
}

type Product {
  upc: String!
  inStock: Boolean!
}
```

### Server instances

In a federated architecture, each subgraph instance has its own GraphQL server, and so does the gateway. External clients query the gateway, and the gateway then queries individual subgraphs to obtain, combine, and return results:

- The gateway is one of the following:
- An instance of Apollo Server using special extensions from the @apollo/gateway library
- An instance of the Apollo Router, a highly performant Rust-based graph router that is currently in public preview
  Subgraphs can run Apollo Server using special extensions from the @apollo/subgraph library, or they can run any other subgraph-compatible GraphQL server. Different subgraphs in the same supergraph can even use different server libraries.

## Unify your graph

Often when an organization first adopts GraphQL, multiple teams do so independently. Each team sets up a GraphQL server that provides the data used by that team:

Instead, your organization should expose a unified supergraph that lets clients fetch all of the data that they need from a single endpoint:

### Break up monolithic code

It can be challenging to represent an entire enterprise-scale graph with a monolithic GraphQL server. Performance might degrade as your users and features increase, and teams across your organization are all committing changes to the same application:

With a supergraph, you can reduce performance and productivity bottlenecks simultaneously. Each team can maintain their own subgraph(s) independently, and your supergraph's gateway serves primarily to route incoming operations, not to resolve each of them completely.

### How Gateway will look like

- we will expose graphql gateway using nestjs apollo federation
- we will write User graphql services exposing graphql interface
- we will write Cart graphql services exposing graphql interface

GraphQL federation/Gateway allows you to set up a single GraphQL API, or a gateway, that fetches from all your other APIs. Your mission service and your user/cart/blog service are now _subgraphs_.

Three main things about apollo federation

- it exposes single endpoint as graphql gateway
- all other services must expose sub graphql apis
- it combines all sub-graphs and provides (schem-stitching) under the hood by combining all sub-graphs
- This solves our problem of data fetching from different services, it does it all internally through schema.

![](../thumbnails/apollo-gateway.png)

### Conclusion

This was just a quick introduction on what is apollo graphql federation gateway, lets explore more about this in our next Blog where we will check actual code implementation of graphql Gateway in nestjs.

- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-2
- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-3
- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-4

### References

- https://www.apollographql.com/docs/federation/
- https://www.apollographql.com/docs/federation/federation-2/new-in-federation-2
- https://github.com/apollographql/supergraph-demo-fed2
- https://www.apollographql.com/docs/federation/federation-spec/
- https://docs.nestjs.com/graphql/migration-guide
- https://docs.nestjs.com/graphql/federation
