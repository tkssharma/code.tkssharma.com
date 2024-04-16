---
date: 2023-03-23
title: 'How to debug Nest JS Application'
shortTitle: 'How to debug Nest JS Application'
description: 'How to debug Nest JS Application'
template: post
thumbnail: '../thumbnails/nestjs.png'
slug: how-to-debug-nestjs-application
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

Debugging a NestJS application running inside a Docker container involves a few steps, but it's quite manageable. Here's a general guide along with an example:

1. **Enable Debugging in Your NestJS Application**:
   - Ensure your NestJS application is configured to support debugging. You typically do this by setting up a debugging configuration in your `package.json` or `tsconfig.json`.

2. **Expose Debugging Ports**:
   - When running your NestJS application inside a Docker container, you need to expose the debugging port to your host machine. This allows you to attach a debugger from your development environment.

3. **Update Dockerfile**:
   - Modify your Dockerfile to include the necessary debugging configurations and expose the debugging port.

4. **Build Docker Image**:
   - Build your Docker image with the updated Dockerfile.

5. **Run Docker Container**:
   - Start your Docker container, ensuring that you map the exposed debugging port to a port on your host machine.

6. **Attach Debugger**:
   - Finally, attach your debugger from your development environment to the debugging port on your host machine.

Here's an example of how you might update your NestJS application and Docker configuration:

### 1. Enable Debugging in Your NestJS Application
Add a debugging configuration in your `package.json`:
```json
"scripts": {
  "start:debug": "nest start --debug --watch"
}
```

### 2. Update Dockerfile
```Dockerfile
# Use node:latest as base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose debugging port
EXPOSE 9229

# Command to run the application
CMD ["npm", "run", "start:debug"]
```

### 3. Build Docker Image
Build your Docker image:
```bash
docker build -t my-nest-app .
```

### 4. Run Docker Container
Run your Docker container, mapping the debugging port to a port on your host machine:
```bash
docker run -p 3000:3000 -p 9229:9229 my-nest-app
```

### 5. Attach Debugger
In your development environment (e.g., Visual Studio Code), attach your debugger to `localhost:9229`.

With these steps and configurations, you should be able to debug your NestJS application running inside a Docker container effectively.