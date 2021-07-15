import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import theme from "../../theme";

function MyApp({ Component, pageProps }) {
  const apolloClient = new ApolloClient({
    uri: "https://book-bug.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
