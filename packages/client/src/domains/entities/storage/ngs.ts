import { z } from "zod";
import { StorageCollection } from "./StorageCollection";

const TextMatcher = z.object({
  text: z.string(),
  ignoreCase: z.boolean(),
  regExp: z.boolean(),
});

export const ngs = StorageCollection({
  keyPrefix: "ngs:",
  validator: z.object({
    id: z.string(),
    name: z.string(),
    topicId: z.nullable(z.string()),
    createdAt: z.number(),
    expirationDate: z.nullable(z.number()),
    condition: z.object({
      profileId: z.nullable(z.string()),
      hash: z.nullable(z.string()),
      content: z.nullable(TextMatcher),
      name: z.nullable(TextMatcher),
      vote: z.nullable(z.number()),
    }),
  }),
  keyPayload: (value) => `${value.topicId ?? ""}:${value.id}`,
  compare: (a, b) => a.createdAt - b.createdAt,
});
