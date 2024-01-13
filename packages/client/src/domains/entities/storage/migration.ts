import * as G from "../../../generated/graphql";
import * as Sto from "./classic-storage-json";
import { createHeaders, gqlClient } from "../../../effects";

// classic storageからのマイグレーション処理を行う
export async function migration(token: G.TokenMasterFragment) {
  const latestStorage = await gqlClient.query({
    query: G.FindStoragesDocument,
    variables: {
      query: {
        key: [Sto.verArray[0]],
      },
    },
    context: {
      headers: createHeaders(token.id, token.key),
    },
  });
  if (latestStorage.data.storages.length !== 0) {
    // 既にマイグレーション済み
    return;
  }

  const storages = await gqlClient.query({
    query: G.FindStoragesDocument,
    variables: {
      query: {},
    },
    context: {
      headers: createHeaders(token.id, token.key),
    },
  });

  const key = [...Sto.verArray, "main"].find(
    (ver) => storages.data.storages.findIndex((x) => x.key === ver) !== -1
  );
  const sto = storages.data.storages.find((x) => x.key === key);
  const storage = await Sto.convert(
    token,
    sto !== undefined ? JSON.parse(sto.value) : Sto.initStorage
  );

  await gqlClient.mutate({
    mutation: G.SetStorageDocument,
    variables: {
      key: Sto.verArray[0],
      value: JSON.stringify(storage),
    },
    context: {
      headers: createHeaders(token.id, token.key),
    },
  });
}
