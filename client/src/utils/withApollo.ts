import { createWithApollo } from "./createWithApollo";
import { createClient } from "./apolloClient";

export const withApollo = createWithApollo(createClient);
