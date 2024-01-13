import * as t from "io-ts";
import { storageJSON1 } from "./storage-json-1";
import { convert1To2, storageJSON2 } from "./storage-json-2";
import { convert2To3, storageJSON3 } from "./storage-json-3";
import { convert3To4, storageJSON4 } from "./storage-json-4";
import { convert4To5, storageJSON5 } from "./storage-json-5";
import { convert5To6, storageJSON6 } from "./storage-json-6";
import { convert6To7, storageJSON7 } from "./storage-json-7";
import { convert7To8, storageJSON8 } from "./storage-json-8";
import { convert8To9, storageJSON9 } from "./storage-json-9";
import { convert9To10, storageJSON10 } from "./storage-json-10";
import * as GA from "../../../../generated/graphql-apollo";

export const storageJSON = t.taggedUnion("ver", [
  storageJSON1,
  storageJSON2,
  storageJSON3,
  storageJSON4,
  storageJSON5,
  storageJSON6,
  storageJSON7,
  storageJSON8,
  storageJSON9,
  storageJSON10,
]);

export type StorageJSON = t.TypeOf<typeof storageJSON>;

export const storageJSONLatest = storageJSON10;

export type StorageJSONLatest = t.TypeOf<typeof storageJSONLatest>;

export const initStorage: StorageJSONLatest = {
  ver: "10",
};
export const verArray: Array<StorageJSON["ver"]> = [
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1.0.0",
];

export async function convert(
  token: GA.TokenMasterFragment,
  storage: unknown
): Promise<StorageJSONLatest> {
  if (storageJSON.is(storage)) {
    const s1 = storage;
    const s2 = s1.ver === "1.0.0" ? convert1To2(s1) : s1;
    const s3 = s2.ver === "2" ? convert2To3(s2) : s2;
    const s4 = s3.ver === "3" ? convert3To4(s3) : s3;
    const s5 = s4.ver === "4" ? convert4To5(s4) : s4;
    const s6 = s5.ver === "5" ? convert5To6(s5) : s5;
    const s7 = s6.ver === "6" ? convert6To7(s6) : s6;
    const s8 = s7.ver === "7" ? await convert7To8(s7) : s7;
    const s9 = s8.ver === "8" ? convert8To9(s8) : s8;
    const s10 = s9.ver === "9" ? await convert9To10(token, s9) : s9;

    const json = s10;

    return json;
  } else {
    return initStorage;
  }
}
