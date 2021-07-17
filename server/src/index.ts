import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";
import { createConnection } from "typeorm";
import { MyContext } from "./utils/types";
import { UserResolver } from "./resolvers/UserResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { LikeResolver } from "./resolvers/LikeResolver";
import { CommentResolver } from "./resolvers/CommentResolver";
import { FollowResovler } from "./resolvers/FollowResolver";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "./utils/generateAccessToken";
import { RefreshToken } from "./entities/RefreshToken";
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
      origin: "https://book-bug.vercel.app",
    })
  );
  app.use(express.json({ limit: "50mb" }));

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
    schema,
    context: ({ req, res }: MyContext) => {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) {
        req.user = null;
        return { req, res };
      }
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || "",
        (err: any, user: any) => {
          console.log(err);
          if (err) {
            req.user = null;
            return { req, res };
          }
          req.user = user;
          return { req, res };
        }
      );
      return { req, res };
    },
  });

  app.post("/token", async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);
    const data = await RefreshToken.findOne({ refreshToken });
    if (!data) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "",
      (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ userID: user.userID });
        res.json({ accessToken: accessToken });
        return;
      }
    );
    return;
  });

  apolloServer.applyMiddleware({ cors: false, app });

  const PORT: number = Number(process.env.PORT) || 5000;
  app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}/graphql`);
  });
};

main();
