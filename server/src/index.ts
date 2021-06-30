import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import passport from "passport";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";
import authRoutes from "./routes/auth";
import passportConfig from "./config/passportConfig";
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "redis";
import { createConnection } from "typeorm";
import { MyContext } from "./config/types";
import { UserResolver } from "./resolvers/UserResolver";
import cookieParser from "cookie-parser";
import { PostResolver } from "./resolvers/PostResolver";
import { LikeResolver } from "./resolvers/LikeResolver";
import { CommentResolver } from "./resolvers/CommentResolver";
require("dotenv").config();

const app = express();
const httpServer = createServer(app);

// redis connection and session in redis
const RedisStore = connectRedis(session);
let redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

const main = async () => {
  // create database connection
  await createConnection();

  // for cookies
  app.set("trust proxy", 1);

  // middlewares
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //  10 years
        httpOnly: true,
        sameSite: "lax", //  csrf
      },
      saveUninitialized: false,
      secret: "fsdfjdasfijasfnsdfnwrjf",
      resave: false,
    })
  );
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(cookieParser());
  app.use(require("body-parser").json({ limit: "50mb" }));
  app.use(passport.initialize());

  //  passport config file
  passportConfig();

  //  routes
  app.use("/auth", authRoutes);

  app.get("/", (_req, res) => {
    res.send("hello");
  });

  const schema = await buildSchema({
    resolvers: [
      HelloResolver,
      UserResolver,
      PostResolver,
      LikeResolver,
      CommentResolver,
    ],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: MyContext) => {
      return { req, res };
    },
  });

  apolloServer.applyMiddleware({ cors: false, app });

  const PORT: number = Number(process.env.PORT) || 5000;
  httpServer.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}/graphql`);
  });
};

main();
