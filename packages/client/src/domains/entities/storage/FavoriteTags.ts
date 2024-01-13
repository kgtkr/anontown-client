import { z } from "zod";
import { StorageCollection } from "./StorageCollection";
import * as CryptoJS from "crypto-js";

export const FavoriteTags = StorageCollection(
  {
    keyPrefix: "favoriteTags:",
    validator: z.object({
      tag: z.string(),
      createdAt: z.number(),
    }),
    keyPayload: (value) => CryptoJS.SHA256(value.tag).toString(),
    compare: (a, b) => b.createdAt - a.createdAt,
  },
  ["tag"]
);
