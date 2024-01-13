import { ZodType } from "zod";

export type StorageCollection<T> = {
  keyPrefix: string;
  validator: ZodType<T>;
  keyPayload: (value: T) => string;
  compare?: (a: T, b: T) => number;
};

// 型推論のためのヘルパー
export function StorageCollection<T>(
  value: StorageCollection<T>
): StorageCollection<T> {
  return value;
}

export function getKey<T>(collection: StorageCollection<T>, value: T): string {
  return `${collection.keyPrefix}${collection.keyPayload(value)}`;
}

export type StorageCollectionTypeOf<T> = T extends StorageCollection<infer U>
  ? U
  : never;
