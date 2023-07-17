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


86

I tried the accepted answer and all the other variances and none worked for me, however what really works for me is to attach to the 9229 port. What I did is add/modify your launch.json with the following config

.vscode/launch.json

{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach NestJS WS",
      "port": 9229,
      "restart": true,
      "stopOnEntry": false,
      "protocol": "inspector"
    }
  ]
}
and in package.json (Nest new CLI commands, requires 6.8.x and higher, see this blog)

{
  "name": "nest-app",
  "scripts": {
    "start:debug": "nest start --debug --watch"
  }
}