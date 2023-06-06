---
date: 2023-03-02
title: 'Understanding N + 1 Graphql Query Problem'
template: post
featuredImage: '../thumbnails/graphql.png'
thumbnail: '../thumbnails/graphql.png'
slug: understanding-query-problem-graphql
categories:
  - graphql
  - nodejs
  - javascript
tags:
  - graphql
  - nodejs
  - javascript
---

Understanding N + 1 Graphql Query Problem
================================

![](https://i.ytimg.com/vi/v5s4y8io-hg/maxresdefault.jpg)

GraphQL is a query language and runtime to build APIs that reduces data results to only what the user requests. GraphQL uses schemas to define data inputs and responses from a single endpoint to a GraphQL runtime. The schemas allow clients to request specific information, so the responses will only include what the client needs.

In GraphQL the client specifies the data to return, but not how to fetch it from storage. Sometimes, a query could lead to unintentional, excessive backend requests. The n+1 problem is a typical example of when this can happen in GraphQL.

The n+1 problem is when multiple types of data are requested in one query, but where n requests are required instead of just one. This is typically encountered when data is nested, such as if you were requesting books and the names of their authors. A list of books can be acquired in a single query, but to get their author titles requires at least one query per book: one query to get n books, and n queries to get a list of author for each book. When n becomes sufficiently large, performance issues and failures can arise. This is easy to do in GraphQL because of how queries are built into the client.


## How do GraphQL runtimes return data

GraphQL queries are made against a single endpoint. GraphQL runtimes like Apollo Server allow the backend to define a schema, which is a data model that indicates what data can be returned on each query. This allows the client to request some or all of the data, depending on what it needs.

Sample GraphQL runtime
When building a runtime in GraphQL, a unique resolver should be present for each discrete data type. This practice limits the backend's queries against different databases to return requested data.

```gql
const { gql } = require("apollo-server");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String
    author: Author!
  }

  type Query {
    books: [Book!]!
    authors: [Author!]!
  }
`;

module.exports = { typeDefs };
```
Resolver for the schema 

```javascript
const resolvers = {
  Book: {
    author: async ({ authorId }, args, { knex }) => {
      const author = await knex("authors")
        .where({
          id: authorId
        })
        .first();

      return author;
    }
  },
  Author: {
    books: async ({ id }, args, { knex }) => {
      const books = await knex("books").where({ authorId: id });

      return books;
    }
  },
  Query: {
    books: async (parent, args, { knex }) => {
      const books = await knex("books").select();

      return books;
    },
    authors: async (parent, args, { knex }) => {
      const authors = await knex("authors").select();

      return authors;
    }
  }
};

module.exports = { resolvers };

```

### Sample client query

The client creates requests against the GraphQL server, tailored to include the information needed for display. In the example server, the client is able to request a list of books or list of authors without any other information. In servers run with REST architecture, the client cannot choose what data it receives, leading to over-fetching data.

The client query below requests all the data available for books. Since you know the schema of this GraphQL server, you can see that the way the runtime will execute this query can lead to issues. The runtime is set up to gather the author for each book individually, so when this query is executed, the runtime will fetch a list of books, and then use each book to get a author.

So its like for data fetching we are making  n number of queries, for fetching 10 books we need to also query author table 10 times.

## How to solve n+1 in GraphQL

Since this is a common issue with GraphQL, there are well-established solutions for handling it. These include using batching or using data loaders on the client.

### Data loaders in GraphQL

Data loaders were a conceptual solution initially proposed by engineers at Facebook. One way around the n+1 problem is to bypass the nested fetch requests that do not have enough information to be efficient with their queries. Data loaders can batch client GraphQL requests into a single query that defers fetching data for later.


How Data Loaders helps us to fix N+1 problem.

We will add data loaders 

- authorLoader
- bookLoader

```javascript
const DataLoader = require("dataloader");

module.exports = knex => ({
  authorLoader: new DataLoader(async authorIds => {
    const authors = await knex("authors").whereIn("id", authorIds);

    const authorsMap = authors.reduce(
      (map, author) => ({ ...map, [author.id]: author }),
      {}
    );
    console.log(authorIds, authorsMap)

    return authorIds.map(
      authorId => authorsMap[authorId] || new Error(`No result for ${authorId}`)
    );
  })
});

```
BookLoader 

```javascript
const DataLoader = require("dataloader");

module.exports = knex => ({
  bookLoader: new DataLoader(async authorIds => {
    const books = await knex("books").whereIn("authorId", authorIds);

    const booksMap = books.reduce((map, book) => {
      map[book.authorId]
        ? (map[book.authorId] = [...map[book.authorId], book])
        : (map[book.authorId] = [book]);

      return map;
    }, {});

    return authorIds.map(
      authorId => booksMap[authorId] || new Error(`No result for ${authorId}`)
    );
  })
});

```
Resolvers using data loaders now

Once the data loader is set up and available in the context, the resolver can be updated to use that loader. The loader is only triggered once, for the list of musicians fetched, so the number of SQL queries has been reduced to only two.

```javascript
const resolversDataLoader = {
  Book: {
    author: async ({ authorId }, args, { authorLoader }) => {
      const author = await authorLoader.load(authorId);

      return author;
    }
  },
  Author: {
    books: async ({ id }, args, { bookLoader }) => {
      const books = await bookLoader.load(id);

      return books;
    }
  },
  Query: {
    books: async (parent, args, { knex }) => {
      const books = await knex("books").select();

      return books;
    },
    authors: async (parent, args, { knex }) => {
      const authors = await knex("authors").select();

      return authors;
    }
  }
};

module.exports = { resolversDataLoader };
```
Batching in GraphQL is an expansion of the data loader. Essentially, batching libraries provide ways to ensure that nested data is retrieved with fewer queries by defining how to group and load similar data. Note that the main GraphQL library also supports batch execution, which is a different concept about invoking multiple resolvers at once.

### N+1 Graphql in Apollo Federation 

In most subgraph implementations (including @apollo/subgraph), we don't write the Query._entities resolver directly. Instead, we use the reference resolver API for resolving an individual entity reference:
```javascript
const resolvers = {
  Product: {
    __resolveReference(productRepresentation) {
      return fetchProductByID(productRepresentation.id);
    }
  }
};
```

The motivation for this API relates to a subtle, critical aspect of the subgraph specification: the order of resolved entities must match the order of the given entity references. If we return entities in the wrong order, those fields are merged with the wrong entities and we'll have incorrect results. To avoid this issue, most subgraph libraries handle entity order for you.


Fortunately, the solution is exactly the same in a monolithic graph: dataloaders. In nearly every situation, reference resolvers should use a dataloader.

```javascript
const resolvers = {
  Product: {
    __resolveReference(product, context) {
      return context.dataloaders.products(product.id);
    }
  }
};
```
Now, when the query planner calls the Products subgraph with a batch of Product entities, we'll make a single batched request to the Products data source.

To understand more you can refer my video 

[![](https://i.ytimg.com/vi/DM84pFb3gp8/maxresdefault.jpg)](https://www.youtube.com/watch?v=DM84pFb3gp8)