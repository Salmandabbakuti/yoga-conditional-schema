import { createServer } from 'http';
import { createSchema, createYoga } from 'graphql-yoga';

const publicSchema = createSchema({
  typeDefs: `
    type Query {
      public: String
    }`,
  resolvers: {
    Query: {
      public: () => 'Hello From Public Schema!'
    }
  }
});

const privateSchema = createSchema({
  typeDefs: `
    type Query {
      private: String
    }`,
  resolvers: {
    Query: {
      private: () => 'Hello From Private Schema!'
    }
  }
});

const isAuthenticated = (request: any) => request.headers.get("authorization");


const yoga = createYoga({
  schema: ({ request }) => (isAuthenticated(request) ? privateSchema : publicSchema),
  graphqlEndpoint: '/',
  maskedErrors: false
});

const server = createServer(yoga);

server.listen(4000, () => console.log('🔥 Server started listening at http://localhost:4000 🚀'));