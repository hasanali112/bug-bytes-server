import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectDB from "./db";
import { resolvers } from "./app/gql/resolver";
import { typeDefs } from "./app/gql/typeDefs";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError, error: any) => {
      return globalErrorHandler(error);
    },
  });

  connectDB();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => ({ req, res }),
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();
