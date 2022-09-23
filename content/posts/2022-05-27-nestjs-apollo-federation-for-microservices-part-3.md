---
date: 2022-05-27
title: 'Nest js with apollo federation for building microservice architecture 🚀 Part-3'
shortTitle: 'Nest js with apollo federation for building microservice architecture 🚀 Part-3'
description: 'Nest js with apollo federation for building microservice architecture 🚀 Part-3'
template: post
thumbnail: '../thumbnails/nestjs.png'
slug: nestjs-with-apollo-federation-for-microservices-part-3
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

## Building Graphql Service (User Auth API microservice) 🚀 🚀

You can check Part-1/2 of this Blog from here, In this example we will build first graphql service Auth User Service

- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-1
- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-2

To understand the whole architecture we need to have

- gateway Nestjs service (Gateway-service)
- graphql User service (Microservice-1)
- graphql Home manager service (Microservice-2)

And we will see how we can fetch user and assigned home to the user from one single api end point, we will see how apolo gateway is stitiching data and composing data together in one api request.

### Lets build User Auth system in Graphql

- we are building schema first graphql service
- we will use nestjs/typeorm to persist data on database

This is how our dependancy looks like

```json
  "dependencies": {
    "@apollo/federation": "^0.36.1",
    "@nestjs/apollo": "^10.0.11",
    "@nestjs/common": "^8.0.0",
    "@nestjs/config": "^2.0.0",
    "@nestjs/core": "^8.0.0",
    "@nestjs/graphql": "^10.0.11",
    "@nestjs/jwt": "^8.0.0",
    "@nestjs/passport": "^8.2.1",
    "@nestjs/platform-express": "^8.0.0",
    "@nestjs/typeorm": "^8.0.3",
    "@sendgrid/mail": "^7.6.2",
    "apollo-server-core": "^3.7.0",
    "apollo-server-express": "^2.25.2",
    "bcrypt": "^5.0.1",
    "class-validator": "^0.13.2",
    "crypto": "^1.0.1",
    "dcrypt": "0.0.2",
    "debug": "^4.3.4",
    "dotenv": "^16.0.0",
    "graphql": "^15.8.0",
    "graphql-tool": "^1.0.0",
    "graphql-tools": "^8.2.8",
    "joi": "^14.3.1",
    "moment": "^2.29.3",
    "nodemailer": "^6.7.4",
    "passport": "^0.5.2",
    "passport-jwt": "^4.0.0",
    "pg": "^8.7.3",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^7.2.0",
    "ts-morph": "^14.0.0",
    "typeorm": "^0.3.6",
    "url-join-ts": "^1.0.5",
    "winston": "^3.7.2"
  }
```

We are building a basic user authentication system using nestjs/graphql
Our app module will contain all modules in the system

```typescript
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { DbModule } from './db/db.module';
import { UserEntity } from './users/entity/users.entity';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    DbModule.forRoot({
      entities: [UserEntity],
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      driver: ApolloFederationDriver,
      context: ({ req }: any) => ({ req }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.extensions?.exception?.response?.message || error?.message,
        };
        return graphQLFormattedError;
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.classes.ts'),
        outputAs: 'class',
      },
    }),
    UsersModule,
    AuthModule,
    ConfigModule,
    LoggerModule,
  ],
})
export class AppModule {}
```

We are using postgres to store the data related to user Entity and this typeOrm entity contains all user related fiels like

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255, select: true, unique: true })
  public email!: string;

  @Column({ type: 'varchar', length: 500 })
  public password!: string;

  @Column({ type: 'varchar', length: 255, select: true, unique: true })
  public username!: string;

  @Column({ type: 'jsonb', default: [] })
  public permissions!: string[];

  @Column({ type: 'varchar', length: 255, select: true })
  public lowercaseUsername!: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public lowercaseEmail!: string;

  @Column({ type: 'jsonb', default: null })
  public passwordReset!: any;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: true })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: true })
  public updated_at!: Date;
}
```

This application has user auth module and user module and both modules are using nestjs schema first approach for nestjs graphql
graphql definition looks simple for simple auth system

```graphql
type Query {
  login(user: LoginUserInput!): LoginResult!
  refreshToken: String!
}

type LoginResult {
  user: User!
  token: String!
}

input LoginUserInput {
  username: String
  email: String
  password: String!
}
```

For authentication we are using passport strategy to validate user using username/password, In this auth module we have `two different` query one is login and another is refreshToken, both can be defined in resolver

when we write nestjs graphql we write

- resolvers (having @Query and @Mutations)
- services (using typeORM)
- graphql schema
- main modle

Auth resolver here will talk to auth service

```typescript
import { Resolver, Args, Query, Context } from '@nestjs/graphql';
import { LoginUserInput, LoginResult } from '../graphql.classes';
import { AuthService } from './auth.service';
import { AuthenticationError } from 'apollo-server-core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../users/entity/users.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query('login')
  async login(@Args('user') user: LoginUserInput): Promise<LoginResult> {
    try {
      const result = await this.authService.validateUserByPassword(user);

      if (result) return result;
      throw new AuthenticationError('Could not log-in with the provided credentials');
    } catch (err) {
      throw err;
    }
  }

  // There is no username guard here because if the person has the token, they can be any user
  @Query('refreshToken')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Context('req') request: any): Promise<string> {
    const user: UserEntity = request.user;
    if (!user) throw new AuthenticationError('Could not log-in with the provided credentials');
    const result = await this.authService.createJwt(user);
    if (result) return result.token;
    throw new AuthenticationError('Could not log-in with the provided credentials');
  }
}
```

Our Auth service will validate User and allow user to login with token generation

```typescript
import { Injectable, forwardRef, Inject, ConsoleLogger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserInput, User, LoginResult } from '../graphql.classes';
import { ConfigService } from '../config/config.service';
import { resolve } from 'path';
import { Console } from 'console';
import { UserEntity } from '../users/entity/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  /**
   * Checks if a user's password is valid
   *
   * @param {LoginUserInput} loginAttempt Include username or email. If both are provided only
   * username will be used. Password must be provided.
   * @returns {(Promise<LoginResult | undefined>)} returns the User and token if successful, undefined if not
   * @memberof AuthService
   */
  async validateUserByPassword(loginAttempt: LoginUserInput): Promise<LoginResult | undefined> {
    console.log(loginAttempt);

    // This will be used for the initial login
    let userToAttempt: UserEntity | undefined;
    if (loginAttempt.email) {
      userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
    }

    // Check the supplied password against the hash stored for this email address
    let isMatch = false;
    try {
      isMatch = await this.comparePassword(loginAttempt.password, userToAttempt.password);
    } catch (error) {
      console.log(error);
      return undefined;
    }

    if (isMatch) {
      // If there is a successful match, generate a JWT for the user
      const token = this.createJwt(userToAttempt!).token;
      const result: any = {
        user: userToAttempt!,
        token,
      };
      userToAttempt.updated_at = new Date();
      userToAttempt.save();
      return result;
    }
    return null;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  /**
   * Verifies that the JWT payload associated with a JWT is valid by making sure the user exists and is enabled
   *
   * @param {JwtPayload} payload
   * @returns {(Promise<UserDocument | undefined>)} returns undefined if there is no user or the account is not enabled
   * @memberof AuthService
   */
  async validateJwtPayload(payload: JwtPayload): Promise<UserEntity | undefined> {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findOneByUsername(payload.username);

    // Ensure the user exists and their account isn't disabled
    if (user) {
      user.updated_at = new Date();
      user.save();
      return user;
    }

    return undefined;
  }

  /**
   * Creates a JwtPayload for the given User
   *
   * @param {User} user
   * @returns {{ data: JwtPayload; token: string }} The data contains the email, username, and expiration of the
   * token depending on the environment variable. Expiration could be undefined if there is none set. token is the
   * token created by signing the data.
   * @memberof AuthService
   */
  createJwt(user: UserEntity): { data: JwtPayload; token: string } {
    const expiresIn = this.configService.get().auth.expireIn as number;
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }
    const data: JwtPayload = {
      userId: user.id,
      username: user.username,
      permissions: user.permissions,
      expiration,
    };

    const jwt = this.jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }
}
```

Now we have another module as user Module there also we have

- user graohql schema
- resolver
- services
- entity
- user module

lets take a look at graphql schema for User Entity

```graphql
scalar Date

type Query {
  users: [User!]!
  user(id: ID!): User!
  forgotPassword(email: String): Boolean
}

type Mutation {
  createUser(createUserInput: CreateUserInput): User!
  updateUser(fieldsToUpdate: UpdateUserInput!, username: String): User!
  addAdminPermission(username: String!): User!
  removeAdminPermission(username: String!): User!
  resetPassword(username: String!, code: String!, password: String!): User!
}

type User @key(fields: "id") {
  id: ID!
  username: String!
  email: String!
  permissions: [String!]!
  created_at: Date!
  updated_at: Date!
}

input CreateUserInput {
  username: String!
  email: String!
  password: String!
}

input UpdateUserInput {
  username: String
  email: String
  password: UpdatePasswordInput
  enabled: Boolean
}

input UpdatePasswordInput {
  oldPassword: String!
  newPassword: String!
}
```

These Query and Mutations deals with User Operation like CRUD Operations

- crate a brand new User
- update a user
- assign admin permissions
- emove permissions
- reset password

So to manage all these our service will have all logic for User Entity

```typescript
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context, ResolveReference } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserInput, User, UpdateUserInput } from '../graphql.classes';
import { UsernameEmailAdminGuard } from '../auth/guards/username-email-admin.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UserInputError, ValidationError } from 'apollo-server-core';
import { AdminAllowedArgs } from '../decorators/admin-allowed-args';
import { UserEntity } from './entity/users.entity';
import { Logger } from 'src/logger/logger';
import { UserSignup } from './dto/users.dto';
import { validate } from 'class-validator';

@Resolver('User')
export class UserResolver {
  constructor(private usersService: UsersService, private readonly logger: Logger) {}

  @Query('users')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async users(): Promise<UserEntity[]> {
    return await this.usersService.getAllUsers();
  }

  // A NotFoundException is intentionally not sent so bots can't search for emails
  @Query('forgotPassword')
  async forgotPassword(@Args('email') email: string): Promise<boolean> {
    return await this.usersService.forgotPassword(email);
  }

  // What went wrong is intentionally not sent (wrong username or code or user not in reset status)
  @Mutation('resetPassword')
  async resetPassword(
    @Args('username') username: string,
    @Args('code') code: string,
    @Args('password') password: string
  ): Promise<UserEntity> {
    const user = await this.usersService.resetPassword(username, code, password);
    if (!user) throw new UserInputError('The password was not reset');
    return user;
  }

  @Mutation('createUser')
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<UserEntity> {
    let createdUser: UserEntity | null;
    try {
      const { email, username, password } = createUserInput;
      const userSignup = new UserSignup();
      userSignup.email = email;
      userSignup.username = username;
      userSignup.password = password;
      const errors = await validate(userSignup);

      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      return await this.usersService.create(createUserInput);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return createdUser;
  }

  @Mutation('updateUser')
  @AdminAllowedArgs('username', 'fieldsToUpdate.username', 'fieldsToUpdate.email', 'fieldsToUpdate.enabled')
  @UseGuards(JwtAuthGuard, UsernameEmailAdminGuard)
  async updateUser(
    @Args('username') username: string,
    @Args('fieldsToUpdate') fieldsToUpdate: UpdateUserInput,
    @Context('req') request: any
  ): Promise<UserEntity> {
    let user: UserEntity | undefined;
    if (!username && request.user) username = request.user.username;
    try {
      user = await this.usersService.update(username, fieldsToUpdate);
    } catch (error) {
      throw new ValidationError(error.message);
    }
    if (!user) throw new UserInputError('The user does not exist');
    return user;
  }

  @Mutation('addAdminPermission')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async addAdminPermission(@Args('username') username: string): Promise<UserEntity> {
    const user = await this.usersService.addPermission('admin', username);
    if (!user) throw new UserInputError('The user does not exist');
    return user;
  }

  @Mutation('removeAdminPermission')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async removeAdminPermission(@Args('username') username: string): Promise<UserEntity> {
    const user = await this.usersService.removePermission('admin', username);
    if (!user) throw new UserInputError('The user does not exist');
    return user;
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    this.logger.http('ResolveReference :: user');
    return await this.usersService.findOneByUserId(reference.id);
  }

  @Query('user')
  @UseGuards(JwtAuthGuard, AdminGuard)
  user(@Args('id') id: string) {
    return this.usersService.findOneByUserId(id);
  }
}
```

Now as we want this to be a part of apollo federation sub graphql we can use graphqlModule with federation Driver `ApolloFederationDriver`

```typescript
GraphQLModule.forRoot({
  typePaths: ['./**/*.graphql'],
  driver: ApolloFederationDriver,
  context: ({ req }: any) => ({ req }),
  formatError: (error: GraphQLError) => {
    const graphQLFormattedError: GraphQLFormattedError = {
      message: error?.extensions?.exception?.response?.message || error?.message,
    };
    return graphQLFormattedError;
  },
  definitions: {
    path: join(process.cwd(), 'src/graphql.classes.ts'),
    outputAs: 'class',
  },
});
```

This is a working example and instead of talking about the whole code here we will working on video session on the same where i will cover all about this user auth service using schema first approach nestjs/graphql
when we do npm run start:dev it will be able to host our auth service on PORT 3000 and we cna see all queries and mutations from auth service

We can plug this service to the graphql gateway, Now nest thing is build another service and create a simple usecase of composing graphes together

### Conclusion

This was just a quick introduction on what is apollo graphql federation gateway, lets explore more about this in our next Blog where we will check actual code implementation of graphql Gateway in nestjs.
Lets take a look on Part-3
https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-4

### References

- https://www.apollographql.com/docs/federation/
- https://www.apollographql.com/docs/federation/federation-2/new-in-federation-2
- https://github.com/apollographql/supergraph-demo-fed2
- https://www.apollographql.com/docs/federation/federation-spec/
- https://docs.nestjs.com/graphql/migration-guide
- https://docs.nestjs.com/graphql/federation
