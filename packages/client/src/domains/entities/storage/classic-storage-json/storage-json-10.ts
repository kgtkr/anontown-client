import * as t from "io-ts";
import { StorageJSON9 } from "./storage-json-9";
import { FavoriteTags } from "../FavoriteTags";
import { StorageCollectionTypeOf, getKey } from "../StorageCollection";
import { FavoriteTopics } from "../FavoriteTopics";
import { TopicReads } from "../TopicReads";
import { WriteResConfigs } from "../WriteResConfigs";
import { ResDrafts } from "../ResDrafts";
import { NGs, TextMatcher } from "../NGs";
import * as uuid from "uuid";
import { NGNodeTextMatcherJson } from "./ng-json";
import { TypeOf } from "zod";
import * as GA from "../../../../generated/graphql-apollo";
import { createHeaders, gqlClient } from "../../../../effects";

export const storageJSON10 = t.strict({
  ver: t.literal("10"),
});

export type StorageJSON10 = t.TypeOf<typeof storageJSON10>;

// 1つの巨大storageは廃止したので、マイグレーション処理を行い空のオブジェクトを返す
// ver: 10が存在するのがマイグレーション済みのキーになっている
export async function convert9To10(
  token: GA.TokenMasterFragment,
  val: StorageJSON9
): Promise<StorageJSON10> {
  const now = Date.now();

  const favoriteTopics = val.topicFavo.map(
    (topicId, i): StorageCollectionTypeOf<typeof FavoriteTopics> => ({
      topicId,
      createdAt: now - i,
    })
  );

  const favoriteTags = Array.from(new Set(val.tagsFavo.flat())).map(
    (tag, i): StorageCollectionTypeOf<typeof FavoriteTags> => ({
      tag,
      createdAt: now - i,
    })
  );

  const topicReads = Object.entries(val.topicRead).map(
    ([topicId, { date, count }]): StorageCollectionTypeOf<
      typeof TopicReads
    > => ({
      topicId,
      resCreatedAt: date,
      resCount: count,
    })
  );

  const writeResConfigs = Object.entries(val.topicWrite).map(
    ([topicId, { name, profile, age }]): StorageCollectionTypeOf<
      typeof WriteResConfigs
    > => ({
      topicId,
      name,
      profileId: profile ?? undefined,
      age,
    })
  );

  const resDraftsNonReply = Object.entries(val.topicWrite).map(
    ([topicId, { text }]): StorageCollectionTypeOf<typeof ResDrafts> => ({
      topicId,
      text,
    })
  );

  const resDraftsReply = Object.entries(val.topicWrite)
    .map(([topicId, { replyText }]) =>
      Object.entries(replyText).map(
        ([replyResId, text]): StorageCollectionTypeOf<typeof ResDrafts> => ({
          topicId,
          text,
          replyResId,
        })
      )
    )
    .flat();

  const resDrafts = [...resDraftsNonReply, ...resDraftsReply];

  const ngs: StorageCollectionTypeOf<typeof NGs>[] = val.ng.map(
    ({ name, expirationDate, topic, date, node }) => ({
      id: uuid.v4(),
      name,
      expirationDate: expirationDate
        ? new Date(expirationDate).toISOString()
        : undefined,
      topicId: topic ?? undefined,
      createdAt: new Date(date).getTime(),
      condition: {
        profileId: node.type === "profile" ? node.profile : undefined,
        hash: node.type === "hash" ? node.hash : undefined,
        content:
          node.type === "text" ? convertMatcher(node.matcher) : undefined,
        name: node.type === "name" ? convertMatcher(node.matcher) : undefined,
        vote: node.type === "vote" ? node.value : undefined,
      },
    })
  );

  const keyValues = [
    ...favoriteTopics.map((x) => ({
      key: getKey(FavoriteTopics, x),
      value: JSON.stringify(x),
    })),
    ...favoriteTags.map((x) => ({
      key: getKey(FavoriteTags, x),
      value: JSON.stringify(x),
    })),
    ...topicReads.map((x) => ({
      key: getKey(TopicReads, x),
      value: JSON.stringify(x),
    })),
    ...writeResConfigs.map((x) => ({
      key: getKey(WriteResConfigs, x),
      value: JSON.stringify(x),
    })),
    ...resDrafts.map((x) => ({
      key: getKey(ResDrafts, x),
      value: JSON.stringify(x),
    })),
    ...ngs.map((x) => ({
      key: getKey(NGs, x),
      value: JSON.stringify(x),
    })),
  ];

  const result = await gqlClient.mutate<
    GA.SetStoragesMutation,
    GA.SetStoragesMutationVariables
  >({
    mutation: GA.SetStoragesDocument,
    variables: {
      input: {
        storages: keyValues,
      },
    },
    context: {
      headers: createHeaders(token.id, token.key),
    },
  });
  if (result.errors !== undefined && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  return {
    ver: "10",
  };
}

function convertMatcher(
  matcher: NGNodeTextMatcherJson
): TypeOf<typeof TextMatcher> {
  return {
    text: matcher.source,
    ignoreCase: matcher.i,
    regExp: matcher.type === "reg",
  };
}
