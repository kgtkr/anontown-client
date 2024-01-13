import { z } from "zod";
import { StorageCollection } from "./StorageCollection";

export const WriteResConfigs = StorageCollection(
  {
    keyPrefix: "writeResConfigs:",
    validator: z.object({
      topicId: z.string(),
      name: z.string(),
      profile: z.nullable(z.string()),
      age: z.boolean(),
    }),
    keyPayload: (value) => value.topicId,
  },
  ["topicId"]
);
