/* eslint-disable no-console */
import { useMemo } from "react";
import {
  ApolloLink,
  HttpLink,
  from,
  split,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";

import merge from "deepmerge";
import { onError } from "@apollo/client/link/error";
// import { createClient } from "graphql-ws";
import { env } from "@/constants/env";
import isEqual from "lodash/isEqual";

import { sha256 } from "crypto-hash";
import { getToken } from "@/utils/user";

const API_LINK = env.GRAPHQL_ROOT_API;
const WS_LINK = env.GRAPHQL_WS_API;
let apolloClient: ApolloClient<NormalizedCacheObject> | null;

const ssrMode = typeof window === "undefined";

const logoutIfLogged = () => {
  const token = getToken();
  const isLogged = !!token;
  if (isLogged) {
    // destroyCookie(null, "token", { path: "/" });
    // store.dispatch(LOGOUT.REQUEST());
    window.location.reload(); // Reload to detect this route is public or private
  }
};

function createApolloClient(ctx: any) {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const retryLink = new RetryLink({
    attempts: {
      max: 2,
      retryIf: (error, _operation) => !!error,
    },
    delay: {
      initial: 500,
      max: Infinity,
      jitter: true,
    },
  });

  const persistedQueriesLink = createPersistedQueryLink({
    sha256,
    useGETForHashedQueries: true,
  });

  const createMainLink = () => {
    const httpLink = new HttpLink({ uri: API_LINK });
    if (ssrMode) {
      return httpLink;
    }
    // const wsLink = new GraphQLWsLink(
    //   createClient({
    //     url: WS_LINK,
    //     lazy: true,
    //     shouldRetry: (errOrCloseEvent) => !!errOrCloseEvent,
    //     lazyCloseTimeout: 2000,
    //     connectionParams: () => {
    //       const token = getToken();
    //       return { authorization: token ? `Bearer ${token}` : null };
    //     },
    //   })
    // );

    const mainLink = split(
      ({ query }) => {
        const { kind } = getMainDefinition(query);
        return kind === "OperationDefinition";
      },
      // wsLink,
      httpLink
    );

    return mainLink;
  };

  const loggerLink = new ApolloLink((operation, forward) =>
    forward(operation).map((result) => {
      if (process.env.NODE_ENV !== "production") {
        console.log(
          `%c [GraphQL Logger] received result from ${operation.operationName}`,
          "color: gray"
        );
        console.log(result?.data || result);
      }

      return result;
    })
  );

  const errorLink = onError((errorResponse) => {
    const { operation, graphQLErrors, networkError, response } = errorResponse;
    // const { operationName, query, variables } = operation;
    // const operationType = query.definitions[0]?.operation;

    // const apiError = errorResponse.graphQLErrors;
    // const message = `${operationType} ${operationName} - ${apiError?.message}`;

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);

    // if (
    //   ["UNAUTHENTICATED", "EXPIRED_TOKEN"]?.includes?.(
    //     apiError?.extensions?.code
    //   )
    // ) {
    //   logoutIfLogged(ctx);
    //   if (response?.errors) {
    //     response.errors = null;
    //   }

    //   return;
    // }
    // const details = {
    //   variables,
    //   graphQLErrors,
    //   networkError,
    // };

    // console.warn(message, details);
  });

  return new ApolloClient({
    connectToDevTools: process.env.NODE_ENV !== "production",
    cache,
    ssrForceFetchDelay: 100,
    ssrMode,
    link: from(
      ssrMode
        ? [authLink, errorLink, persistedQueriesLink, createMainLink()]
        : [
            authLink,
            loggerLink,
            errorLink,
            retryLink,
            persistedQueriesLink,
            createMainLink(),
          ]
    ),
  });
}

export function initializeApollo(initialState: unknown, ctx?: unknown) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState?: unknown) {
  const cache = useMemo(() => initializeApollo(initialState), [initialState]);
  return cache;
}
