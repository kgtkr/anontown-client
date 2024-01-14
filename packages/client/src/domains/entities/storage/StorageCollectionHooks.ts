import {
  InternalRefetchQueriesInclude,
  OperationVariables,
  QueryOptions,
  useMutation,
  useSuspenseQuery,
} from "@apollo/client";
import { StorageCollection, getKey } from "./StorageCollection";
import { graphql } from "../../../generated/graphql/gql";

const PrefixedStorageQueryDocument = graphql(/* GraphQL */ `
  query StorageCollectionHooks_prefixedStorageQuery($prefix: String!) {
    storages(query: { keyPrefix: $prefix }) {
      key
      value
    }
  }
`);

const StorageQueryDocument = graphql(/* GraphQL */ `
  query StorageCollectionHooks_storageQuery($key: String!) {
    storages(query: { key: [$key] }) {
      key
      value
    }
  }
`);

const SetStorageMutationDocument = graphql(/* GraphQL */ `
  mutation StorageCollectionHooks_setStorageMutation(
    $key: String!
    $value: String!
  ) {
    setStorage(key: $key, value: $value) {
      __typename
    }
  }
`);

const DeleteStorageMutationDocument = graphql(/* GraphQL */ `
  mutation StorageCollectionHooks_deleteStorageMutation($key: String!) {
    delStorage(key: $key)
  }
`);

export function useStorageCollection<T>(
  storageCollection: StorageCollection<T>,
  additionalPrefix?: string
): T[] {
  const { data } = useSuspenseQuery(PrefixedStorageQueryDocument, {
    variables: {
      prefix: `${storageCollection.keyPrefix}${additionalPrefix ?? ""}`,
    },
  });

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

export function useSingleStorage<T, K extends keyof T>(
  storageCollection: StorageCollection<T, K>,
  key: Pick<T, K>,
  defaultValue: T
): T {
  const { data } = useSuspenseQuery(StorageQueryDocument, {
    variables: {
      key: getKey(storageCollection, key),
    },
  });

  if (data.storages.length === 0) {
    return defaultValue;
  }

  try {
    return storageCollection.validator.parse(
      JSON.parse(data.storages[0].value)
    );
  } catch (e) {
    return defaultValue;
  }
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

  return [
    typedQuery({
      query: StorageQueryDocument,
      variables: {
        key,
      },
    }),
    ...prefixes.map((prefix) =>
      typedQuery({
        query: PrefixedStorageQueryDocument,
        variables: {
          prefix,
        },
      })
    ),
  ];
}

export function useSetStorage<T>(storageCollection: StorageCollection<T>) {
  const [mutation, result] = useMutation(SetStorageMutationDocument);

  return [
    async (value: T) => {
      const key = getKey(storageCollection, value);
      await mutation({
        variables: {
          key,
          value: JSON.stringify(value),
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
    async (key: Pick<T, K>) => {
      await mutation({
        variables: {
          key: getKey(storageCollection, key),
        },
        refetchQueries: refetchQueries(getKey(storageCollection, key)),
      });
    },
    result,
  ] as const;
}
