import { skipToken, useMutation, useSuspenseQuery } from "@apollo/client";
import { StorageCollection, getKey } from "./StorageCollection";
import { graphql } from "../../../generated/graphql/gql";
import { useUserContext } from "../../../hooks";
import React from "react";
import { atom, useAtomValue, useSetAtom, useStore } from "jotai";
import { atomFamily } from "jotai/utils";
import { isNotUndefined } from "../../../prelude";
import equal from "fast-deep-equal";

type S = { __typename: "Storage"; key: string; value: string };

// クエリした結果存在しないことが分かっているもの
const notFound = Symbol("notFound");
const valuesCache = atomFamily((_key: string) =>
  atom<S | typeof notFound | undefined>(undefined),
);
const prefixedKeysCache = atomFamily((_prefix: string) =>
  atom<string[] | undefined>(undefined),
);

// hoge:foo: で検索した時に hoge:foo: がないが hoge: がある場合にそのキャッシュをフィルタリングして返す
const prefixedKeys = atomFamily((prefix: string) =>
  atom<string[] | undefined>((get) => {
    const prefixes = splitKey(prefix);
    for (const p of prefixes) {
      const cache = get(prefixedKeysCache(p));
      if (cache !== undefined) {
        return cache.filter((x) => x.startsWith(prefix));
      }
    }
    return undefined;
  }),
);

const prefixedStorages = atomFamily((prefix: string) =>
  atom<S[] | undefined>((get) => {
    const keys = get(prefixedKeys(prefix));
    if (keys === undefined) {
      return undefined;
    }
    return keys.map((key) => {
      const storage = get(valuesCache(key));
      if (storage === undefined || storage === notFound) {
        throw new Error("unexpected");
      }
      return storage;
    });
  }),
);

const keysStorages = atomFamily(
  (keys: string[]) =>
    atom<Map<string, S | undefined | typeof notFound>>((get) => {
      return new Map(keys.map((key) => [key, get(valuesCache(key))] as const));
    }),
  equal,
);

function splitKey(key: string): string[] {
  const keys = key.split(":");

  let prefix = "";
  const prefixes: string[] = [];
  for (const x of keys.slice(0, -1)) {
    prefix += `${x}:`;
    prefixes.push(prefix);
  }
  prefixes.push(key);
  return prefixes;
}

function lowerBoundKeys(keys: string[], key: string): number {
  let left = 0;
  let right = keys.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (keys[mid] < key) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}
function updateCacheSetKey(prevKeys: string[], key: string): string[] {
  const keys = [...prevKeys];
  const left = lowerBoundKeys(keys, key);

  if (left < keys.length && keys[left] === key) {
    keys[left] = key;
  } else {
    keys.splice(left, 0, key);
  }

  return keys;
}

function updateCacheDeleteKey(prevKeys: string[], key: string): string[] {
  const left = lowerBoundKeys(prevKeys, key);

  if (left < prevKeys.length && prevKeys[left] === key) {
    const keys = [...prevKeys];
    keys.splice(left, 1);
    return keys;
  }

  return prevKeys;
}

const PrefixedStorageQueryDocument = graphql(/* GraphQL */ `
  query StorageCollectionHooks_prefixedStorageQuery($prefix: String!) {
    storages(query: { keyPrefix: $prefix }) {
      key
      value
    }
  }
`);

const StorageQueryDocument = graphql(/* GraphQL */ `
  query StorageCollectionHooks_storageQuery($keys: [String!]!) {
    storages(query: { key: $keys }) {
      key
      value
    }
  }
`);

const SetStoragesMutationDocument = graphql(/* GraphQL */ `
  mutation StorageCollectionHooks_setStoragesMutation(
    $input: SetStoragesInput!
  ) {
    setStorages(input: $input) {
      storages {
        key
        value
      }
    }
  }
`);

const DeleteStorageMutationDocument = graphql(/* GraphQL */ `
  mutation StorageCollectionHooks_deleteStorageMutation($key: String!) {
    delStorage(key: $key)
  }
`);

export function usePrefixedStorageCollection<T>(
  storageCollection: StorageCollection<T>,
  // `:`で区切られ`:`で終わる
  additionalPrefix?: string,
): T[] {
  const { value: userData } = useUserContext();
  const prefix = `${storageCollection.keyPrefix}${additionalPrefix ?? ""}`;
  const cachedStorages = useAtomValue(prefixedStorages(prefix));
  const setPrefixedKeysCache = useSetAtom(prefixedKeysCache(prefix));
  const { data } = useSuspenseQuery(
    PrefixedStorageQueryDocument,
    userData !== null && cachedStorages === undefined
      ? {
          variables: {
            prefix,
          },
        }
      : skipToken,
  );
  const store = useStore();
  React.useEffect(() => {
    if (data === undefined) {
      return;
    }

    for (const storage of data.storages) {
      // atomFamily の複数の値にsetするhookがないのでstore apiを使っている
      store.set(valuesCache(storage.key), storage);
    }
    setPrefixedKeysCache(data.storages.map((s) => s.key));
  }, [store, setPrefixedKeysCache, data, prefix]);

  const result = React.useMemo(() => {
    const storages = cachedStorages ?? data?.storages;

    if (storages === undefined) {
      return [];
    }

    const result: T[] = [];
    for (const storage of storages) {
      try {
        result.push(
          storageCollection.validator.parse(JSON.parse(storage.value)),
        );
      } catch (e) {
        // ignore
      }
    }

    if (storageCollection.compare) {
      result.sort(storageCollection.compare);
    }
    return result;
  }, [cachedStorages, data, storageCollection]);

  return result;
}

export function useStorage<T, K extends keyof T, D>(
  storageCollection: StorageCollection<T, K>,
  keyObjects: Pick<T, K>[],
  defaultValue: D | T, // `| T` は不要だが補完のため
): (key: Pick<T, K>) => T | D {
  const { value: userData } = useUserContext();
  const keys = React.useMemo(
    () => keyObjects.map((key) => getKey(storageCollection, key)).sort(),
    [storageCollection, keyObjects],
  );
  const cachedStorages = useAtomValue(keysStorages(keys));
  const requestKeys = React.useMemo(() => {
    return Array.from(cachedStorages)
      .filter(([, value]) => value === undefined)
      .map(([key]) => key);
  }, [cachedStorages]);
  const { data } = useSuspenseQuery(
    StorageQueryDocument,
    userData !== null && requestKeys.length > 0
      ? {
          variables: {
            keys: requestKeys,
          },
        }
      : skipToken,
  );
  const store = useStore();
  React.useEffect(() => {
    if (data === undefined) {
      return;
    }
    const map = new Map(data.storages.map((s) => [s.key, s] as const));
    for (const key of keys) {
      store.set(valuesCache(key), map.get(key) ?? notFound);
    }
  }, [data, store, keys]);

  return React.useMemo(() => {
    const map = new Map<string, T>();
    for (const storage of [
      ...Array.from(cachedStorages)
        .map(([, v]) => (v !== notFound ? v : undefined))
        .filter(isNotUndefined),
      ...(data !== undefined ? data.storages : []),
    ]) {
      try {
        map.set(
          storage.key,
          storageCollection.validator.parse(JSON.parse(storage.value)),
        );
      } catch (e) {
        // ignore
      }
    }

    return (key: Pick<T, K>): T | D => {
      const value = map.get(getKey(storageCollection, key));
      if (value === undefined) {
        return defaultValue;
      }
      return value;
    };
  }, [cachedStorages, data, storageCollection, defaultValue]);
}

export function useSingleStorage<T, K extends keyof T, D>(
  storageCollection: StorageCollection<T, K>,
  key: Pick<T, K>,
  defaultValue: D | T,
): T | D {
  const storages = useStorage(storageCollection, [key], defaultValue);
  return storages(key);
}

export function useSetStorage<T>(storageCollection: StorageCollection<T>) {
  const [mutation, result] = useMutation(SetStoragesMutationDocument);
  const store = useStore();

  return React.useMemo(
    () =>
      [
        async (valueObject: T) => {
          const key = getKey(storageCollection, valueObject);
          const value = JSON.stringify(valueObject);
          await mutation({
            variables: {
              input: {
                storages: [{ key, value }],
              },
            },
            onCompleted: (data) => {
              store.set(valuesCache(key), data.setStorages.storages[0]);
              for (const prefix of splitKey(key)) {
                store.set(prefixedKeysCache(prefix), (prev) =>
                  prev === undefined ? undefined : updateCacheSetKey(prev, key),
                );
              }
            },
          });
        },
        result,
      ] as const,
    [store, storageCollection, mutation, result],
  );
}

export function useDeleteStorage<T, K extends keyof T>(
  storageCollection: StorageCollection<T, K>,
) {
  const [mutation, result] = useMutation(DeleteStorageMutationDocument);
  const store = useStore();

  return React.useMemo(
    () =>
      [
        async (keyObject: Pick<T, K>) => {
          const key = getKey(storageCollection, keyObject);
          await mutation({
            variables: {
              key,
            },
            onCompleted: () => {
              store.set(valuesCache(key), notFound);
              for (const prefix of splitKey(key)) {
                store.set(prefixedKeysCache(prefix), (prev) =>
                  prev === undefined
                    ? undefined
                    : updateCacheDeleteKey(prev, key),
                );
              }
            },
          });
        },
        result,
      ] as const,
    [store, mutation, result, storageCollection],
  );
}
