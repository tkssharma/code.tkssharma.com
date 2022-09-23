---
date: 2022-05-26
title: 'Nest js with apollo federation for building microservice architecture 🚀 Part-2'
template: post
thumbnail: '../thumbnails/nestjs.png'
slug: nestjs-with-apollo-federation-for-microservices-part-2
categories:
  - graphql
  - nestjs
  - apollo
tags:
  - graphql
  - nestjs
  - apollo
  - apollo-federation
---

## Building Graphql apollo federation using nestjs framework 🚀 🚀

Github link
https://github.com/tkssharma/nestjs-with-apollo-federation-gateway

You can check Part-1 of this Blog from here
https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-1

![](../thumbnails/apollo-graphql-2.png)

Everything we are talking here is in context of nestjs, You can write something using express or any other node js framework
We will use nestjs to build services which will expose graphql interface

![](../thumbnails/nestjs-apollo-1.png)

### Lets build apollo federation Gateway

![](../thumbnails/nestjs-gql-apollo.jpg)

Guys, i have faced many challenged to build this example and repository and we still have a lot of mess created with nestjs/graphql versions with rest of the apollo ecosystems.

### federation

These days we are only talking about microservice and with that how can we build distributed architecture.
Now a days GraphQL is becoming the preferred query language due to its flexibility. As we know microservices are difficult to work with. For example, how do you avoid multiple endpoints for users? One solution is to implement federation.

Before Federation came into picture we were doing those things with Schema stitching, we can just quickly check how both of these are different

### Federation vs schema stitching

Schema stitching was the previous solution for microservice architecture. Both federation and schema stitching do offer the same functionality on the surface, gathering multiple services into one unified gateway, but the implementation is different.

With GraphQL federation, you tell the gateway where it needs to look for the different objects and what URLs they live at. The subgraphs provide metadata that the gateway uses to automatically stitch everything together. This is a low-maintenance approach that gives your team a lot of flexibility.

With schema stitching, you must define the “stitching” in the gateway yourself. Your team now has a separate service that needs to be altered, which limits flexibility. The use case for schema stitching is when your underlying services are not all GraphQL. Schema stitching allows you to create a gateway connected to a REST API, for example, while federation only works with GraphQL.

So when should you use either one? Many will say that federation is the overall winner, as it allows teams to focus on their application without needing to maintain a gateway. But if you have different types of APIs, you have to go with schema stitching.

In our example we are going tot alk about Graphql Federation.
we can create a simple nestjs application using nest-cli
To get started, you can either scaffold the project with the Nest CLI, or clone a starter project (both will produce the same outcome).

To scaffold the project with the Nest CLI, run the following commands. This will create a new project directory, and populate the directory with the initial core Nest files and supporting modules, creating a conventional base structure for your project. Creating a new project with the Nest CLI is recommended for first-time users. We'll continue with this approach in First Steps.

```sh
$ npm i -g @nestjs/cli
$ nest new project-name
```

Alternatives
Alternatively, to install the TypeScript starter project with Git:

```sh
$ git clone https://github.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```

Lets start by adding required dependencies

```json
 "dependencies": {
    "@apollo/gateway": "0.46.0",
    "@nestjs/apollo": "9.2.4",
    "@nestjs/common": "8.2.3",
    "@nestjs/core": "8.2.3",
    "@nestjs/graphql": "10.0.0",
    "@nestjs/platform-express": "8.2.3",
    "apollo-server-express": "3.6.2",
    "dotenv": "^16.0.0",
    "graphql": "15.7.2",
    "graphql-tools": "8.0.0",
    "graphql-upload": "^13.0.0",
    "jsonwebtoken": "^8.5.1",
    "reflect-metadata": "0.1.13",
    "rimraf": "3.0.2",
    "rxjs": "7.4.0",
    "ts-morph": "12.2.0"
  }
```

With the latest Migration https://docs.nestjs.com/graphql/migration-guide
its now easy to build a simple apollo federation gateway without using any other external library

```javascript
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import {
  Module,
  BadRequestException,
  HttpStatus,
  HttpException,
  UnauthorizedException,
  MiddlewareConsumer,
} from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
GraphQLModule.forRoot <
  ApolloGatewayDriverConfig >
  {
    driver: ApolloGatewayDriver,
    gateway: {
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          { name: 'User', url: 'http://localhost:5006/graphql' },
          { name: 'Home', url: 'http://localhost:5003/graphql' },
        ],
      }),
    },
  };
```

With recent nestjs/graphql 10.x Migration we can just pass driver and same GraphqlModule will work as gateway Module

```javascript
GraphQLModule.forRoot <
  ApolloGatewayDriverConfig >
  {
    driver: ApolloGatewayDriver,
  };
```

And Gateway definition contains list of all sub-graph services

```javascript

gateway: {
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'User', url: 'http://localhost:5006/graphql' },
        { name: 'Home', url: 'http://localhost:5003/graphql' },
        { name: 'Booking', url: 'http://localhost:5004/graphql' },
      ],
    }),
  }
```

Lets have e look into the whole definition of file

```javascript
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import {
  Module,
  BadRequestException,
  HttpStatus,
  HttpException,
  UnauthorizedException,
  MiddlewareConsumer,
} from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { verify, decode } from 'jsonwebtoken';
import { INVALID_AUTH_TOKEN, INVALID_BEARER_TOKEN } from './app.constants';
import { graphqlUploadExpress } from 'graphql-upload';

const getToken = (authToken: string): string => {
  console.log(authToken);
  const match = authToken.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    throw new HttpException({ message: INVALID_BEARER_TOKEN }, HttpStatus.UNAUTHORIZED);
  }
  console.log(match[1]);
  return match[1];
};

const decodeToken = (tokenString: string) => {
  const decoded = verify(tokenString, process.env.SECRET_KEY);
  if (!decoded) {
    throw new HttpException({ message: INVALID_AUTH_TOKEN }, HttpStatus.UNAUTHORIZED);
  }
  return decoded;
};
const handleAuth = ({ req }) => {
  try {
    if (req.headers.authorization) {
      const token = getToken(req.headers.authorization);
      const decoded: any = decodeToken(token);
      return {
        userId: decoded.userId,
        permissions: decoded.permissions,
        authorization: `${req.headers.authorization}`,
      };
    }
  } catch (err) {
    throw new UnauthorizedException('User unauthorized with invalid authorization Headers');
  }
};
@Module({
  imports: [
    GraphQLModule.forRoot <
      ApolloGatewayDriverConfig >
      {
        server: {
          context: handleAuth,
        },
        driver: ApolloGatewayDriver,
        gateway: {
          buildService: ({ name, url }) => {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }: any) {
                request.http.headers.set('userId', context.userId);
                // for now pass authorization also
                request.http.headers.set('authorization', context.authorization);
                request.http.headers.set('permissions', context.permissions);
              },
            });
          },
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              { name: 'User', url: 'http://localhost:5006/graphql' },
              { name: 'Home', url: 'http://localhost:5003/graphql' },
              { name: 'Booking', url: 'http://localhost:5004/graphql' },
            ],
          }),
        },
      },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
```

This contains a lots of code, lets talk about all these one by one

- this gateway is composing all subgraphs
- this gateway is managing authorization also by decoding token
- this gateway is building a request resource by `RemoteGraphQLDataSource` before making actual api call to downstream service
- this gateway is sending downstream request to list of a particular subgraphs based on what client in requesting from query

```javascript
GraphQLModule.forRoot <
  ApolloGatewayDriverConfig >
  {
    server: {
      context: handleAuth,
    },
  };

const handleAuth = ({ req }) => {
  try {
    if (req.headers.authorization) {
      const token = getToken(req.headers.authorization);
      const decoded: any = decodeToken(token);
      return {
        userId: decoded.userId,
        permissions: decoded.permissions,
        authorization: `${req.headers.authorization}`,
      };
    }
  } catch (err) {
    throw new UnauthorizedException('User unauthorized with invalid authorization Headers');
  }
};
```

`context handleAuth` will validate authorization header and return data in context so we can access context payload further

```javascript
buildService: ({ name, url }) => {
  return new RemoteGraphQLDataSource({
    url,
    willSendRequest({ request, context }: any) {
      request.http.headers.set('userId', context.userId);
      // for now pass authorization also
      request.http.headers.set('authorization', context.authorization);
      request.http.headers.set('permissions', context.permissions);
    },
  });
};
```

`buildService` is building a request for all sub-graphs by sending data in headers from context, in this example we are sending user meta data in headers for the request.

So this is all about our gateway service which can talk and compose all sub-graphs into one single api endpoint.
After starting application

```sh
[Nest] 6612  - 05/23/2022, 11:25:39 AM     LOG [NestFactory] Starting Nest application...
[Nest] 6612  - 05/23/2022, 11:25:39 AM     LOG [InstanceLoader] AppModule dependencies initialized +30ms
[Nest] 6612  - 05/23/2022, 11:25:39 AM     LOG [InstanceLoader] GraphQLSchemaBuilderModule dependencies initialized +1ms
[Nest] 6612  - 05/23/2022, 11:25:39 AM     LOG [InstanceLoader] GraphQLModule dependencies initialized +0ms
[Nest] 6612  - 05/23/2022, 11:25:39 AM     LOG [NestApplication] Nest application successfully started +190ms
```

Our gateway is ready but we must also need all these sub-graphs ready otherwise it will throw error, so our first task is to get all these sb-graphs running on all those ports

```javascript
            { name: 'User', url: 'http://localhost:5006/graphql' },
            { name: 'Home', url: 'http://localhost:5003/graphql' },
            { name: 'Booking', url: 'http://localhost:5004/graphql' },
```

Now lets build simple graphql services so we can see how we can share data across different microservice and how this gateway is composing data together

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
