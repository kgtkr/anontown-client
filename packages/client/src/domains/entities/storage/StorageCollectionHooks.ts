import {
  InternalRefetchQueriesInclude,
  OperationVariables,
  QueryOptions,
  useMutation,
  useSuspenseQuery,
} from "@apollo/client";
import { StorageCollection, getKey } from "./StorageCollection";
import { graphql } from "../../../generated/graphql/gql";
import { useUserContext } from "../../../hooks";

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
      __typename
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
  additionalPrefix?: string
): T[] {
  const { value: userData } = useUserContext();
  const { data } = useSuspenseQuery(PrefixedStorageQueryDocument, {
    variables: {
      prefix: `${storageCollection.keyPrefix}${additionalPrefix ?? ""}`,
    },
    skip: !userData,
  });

  if (data === undefined) {
    return [];
  }

  const result: T[] = [];
  for (const storage of data.storages) {
    try {
      result.push(storageCollection.validator.parse(JSON.parse(storage.value)));
    } catch (e) {
      // ignore
    }
  }

  if (storageCollection.compare) {
    result.sort(storageCollection.compare);
  }

  return result;
}

export function useStorage<T, K extends keyof T, D>(
  storageCollection: StorageCollection<T, K>,
  keys: Pick<T, K>[],
  defaultValue: D | T // `| T` は不要だが補完のため
): (key: Pick<T, K>) => T | D {
  const { value: userData } = useUserContext();
  const { data } = useSuspenseQuery(StorageQueryDocument, {
    variables: {
      keys: keys.map((key) => getKey(storageCollection, key)),
    },
    skip: !userData || keys.length === 0,
  });
  const map = new Map<string, T>();
  if (data !== undefined) {
    for (const storage of data.storages) {
      try {
        map.set(
          storage.key,
          storageCollection.validator.parse(JSON.parse(storage.value))
        );
      } catch (e) {
        // ignore
      }
    }
  }
  return (key: Pick<T, K>) => {
    const value = map.get(getKey(storageCollection, key));
    if (value === undefined) {
      return defaultValue;
    }
    return value;
  };
}

export function useSingleStorage<T, K extends keyof T, D>(
  storageCollection: StorageCollection<T, K>,
  key: Pick<T, K>,
  defaultValue: D | T
): T | D {
  const storages = useStorage(storageCollection, [key], defaultValue);
  return storages(key);
}

function typedQuery<TVariables extends OperationVariables>(
  options: QueryOptions<TVariables, unknown>
) {
  return options;
}

function refetchQueries(key: string): InternalRefetchQueriesInclude {
  let prefix = "";
  const prefixes: string[] = [];
  for (const x of key.split(":").slice(0, -1)) {
    prefix += `${x}:`;
    prefixes.push(prefix);
  }

  return prefixes.map((prefix) =>
    typedQuery({
      query: PrefixedStorageQueryDocument,
      variables: {
        prefix,
      },
    })
  );
}

export function useSetStorage<T>(storageCollection: StorageCollection<T>) {
  const [mutation, result] = useMutation(SetStoragesMutationDocument);

  return [
    async (value: T) => {
      const key = getKey(storageCollection, value);
      await mutation({
        variables: {
          input: {
            storages: [{ key, value: JSON.stringify(value) }],
          },
        },
        refetchQueries: refetchQueries(key),
      });
    },
    result,
  ] as const;
}

export function useDeleteStorage<T, K extends keyof T>(
  storageCollection: StorageCollection<T, K>
) {
  const [mutation, result] = useMutation(DeleteStorageMutationDocument);

  return [
    async (keyObject: Pick<T, K>) => {
      const key = getKey(storageCollection, keyObject);
      await mutation({
        variables: {
          key,
        },
        refetchQueries: refetchQueries(key),
        update: (cache) => {
          cache.evict({
            id: cache.identify({
              __typename: "Storage",
              key,
            }),
          });
        },
      });
    },
    result,
  ] as const;
}
