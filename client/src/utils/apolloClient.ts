import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

export const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:5000/graphql",
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache(),
  });
