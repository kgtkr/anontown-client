import { z } from "zod";
import { StorageCollection } from "./StorageCollection";

export const writeResConfigs = StorageCollection({
  keyPrefix: "writeResConfigs:",
  validator: z.object({
    topicId: z.string(),
    name: z.string(),
    profile: z.nullable(z.string()),
    text: z.string(),
    age: z.boolean(),
  }),
  keyPayload: (value) => value.topicId,
});
