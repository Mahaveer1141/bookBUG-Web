import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import cookie from "cookie";

export const createClient = (ctx) => {
  const req = ctx.req;
  const res = ctx.res;

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle: any;
        Promise.resolve(operation)
          .then((operation) => {
            const accessToken = req.cookies?.accessToken;
            if (accessToken) {
              operation.setContext({
                headers: {
                  Authorization: `bearer ${accessToken}`,
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

  return new ApolloClient({
    link: ApolloLink.from([
      new TokenRefreshLink({
        accessTokenField: "accessToken",
        isTokenValidOrUndefined: () => {
          const token = req.cookies?.accessToken;

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
          return fetch("http://localhost:5000/token", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: req.cookies?.refreshToken,
            }),
          });
        },
        handleFetch: (accessToken) => {
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("accessToken", accessToken)
          );
        },
        handleError: (err) => {
          console.warn("Your refresh token is invalid. Try to relogin");
          console.error(err);
        },
      }),
      requestLink,
      new HttpLink({
        uri: "http://localhost:5000/graphql",
      }),
    ]),
    cache: new InMemoryCache(),
  });
};
