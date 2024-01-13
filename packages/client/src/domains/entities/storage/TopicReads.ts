import { z } from "zod";
import { StorageCollection } from "./StorageCollection";

export const TopicReads = StorageCollection({
  keyPrefix: "topicReads:",
  validator: z.object({
    topicId: z.string(),
    resCreatedAt: z.number(),
    resCount: z.number(),
  }),
  keyPayload: (value) => value.topicId,
});
