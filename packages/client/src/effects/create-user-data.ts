import * as G from "../generated/graphql";
import { UserData } from "../domains/entities";
import { createHeaders, gqlClient } from "./gql-client";
import { migration } from "../domains/entities/storage/migration";

export async function createUserData(
  token: G.TokenMasterFragment
): Promise<UserData> {
  await migration(token);
  const user = await gqlClient.query<G.FindUserQuery, G.FindUserQueryVariables>(
    {
      query: G.FindUserDocument,
      variables: {},
      context: {
        headers: createHeaders(token.id, token.key),
      },
    }
  );

  return { token, id: user.data.user.id };
}
