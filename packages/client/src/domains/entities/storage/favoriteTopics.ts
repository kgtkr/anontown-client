import { z } from "zod";
import { StorageCollection } from "./StorageCollection";

export const favoriteTopics = StorageCollection({
  keyPrefix: "favoriteTopics:",
  validator: z.object({
    topicId: z.string(),
    createdAt: z.number(),
  }),
  keyPayload: (value) => value.topicId,
  compare: (a, b) => a.createdAt - b.createdAt,
});
