---
date: 2022-05-28
title: 'Nest js with apollo federation for building microservice architecture 🚀 Part-4'
shortTitle: 'Nest js with apollo federation for building microservice architecture 🚀 Part-4'
description: 'Nest js with apollo federation for building microservice architecture 🚀 Part-4'
template: post
thumbnail: '../thumbnails/nestjs.png'
slug: nestjs-with-apollo-federation-for-microservices-part-4
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

## Building Graphql Service (Home APIs) 🚀 🚀

You can check Part-1/2/3 of this Blog from here, In this example we will build another graphql service Home APIs

Github :
https://github.com/tkssharma/nestjs-with-apollo-federation-gateway

- https://code.tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-1
- https://code.tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-2
- https://code.tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-3

To understand the whole architecture we need to have

- gateway Nestjs service (Gateway-service)
- graphql User service (Microservice-1)
- graphql Home manager service (Microservice-2)

Overall we have one gateway and two microservice exposing graphql interface.

In this Post we are building Home Service and Most importantly we will see how gateway is composing all sub-graphs and fetching data together for us from different graphs

- The whole Objective of this series is how we can fetch Home APIs data with User Data, How gateway is composing both data together where data is here in different service databases

## Lets Build Home APIs

Its lerna project and we have these 3 modules

- gateway nestjs module
- user auth api module
- home service api module

All graphql services using schema first approach that means first we will write schema and then we will write

- resolvers
- services
- modules
- root modules

Resolvers will map to the query and mutations we have and interact with services to fetch data
Lets check folder structure

<div>
<img src="../thumbnails/service-snap.png" alt="drawing" style="width:150px;"/>
</div>
<br/>
- We are building simple home crud APIs, Lets create basic things

- Home Graphql Schema
- Home Module
- Home Service
- Home Entity
- Home DTO
- Home Resolver

Home Entity

```javascript
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
@Entity('homes')
export class Home extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column('varchar', { length: 500, unique: true })
  public name!: string;

  @Column({ type: 'uuid' })
  public user_id!: string;


  @Column('varchar')
  public description!: string;

  @Column({ type: 'jsonb', default: [] })
  public display_images!: string[];

  @Column({ type: 'jsonb', default: [] })
  public original_images!: string[];

  @Column({ type: 'jsonb', default: null })
  public metadata!: any;

  @Column({ type: 'boolean', default: true, select: true })
  public is_active!: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public updated_at!: Date;

  @DeleteDateColumn()
  public deleted_at?: Date | null;

}
```

Home Graphql Schema

```javascript
scalar Date
scalar Upload

type Home @key (fields: "id"){
    id: ID!
    name: String!
    user: User
    description: String!
    display_images: [String!]
    original_images: [String!]
    is_active: Boolean!
    created_at: Date
    updated_at: Date
}

extend type User @key(fields: "id") {
  id: ID! @external
}

type Query {
    homes: [Home!]
    home(id: ID): Home!
    findHomes(name: String!): [Home!]
    activeHomes: [Home!]
}
input HomeInput {
  name: String!
  description: String!
  is_active: Boolean!
}

type Mutation {
    createHome(payload: HomeInput!): Home
    updateHome(id: ID!, payload: HomeInput!): Home
}
```

Lets take a close look here We have home Schema and we are extending User Type here from other service

```javascript
type Home @key (fields: "id"){
    id: ID!
    name: String!
    user: User
    description: String!
    display_images: [String!]
    original_images: [String!]
    is_active: Boolean!
    created_at: Date
    updated_at: Date
}

extend type User @key(fields: "id") {
  id: ID! @external
}
```

Lets add resolver which should be simple data fetch from services

```javascript
import { AdminGuard } from '@app/auth/guards/admin.guard';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Logger } from '@logger/logger';
import { ConsoleLogger, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Parent, ResolveField, Context, ResolveReference } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { HomeLocality } from '../entity/home-locality.entity';
import { Home } from '../entity/home.entity';
import { HomeService } from './home.service';

@Resolver((of: any) => Home)
export class HomeResolver {
  constructor(private homeService: HomeService,
    private readonly logger: Logger) {
  }

  @Query()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async homes() {
    return await this.homeService.listAll();
  }

  @Query()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findHomes(@Args('name') name: string) {
    return await this.homeService.findHome(name);
  }

  @Query()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async activeHomes() {
    return await this.homeService.listAllActiveHomes();
  }

  @Query()
  async home(@Args('id') id: string) {
    return await this.homeService.getById(id);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async createHome(@Args() args: any, @Context() context: any) {
    const { userid } = context.req.headers;
    return await this.homeService.createHome(args, userid);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateHome(@Args('id') id: string, @Args() args: any) {
    return await this.homeService.updateHome(id, args);
  }
  @ResolveField('user')
  user(@Parent() home: Home) {
    this.logger.http("ResolveField::user::HomeResolver" + home.user_id)
    return { __typename: 'User', id: home.user_id };
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    this.logger.http('Logging :: ResolveReference :: home')
    return await this.homeService.getByHomeId(reference.id);
  }
}
```

Everything is simple here except two methods which you see in the last of the resolvers
and they are the one responsible for fetching data cross services
`ResolveField`, `ResolveReference`
ResolveReference - means when any other services need Home data based on ID this method graphql gateway will invoke
`ResolveField` - this is reference so when in home graphql if i want to get data of User then i have to resolve that data from another service `@ResolveField('user')` this will ask gateway to resolve User by passing `{ __typename: 'User', id: home.user_id }` this to the gateway, Now gateway will check who can give me this User Type for this id as userId

Notes -- Very very Important [keep TypeORM entity class name same as Graphql Types such as User and Home]

```javascript
  @ResolveField('user')
  user(@Parent() home: Home) {
    this.logger.http("ResolveField::user::HomeResolver" + home.user_id)
    return { __typename: 'User', id: home.user_id };
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    this.logger.http('Logging :: ResolveReference :: home')
    return await this.homeService.getByHomeId(reference.id);
  }
```

You can also access the context if its has ben set already

```javascript
  async createHome(@Args() args: any, @Context() context: any) {
    const { userid } = context.req.headers;
    return await this.homeService.createHome(args, userid);
  }
```

Now service is just using TypeORM Repo to fetch data for Us

```javascript
import { Logger } from '@logger/logger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { HomeFacility } from '../entity/home-facility.entity';
import { HomeLocality } from '../entity/home-locality.entity';
import { Home } from '../entity/home.entity';
import { CreateHomeDto } from './home.dto';


@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home) private readonly homeRepository: Repository<Home>,
    @InjectRepository(HomeLocality) private readonly homeLocalityRepository: Repository<HomeLocality>,
    private readonly logger: Logger
  ) {
  }

  async createHome(data: any, userid: string): Promise<Home> {
    const body = data.payload;
    try {
      const existingHome = await this.homeRepository.findOne({ where: { name: body.name } })
      if (existingHome) {
        return existingHome;
      }
      const res = await this.homeRepository
        .save({ ...body, user_id: userid });
      return res;
    } catch (err: any) {
      this.logger.error(err);
      throw err;
    }
  }


  async updateHome(id: string, data: any): Promise<Home> {
    const body = data.payload;
    const homeHome = await this.homeRepository.findOne({ where: { id } });
    const updatedHome = { ...homeHome, ...body }
    return await this.homeRepository.save(updatedHome)
  }

  async listAll() {
    return await this.homeRepository.find({ relations: ['locality', 'facilities'] });
  }

  async findHome(name: string) {
    return await this.homeRepository.find({ where: { name: ILike(`%${name}%`) }, relations: ['locality', 'facilities'] });
  }

  async listAllActiveHomes() {
    return await this.homeRepository.find({ where: { is_active: true }, relations: ['locality', 'facilities'] });
  }

  async getById(id: string) {
    return await this.homeRepository.findOne({ where: { id, is_active: true }, relations: ['locality', 'facilities'] });
  }

  async getByHomeName(name: string) {
    return await this.homeRepository.findOne({ where: { name } });
  }

  async getByHomeId(id: string) {
    return await this.homeRepository.findOne({ where: { id } });
  }
}
```

Finally our Domain Module

```javascript
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@app/config/config.module';
import { DbModule } from '../../db/db.module';
import { Home } from './entity/home.entity';
import { HomeModule } from './home/home.module';
import { LoggerModule } from '@logger/logger.module';
import { Upload } from '../Scalars/upload.scalar';

import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    DbModule.forRoot({
      entities: [Home],
    }),
    LoggerModule,
    HomeModule,
    ConfigModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      uploads: false,
      driver: ApolloFederationDriver,
      context: ({ req }: any) => ({ req }),
      formatError: (error: GraphQLError) => {
        console.log(error);
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.extensions?.exception?.response?.message || error?.message,
        };
        return graphQLFormattedError;
      },
    }),
  ],
})
export class DomainModule {}
```

This module also using `ApolloFederationDriver` so these services can use schema from other services
From the whole code the real magic is happening in schema

```javascript
extend type User @key(fields: "id") {
  id: ID! @external
}
```

All these `@key`, `@provided` , `@external` is provided in apollo specs

### @key

```javascript
directive @key(fields: _FieldSet!) repeatable on OBJECT | INTERFACE
```

The @key directive is used to indicate a combination of fields that can be used to uniquely identify and fetch an object or interface.

```javascript
type Product @key(fields: "upc") {
  upc: UPC!
  name: String
}
```

Multiple keys can be defined on a single object type:

#### @provides

directive @provides(fields: \_FieldSet!) on FIELD_DEFINITION
The @provides directive is used to annotate the expected returned fieldset from a field on a base type that is guaranteed to be selectable by the gateway. Given the following example:

```javascript
type Review @key(fields: "id") {
  product: Product @provides(fields: "name")
}

extend type Product @key(fields: "upc") {
  upc: String @external
  name: String @external
}
```

When fetching Review.product from the Reviews service, it is possible to request the name with the expectation that the Reviews service can provide it when going from review to product. Product.name is an external field on an external type which is why the local type extension of Product and annotation of name is required.

#### @requires

directive @requires(fields: \_FieldSet!) on FIELD_DEFINITION
The @requires directive is used to annotate the required input fieldset from a base type for a resolver. It is used to develop a query plan where the required fields may not be needed by the client, but the service may need additional information from other services. For example:

```javascript
# extended from the Users service
extend type User @key(fields: "id") {
  id: ID! @external
  email: String @external
  reviews: [Review] @requires(fields: "email")
}
```

In this case, the Reviews service adds new capabilities to the User type by providing a list of reviews related to a user. In order to fetch these reviews, the Reviews service needs to know the email of the User from the Users service in order to look up the reviews. This means the reviews field / resolver requires the email field from the base User type.

#### @external

directive @external on FIELD_DEFINITION
The @external directive is used to mark a field as owned by another service. This allows service A to use fields from service B while also knowing at runtime the types of that field. For example:

```javascript
# extended from the Users service
extend type User @key(fields: "email") {
  email: String @external
  reviews: [Review]
}
```

lets See this in action

- we need docker-compose up so we can have all database available for TypeORM
- `docker-compose up` will crate container
- install package dependencies in all projects
- run applications and final run gateway

### Setting up the whole platform Locally

This platform contains all these components

- User Management service
- Home Manager service
- Gateway Service
- Home Manager Service

### Running all these services

- we are using docker-compose to bootstrap all container only (database containers) in the root of the project run

```
docker-compose up
```

- check the longs and make sure databases has been created

```
git clone <repo>
cd nestjs-with-apollo-federation-gateway
cd packages
```

### Running Auth service

```sh
cd auth-service
vi .env
```

update env with this content

```
DATABASE_URL= postgres://api:development_pass@localhost:5431/auth-api
SENDGRID_API_KEY=SSSS
SENDGRID_VERIFIED_SENDER_EMAIL=ssss@gmail.com
DEBUG="ssss:*"
LOG_LEVEL=http
PORT=5006
NODE_ENV=local
JWT_SECRET=HELLO
JWT_EXPIRE_IN=3600*24
```

Now run application in watch mode it will be live on localhost:5006

```sh
npm run start:dev
```

### Running Home Manager

```sh
cd home-manager
vi .env
```

update env with this content

```
NODE_ENV=local
LOG_LEVEL=http
PORT=5003
SECRET_KEY=HELLO
NEW_RELIC_KEY=
DATABASE_URL=postgres://api:development_pass@localhost:5433/home-manager-api
```

Now run application in watch mode it will be live on localhost:5003

```sh
npm run start:dev
```

docker-compose up
![](../thumbnails/service-snap-3.png)

Auth Apis `npm run start:dev`
![](../thumbnails/service-snap-4.png)

Home Apis `npm run start:dev`
![](../thumbnails/service-snap-5.png)

For Gateway also trigger same command `npm run start:dev`

Now lets test our application
Our Gateway is connected to both sub-graphq apis running on different ports
We have to make sure both service are running before running gateway service

```json
{ name: 'User', url: 'http://localhost:5006/graphql' },
{ name: 'Home', url: 'http://localhost:5003/graphql' },
```

If you are using same PORT and env then Gateway will run on `http://localhost:5002/graphql`

![](../thumbnails/service-snap-2.png)

### Conclusion

I hope this series is useful for devs who are looking for setting up Nest JS graphql gateway with federation support
Important Pats and challenging tasks
Notes ::

- getting all dependencies working with each other (migration is a real pain)
- TypeORM migration will create entities as we start application
- https://github.com/tkssharma/nestjs-with-apollo-federation-gateway clone this repo and play with this

- https://code.tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-2
- https://code.tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-3
- https://code.tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-4

### References

- https://www.apollographql.com/docs/federation/federation-spec/#key
- https://www.apollographql.com/docs/federation
- https://www.apollographql.com/docs/federation/
- https://www.apollographql.com/docs/federation/federation-2/new-in-federation-2
- https://github.com/apollographql/supergraph-demo-fed2
- https://www.apollographql.com/docs/federation/federation-spec/
- https://docs.nestjs.com/graphql/migration-guide
- https://docs.nestjs.com/graphql/federation
