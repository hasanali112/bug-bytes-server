import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectDB from "./db";
import { resolvers } from "./app/gql/resolver";
import { typeDefs } from "./app/gql/typeDefs";

async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  connectDB();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();
