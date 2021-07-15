import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";
import { createConnection } from "typeorm";
import { MyContext } from "./config/types";
import { UserResolver, currentUserId } from "./resolvers/UserResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { LikeResolver } from "./resolvers/LikeResolver";
import { CommentResolver } from "./resolvers/CommentResolver";
import { FollowResovler } from "./resolvers/FollowResolver";
require("dotenv").config();

const app = express();

const main = async () => {
  // for prod
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: ["dist/entities/*.js"],
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

  // for dev
  // await createConnection({
  //   type: "postgres",
  //   username: "postgres",
  //   host: "localhost",
  //   port: 5432,
  //   database: "example",
  //   synchronize: true,
  //   logging: true,
  //   entities: ["dist/entities/*.js"],
  // });

  app.use(
    cors({
      credentials: true,
      origin: "https://book-bug.vercel.app",
    })
  );
  app.use(require("body-parser").json({ limit: "50mb" }));

  const schema = await buildSchema({
    resolvers: [
      HelloResolver,
      UserResolver,
      PostResolver,
      LikeResolver,
      CommentResolver,
      FollowResovler,
    ],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    introspection: true,
    playground: true,
    schema,
    context: ({ userID }: MyContext) => {
      userID = currentUserId;
      return { userID };
    },
  });

  apolloServer.applyMiddleware({ cors: false, app });

  const PORT: number = Number(process.env.PORT) || 5000;
  app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}/graphql`);
  });
};

main();
