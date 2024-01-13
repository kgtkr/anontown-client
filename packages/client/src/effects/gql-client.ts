import { Env } from "../env";
import { getAuth } from "../utils";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  from,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import generatedIntrospection from "../generated/introspection-result";
import { Kind, OperationTypeNode } from "graphql-apollo";

export function createHeaders(id: string, key: string): {} {
  return {
    "X-Token": `${id},${key}`,
  };
}

export function createConnectionParams(id: string, key: string) {
  return {
    token: `${id},${key}`,
  };
}

const httpLink = new HttpLink({
  uri: Env.api.origin,
  credentials: "same-origin",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const auth = getAuth();
  const additionalHeaders =
    auth !== null ? createHeaders(auth.id, auth.key) : {};

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...additionalHeaders,
    },
  }));

  return forward(operation);
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: Env.socket.origin + "/",
    connectionParams: () => {
      const auth = getAuth();
      return auth !== null ? createConnectionParams(auth.id, auth.key) : {};
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  wsLink,
  from([authMiddleware, httpLink])
);

export const gqlClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
  }),
});
