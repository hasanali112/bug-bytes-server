import { ApolloServer } from "@apollo/server";
import connectDB from "./db";
import { resolvers } from "./app/gql/resolver";
import { typeDefs } from "./app/gql/typeDefs";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { Application } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

interface MyContext {
  token?: string;
}

const app: Application = express();

app.use(cookieParser());

const httpServer = http.createServer(app);

async function main() {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    formatError: (formattedError, error: any) => {
      return globalErrorHandler(error);
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await connectDB();

  await server.start();

  const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(
    "/",
    cors(corsOptions),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000/`);
}

main().catch((err) => {
  console.error("Failed to start the server:", err);
});
