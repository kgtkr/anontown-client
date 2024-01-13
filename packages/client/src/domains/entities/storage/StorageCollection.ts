import { ZodType } from "zod";

export type StorageCollection<T, K extends keyof T = keyof T> = {
  keyPrefix: string;
  validator: ZodType<T>;
  keyPayload: (value: Pick<T, K>) => string;
  compare?: (a: T, b: T) => number;
};

// 型推論のためのヘルパー
export function StorageCollection<T, K extends keyof T>(
  value: StorageCollection<T, K>,
  _keys?: K[]
): StorageCollection<T> {
  return value;
}

export function getKey<T, K extends keyof T>(
  collection: StorageCollection<T, K>,
  value: Pick<T, K>
): string {
  return `${collection.keyPrefix}${collection.keyPayload(value)}`;
}

export type StorageCollectionTypeOf<T> =
  T extends StorageCollection<infer U> ? U : never;
