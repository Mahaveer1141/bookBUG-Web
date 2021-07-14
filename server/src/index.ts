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
import { createConnection, getConnection } from "typeorm";
import { MyContext } from "./config/types";
import { UserResolver } from "./resolvers/UserResolver";
import cookieParser from "cookie-parser";
import { PostResolver } from "./resolvers/PostResolver";
import { LikeResolver } from "./resolvers/LikeResolver";
import { CommentResolver } from "./resolvers/CommentResolver";
import { FollowResovler } from "./resolvers/FollowResolver";
import session from "express-session";
require("dotenv").config();
import { TypeormStore } from "connect-typeorm";
import { Session } from "./entities/Session";

const app = express();
const httpServer = createServer(app);

const main = async () => {
  // for prod
  // await createConnection({
  //   type: "postgres",
  //   url: process.env.DATABASE_URL,
  //   synchronize: true,
  //   logging: true,
  //   entities: ["dist/entities/*.js"],
  //   ssl: true,
  //   extra: {
  //     ssl: {
  //       rejectUnauthorized: false,
  //     },
  //   },
  // });

  // for dev
  await createConnection({
    type: "postgres",
    username: "postgres",
    host: "localhost",
    port: 5432,
    database: "example",
    synchronize: true,
    logging: true,
    entities: ["dist/entities/*.js"],
  });

  // for cookies
  app.set("trust proxy", 1);

  const sessionRepository = getConnection().getRepository(Session);

  // middlewares
  app.use(
    session({
      name: "qid",
      store: new TypeormStore({
        cleanupLimit: 2,
        ttl: 86400,
      }).connect(sessionRepository),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //  10 years
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
      saveUninitialized: false,
      secret: "fsdfjdasfijasfnsdfnwrjf",
      resave: false,
    })
  );

  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "https://bookbug1.herokuapp.com",
    })
  );
  app.use(require("body-parser").json({ limit: "50mb" }));
  app.use(passport.initialize());

  //  passport config file
  passportConfig();

  //  routes
  app.use("/auth", authRoutes);

  app.get("/", (_req, res) => {
    res.send("b");
  });

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
