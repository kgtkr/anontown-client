import * as GA from "../generated/graphql-apollo";
import { UserData } from "../domains/entities";
import { createHeaders, gqlClient } from "./gql-client";
import { migration } from "../domains/entities/storage/migration";

export async function createUserData(
  token: GA.TokenMasterFragment,
): Promise<UserData> {
  await migration(token);
  const user = await gqlClient.query<
    GA.FindUserQuery,
    GA.FindUserQueryVariables
  >({
    query: GA.FindUserDocument,
    variables: {},
    context: {
      headers: createHeaders(token.id, token.key),
    },
  });

  return { token, id: user.data.user.id };
}
