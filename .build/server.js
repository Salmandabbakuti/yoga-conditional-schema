"use strict";
var import_http = require("http");
var import_graphql_yoga = require("graphql-yoga");
const publicSchema = (0, import_graphql_yoga.createSchema)({
  typeDefs: `
    type Query {
      public: String
    }`,
  resolvers: {
    Query: {
      public: () => "Hello From Public Schema!"
    }
  }
});
const privateSchema = (0, import_graphql_yoga.createSchema)({
  typeDefs: `
    type Query {
      private: String
    }`,
  resolvers: {
    Query: {
      private: () => "Hello From Private Schema!"
    }
  }
});
const isAuthenticated = (request) => request.headers.get("authorization");
const yoga = (0, import_graphql_yoga.createYoga)({
  schema: ({ request }) => isAuthenticated(request) ? privateSchema : publicSchema,
  graphqlEndpoint: "/",
  maskedErrors: false
});
const server = (0, import_http.createServer)(yoga);
server.listen(4e3, () => console.log("\u{1F525} Server started listening at http://localhost:4000 \u{1F680}"));
//# sourceMappingURL=server.js.map
