import { z } from "zod";
import { StorageCollection } from "./StorageCollection";

export const WriteResConfigs = StorageCollection(
  {
    keyPrefix: "writeResConfigs:",
    validator: z.object({
      topicId: z.string(),
      name: z.string(),
      profileId: z.optional(z.string()),
      age: z.boolean(),
    }),
    keyPayload: (value) => value.topicId,
  },
  ["topicId"],
);
