import * as t from "io-ts";
import { StorageJSON9 } from "./storage-json-9";

export const storageJSON10 = t.strict({
  ver: t.literal("10"),
});

export type StorageJSON10 = t.TypeOf<typeof storageJSON10>;

export async function convert9To10(_val: StorageJSON9): Promise<StorageJSON10> {
  return {
    ver: "10",
  };
}
