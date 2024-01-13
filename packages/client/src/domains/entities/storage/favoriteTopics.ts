import { z } from "zod";

export const keyPrefix = "favoriteTopics:";
export const Value = z.string();
export type Value = z.infer<typeof Value>;

export function key(value: Value): string {
  return `${keyPrefix}${value}`;
}
