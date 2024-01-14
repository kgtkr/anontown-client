import { z } from "zod";
import {
  StorageCollection,
  StorageCollectionTypeOf,
} from "./StorageCollection";

export const TextMatcher = z.object({
  text: z.string(),
  ignoreCase: z.boolean(),
  regExp: z.boolean(),
});

export type TextMatcher = z.infer<typeof TextMatcher>;

export const NGs = StorageCollection(
  {
    keyPrefix: "ngs:",
    validator: z.object({
      id: z.string(),
      name: z.string(),
      // keyに含まれているため不変
      topicId: z.optional(z.string()),
      createdAt: z.number(),
      expirationDate: z.optional(z.string()),
      condition: z.object({
        profileId: z.optional(z.string()),
        hash: z.optional(z.string()),
        content: z.optional(TextMatcher),
        name: z.optional(TextMatcher),
        vote: z.optional(z.number()),
      }),
    }),
    keyPayload: (value) => `${value.topicId ?? ""}:${value.id}`,
    compare: (a, b) => b.createdAt - a.createdAt,
  },
  ["id", "topicId"]
);

export type NG = StorageCollectionTypeOf<typeof NGs>;
