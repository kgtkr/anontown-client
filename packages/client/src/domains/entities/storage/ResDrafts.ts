import { z } from "zod";
import { StorageCollection } from "./StorageCollection";

export const ResDrafts = StorageCollection(
  {
    keyPrefix: "resDrafts:",
    validator: z.object({
      topicId: z.string(),
      replyResId: z.optional(z.string()),
      text: z.string(),
    }),
    keyPayload: (value) => `${value.topicId}:${value.replyResId ?? ""}`,
  },
  ["topicId", "replyResId"]
);
