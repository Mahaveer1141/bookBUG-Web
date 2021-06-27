import { createWithApollo } from "./createWithApollo";
import { createClient } from "./apolloClient";
// import { ApolloClient, InMemoryCache } from "@apollo/client";

export const withApollo = createWithApollo(createClient);
