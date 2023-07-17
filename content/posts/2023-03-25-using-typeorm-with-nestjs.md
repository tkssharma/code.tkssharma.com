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



If you are working with NestJS and TypeORM version 3.x, it's important to note that as of my knowledge cutoff in September 2021, the latest stable version of TypeORM is 0.2.x. Please ensure that you have the correct version information and consider updating to the latest stable release to benefit from bug fixes and new features.

That being said, NestJS and TypeORM are commonly used together for building server-side applications with TypeScript. NestJS provides a framework for building scalable and modular applications, while TypeORM is an Object-Relational Mapping (ORM) library that simplifies database operations.

When using NestJS with TypeORM, here are some key points to keep in mind:

1. **Installation**: To use TypeORM with NestJS, you'll need to install both packages separately. You can install TypeORM by running `npm install typeorm` or `yarn add typeorm` in your project directory.

2. **Configuration**: TypeORM requires a configuration file to define the database connection and other settings. In NestJS, you can create a separate configuration file, or you can use the `TypeOrmModule.forRoot()` method in the root module (`AppModule`) to configure TypeORM.

3. **Entities**: In TypeORM, entities represent database tables. You can create entity classes in your NestJS application to define the structure and relationships of your database tables. These entities can be decorated with various TypeORM decorators to specify columns, relationships, and other options.

4. **Repositories**: TypeORM provides repositories as a way to perform database operations on entities. You can create custom repository classes or use the built-in repositories provided by TypeORM. NestJS allows you to inject repositories using dependency injection to access the database operations in your services or controllers.

5. **Migrations**: TypeORM supports database migrations, which are used to manage changes in the database schema over time. You can create migrations using the `typeorm-cli` package and run them to synchronize the database schema with your entity definitions.

6. **Querying**: TypeORM provides a query builder and supports various querying options like filtering, sorting, pagination, and joins. You can use these querying options in your NestJS services to interact with the database.

It's worth noting that TypeORM has continued to evolve since version 3.x, so newer versions may introduce new features and improvements. Make sure to refer to the official documentation of TypeORM and NestJS for the specific version you are using to get accurate and up-to-date information on their usage and integration.


Here are some code examples that demonstrate the integration of NestJS with TypeORM 3.x. Please note that the code examples assume you have already set up a NestJS project and installed the necessary dependencies.

1. **Setting up the database connection**:

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // For development purposes only
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

2. **Creating an entity**:

```typescript
// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  // ... other columns and relationships
}
```

3. **Creating a repository**:

```typescript
// user.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Custom repository methods can be defined here
}
```

4. **Using the repository in a service**:

```typescript
// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // ... other service methods
}
```

5. **Using the service in a controller**:

```typescript
// user.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  // ... other controller methods
}
```

These examples demonstrate the basic usage of NestJS with TypeORM 3.x. Remember to import and configure the necessary modules in your application's files, and adapt the code to fit your specific use case.

ormconfig file for running migrations

```js
require("dotenv").config();

import { DataSource } from "typeorm";

const connectionSource = new DataSource({
  migrationsTableName: "migrations",
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  ssl:
    process.env.NODE_ENV !== "local" && process.env.NODE_ENV !== "test"
      ? { rejectUnauthorized: false }
      : false,
  logging: false,
  name: "default",
  entities: ["src/**/**.entity{.ts,.js}"],
  migrations: ["src/migrations/*.{js,ts}"],
  subscribers: ["src/subscriber/*{.ts,.js}"],
});

export default connectionSource;

```

NPM script for running Migration with TypeORM 3.X

```json
    "typeorm": "typeorm-ts-node-commonjs -d ./ormconfig.ts",
    "migration:generate": "npm run typeorm migration:generate",
    "migration:show": "npm run typeorm migration:show",
    "migration:run": "npm run typeorm migration:run",
    "migration:revert": "npm run typeorm migration:revert",
    "migration:create": "typeorm-ts-node-commonjs migration:create"
```
### TypeORM 3.x

    "@nestjs/typeorm": "^8.0.2",
    "typeorm": "^0.3.10",