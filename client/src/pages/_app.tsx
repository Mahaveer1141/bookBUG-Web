import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import React from "react";
import theme from "../../theme";
import { API_URL } from "../utils/constants";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "../utils/tokens";

function MyApp({ Component, pageProps }) {
  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle: any;
        Promise.resolve(operation)
          .then((operation) => {
            const accessToken = getAccessToken();
            if (accessToken) {
              operation.setContext({
                headers: {
                  authorization: `bearer ${accessToken}`,
                },
              });
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  const client = new ApolloClient({
    link: ApolloLink.from([
      new TokenRefreshLink({
        accessTokenField: "accessToken",
        isTokenValidOrUndefined: () => {
          const token = getAccessToken();

          if (!token) {
            return true;
          }

          try {
            const decoded: any = jwtDecode(token);
            const exp = decoded.exp;
            if (Date.now() >= exp * 1000) {
              return false;
            } else {
              return true;
            }
          } catch {
            return false;
          }
        },
        fetchAccessToken: () => {
          return fetch(`${API_URL}/token`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: getRefreshToken(),
            }),
          });
        },
        handleFetch: (accessToken) => {
          setAccessToken(accessToken);
        },
        handleError: (err) => {
          console.warn("Your refresh token is invalid. Try to relogin");
          console.error(err);
        },
      }),
      requestLink,
      new HttpLink({
        uri: `${API_URL}/graphql`,
      }),
    ]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
