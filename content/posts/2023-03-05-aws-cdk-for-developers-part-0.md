---
date: 2023-03-05
title: 'AWS CDK for deploying AWS Resources [Series]'
template: post
featuredImage: '../thumbnails/cdk.png'
thumbnail: '../thumbnails/cdk.png'
slug: aws-cdk-for-deploying-aws-resources-blogs-series
categories:
  - aws
  - aws-cdk
  - serverless
  - lambda
  - sns 
tags:
  - aws
  - aws-cdk
  - serverless
  - lambda
  - sns 
---

Create Your First AWS CDK App to Understand its Power
=====================================================

Why it’s the most developer-friendly way to write serverless applications
-------------------------------------------------------------------------

![](https://www.simform.com/wp-content/uploads/2018/08/Serverless-Examples-with-AWS-Lambda-Use-Cases.png)

In this age of cloud development and serverless architecture, the ability to write infrastructure as code is really powerful.

There are many options to choose from. Let’s explore them!

Options to consider
===================

AWS has several tools to support infrastructure as code. Among them, `**Cloudformation**` is the most powerful one but it’s very verbose.

Another option is `**AWS SAM**` which is an extension of Cloudformation with reduced syntax. But unlike `**Cloudformation**` we have to use `JSON` or `YAML` syntax for this.

Then comes the AWS CDK

What is AWS CDK?
================

The AWS Cloud Development Kit (AWS CDK) is an open-source software development framework to define your cloud application resources using familiar programming languages.

Provisioning cloud applications can be a challenging process that requires you to perform manual actions, write custom scripts, maintain templates, or learn domain-specific languages. AWS CDK uses the familiarity and expressive power of programming languages for modeling your applications. It provides high-level components called constructs that preconfigure cloud resources with proven defaults, so you can build cloud applications with ease. AWS CDK provisions your resources in a safe, repeatable manner through AWS CloudFormation. It also allows you to compose and share your own custom constructs incorporating your organization's requirements, helping you expedite new projects.

According to AWS documentation.

The AWS Cloud Development Kit (AWS CDK) is **an open source software development framework to define your cloud application resources using familiar programming languages**

In simple terms, we can use our `typescript` or `python` code to define resources in the cloud.

This is powerful for us developers because we don’t have to use some fancy YAML syntax to write infrastructure code anymore!

What we will build today?
=========================

To understand the power of AWS CDK we will build a simple hello world application. it will have a `Lambda` function and an `ApiGateway` resource and can also attach `sns` and `dynamo DB` database

We will invoke the API to get a response from the lambda.

Let’s begin.

Initialize the project
======================

Go to your terminal and run the following commands
mkdir learn-aws-cdkcd learn-aws-cdkcdk init app --language typescript

we will create AWS CDK stack to build and deploy lambda 

lets initialize package.json for this project 

```json
{
  "name": "infra",
  "version": "0.1.0",
  "bin": {
    "infra": "bin/infra.js"
  },
  "scripts": {
    "build": "tsc",
    "clean": "rimraf cdk.out && rimraf \"{bin,lib,stacks}/**/*.js\"",
    "watch": "tsc -w",
    "test": "jest",
    "cdk": "cdk"
  },
  "devDependencies": {
    "@types/node": "10.17.27",
    "aws-cdk": "2.12.0",
    "aws-cdk-local": "^2.15.0",
    "ts-node": "^9.0.0",
    "typescript": "~3.9.7"
  },
  "dependencies": {
    "aws-cdk-lib": "2.12.0",
    "constructs": "^10.0.0",
    "source-map-support": "^0.5.16"
  }
}
```
```javascript
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DemoAppStack } from '../lib/demo-app-stack';

const app = new cdk.App();
new DemoAppStack(app, 'DemoAppStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

```
Now lets build Stack for same, we can have 

- simple stack with SQS

```javascript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DemoAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const queue = new sqs.Queue(this, 'DemoAppQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });
  }
}

```
## Deploy Example Stack to AWS using cdk commands


```sh
cdk synth 
cdk bootstrap 
cdk deploy
cdk destroy

```

When we synthesize our CloudFormation stack, it gets generated in the cdk.out directory. This is also where the asset files for our Lambda functions are stored.
Let's run the synth command to generate the lambda assets:

```sh
npx aws-cdk synth
```

If we now take a look at the assets folder in the cdk.out directory, we can see that our Lambda function's code has been compiled down to JavaScript.

## Deploy the Lambda function

The next step is to bootstrap an environment. This action is required only if it is the first time you want to deploy with the CDK; you can skip this if you have already done it before.

This command will create a stack that includes resources used for the toolkit's operation, like an S3 bucket to store templates and assets during the deployment process.

```sh
cdk bootstrap

⏳  Bootstrapping environment aws://XXXXXXXXX/eu-west-1...
Once done, we can deploy our app:
``

```sh
npx aws-cdk deploy
```
## Cleanup
To delete the stack from your account, run the destroy command:

```sh
npx aws-cdk destroy
```