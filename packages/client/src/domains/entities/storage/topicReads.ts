import { z } from "zod";
import { StorageCollection } from "./StorageCollection";

export const topicReads = StorageCollection({
  keyPrefix: "topicReads:",
  validator: z.object({
    topicId: z.string(),
    resCreatedAt: z.number(),
    resId: z.string(),
  }),
  keyPayload: (value) => value.topicId,
});
