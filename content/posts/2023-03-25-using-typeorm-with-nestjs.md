---
date: 2023-03-25
title: 'How to use Nest JS with Typeorm for Database'
shortTitle: 'How to use Nest JS with Typeorm for Database'
description: 'How to use Nest JS with Typeorm for Database'
template: post
thumbnail: '../thumbnails/nestjs.png'
slug: how-to-use-nestjs-with-typeorm
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

Using TypeORM with NestJS is a common practice for building database-driven applications. Below is a step-by-step guide along with a demo example of how to integrate TypeORM into a NestJS project:

### Step 1: Install Dependencies
First, you need to install TypeORM and its required dependencies:

```bash
npm install --save @nestjs/typeorm typeorm mysql
```

### Step 2: Configure TypeORM
Create a `ormconfig.json` file in your project's root directory to configure TypeORM. Here's an example for MySQL:

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "your_username",
  "password": "your_password",
  "database": "your_database",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

### Step 3: Create an Entity
Define your database entities using TypeORM decorators. For example, let's create a `User` entity:

```typescript
// src/user/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

### Step 4: Create a Module
Create a module to handle TypeORM-related functionality. For example, let's create a `UserModule`:

```typescript
// src/user/user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
```

### Step 5: Use TypeORM in Service or Controller
You can inject TypeORM repositories into your services or controllers to interact with the database. For example, let's create a `UserService`:

```typescript
// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: number, user: User): Promise<User | undefined> {
    await this.userRepository.update(id, user);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
```

### Step 6: Register Module
Register the `UserModule` in your application's root module (usually `AppModule`):

```typescript
// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
  ],
})
export class AppModule {}
```

### Step 7: Use Service in Controller
You can now use the `UserService` in your controller to handle HTTP requests:

```typescript
// src/user/user.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }
}
```

That's it! You've integrated TypeORM into your NestJS application. You can now use TypeORM entities, repositories, and services to interact with your database seamlessly.