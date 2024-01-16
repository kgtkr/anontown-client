import { useMutation, useSuspenseQuery } from "@apollo/client";
import { StorageCollection, getKey } from "./StorageCollection";
import { graphql } from "../../../generated/graphql/gql";
import { useUserContext } from "../../../hooks";
import React from "react";

/**
 * あるStorageをset/deleteしたときにキャッシュを更新するべきクエリを保持する
 * 例えば key="a:b:c" を持つStorageをset/deleteした時、更新対象のクエリは
 * - keyPrefixが "a:" や "a:b:" であるクエリ
 * - keysに "a:b:c" を含むクエリ
 */
export interface StorageCache {
  // あるprefixのクエリ
  prefixedQueries: Set<string>;
  // あるkeyを持つクエリ。valueはsorted keysのJSON集合
  keysQueries: Map<string, Set<string>>;
}

export function StorageCache(): StorageCache {
  return {
    prefixedQueries: new Set(),
    keysQueries: new Map(),
  };
}

export const StorageCacheContext = React.createContext<StorageCache>(
  undefined!,
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

type S = { __typename: "Storage"; key: string; value: string };
function lowerBoundStorages(storages: S[], key: string): number {
  let left = 0;
  let right = storages.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (storages[mid].key < key) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}
function updateCacheSetStorage(prevCache: S[], s: S): S[] {
  const cache = [...prevCache];
  const left = lowerBoundStorages(cache, s.key);

  if (left < cache.length && cache[left].key === s.key) {
    cache[left] = s;
  } else {
    cache.splice(left, 0, s);
  }

  return cache;
}

function deleteCacheSetStorage(prevCache: S[], key: string): S[] {
  const left = lowerBoundStorages(prevCache, key);

  if (left < prevCache.length && prevCache[left].key === key) {
    const cache = [...prevCache];
    cache.splice(left, 1);
    return cache;
  }

  return prevCache;
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
  const cache = React.useContext(StorageCacheContext);
  const prefix = `${storageCollection.keyPrefix}${additionalPrefix ?? ""}`;
  // TODO: 既に hoge: でリクエストしているなら hoge:foo: でリクエストしないようにする
  const { data } = useSuspenseQuery(PrefixedStorageQueryDocument, {
    variables: {
      prefix,
    },
    skip: !userData,
  });
  React.useEffect(() => {
    cache.prefixedQueries.add(prefix);
  }, [cache, data, prefix]);

  const result = React.useMemo(() => {
    if (data === undefined) {
      return [];
    }

    const result: T[] = [];
    for (const storage of data.storages) {
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
  }, [data, storageCollection]);

  return result;
}

export function useStorage<T, K extends keyof T, D>(
  storageCollection: StorageCollection<T, K>,
  keyObjects: Pick<T, K>[],
  defaultValue: D | T, // `| T` は不要だが補完のため
): (key: Pick<T, K>) => T | D {
  const { value: userData } = useUserContext();
  const cache = React.useContext(StorageCacheContext);
  const keys = React.useMemo(
    () => keyObjects.map((key) => getKey(storageCollection, key)).sort(),
    [storageCollection, keyObjects],
  );
  // TODO: 既に cache に対象の key が全てあるならリクエストしないようにする。また、 cache にあるキーを除いてリクエストする
  const { data } = useSuspenseQuery(StorageQueryDocument, {
    variables: {
      keys,
    },
    skip: !userData || keyObjects.length === 0,
  });
  React.useEffect(() => {
    for (const key of keys) {
      const keysQueries = cache.keysQueries.get(key) ?? new Set();
      keysQueries.add(JSON.stringify(keys));
      cache.keysQueries.set(key, keysQueries);
    }
  }, [cache, data, keys]);

  return React.useMemo(() => {
    const map = new Map<string, T>();
    if (data !== undefined) {
      for (const storage of data.storages) {
        try {
          map.set(
            storage.key,
            storageCollection.validator.parse(JSON.parse(storage.value)),
          );
        } catch (e) {
          // ignore
        }
      }
    }

    return (key: Pick<T, K>): T | D => {
      const value = map.get(getKey(storageCollection, key));
      if (value === undefined) {
        return defaultValue;
      }
      return value;
    };
  }, [data, storageCollection, defaultValue]);
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
  const storageCache = React.useContext(StorageCacheContext);

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
            update: (cache, { data }) => {
              if (data === null || data === undefined) {
                return;
              }

              if (data.setStorages.storages.length === 0) {
                return;
              }
              const storage = data.setStorages.storages[0];
              for (const prefix of splitKey(key)) {
                if (storageCache.prefixedQueries.has(prefix)) {
                  cache.updateQuery(
                    {
                      query: PrefixedStorageQueryDocument,
                      variables: {
                        prefix,
                      },
                    },
                    (prev) => {
                      if (prev === null) {
                        return prev;
                      }

                      return {
                        ...prev,
                        storages: updateCacheSetStorage(prev.storages, storage),
                      };
                    },
                  );
                }
              }

              const keysQueries = storageCache.keysQueries.get(key) ?? [];

              for (const keysJSON of keysQueries) {
                const keys = JSON.parse(keysJSON) as string[];
                cache.updateQuery(
                  {
                    query: StorageQueryDocument,
                    variables: {
                      keys,
                    },
                  },
                  (prev) => {
                    if (prev === null) {
                      return prev;
                    }

                    return {
                      ...prev,
                      storages: updateCacheSetStorage(prev.storages, storage),
                    };
                  },
                );
              }
            },
          });
        },
        result,
      ] as const,
    [storageCollection, mutation, result],
  );
}

export function useDeleteStorage<T, K extends keyof T>(
  storageCollection: StorageCollection<T, K>,
) {
  const [mutation, result] = useMutation(DeleteStorageMutationDocument);
  const storageCache = React.useContext(StorageCacheContext);

  return React.useMemo(
    () =>
      [
        async (keyObject: Pick<T, K>) => {
          const key = getKey(storageCollection, keyObject);
          await mutation({
            variables: {
              key,
            },
            update: (cache) => {
              cache.evict({
                id: cache.identify({
                  __typename: "Storage",
                  key,
                }),
              });

              for (const prefix of splitKey(key)) {
                if (storageCache.prefixedQueries.has(prefix)) {
                  cache.updateQuery(
                    {
                      query: PrefixedStorageQueryDocument,
                      variables: {
                        prefix,
                      },
                    },
                    (prev) => {
                      if (prev === null) {
                        return prev;
                      }

                      return {
                        ...prev,
                        storages: deleteCacheSetStorage(prev.storages, key),
                      };
                    },
                  );
                }
              }

              const keysQueries = storageCache.keysQueries.get(key) ?? [];

              for (const keysJSON of keysQueries) {
                const keys = JSON.parse(keysJSON) as string[];
                cache.updateQuery(
                  {
                    query: StorageQueryDocument,
                    variables: {
                      keys,
                    },
                  },
                  (prev) => {
                    if (prev === null) {
                      return prev;
                    }

                    return {
                      ...prev,
                      storages: deleteCacheSetStorage(prev.storages, key),
                    };
                  },
                );
              }
            },
          });
        },
        result,
      ] as const,
    [mutation, result, storageCollection],
  );
}
