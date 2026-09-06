import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AuthUser = {
  readonly id?: InputMaybe<Scalars['String']['input']>;
  readonly pass: Scalars['String']['input'];
  readonly sn?: InputMaybe<Scalars['String']['input']>;
};

export type CharType =
  | 'd'
  | 'han'
  | 'hira'
  | 'hy'
  | 'kana'
  | 'lc'
  | 'ub'
  | 'uc';

export type Client = {
  readonly __typename: 'Client';
  readonly date: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly self?: Maybe<Scalars['Boolean']['output']>;
  readonly update: Scalars['DateTime']['output'];
  readonly url: Scalars['String']['output'];
};

export type ClientQuery = {
  readonly id?: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
  readonly self?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateClientResponse = Client | CreateClientResponseError;

export type CreateClientResponseError = {
  readonly __typename: 'CreateClientResponseError';
  readonly name: ValidateData;
  readonly url: Scalars['Boolean']['output'];
};

export type CreateTokenGeneralResponse = {
  readonly __typename: 'CreateTokenGeneralResponse';
  readonly req: TokenReq;
  readonly token: TokenGeneral;
};

export type CreateUserResponse = {
  readonly __typename: 'CreateUserResponse';
  readonly token: TokenMaster;
  readonly user: User;
};

export type DateQuery = {
  readonly date: Scalars['DateTime']['input'];
  readonly type: DateType;
};

export type DateType =
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte';

export type History = {
  readonly __typename: 'History';
  readonly date: Scalars['DateTime']['output'];
  readonly hash: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly self?: Maybe<Scalars['Boolean']['output']>;
  readonly tags: ReadonlyArray<Scalars['String']['output']>;
  readonly text: Scalars['String']['output'];
  readonly title: Scalars['String']['output'];
  readonly topic: TopicNormal;
};

export type HistoryQuery = {
  readonly date?: InputMaybe<DateQuery>;
  readonly id?: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
  readonly topic?: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
};

export type Mutation = {
  readonly __typename: 'Mutation';
  readonly authTokenReq: TokenGeneral;
  readonly createClient: Client;
  readonly createProfile: Profile;
  readonly createRes: ResNormal;
  readonly createTokenGeneral: CreateTokenGeneralResponse;
  readonly createTokenMaster: TokenMaster;
  readonly createTokenReq: TokenReq;
  readonly createTopicFork: TopicFork;
  readonly createTopicNormal: TopicNormal;
  readonly createTopicOne: TopicOne;
  readonly createUser: CreateUserResponse;
  readonly delRes: ResDelete;
  readonly delStorage?: Maybe<Scalars['Boolean']['output']>;
  readonly delTokenClient?: Maybe<Scalars['Boolean']['output']>;
  readonly resisterPushSubscription?: Maybe<Scalars['Boolean']['output']>;
  readonly setStorages: SetStoragesPayload;
  readonly subscribeTopic?: Maybe<Scalars['Boolean']['output']>;
  readonly unsubscribeTopic?: Maybe<Scalars['Boolean']['output']>;
  readonly updateClient: Client;
  readonly updateProfile: Profile;
  readonly updateTopic: TopicNormal;
  readonly updateUser: UpdateUserResponse;
  readonly voteRes: Res;
};


export type MutationAuthTokenReqArgs = {
  id: Scalars['ID']['input'];
  key: Scalars['String']['input'];
};


export type MutationCreateClientArgs = {
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type MutationCreateProfileArgs = {
  name: Scalars['String']['input'];
  sn: Scalars['String']['input'];
  text: Scalars['String']['input'];
};


export type MutationCreateResArgs = {
  age: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<Scalars['String']['input']>;
  reply?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  topic: Scalars['String']['input'];
};


export type MutationCreateTokenGeneralArgs = {
  client: Scalars['ID']['input'];
};


export type MutationCreateTokenMasterArgs = {
  auth: AuthUser;
};


export type MutationCreateTopicForkArgs = {
  parent: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateTopicNormalArgs = {
  tags: ReadonlyArray<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateTopicOneArgs = {
  tags: ReadonlyArray<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  pass: Scalars['String']['input'];
  recaptcha: Scalars['String']['input'];
  sn: Scalars['String']['input'];
};


export type MutationDelResArgs = {
  res: Scalars['ID']['input'];
};


export type MutationDelStorageArgs = {
  key: Scalars['String']['input'];
};


export type MutationDelTokenClientArgs = {
  client: Scalars['ID']['input'];
};


export type MutationResisterPushSubscriptionArgs = {
  auth: Scalars['String']['input'];
  endpoint: Scalars['String']['input'];
  p256dh: Scalars['String']['input'];
};


export type MutationSetStoragesArgs = {
  input: SetStoragesInput;
};


export type MutationSubscribeTopicArgs = {
  topic: Scalars['ID']['input'];
};


export type MutationUnsubscribeTopicArgs = {
  topic: Scalars['ID']['input'];
};


export type MutationUpdateClientArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProfileArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  sn?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['ID']['input'];
  tags?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  auth: AuthUser;
  pass?: InputMaybe<Scalars['String']['input']>;
  sn?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVoteResArgs = {
  res: Scalars['ID']['input'];
  type: VoteType;
};

export type Profile = {
  readonly __typename: 'Profile';
  readonly date: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly self?: Maybe<Scalars['Boolean']['output']>;
  readonly sn: Scalars['String']['output'];
  readonly text: Scalars['String']['output'];
  readonly update: Scalars['DateTime']['output'];
};

export type ProfileQuery = {
  readonly id?: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
  readonly self?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  readonly __typename: 'Query';
  readonly clients: ReadonlyArray<Client>;
  readonly histories: ReadonlyArray<History>;
  readonly profiles: ReadonlyArray<Profile>;
  readonly query: Query;
  readonly reses: ReadonlyArray<Res>;
  readonly storages: ReadonlyArray<Storage>;
  readonly token: Token;
  readonly tokens: ReadonlyArray<Token>;
  readonly topicTags: ReadonlyArray<Tags>;
  readonly topics: ReadonlyArray<Topic>;
  readonly user: User;
  readonly userID: Scalars['ID']['output'];
  readonly userSN: Scalars['String']['output'];
};


export type QueryClientsArgs = {
  query: ClientQuery;
};


export type QueryHistoriesArgs = {
  limit?: Scalars['Int']['input'];
  query: HistoryQuery;
};


export type QueryProfilesArgs = {
  query: ProfileQuery;
};


export type QueryResesArgs = {
  limit?: Scalars['Int']['input'];
  query: ResQuery;
};


export type QueryStoragesArgs = {
  query: StorageQuery;
};


export type QueryTopicTagsArgs = {
  limit?: Scalars['Int']['input'];
};


export type QueryTopicsArgs = {
  limit?: Scalars['Int']['input'];
  query: TopicQuery;
  skip?: Scalars['Int']['input'];
};


export type QueryUserIdArgs = {
  sn: Scalars['String']['input'];
};


export type QueryUserSnArgs = {
  id: Scalars['ID']['input'];
};

export type Res = {
  readonly date: Scalars['DateTime']['output'];
  readonly dv: Scalars['Int']['output'];
  readonly hash: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly replyCount: Scalars['Int']['output'];
  readonly self?: Maybe<Scalars['Boolean']['output']>;
  readonly topic: Topic;
  readonly uv: Scalars['Int']['output'];
  readonly voteFlag?: Maybe<VoteFlag>;
};

export type ResDelete = Res & {
  readonly __typename: 'ResDelete';
  readonly date: Scalars['DateTime']['output'];
  readonly dv: Scalars['Int']['output'];
  readonly flag: ResDeleteFlag;
  readonly hash: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly replyCount: Scalars['Int']['output'];
  readonly self?: Maybe<Scalars['Boolean']['output']>;
  readonly topic: Topic;
  readonly uv: Scalars['Int']['output'];
  readonly voteFlag?: Maybe<VoteFlag>;
};

export type ResDeleteFlag =
  | 'freeze'
  | 'self';

export type ResFork = Res & {
  readonly __typename: 'ResFork';
  readonly date: Scalars['DateTime']['output'];
  readonly dv: Scalars['Int']['output'];
  readonly fork: TopicFork;
  readonly hash: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly replyCount: Scalars['Int']['output'];
  readonly self?: Maybe<Scalars['Boolean']['output']>;
  readonly topic: Topic;
  readonly uv: Scalars['Int']['output'];
  readonly voteFlag?: Maybe<VoteFlag>;
};

export type ResHistory = Res & {
  readonly __typename: 'ResHistory';
  readonly date: Scalars['DateTime']['output'];
  readonly dv: Scalars['Int']['output'];
  readonly hash: Scalars['String']['output'];
  readonly history: History;
  readonly id: Scalars['ID']['output'];
  readonly replyCount: Scalars['Int']['output'];
  readonly self?: Maybe<Scalars['Boolean']['output']>;
  readonly topic: Topic;
  readonly uv: Scalars['Int']['output'];
  readonly voteFlag?: Maybe<VoteFlag>;
};

export type ResNormal = Res & {
  readonly __typename: 'ResNormal';
  readonly date: Scalars['DateTime']['output'];
  readonly dv: Scalars['Int']['output'];
  readonly hash: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly isReply?: Maybe<Scalars['Boolean']['output']>;
  readonly name?: Maybe<Scalars['String']['output']>;
  readonly profile?: Maybe<Profile>;
  readonly reply?: Maybe<Res>;
  readonly replyCount: Scalars['Int']['output'];
  readonly self?: Maybe<Scalars['Boolean']['output']>;
  readonly text: Scalars['String']['output'];
  readonly topic: Topic;
  readonly uv: Scalars['Int']['output'];
  readonly voteFlag?: Maybe<VoteFlag>;
};

export type ResQuery = {
  readonly date?: InputMaybe<DateQuery>;
  readonly hash?: InputMaybe<Scalars['String']['input']>;
  readonly id?: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
  readonly notice?: InputMaybe<Scalars['Boolean']['input']>;
  readonly profile?: InputMaybe<Scalars['ID']['input']>;
  readonly reply?: InputMaybe<Scalars['ID']['input']>;
  readonly self?: InputMaybe<Scalars['Boolean']['input']>;
  readonly text?: InputMaybe<Scalars['String']['input']>;
  readonly topic?: InputMaybe<Scalars['ID']['input']>;
};

export type ResSubscript = {
  readonly __typename: 'ResSubscript';
  readonly count: Scalars['Int']['output'];
  readonly res: Res;
};

export type ResTopic = Res & {
  readonly __typename: 'ResTopic';
  readonly date: Scalars['DateTime']['output'];
  readonly dv: Scalars['Int']['output'];
  readonly hash: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly replyCount: Scalars['Int']['output'];
  readonly self?: Maybe<Scalars['Boolean']['output']>;
  readonly topic: Topic;
  readonly uv: Scalars['Int']['output'];
  readonly voteFlag?: Maybe<VoteFlag>;
};

export type SetStoragesInput = {
  readonly storages: ReadonlyArray<StorageInput>;
};

export type SetStoragesPayload = {
  readonly __typename: 'SetStoragesPayload';
  readonly storages: ReadonlyArray<Storage>;
};

export type Storage = {
  readonly __typename: 'Storage';
  readonly key: Scalars['String']['output'];
  readonly value: Scalars['String']['output'];
};

export type StorageInput = {
  readonly key: Scalars['String']['input'];
  readonly value: Scalars['String']['input'];
};

export type StorageQuery = {
  readonly key?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly keyPrefix?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  readonly __typename: 'Subscription';
  readonly resAdded: ResSubscript;
};


export type SubscriptionResAddedArgs = {
  topic: Scalars['ID']['input'];
};

export type Tags = {
  readonly __typename: 'Tags';
  readonly count: Scalars['Int']['output'];
  readonly name: Scalars['String']['output'];
};

export type Token = {
  readonly date: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly key: Scalars['String']['output'];
};

export type TokenGeneral = Token & {
  readonly __typename: 'TokenGeneral';
  readonly client: Client;
  readonly date: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly key: Scalars['String']['output'];
};

export type TokenMaster = Token & {
  readonly __typename: 'TokenMaster';
  readonly date: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly key: Scalars['String']['output'];
};

export type TokenReq = {
  readonly __typename: 'TokenReq';
  readonly key: Scalars['String']['output'];
  readonly token: Scalars['ID']['output'];
};

export type Topic = {
  readonly active: Scalars['Boolean']['output'];
  readonly date: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly resCount: Scalars['Int']['output'];
  readonly subscribe?: Maybe<Scalars['Boolean']['output']>;
  readonly title: Scalars['String']['output'];
  readonly update: Scalars['DateTime']['output'];
};

export type TopicFork = Topic & {
  readonly __typename: 'TopicFork';
  readonly active: Scalars['Boolean']['output'];
  readonly date: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly parent: TopicNormal;
  readonly resCount: Scalars['Int']['output'];
  readonly subscribe?: Maybe<Scalars['Boolean']['output']>;
  readonly title: Scalars['String']['output'];
  readonly update: Scalars['DateTime']['output'];
};

export type TopicNormal = Topic & TopicSearch & {
  readonly __typename: 'TopicNormal';
  readonly active: Scalars['Boolean']['output'];
  readonly date: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly resCount: Scalars['Int']['output'];
  readonly subscribe?: Maybe<Scalars['Boolean']['output']>;
  readonly tags: ReadonlyArray<Scalars['String']['output']>;
  readonly text: Scalars['String']['output'];
  readonly title: Scalars['String']['output'];
  readonly update: Scalars['DateTime']['output'];
};

export type TopicOne = Topic & TopicSearch & {
  readonly __typename: 'TopicOne';
  readonly active: Scalars['Boolean']['output'];
  readonly date: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly resCount: Scalars['Int']['output'];
  readonly subscribe?: Maybe<Scalars['Boolean']['output']>;
  readonly tags: ReadonlyArray<Scalars['String']['output']>;
  readonly text: Scalars['String']['output'];
  readonly title: Scalars['String']['output'];
  readonly update: Scalars['DateTime']['output'];
};

export type TopicQuery = {
  readonly activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  readonly id?: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
  readonly parent?: InputMaybe<Scalars['ID']['input']>;
  readonly tags?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly title?: InputMaybe<Scalars['String']['input']>;
};

export type TopicSearch = {
  readonly active: Scalars['Boolean']['output'];
  readonly date: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly resCount: Scalars['Int']['output'];
  readonly subscribe?: Maybe<Scalars['Boolean']['output']>;
  readonly tags: ReadonlyArray<Scalars['String']['output']>;
  readonly text: Scalars['String']['output'];
  readonly title: Scalars['String']['output'];
  readonly update: Scalars['DateTime']['output'];
};

export type UpdateUserResponse = {
  readonly __typename: 'UpdateUserResponse';
  readonly token: TokenMaster;
  readonly user: User;
};

export type User = {
  readonly __typename: 'User';
  readonly id: Scalars['ID']['output'];
  readonly sn: Scalars['String']['output'];
};

export type ValidateData = {
  readonly __typename: 'ValidateData';
  readonly char?: Maybe<ReadonlyArray<Maybe<CharType>>>;
  readonly max?: Maybe<Scalars['Int']['output']>;
  readonly min?: Maybe<Scalars['Int']['output']>;
};

export type VoteFlag =
  | 'dv'
  | 'not'
  | 'uv';

export type VoteType =
  | 'cv'
  | 'dv'
  | 'uv';

export const ProfileFragmentDoc = gql`
    fragment profile on Profile {
  id
  self
  name
  text
  date
  update
  sn
}
    `;
export const TopicBaseFragmentDoc = gql`
    fragment topicBase on Topic {
  id
  title
  update
  date
  resCount
  active
}
    `;
export const TopicSearchBaseFragmentDoc = gql`
    fragment topicSearchBase on TopicSearch {
  tags
  text
  ...topicBase
}
    ${TopicBaseFragmentDoc}`;
export const TopicOneFragmentDoc = gql`
    fragment topicOne on TopicOne {
  ...topicSearchBase
}
    ${TopicSearchBaseFragmentDoc}`;
export const TopicNormalFragmentDoc = gql`
    fragment topicNormal on TopicNormal {
  ...topicSearchBase
}
    ${TopicSearchBaseFragmentDoc}`;
export const TopicSearchFragmentDoc = gql`
    fragment topicSearch on TopicSearch {
  ...topicNormal
  ...topicOne
}
    ${TopicNormalFragmentDoc}
${TopicOneFragmentDoc}`;
export const TopicForkFragmentDoc = gql`
    fragment topicFork on TopicFork {
  parent {
    ...topicSearch
  }
  ...topicBase
}
    ${TopicSearchFragmentDoc}
${TopicBaseFragmentDoc}`;
export const TopicFragmentDoc = gql`
    fragment topic on Topic {
  ...topicOne
  ...topicNormal
  ...topicFork
}
    ${TopicOneFragmentDoc}
${TopicNormalFragmentDoc}
${TopicForkFragmentDoc}`;
export const ResBaseFragmentDoc = gql`
    fragment resBase on Res {
  id
  topic {
    ...topic
  }
  date
  self
  uv
  dv
  hash
  replyCount
  voteFlag
}
    ${TopicFragmentDoc}`;
export const ResNormalFragmentDoc = gql`
    fragment resNormal on ResNormal {
  name
  text
  reply {
    id
  }
  profile {
    ...profile
  }
  isReply
  ...resBase
}
    ${ProfileFragmentDoc}
${ResBaseFragmentDoc}`;
export const HistoryFragmentDoc = gql`
    fragment history on History {
  id
  topic {
    ...topicNormal
  }
  title
  tags
  text
  date
  hash
  self
}
    ${TopicNormalFragmentDoc}`;
export const ResHistoryFragmentDoc = gql`
    fragment resHistory on ResHistory {
  history {
    ...history
  }
  ...resBase
}
    ${HistoryFragmentDoc}
${ResBaseFragmentDoc}`;
export const ResForkFragmentDoc = gql`
    fragment resFork on ResFork {
  fork {
    ...topicFork
  }
  ...resBase
}
    ${TopicForkFragmentDoc}
${ResBaseFragmentDoc}`;
export const ResDeleteFragmentDoc = gql`
    fragment resDelete on ResDelete {
  flag
  ...resBase
}
    ${ResBaseFragmentDoc}`;
export const ResTopicFragmentDoc = gql`
    fragment resTopic on ResTopic {
  ...resBase
}
    ${ResBaseFragmentDoc}`;
export const ResFragmentDoc = gql`
    fragment res on Res {
  ...resNormal
  ...resHistory
  ...resFork
  ...resDelete
  ...resTopic
}
    ${ResNormalFragmentDoc}
${ResHistoryFragmentDoc}
${ResForkFragmentDoc}
${ResDeleteFragmentDoc}
${ResTopicFragmentDoc}`;
export const StorageFragmentDoc = gql`
    fragment storage on Storage {
  key
  value
}
    `;
export const TokenReqFragmentDoc = gql`
    fragment tokenReq on TokenReq {
  token
  key
}
    `;
export const TokenBaseFragmentDoc = gql`
    fragment tokenBase on Token {
  id
  key
  date
}
    `;
export const TokenMasterFragmentDoc = gql`
    fragment tokenMaster on TokenMaster {
  ...tokenBase
}
    ${TokenBaseFragmentDoc}`;
export const ClientFragmentDoc = gql`
    fragment client on Client {
  id
  name
  url
  self
  date
  update
}
    `;
export const TokenGeneralFragmentDoc = gql`
    fragment tokenGeneral on TokenGeneral {
  client {
    ...client
  }
  ...tokenBase
}
    ${ClientFragmentDoc}
${TokenBaseFragmentDoc}`;
export const TokenFragmentDoc = gql`
    fragment token on Token {
  ...tokenMaster
  ...tokenGeneral
}
    ${TokenMasterFragmentDoc}
${TokenGeneralFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment user on User {
  id
  sn
}
    `;
export const StorageCollectionHooks_PrefixedStorageQueryDocument = gql`
    query StorageCollectionHooks_prefixedStorageQuery($prefix: String!) {
  storages(query: {keyPrefix: $prefix}) {
    key
    value
  }
}
    `;

/**
 * __useStorageCollectionHooks_PrefixedStorageQueryQuery__
 *
 * To run a query within a React component, call `useStorageCollectionHooks_PrefixedStorageQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useStorageCollectionHooks_PrefixedStorageQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStorageCollectionHooks_PrefixedStorageQueryQuery({
 *   variables: {
 *      prefix: // value for 'prefix'
 *   },
 * });
 */
export function useStorageCollectionHooks_PrefixedStorageQueryQuery(baseOptions: Apollo.QueryHookOptions<StorageCollectionHooks_PrefixedStorageQueryQuery, StorageCollectionHooks_PrefixedStorageQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StorageCollectionHooks_PrefixedStorageQueryQuery, StorageCollectionHooks_PrefixedStorageQueryQueryVariables>(StorageCollectionHooks_PrefixedStorageQueryDocument, options);
      }
export function useStorageCollectionHooks_PrefixedStorageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StorageCollectionHooks_PrefixedStorageQueryQuery, StorageCollectionHooks_PrefixedStorageQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StorageCollectionHooks_PrefixedStorageQueryQuery, StorageCollectionHooks_PrefixedStorageQueryQueryVariables>(StorageCollectionHooks_PrefixedStorageQueryDocument, options);
        }
export function useStorageCollectionHooks_PrefixedStorageQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StorageCollectionHooks_PrefixedStorageQueryQuery, StorageCollectionHooks_PrefixedStorageQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StorageCollectionHooks_PrefixedStorageQueryQuery, StorageCollectionHooks_PrefixedStorageQueryQueryVariables>(StorageCollectionHooks_PrefixedStorageQueryDocument, options);
        }
export type StorageCollectionHooks_PrefixedStorageQueryQueryHookResult = ReturnType<typeof useStorageCollectionHooks_PrefixedStorageQueryQuery>;
export type StorageCollectionHooks_PrefixedStorageQueryLazyQueryHookResult = ReturnType<typeof useStorageCollectionHooks_PrefixedStorageQueryLazyQuery>;
export type StorageCollectionHooks_PrefixedStorageQuerySuspenseQueryHookResult = ReturnType<typeof useStorageCollectionHooks_PrefixedStorageQuerySuspenseQuery>;
export type StorageCollectionHooks_PrefixedStorageQueryQueryResult = Apollo.QueryResult<StorageCollectionHooks_PrefixedStorageQueryQuery, StorageCollectionHooks_PrefixedStorageQueryQueryVariables>;
export const StorageCollectionHooks_StorageQueryDocument = gql`
    query StorageCollectionHooks_storageQuery($keys: [String!]!) {
  storages(query: {key: $keys}) {
    key
    value
  }
}
    `;

/**
 * __useStorageCollectionHooks_StorageQueryQuery__
 *
 * To run a query within a React component, call `useStorageCollectionHooks_StorageQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useStorageCollectionHooks_StorageQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStorageCollectionHooks_StorageQueryQuery({
 *   variables: {
 *      keys: // value for 'keys'
 *   },
 * });
 */
export function useStorageCollectionHooks_StorageQueryQuery(baseOptions: Apollo.QueryHookOptions<StorageCollectionHooks_StorageQueryQuery, StorageCollectionHooks_StorageQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StorageCollectionHooks_StorageQueryQuery, StorageCollectionHooks_StorageQueryQueryVariables>(StorageCollectionHooks_StorageQueryDocument, options);
      }
export function useStorageCollectionHooks_StorageQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StorageCollectionHooks_StorageQueryQuery, StorageCollectionHooks_StorageQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StorageCollectionHooks_StorageQueryQuery, StorageCollectionHooks_StorageQueryQueryVariables>(StorageCollectionHooks_StorageQueryDocument, options);
        }
export function useStorageCollectionHooks_StorageQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StorageCollectionHooks_StorageQueryQuery, StorageCollectionHooks_StorageQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StorageCollectionHooks_StorageQueryQuery, StorageCollectionHooks_StorageQueryQueryVariables>(StorageCollectionHooks_StorageQueryDocument, options);
        }
export type StorageCollectionHooks_StorageQueryQueryHookResult = ReturnType<typeof useStorageCollectionHooks_StorageQueryQuery>;
export type StorageCollectionHooks_StorageQueryLazyQueryHookResult = ReturnType<typeof useStorageCollectionHooks_StorageQueryLazyQuery>;
export type StorageCollectionHooks_StorageQuerySuspenseQueryHookResult = ReturnType<typeof useStorageCollectionHooks_StorageQuerySuspenseQuery>;
export type StorageCollectionHooks_StorageQueryQueryResult = Apollo.QueryResult<StorageCollectionHooks_StorageQueryQuery, StorageCollectionHooks_StorageQueryQueryVariables>;
export const StorageCollectionHooks_SetStoragesMutationDocument = gql`
    mutation StorageCollectionHooks_setStoragesMutation($input: SetStoragesInput!) {
  setStorages(input: $input) {
    storages {
      key
      value
    }
  }
}
    `;
export type StorageCollectionHooks_SetStoragesMutationMutationFn = Apollo.MutationFunction<StorageCollectionHooks_SetStoragesMutationMutation, StorageCollectionHooks_SetStoragesMutationMutationVariables>;

/**
 * __useStorageCollectionHooks_SetStoragesMutationMutation__
 *
 * To run a mutation, you first call `useStorageCollectionHooks_SetStoragesMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStorageCollectionHooks_SetStoragesMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [storageCollectionHooksSetStoragesMutationMutation, { data, loading, error }] = useStorageCollectionHooks_SetStoragesMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStorageCollectionHooks_SetStoragesMutationMutation(baseOptions?: Apollo.MutationHookOptions<StorageCollectionHooks_SetStoragesMutationMutation, StorageCollectionHooks_SetStoragesMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StorageCollectionHooks_SetStoragesMutationMutation, StorageCollectionHooks_SetStoragesMutationMutationVariables>(StorageCollectionHooks_SetStoragesMutationDocument, options);
      }
export type StorageCollectionHooks_SetStoragesMutationMutationHookResult = ReturnType<typeof useStorageCollectionHooks_SetStoragesMutationMutation>;
export type StorageCollectionHooks_SetStoragesMutationMutationResult = Apollo.MutationResult<StorageCollectionHooks_SetStoragesMutationMutation>;
export type StorageCollectionHooks_SetStoragesMutationMutationOptions = Apollo.BaseMutationOptions<StorageCollectionHooks_SetStoragesMutationMutation, StorageCollectionHooks_SetStoragesMutationMutationVariables>;
export const StorageCollectionHooks_DeleteStorageMutationDocument = gql`
    mutation StorageCollectionHooks_deleteStorageMutation($key: String!) {
  delStorage(key: $key)
}
    `;
export type StorageCollectionHooks_DeleteStorageMutationMutationFn = Apollo.MutationFunction<StorageCollectionHooks_DeleteStorageMutationMutation, StorageCollectionHooks_DeleteStorageMutationMutationVariables>;

/**
 * __useStorageCollectionHooks_DeleteStorageMutationMutation__
 *
 * To run a mutation, you first call `useStorageCollectionHooks_DeleteStorageMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStorageCollectionHooks_DeleteStorageMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [storageCollectionHooksDeleteStorageMutationMutation, { data, loading, error }] = useStorageCollectionHooks_DeleteStorageMutationMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useStorageCollectionHooks_DeleteStorageMutationMutation(baseOptions?: Apollo.MutationHookOptions<StorageCollectionHooks_DeleteStorageMutationMutation, StorageCollectionHooks_DeleteStorageMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StorageCollectionHooks_DeleteStorageMutationMutation, StorageCollectionHooks_DeleteStorageMutationMutationVariables>(StorageCollectionHooks_DeleteStorageMutationDocument, options);
      }
export type StorageCollectionHooks_DeleteStorageMutationMutationHookResult = ReturnType<typeof useStorageCollectionHooks_DeleteStorageMutationMutation>;
export type StorageCollectionHooks_DeleteStorageMutationMutationResult = Apollo.MutationResult<StorageCollectionHooks_DeleteStorageMutationMutation>;
export type StorageCollectionHooks_DeleteStorageMutationMutationOptions = Apollo.BaseMutationOptions<StorageCollectionHooks_DeleteStorageMutationMutation, StorageCollectionHooks_DeleteStorageMutationMutationVariables>;
export const FindClientsDocument = gql`
    query findClients($query: ClientQuery!) {
  clients(query: $query) {
    ...client
  }
}
    ${ClientFragmentDoc}`;

/**
 * __useFindClientsQuery__
 *
 * To run a query within a React component, call `useFindClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindClientsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useFindClientsQuery(baseOptions: Apollo.QueryHookOptions<FindClientsQuery, FindClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindClientsQuery, FindClientsQueryVariables>(FindClientsDocument, options);
      }
export function useFindClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindClientsQuery, FindClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindClientsQuery, FindClientsQueryVariables>(FindClientsDocument, options);
        }
export function useFindClientsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindClientsQuery, FindClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindClientsQuery, FindClientsQueryVariables>(FindClientsDocument, options);
        }
export type FindClientsQueryHookResult = ReturnType<typeof useFindClientsQuery>;
export type FindClientsLazyQueryHookResult = ReturnType<typeof useFindClientsLazyQuery>;
export type FindClientsSuspenseQueryHookResult = ReturnType<typeof useFindClientsSuspenseQuery>;
export type FindClientsQueryResult = Apollo.QueryResult<FindClientsQuery, FindClientsQueryVariables>;
export const CreateClientDocument = gql`
    mutation createClient($name: String!, $url: String!) {
  createClient(name: $name, url: $url) {
    ...client
  }
}
    ${ClientFragmentDoc}`;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      name: // value for 'name'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation updateClient($id: ID!, $name: String!, $url: String!) {
  updateClient(id: $id, name: $name, url: $url) {
    ...client
  }
}
    ${ClientFragmentDoc}`;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const FindProfilesDocument = gql`
    query findProfiles($query: ProfileQuery!) {
  profiles(query: $query) {
    ...profile
  }
}
    ${ProfileFragmentDoc}`;

/**
 * __useFindProfilesQuery__
 *
 * To run a query within a React component, call `useFindProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfilesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useFindProfilesQuery(baseOptions: Apollo.QueryHookOptions<FindProfilesQuery, FindProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProfilesQuery, FindProfilesQueryVariables>(FindProfilesDocument, options);
      }
export function useFindProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProfilesQuery, FindProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProfilesQuery, FindProfilesQueryVariables>(FindProfilesDocument, options);
        }
export function useFindProfilesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindProfilesQuery, FindProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProfilesQuery, FindProfilesQueryVariables>(FindProfilesDocument, options);
        }
export type FindProfilesQueryHookResult = ReturnType<typeof useFindProfilesQuery>;
export type FindProfilesLazyQueryHookResult = ReturnType<typeof useFindProfilesLazyQuery>;
export type FindProfilesSuspenseQueryHookResult = ReturnType<typeof useFindProfilesSuspenseQuery>;
export type FindProfilesQueryResult = Apollo.QueryResult<FindProfilesQuery, FindProfilesQueryVariables>;
export const CreateProfileDocument = gql`
    mutation createProfile($name: String!, $text: String!, $sn: String!) {
  createProfile(name: $name, text: $text, sn: $sn) {
    ...profile
  }
}
    ${ProfileFragmentDoc}`;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      name: // value for 'name'
 *      text: // value for 'text'
 *      sn: // value for 'sn'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($id: ID!, $name: String, $text: String, $sn: String) {
  updateProfile(id: $id, name: $name, text: $text, sn: $sn) {
    ...profile
  }
}
    ${ProfileFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      text: // value for 'text'
 *      sn: // value for 'sn'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const ResisterPushSubscriptionDocument = gql`
    mutation resisterPushSubscription($endpoint: String!, $p256dh: String!, $auth: String!) {
  resisterPushSubscription(endpoint: $endpoint, p256dh: $p256dh, auth: $auth)
}
    `;
export type ResisterPushSubscriptionMutationFn = Apollo.MutationFunction<ResisterPushSubscriptionMutation, ResisterPushSubscriptionMutationVariables>;

/**
 * __useResisterPushSubscriptionMutation__
 *
 * To run a mutation, you first call `useResisterPushSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResisterPushSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resisterPushSubscriptionMutation, { data, loading, error }] = useResisterPushSubscriptionMutation({
 *   variables: {
 *      endpoint: // value for 'endpoint'
 *      p256dh: // value for 'p256dh'
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useResisterPushSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<ResisterPushSubscriptionMutation, ResisterPushSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResisterPushSubscriptionMutation, ResisterPushSubscriptionMutationVariables>(ResisterPushSubscriptionDocument, options);
      }
export type ResisterPushSubscriptionMutationHookResult = ReturnType<typeof useResisterPushSubscriptionMutation>;
export type ResisterPushSubscriptionMutationResult = Apollo.MutationResult<ResisterPushSubscriptionMutation>;
export type ResisterPushSubscriptionMutationOptions = Apollo.BaseMutationOptions<ResisterPushSubscriptionMutation, ResisterPushSubscriptionMutationVariables>;
export const FindResesDocument = gql`
    query findReses($query: ResQuery!) {
  reses(query: $query) {
    ...res
  }
}
    ${ResFragmentDoc}`;

/**
 * __useFindResesQuery__
 *
 * To run a query within a React component, call `useFindResesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindResesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindResesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useFindResesQuery(baseOptions: Apollo.QueryHookOptions<FindResesQuery, FindResesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindResesQuery, FindResesQueryVariables>(FindResesDocument, options);
      }
export function useFindResesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindResesQuery, FindResesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindResesQuery, FindResesQueryVariables>(FindResesDocument, options);
        }
export function useFindResesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindResesQuery, FindResesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindResesQuery, FindResesQueryVariables>(FindResesDocument, options);
        }
export type FindResesQueryHookResult = ReturnType<typeof useFindResesQuery>;
export type FindResesLazyQueryHookResult = ReturnType<typeof useFindResesLazyQuery>;
export type FindResesSuspenseQueryHookResult = ReturnType<typeof useFindResesSuspenseQuery>;
export type FindResesQueryResult = Apollo.QueryResult<FindResesQuery, FindResesQueryVariables>;
export const VoteResDocument = gql`
    mutation voteRes($res: ID!, $type: VoteType!) {
  voteRes(res: $res, type: $type) {
    ...res
  }
}
    ${ResFragmentDoc}`;
export type VoteResMutationFn = Apollo.MutationFunction<VoteResMutation, VoteResMutationVariables>;

/**
 * __useVoteResMutation__
 *
 * To run a mutation, you first call `useVoteResMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteResMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteResMutation, { data, loading, error }] = useVoteResMutation({
 *   variables: {
 *      res: // value for 'res'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useVoteResMutation(baseOptions?: Apollo.MutationHookOptions<VoteResMutation, VoteResMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteResMutation, VoteResMutationVariables>(VoteResDocument, options);
      }
export type VoteResMutationHookResult = ReturnType<typeof useVoteResMutation>;
export type VoteResMutationResult = Apollo.MutationResult<VoteResMutation>;
export type VoteResMutationOptions = Apollo.BaseMutationOptions<VoteResMutation, VoteResMutationVariables>;
export const DelResDocument = gql`
    mutation delRes($res: ID!) {
  delRes(res: $res) {
    ...res
  }
}
    ${ResFragmentDoc}`;
export type DelResMutationFn = Apollo.MutationFunction<DelResMutation, DelResMutationVariables>;

/**
 * __useDelResMutation__
 *
 * To run a mutation, you first call `useDelResMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelResMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [delResMutation, { data, loading, error }] = useDelResMutation({
 *   variables: {
 *      res: // value for 'res'
 *   },
 * });
 */
export function useDelResMutation(baseOptions?: Apollo.MutationHookOptions<DelResMutation, DelResMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DelResMutation, DelResMutationVariables>(DelResDocument, options);
      }
export type DelResMutationHookResult = ReturnType<typeof useDelResMutation>;
export type DelResMutationResult = Apollo.MutationResult<DelResMutation>;
export type DelResMutationOptions = Apollo.BaseMutationOptions<DelResMutation, DelResMutationVariables>;
export const CreateResDocument = gql`
    mutation createRes($topic: String!, $name: String, $text: String!, $reply: String, $profile: String, $age: Boolean!) {
  createRes(
    topic: $topic
    name: $name
    text: $text
    reply: $reply
    profile: $profile
    age: $age
  ) {
    ...resNormal
  }
}
    ${ResNormalFragmentDoc}`;
export type CreateResMutationFn = Apollo.MutationFunction<CreateResMutation, CreateResMutationVariables>;

/**
 * __useCreateResMutation__
 *
 * To run a mutation, you first call `useCreateResMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResMutation, { data, loading, error }] = useCreateResMutation({
 *   variables: {
 *      topic: // value for 'topic'
 *      name: // value for 'name'
 *      text: // value for 'text'
 *      reply: // value for 'reply'
 *      profile: // value for 'profile'
 *      age: // value for 'age'
 *   },
 * });
 */
export function useCreateResMutation(baseOptions?: Apollo.MutationHookOptions<CreateResMutation, CreateResMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateResMutation, CreateResMutationVariables>(CreateResDocument, options);
      }
export type CreateResMutationHookResult = ReturnType<typeof useCreateResMutation>;
export type CreateResMutationResult = Apollo.MutationResult<CreateResMutation>;
export type CreateResMutationOptions = Apollo.BaseMutationOptions<CreateResMutation, CreateResMutationVariables>;
export const ResAddedDocument = gql`
    subscription resAdded($topic: ID!) {
  resAdded(topic: $topic) {
    count
    res {
      ...res
    }
  }
}
    ${ResFragmentDoc}`;

/**
 * __useResAddedSubscription__
 *
 * To run a query within a React component, call `useResAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useResAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResAddedSubscription({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useResAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ResAddedSubscription, ResAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ResAddedSubscription, ResAddedSubscriptionVariables>(ResAddedDocument, options);
      }
export type ResAddedSubscriptionHookResult = ReturnType<typeof useResAddedSubscription>;
export type ResAddedSubscriptionResult = Apollo.SubscriptionResult<ResAddedSubscription>;
export const FindStoragesDocument = gql`
    query findStorages($query: StorageQuery!) {
  storages(query: $query) {
    ...storage
  }
}
    ${StorageFragmentDoc}`;

/**
 * __useFindStoragesQuery__
 *
 * To run a query within a React component, call `useFindStoragesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStoragesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStoragesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useFindStoragesQuery(baseOptions: Apollo.QueryHookOptions<FindStoragesQuery, FindStoragesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindStoragesQuery, FindStoragesQueryVariables>(FindStoragesDocument, options);
      }
export function useFindStoragesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindStoragesQuery, FindStoragesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindStoragesQuery, FindStoragesQueryVariables>(FindStoragesDocument, options);
        }
export function useFindStoragesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindStoragesQuery, FindStoragesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindStoragesQuery, FindStoragesQueryVariables>(FindStoragesDocument, options);
        }
export type FindStoragesQueryHookResult = ReturnType<typeof useFindStoragesQuery>;
export type FindStoragesLazyQueryHookResult = ReturnType<typeof useFindStoragesLazyQuery>;
export type FindStoragesSuspenseQueryHookResult = ReturnType<typeof useFindStoragesSuspenseQuery>;
export type FindStoragesQueryResult = Apollo.QueryResult<FindStoragesQuery, FindStoragesQueryVariables>;
export const SetStoragesDocument = gql`
    mutation setStorages($input: SetStoragesInput!) {
  setStorages(input: $input) {
    storages {
      ...storage
    }
  }
}
    ${StorageFragmentDoc}`;
export type SetStoragesMutationFn = Apollo.MutationFunction<SetStoragesMutation, SetStoragesMutationVariables>;

/**
 * __useSetStoragesMutation__
 *
 * To run a mutation, you first call `useSetStoragesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStoragesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStoragesMutation, { data, loading, error }] = useSetStoragesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetStoragesMutation(baseOptions?: Apollo.MutationHookOptions<SetStoragesMutation, SetStoragesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetStoragesMutation, SetStoragesMutationVariables>(SetStoragesDocument, options);
      }
export type SetStoragesMutationHookResult = ReturnType<typeof useSetStoragesMutation>;
export type SetStoragesMutationResult = Apollo.MutationResult<SetStoragesMutation>;
export type SetStoragesMutationOptions = Apollo.BaseMutationOptions<SetStoragesMutation, SetStoragesMutationVariables>;
export const FindTokenDocument = gql`
    query findToken {
  token {
    ... on TokenMaster {
      id
      key
    }
  }
}
    `;

/**
 * __useFindTokenQuery__
 *
 * To run a query within a React component, call `useFindTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindTokenQuery(baseOptions?: Apollo.QueryHookOptions<FindTokenQuery, FindTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTokenQuery, FindTokenQueryVariables>(FindTokenDocument, options);
      }
export function useFindTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTokenQuery, FindTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTokenQuery, FindTokenQueryVariables>(FindTokenDocument, options);
        }
export function useFindTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindTokenQuery, FindTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTokenQuery, FindTokenQueryVariables>(FindTokenDocument, options);
        }
export type FindTokenQueryHookResult = ReturnType<typeof useFindTokenQuery>;
export type FindTokenLazyQueryHookResult = ReturnType<typeof useFindTokenLazyQuery>;
export type FindTokenSuspenseQueryHookResult = ReturnType<typeof useFindTokenSuspenseQuery>;
export type FindTokenQueryResult = Apollo.QueryResult<FindTokenQuery, FindTokenQueryVariables>;
export const FindTokensDocument = gql`
    query findTokens {
  tokens {
    ... on TokenMaster {
      ...tokenMaster
    }
    ... on TokenGeneral {
      ...tokenGeneral
    }
  }
}
    ${TokenMasterFragmentDoc}
${TokenGeneralFragmentDoc}`;

/**
 * __useFindTokensQuery__
 *
 * To run a query within a React component, call `useFindTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindTokensQuery(baseOptions?: Apollo.QueryHookOptions<FindTokensQuery, FindTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTokensQuery, FindTokensQueryVariables>(FindTokensDocument, options);
      }
export function useFindTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTokensQuery, FindTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTokensQuery, FindTokensQueryVariables>(FindTokensDocument, options);
        }
export function useFindTokensSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindTokensQuery, FindTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTokensQuery, FindTokensQueryVariables>(FindTokensDocument, options);
        }
export type FindTokensQueryHookResult = ReturnType<typeof useFindTokensQuery>;
export type FindTokensLazyQueryHookResult = ReturnType<typeof useFindTokensLazyQuery>;
export type FindTokensSuspenseQueryHookResult = ReturnType<typeof useFindTokensSuspenseQuery>;
export type FindTokensQueryResult = Apollo.QueryResult<FindTokensQuery, FindTokensQueryVariables>;
export const CreateTokenMasterDocument = gql`
    mutation createTokenMaster($auth: AuthUser!) {
  createTokenMaster(auth: $auth) {
    ...token
  }
}
    ${TokenFragmentDoc}`;
export type CreateTokenMasterMutationFn = Apollo.MutationFunction<CreateTokenMasterMutation, CreateTokenMasterMutationVariables>;

/**
 * __useCreateTokenMasterMutation__
 *
 * To run a mutation, you first call `useCreateTokenMasterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTokenMasterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTokenMasterMutation, { data, loading, error }] = useCreateTokenMasterMutation({
 *   variables: {
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useCreateTokenMasterMutation(baseOptions?: Apollo.MutationHookOptions<CreateTokenMasterMutation, CreateTokenMasterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTokenMasterMutation, CreateTokenMasterMutationVariables>(CreateTokenMasterDocument, options);
      }
export type CreateTokenMasterMutationHookResult = ReturnType<typeof useCreateTokenMasterMutation>;
export type CreateTokenMasterMutationResult = Apollo.MutationResult<CreateTokenMasterMutation>;
export type CreateTokenMasterMutationOptions = Apollo.BaseMutationOptions<CreateTokenMasterMutation, CreateTokenMasterMutationVariables>;
export const DelTokenClientDocument = gql`
    mutation delTokenClient($client: ID!) {
  delTokenClient(client: $client)
}
    `;
export type DelTokenClientMutationFn = Apollo.MutationFunction<DelTokenClientMutation, DelTokenClientMutationVariables>;

/**
 * __useDelTokenClientMutation__
 *
 * To run a mutation, you first call `useDelTokenClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelTokenClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [delTokenClientMutation, { data, loading, error }] = useDelTokenClientMutation({
 *   variables: {
 *      client: // value for 'client'
 *   },
 * });
 */
export function useDelTokenClientMutation(baseOptions?: Apollo.MutationHookOptions<DelTokenClientMutation, DelTokenClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DelTokenClientMutation, DelTokenClientMutationVariables>(DelTokenClientDocument, options);
      }
export type DelTokenClientMutationHookResult = ReturnType<typeof useDelTokenClientMutation>;
export type DelTokenClientMutationResult = Apollo.MutationResult<DelTokenClientMutation>;
export type DelTokenClientMutationOptions = Apollo.BaseMutationOptions<DelTokenClientMutation, DelTokenClientMutationVariables>;
export const CreateTokenGeneralDocument = gql`
    mutation createTokenGeneral($client: ID!) {
  createTokenGeneral(client: $client) {
    token {
      ...tokenGeneral
    }
    req {
      ...tokenReq
    }
  }
}
    ${TokenGeneralFragmentDoc}
${TokenReqFragmentDoc}`;
export type CreateTokenGeneralMutationFn = Apollo.MutationFunction<CreateTokenGeneralMutation, CreateTokenGeneralMutationVariables>;

/**
 * __useCreateTokenGeneralMutation__
 *
 * To run a mutation, you first call `useCreateTokenGeneralMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTokenGeneralMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTokenGeneralMutation, { data, loading, error }] = useCreateTokenGeneralMutation({
 *   variables: {
 *      client: // value for 'client'
 *   },
 * });
 */
export function useCreateTokenGeneralMutation(baseOptions?: Apollo.MutationHookOptions<CreateTokenGeneralMutation, CreateTokenGeneralMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTokenGeneralMutation, CreateTokenGeneralMutationVariables>(CreateTokenGeneralDocument, options);
      }
export type CreateTokenGeneralMutationHookResult = ReturnType<typeof useCreateTokenGeneralMutation>;
export type CreateTokenGeneralMutationResult = Apollo.MutationResult<CreateTokenGeneralMutation>;
export type CreateTokenGeneralMutationOptions = Apollo.BaseMutationOptions<CreateTokenGeneralMutation, CreateTokenGeneralMutationVariables>;
export const CreateTopicNormalDocument = gql`
    mutation createTopicNormal($title: String!, $tags: [String!]!, $text: String!) {
  createTopicNormal(title: $title, tags: $tags, text: $text) {
    ...topic
  }
}
    ${TopicFragmentDoc}`;
export type CreateTopicNormalMutationFn = Apollo.MutationFunction<CreateTopicNormalMutation, CreateTopicNormalMutationVariables>;

/**
 * __useCreateTopicNormalMutation__
 *
 * To run a mutation, you first call `useCreateTopicNormalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTopicNormalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTopicNormalMutation, { data, loading, error }] = useCreateTopicNormalMutation({
 *   variables: {
 *      title: // value for 'title'
 *      tags: // value for 'tags'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateTopicNormalMutation(baseOptions?: Apollo.MutationHookOptions<CreateTopicNormalMutation, CreateTopicNormalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTopicNormalMutation, CreateTopicNormalMutationVariables>(CreateTopicNormalDocument, options);
      }
export type CreateTopicNormalMutationHookResult = ReturnType<typeof useCreateTopicNormalMutation>;
export type CreateTopicNormalMutationResult = Apollo.MutationResult<CreateTopicNormalMutation>;
export type CreateTopicNormalMutationOptions = Apollo.BaseMutationOptions<CreateTopicNormalMutation, CreateTopicNormalMutationVariables>;
export const CreateTopicOneDocument = gql`
    mutation createTopicOne($title: String!, $tags: [String!]!, $text: String!) {
  createTopicOne(title: $title, tags: $tags, text: $text) {
    ...topic
  }
}
    ${TopicFragmentDoc}`;
export type CreateTopicOneMutationFn = Apollo.MutationFunction<CreateTopicOneMutation, CreateTopicOneMutationVariables>;

/**
 * __useCreateTopicOneMutation__
 *
 * To run a mutation, you first call `useCreateTopicOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTopicOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTopicOneMutation, { data, loading, error }] = useCreateTopicOneMutation({
 *   variables: {
 *      title: // value for 'title'
 *      tags: // value for 'tags'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateTopicOneMutation(baseOptions?: Apollo.MutationHookOptions<CreateTopicOneMutation, CreateTopicOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTopicOneMutation, CreateTopicOneMutationVariables>(CreateTopicOneDocument, options);
      }
export type CreateTopicOneMutationHookResult = ReturnType<typeof useCreateTopicOneMutation>;
export type CreateTopicOneMutationResult = Apollo.MutationResult<CreateTopicOneMutation>;
export type CreateTopicOneMutationOptions = Apollo.BaseMutationOptions<CreateTopicOneMutation, CreateTopicOneMutationVariables>;
export const FindTopicsDocument = gql`
    query findTopics($query: TopicQuery!, $skip: Int, $limit: Int, $includeSubscribe: Boolean = false) {
  topics(query: $query, skip: $skip, limit: $limit) {
    ...topic
    subscribe @include(if: $includeSubscribe)
  }
}
    ${TopicFragmentDoc}`;

/**
 * __useFindTopicsQuery__
 *
 * To run a query within a React component, call `useFindTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTopicsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *      includeSubscribe: // value for 'includeSubscribe'
 *   },
 * });
 */
export function useFindTopicsQuery(baseOptions: Apollo.QueryHookOptions<FindTopicsQuery, FindTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTopicsQuery, FindTopicsQueryVariables>(FindTopicsDocument, options);
      }
export function useFindTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTopicsQuery, FindTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTopicsQuery, FindTopicsQueryVariables>(FindTopicsDocument, options);
        }
export function useFindTopicsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindTopicsQuery, FindTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTopicsQuery, FindTopicsQueryVariables>(FindTopicsDocument, options);
        }
export type FindTopicsQueryHookResult = ReturnType<typeof useFindTopicsQuery>;
export type FindTopicsLazyQueryHookResult = ReturnType<typeof useFindTopicsLazyQuery>;
export type FindTopicsSuspenseQueryHookResult = ReturnType<typeof useFindTopicsSuspenseQuery>;
export type FindTopicsQueryResult = Apollo.QueryResult<FindTopicsQuery, FindTopicsQueryVariables>;
export const FindTopicTagsDocument = gql`
    query findTopicTags {
  topicTags {
    name
    count
  }
}
    `;

/**
 * __useFindTopicTagsQuery__
 *
 * To run a query within a React component, call `useFindTopicTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTopicTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTopicTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindTopicTagsQuery(baseOptions?: Apollo.QueryHookOptions<FindTopicTagsQuery, FindTopicTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTopicTagsQuery, FindTopicTagsQueryVariables>(FindTopicTagsDocument, options);
      }
export function useFindTopicTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTopicTagsQuery, FindTopicTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTopicTagsQuery, FindTopicTagsQueryVariables>(FindTopicTagsDocument, options);
        }
export function useFindTopicTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindTopicTagsQuery, FindTopicTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTopicTagsQuery, FindTopicTagsQueryVariables>(FindTopicTagsDocument, options);
        }
export type FindTopicTagsQueryHookResult = ReturnType<typeof useFindTopicTagsQuery>;
export type FindTopicTagsLazyQueryHookResult = ReturnType<typeof useFindTopicTagsLazyQuery>;
export type FindTopicTagsSuspenseQueryHookResult = ReturnType<typeof useFindTopicTagsSuspenseQuery>;
export type FindTopicTagsQueryResult = Apollo.QueryResult<FindTopicTagsQuery, FindTopicTagsQueryVariables>;
export const UpdateTopicDocument = gql`
    mutation updateTopic($id: ID!, $title: String!, $tags: [String!]!, $text: String!) {
  updateTopic(id: $id, title: $title, tags: $tags, text: $text) {
    ...topicNormal
  }
}
    ${TopicNormalFragmentDoc}`;
export type UpdateTopicMutationFn = Apollo.MutationFunction<UpdateTopicMutation, UpdateTopicMutationVariables>;

/**
 * __useUpdateTopicMutation__
 *
 * To run a mutation, you first call `useUpdateTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTopicMutation, { data, loading, error }] = useUpdateTopicMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      tags: // value for 'tags'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdateTopicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTopicMutation, UpdateTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTopicMutation, UpdateTopicMutationVariables>(UpdateTopicDocument, options);
      }
export type UpdateTopicMutationHookResult = ReturnType<typeof useUpdateTopicMutation>;
export type UpdateTopicMutationResult = Apollo.MutationResult<UpdateTopicMutation>;
export type UpdateTopicMutationOptions = Apollo.BaseMutationOptions<UpdateTopicMutation, UpdateTopicMutationVariables>;
export const CreateTopicForkDocument = gql`
    mutation createTopicFork($title: String!, $parent: ID!) {
  createTopicFork(title: $title, parent: $parent) {
    ...topicFork
  }
}
    ${TopicForkFragmentDoc}`;
export type CreateTopicForkMutationFn = Apollo.MutationFunction<CreateTopicForkMutation, CreateTopicForkMutationVariables>;

/**
 * __useCreateTopicForkMutation__
 *
 * To run a mutation, you first call `useCreateTopicForkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTopicForkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTopicForkMutation, { data, loading, error }] = useCreateTopicForkMutation({
 *   variables: {
 *      title: // value for 'title'
 *      parent: // value for 'parent'
 *   },
 * });
 */
export function useCreateTopicForkMutation(baseOptions?: Apollo.MutationHookOptions<CreateTopicForkMutation, CreateTopicForkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTopicForkMutation, CreateTopicForkMutationVariables>(CreateTopicForkDocument, options);
      }
export type CreateTopicForkMutationHookResult = ReturnType<typeof useCreateTopicForkMutation>;
export type CreateTopicForkMutationResult = Apollo.MutationResult<CreateTopicForkMutation>;
export type CreateTopicForkMutationOptions = Apollo.BaseMutationOptions<CreateTopicForkMutation, CreateTopicForkMutationVariables>;
export const SubscribeTopicDocument = gql`
    mutation subscribeTopic($topic: ID!) {
  subscribeTopic(topic: $topic)
}
    `;
export type SubscribeTopicMutationFn = Apollo.MutationFunction<SubscribeTopicMutation, SubscribeTopicMutationVariables>;

/**
 * __useSubscribeTopicMutation__
 *
 * To run a mutation, you first call `useSubscribeTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeTopicMutation, { data, loading, error }] = useSubscribeTopicMutation({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useSubscribeTopicMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeTopicMutation, SubscribeTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeTopicMutation, SubscribeTopicMutationVariables>(SubscribeTopicDocument, options);
      }
export type SubscribeTopicMutationHookResult = ReturnType<typeof useSubscribeTopicMutation>;
export type SubscribeTopicMutationResult = Apollo.MutationResult<SubscribeTopicMutation>;
export type SubscribeTopicMutationOptions = Apollo.BaseMutationOptions<SubscribeTopicMutation, SubscribeTopicMutationVariables>;
export const UnsubscribeTopicDocument = gql`
    mutation unsubscribeTopic($topic: ID!) {
  unsubscribeTopic(topic: $topic)
}
    `;
export type UnsubscribeTopicMutationFn = Apollo.MutationFunction<UnsubscribeTopicMutation, UnsubscribeTopicMutationVariables>;

/**
 * __useUnsubscribeTopicMutation__
 *
 * To run a mutation, you first call `useUnsubscribeTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeTopicMutation, { data, loading, error }] = useUnsubscribeTopicMutation({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useUnsubscribeTopicMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeTopicMutation, UnsubscribeTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeTopicMutation, UnsubscribeTopicMutationVariables>(UnsubscribeTopicDocument, options);
      }
export type UnsubscribeTopicMutationHookResult = ReturnType<typeof useUnsubscribeTopicMutation>;
export type UnsubscribeTopicMutationResult = Apollo.MutationResult<UnsubscribeTopicMutation>;
export type UnsubscribeTopicMutationOptions = Apollo.BaseMutationOptions<UnsubscribeTopicMutation, UnsubscribeTopicMutationVariables>;
export const FindUserSnDocument = gql`
    query findUserSN($id: ID!) {
  userSN(id: $id)
}
    `;

/**
 * __useFindUserSnQuery__
 *
 * To run a query within a React component, call `useFindUserSnQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserSnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserSnQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindUserSnQuery(baseOptions: Apollo.QueryHookOptions<FindUserSnQuery, FindUserSnQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserSnQuery, FindUserSnQueryVariables>(FindUserSnDocument, options);
      }
export function useFindUserSnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserSnQuery, FindUserSnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserSnQuery, FindUserSnQueryVariables>(FindUserSnDocument, options);
        }
export function useFindUserSnSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindUserSnQuery, FindUserSnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserSnQuery, FindUserSnQueryVariables>(FindUserSnDocument, options);
        }
export type FindUserSnQueryHookResult = ReturnType<typeof useFindUserSnQuery>;
export type FindUserSnLazyQueryHookResult = ReturnType<typeof useFindUserSnLazyQuery>;
export type FindUserSnSuspenseQueryHookResult = ReturnType<typeof useFindUserSnSuspenseQuery>;
export type FindUserSnQueryResult = Apollo.QueryResult<FindUserSnQuery, FindUserSnQueryVariables>;
export const FindUserDocument = gql`
    query findUser {
  user {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindUserQuery(baseOptions?: Apollo.QueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
      }
export function useFindUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
        }
export function useFindUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
        }
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<typeof useFindUserLazyQuery>;
export type FindUserSuspenseQueryHookResult = ReturnType<typeof useFindUserSuspenseQuery>;
export type FindUserQueryResult = Apollo.QueryResult<FindUserQuery, FindUserQueryVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($sn: String!, $pass: String!, $auth: AuthUser!) {
  updateUser(sn: $sn, pass: $pass, auth: $auth) {
    user {
      ...user
    }
    token {
      ...tokenMaster
    }
  }
}
    ${UserFragmentDoc}
${TokenMasterFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      sn: // value for 'sn'
 *      pass: // value for 'pass'
 *      auth: // value for 'auth'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const FindUserIdDocument = gql`
    query findUserID($sn: String!) {
  userID(sn: $sn)
}
    `;

/**
 * __useFindUserIdQuery__
 *
 * To run a query within a React component, call `useFindUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserIdQuery({
 *   variables: {
 *      sn: // value for 'sn'
 *   },
 * });
 */
export function useFindUserIdQuery(baseOptions: Apollo.QueryHookOptions<FindUserIdQuery, FindUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserIdQuery, FindUserIdQueryVariables>(FindUserIdDocument, options);
      }
export function useFindUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserIdQuery, FindUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserIdQuery, FindUserIdQueryVariables>(FindUserIdDocument, options);
        }
export function useFindUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindUserIdQuery, FindUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserIdQuery, FindUserIdQueryVariables>(FindUserIdDocument, options);
        }
export type FindUserIdQueryHookResult = ReturnType<typeof useFindUserIdQuery>;
export type FindUserIdLazyQueryHookResult = ReturnType<typeof useFindUserIdLazyQuery>;
export type FindUserIdSuspenseQueryHookResult = ReturnType<typeof useFindUserIdSuspenseQuery>;
export type FindUserIdQueryResult = Apollo.QueryResult<FindUserIdQuery, FindUserIdQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($sn: String!, $pass: String!, $recaptcha: String!) {
  createUser(sn: $sn, pass: $pass, recaptcha: $recaptcha) {
    user {
      ...user
    }
    token {
      ...tokenMaster
    }
  }
}
    ${UserFragmentDoc}
${TokenMasterFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      sn: // value for 'sn'
 *      pass: // value for 'pass'
 *      recaptcha: // value for 'recaptcha'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export type StorageCollectionHooks_PrefixedStorageQueryQueryVariables = Exact<{
  prefix: Scalars['String']['input'];
}>;


export type StorageCollectionHooks_PrefixedStorageQueryQuery = { readonly __typename: 'Query', readonly storages: ReadonlyArray<{ readonly __typename: 'Storage', readonly key: string, readonly value: string }> };

export type StorageCollectionHooks_StorageQueryQueryVariables = Exact<{
  keys: ReadonlyArray<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type StorageCollectionHooks_StorageQueryQuery = { readonly __typename: 'Query', readonly storages: ReadonlyArray<{ readonly __typename: 'Storage', readonly key: string, readonly value: string }> };

export type StorageCollectionHooks_SetStoragesMutationMutationVariables = Exact<{
  input: SetStoragesInput;
}>;


export type StorageCollectionHooks_SetStoragesMutationMutation = { readonly __typename: 'Mutation', readonly setStorages: { readonly __typename: 'SetStoragesPayload', readonly storages: ReadonlyArray<{ readonly __typename: 'Storage', readonly key: string, readonly value: string }> } };

export type StorageCollectionHooks_DeleteStorageMutationMutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type StorageCollectionHooks_DeleteStorageMutationMutation = { readonly __typename: 'Mutation', readonly delStorage?: boolean | null };

export type ClientFragment = { readonly __typename: 'Client', readonly id: string, readonly name: string, readonly url: string, readonly self?: boolean | null, readonly date: string, readonly update: string };

export type FindClientsQueryVariables = Exact<{
  query: ClientQuery;
}>;


export type FindClientsQuery = { readonly __typename: 'Query', readonly clients: ReadonlyArray<{ readonly __typename: 'Client', readonly id: string, readonly name: string, readonly url: string, readonly self?: boolean | null, readonly date: string, readonly update: string }> };

export type CreateClientMutationVariables = Exact<{
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
}>;


export type CreateClientMutation = { readonly __typename: 'Mutation', readonly createClient: { readonly __typename: 'Client', readonly id: string, readonly name: string, readonly url: string, readonly self?: boolean | null, readonly date: string, readonly update: string } };

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
}>;


export type UpdateClientMutation = { readonly __typename: 'Mutation', readonly updateClient: { readonly __typename: 'Client', readonly id: string, readonly name: string, readonly url: string, readonly self?: boolean | null, readonly date: string, readonly update: string } };

export type HistoryFragment = { readonly __typename: 'History', readonly id: string, readonly title: string, readonly tags: ReadonlyArray<string>, readonly text: string, readonly date: string, readonly hash: string, readonly self?: boolean | null, readonly topic: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type ProfileFragment = { readonly __typename: 'Profile', readonly id: string, readonly self?: boolean | null, readonly name: string, readonly text: string, readonly date: string, readonly update: string, readonly sn: string };

export type FindProfilesQueryVariables = Exact<{
  query: ProfileQuery;
}>;


export type FindProfilesQuery = { readonly __typename: 'Query', readonly profiles: ReadonlyArray<{ readonly __typename: 'Profile', readonly id: string, readonly self?: boolean | null, readonly name: string, readonly text: string, readonly date: string, readonly update: string, readonly sn: string }> };

export type CreateProfileMutationVariables = Exact<{
  name: Scalars['String']['input'];
  text: Scalars['String']['input'];
  sn: Scalars['String']['input'];
}>;


export type CreateProfileMutation = { readonly __typename: 'Mutation', readonly createProfile: { readonly __typename: 'Profile', readonly id: string, readonly self?: boolean | null, readonly name: string, readonly text: string, readonly date: string, readonly update: string, readonly sn: string } };

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  sn?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProfileMutation = { readonly __typename: 'Mutation', readonly updateProfile: { readonly __typename: 'Profile', readonly id: string, readonly self?: boolean | null, readonly name: string, readonly text: string, readonly date: string, readonly update: string, readonly sn: string } };

export type ResisterPushSubscriptionMutationVariables = Exact<{
  endpoint: Scalars['String']['input'];
  p256dh: Scalars['String']['input'];
  auth: Scalars['String']['input'];
}>;


export type ResisterPushSubscriptionMutation = { readonly __typename: 'Mutation', readonly resisterPushSubscription?: boolean | null };

type Res_ResDelete_Fragment = { readonly __typename: 'ResDelete', readonly flag: ResDeleteFlag, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

type Res_ResFork_Fragment = { readonly __typename: 'ResFork', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly fork: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

type Res_ResHistory_Fragment = { readonly __typename: 'ResHistory', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly history: { readonly __typename: 'History', readonly id: string, readonly title: string, readonly tags: ReadonlyArray<string>, readonly text: string, readonly date: string, readonly hash: string, readonly self?: boolean | null, readonly topic: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

type Res_ResNormal_Fragment = { readonly __typename: 'ResNormal', readonly name?: string | null, readonly text: string, readonly isReply?: boolean | null, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly reply?: { readonly __typename: 'ResDelete', readonly id: string } | { readonly __typename: 'ResFork', readonly id: string } | { readonly __typename: 'ResHistory', readonly id: string } | { readonly __typename: 'ResNormal', readonly id: string } | { readonly __typename: 'ResTopic', readonly id: string } | null, readonly profile?: { readonly __typename: 'Profile', readonly id: string, readonly self?: boolean | null, readonly name: string, readonly text: string, readonly date: string, readonly update: string, readonly sn: string } | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

type Res_ResTopic_Fragment = { readonly __typename: 'ResTopic', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type ResFragment = Res_ResDelete_Fragment | Res_ResFork_Fragment | Res_ResHistory_Fragment | Res_ResNormal_Fragment | Res_ResTopic_Fragment;

type ResBase_ResDelete_Fragment = { readonly __typename: 'ResDelete', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

type ResBase_ResFork_Fragment = { readonly __typename: 'ResFork', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

type ResBase_ResHistory_Fragment = { readonly __typename: 'ResHistory', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

type ResBase_ResNormal_Fragment = { readonly __typename: 'ResNormal', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

type ResBase_ResTopic_Fragment = { readonly __typename: 'ResTopic', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type ResBaseFragment = ResBase_ResDelete_Fragment | ResBase_ResFork_Fragment | ResBase_ResHistory_Fragment | ResBase_ResNormal_Fragment | ResBase_ResTopic_Fragment;

export type ResNormalFragment = { readonly __typename: 'ResNormal', readonly name?: string | null, readonly text: string, readonly isReply?: boolean | null, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly reply?: { readonly __typename: 'ResDelete', readonly id: string } | { readonly __typename: 'ResFork', readonly id: string } | { readonly __typename: 'ResHistory', readonly id: string } | { readonly __typename: 'ResNormal', readonly id: string } | { readonly __typename: 'ResTopic', readonly id: string } | null, readonly profile?: { readonly __typename: 'Profile', readonly id: string, readonly self?: boolean | null, readonly name: string, readonly text: string, readonly date: string, readonly update: string, readonly sn: string } | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type ResHistoryFragment = { readonly __typename: 'ResHistory', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly history: { readonly __typename: 'History', readonly id: string, readonly title: string, readonly tags: ReadonlyArray<string>, readonly text: string, readonly date: string, readonly hash: string, readonly self?: boolean | null, readonly topic: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type ResTopicFragment = { readonly __typename: 'ResTopic', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type ResForkFragment = { readonly __typename: 'ResFork', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly fork: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type ResDeleteFragment = { readonly __typename: 'ResDelete', readonly flag: ResDeleteFlag, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type FindResesQueryVariables = Exact<{
  query: ResQuery;
}>;


export type FindResesQuery = { readonly __typename: 'Query', readonly reses: ReadonlyArray<{ readonly __typename: 'ResDelete', readonly flag: ResDeleteFlag, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResFork', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly fork: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResHistory', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly history: { readonly __typename: 'History', readonly id: string, readonly title: string, readonly tags: ReadonlyArray<string>, readonly text: string, readonly date: string, readonly hash: string, readonly self?: boolean | null, readonly topic: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResNormal', readonly name?: string | null, readonly text: string, readonly isReply?: boolean | null, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly reply?: { readonly __typename: 'ResDelete', readonly id: string } | { readonly __typename: 'ResFork', readonly id: string } | { readonly __typename: 'ResHistory', readonly id: string } | { readonly __typename: 'ResNormal', readonly id: string } | { readonly __typename: 'ResTopic', readonly id: string } | null, readonly profile?: { readonly __typename: 'Profile', readonly id: string, readonly self?: boolean | null, readonly name: string, readonly text: string, readonly date: string, readonly update: string, readonly sn: string } | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResTopic', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }> };

export type VoteResMutationVariables = Exact<{
  res: Scalars['ID']['input'];
  type: VoteType;
}>;


export type VoteResMutation = { readonly __typename: 'Mutation', readonly voteRes: { readonly __typename: 'ResDelete', readonly flag: ResDeleteFlag, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResFork', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly fork: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResHistory', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly history: { readonly __typename: 'History', readonly id: string, readonly title: string, readonly tags: ReadonlyArray<string>, readonly text: string, readonly date: string, readonly hash: string, readonly self?: boolean | null, readonly topic: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResNormal', readonly name?: string | null, readonly text: string, readonly isReply?: boolean | null, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly reply?: { readonly __typename: 'ResDelete', readonly id: string } | { readonly __typename: 'ResFork', readonly id: string } | { readonly __typename: 'ResHistory', readonly id: string } | { readonly __typename: 'ResNormal', readonly id: string } | { readonly __typename: 'ResTopic', readonly id: string } | null, readonly profile?: { readonly __typename: 'Profile', readonly id: string, readonly self?: boolean | null, readonly name: string, readonly text: string, readonly date: string, readonly update: string, readonly sn: string } | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResTopic', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } };

export type DelResMutationVariables = Exact<{
  res: Scalars['ID']['input'];
}>;


export type DelResMutation = { readonly __typename: 'Mutation', readonly delRes: { readonly __typename: 'ResDelete', readonly flag: ResDeleteFlag, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } };

export type CreateResMutationVariables = Exact<{
  topic: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  reply?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<Scalars['String']['input']>;
  age: Scalars['Boolean']['input'];
}>;


export type CreateResMutation = { readonly __typename: 'Mutation', readonly createRes: { readonly __typename: 'ResNormal', readonly name?: string | null, readonly text: string, readonly isReply?: boolean | null, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly reply?: { readonly __typename: 'ResDelete', readonly id: string } | { readonly __typename: 'ResFork', readonly id: string } | { readonly __typename: 'ResHistory', readonly id: string } | { readonly __typename: 'ResNormal', readonly id: string } | { readonly __typename: 'ResTopic', readonly id: string } | null, readonly profile?: { readonly __typename: 'Profile', readonly id: string, readonly self?: boolean | null, readonly name: string, readonly text: string, readonly date: string, readonly update: string, readonly sn: string } | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } };

export type ResAddedSubscriptionVariables = Exact<{
  topic: Scalars['ID']['input'];
}>;


export type ResAddedSubscription = { readonly __typename: 'Subscription', readonly resAdded: { readonly __typename: 'ResSubscript', readonly count: number, readonly res: { readonly __typename: 'ResDelete', readonly flag: ResDeleteFlag, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResFork', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly fork: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResHistory', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly history: { readonly __typename: 'History', readonly id: string, readonly title: string, readonly tags: ReadonlyArray<string>, readonly text: string, readonly date: string, readonly hash: string, readonly self?: boolean | null, readonly topic: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } }, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResNormal', readonly name?: string | null, readonly text: string, readonly isReply?: boolean | null, readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly reply?: { readonly __typename: 'ResDelete', readonly id: string } | { readonly __typename: 'ResFork', readonly id: string } | { readonly __typename: 'ResHistory', readonly id: string } | { readonly __typename: 'ResNormal', readonly id: string } | { readonly __typename: 'ResTopic', readonly id: string } | null, readonly profile?: { readonly __typename: 'Profile', readonly id: string, readonly self?: boolean | null, readonly name: string, readonly text: string, readonly date: string, readonly update: string, readonly sn: string } | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'ResTopic', readonly id: string, readonly date: string, readonly self?: boolean | null, readonly uv: number, readonly dv: number, readonly hash: string, readonly replyCount: number, readonly voteFlag?: VoteFlag | null, readonly topic: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } } };

export type StorageFragment = { readonly __typename: 'Storage', readonly key: string, readonly value: string };

export type FindStoragesQueryVariables = Exact<{
  query: StorageQuery;
}>;


export type FindStoragesQuery = { readonly __typename: 'Query', readonly storages: ReadonlyArray<{ readonly __typename: 'Storage', readonly key: string, readonly value: string }> };

export type SetStoragesMutationVariables = Exact<{
  input: SetStoragesInput;
}>;


export type SetStoragesMutation = { readonly __typename: 'Mutation', readonly setStorages: { readonly __typename: 'SetStoragesPayload', readonly storages: ReadonlyArray<{ readonly __typename: 'Storage', readonly key: string, readonly value: string }> } };

export type TokenReqFragment = { readonly __typename: 'TokenReq', readonly token: string, readonly key: string };

type Token_TokenGeneral_Fragment = { readonly __typename: 'TokenGeneral', readonly id: string, readonly key: string, readonly date: string, readonly client: { readonly __typename: 'Client', readonly id: string, readonly name: string, readonly url: string, readonly self?: boolean | null, readonly date: string, readonly update: string } };

type Token_TokenMaster_Fragment = { readonly __typename: 'TokenMaster', readonly id: string, readonly key: string, readonly date: string };

export type TokenFragment = Token_TokenGeneral_Fragment | Token_TokenMaster_Fragment;

type TokenBase_TokenGeneral_Fragment = { readonly __typename: 'TokenGeneral', readonly id: string, readonly key: string, readonly date: string };

type TokenBase_TokenMaster_Fragment = { readonly __typename: 'TokenMaster', readonly id: string, readonly key: string, readonly date: string };

export type TokenBaseFragment = TokenBase_TokenGeneral_Fragment | TokenBase_TokenMaster_Fragment;

export type TokenMasterFragment = { readonly __typename: 'TokenMaster', readonly id: string, readonly key: string, readonly date: string };

export type TokenGeneralFragment = { readonly __typename: 'TokenGeneral', readonly id: string, readonly key: string, readonly date: string, readonly client: { readonly __typename: 'Client', readonly id: string, readonly name: string, readonly url: string, readonly self?: boolean | null, readonly date: string, readonly update: string } };

export type FindTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type FindTokenQuery = { readonly __typename: 'Query', readonly token: { readonly __typename: 'TokenGeneral' } | { readonly __typename: 'TokenMaster', readonly id: string, readonly key: string } };

export type FindTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type FindTokensQuery = { readonly __typename: 'Query', readonly tokens: ReadonlyArray<{ readonly __typename: 'TokenGeneral', readonly id: string, readonly key: string, readonly date: string, readonly client: { readonly __typename: 'Client', readonly id: string, readonly name: string, readonly url: string, readonly self?: boolean | null, readonly date: string, readonly update: string } } | { readonly __typename: 'TokenMaster', readonly id: string, readonly key: string, readonly date: string }> };

export type CreateTokenMasterMutationVariables = Exact<{
  auth: AuthUser;
}>;


export type CreateTokenMasterMutation = { readonly __typename: 'Mutation', readonly createTokenMaster: { readonly __typename: 'TokenMaster', readonly id: string, readonly key: string, readonly date: string } };

export type DelTokenClientMutationVariables = Exact<{
  client: Scalars['ID']['input'];
}>;


export type DelTokenClientMutation = { readonly __typename: 'Mutation', readonly delTokenClient?: boolean | null };

export type CreateTokenGeneralMutationVariables = Exact<{
  client: Scalars['ID']['input'];
}>;


export type CreateTokenGeneralMutation = { readonly __typename: 'Mutation', readonly createTokenGeneral: { readonly __typename: 'CreateTokenGeneralResponse', readonly token: { readonly __typename: 'TokenGeneral', readonly id: string, readonly key: string, readonly date: string, readonly client: { readonly __typename: 'Client', readonly id: string, readonly name: string, readonly url: string, readonly self?: boolean | null, readonly date: string, readonly update: string } }, readonly req: { readonly __typename: 'TokenReq', readonly token: string, readonly key: string } } };

type TopicSearch_TopicNormal_Fragment = { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

type TopicSearch_TopicOne_Fragment = { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

export type TopicSearchFragment = TopicSearch_TopicNormal_Fragment | TopicSearch_TopicOne_Fragment;

type TopicBase_TopicFork_Fragment = { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

type TopicBase_TopicNormal_Fragment = { readonly __typename: 'TopicNormal', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

type TopicBase_TopicOne_Fragment = { readonly __typename: 'TopicOne', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

export type TopicBaseFragment = TopicBase_TopicFork_Fragment | TopicBase_TopicNormal_Fragment | TopicBase_TopicOne_Fragment;

type TopicSearchBase_TopicNormal_Fragment = { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

type TopicSearchBase_TopicOne_Fragment = { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

export type TopicSearchBaseFragment = TopicSearchBase_TopicNormal_Fragment | TopicSearchBase_TopicOne_Fragment;

export type TopicNormalFragment = { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

export type TopicOneFragment = { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

export type TopicForkFragment = { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

type Topic_TopicFork_Fragment = { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

type Topic_TopicNormal_Fragment = { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

type Topic_TopicOne_Fragment = { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean };

export type TopicFragment = Topic_TopicFork_Fragment | Topic_TopicNormal_Fragment | Topic_TopicOne_Fragment;

export type CreateTopicNormalMutationVariables = Exact<{
  title: Scalars['String']['input'];
  tags: ReadonlyArray<Scalars['String']['input']> | Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type CreateTopicNormalMutation = { readonly __typename: 'Mutation', readonly createTopicNormal: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type CreateTopicOneMutationVariables = Exact<{
  title: Scalars['String']['input'];
  tags: ReadonlyArray<Scalars['String']['input']> | Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type CreateTopicOneMutation = { readonly __typename: 'Mutation', readonly createTopicOne: { readonly __typename: 'TopicOne', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type FindTopicsQueryVariables = Exact<{
  query: TopicQuery;
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  includeSubscribe?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type FindTopicsQuery = { readonly __typename: 'Query', readonly topics: ReadonlyArray<{ readonly __typename: 'TopicFork', readonly subscribe?: boolean | null, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } | { readonly __typename: 'TopicNormal', readonly subscribe?: boolean | null, readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } | { readonly __typename: 'TopicOne', readonly subscribe?: boolean | null, readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean }> };

export type FindTopicTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindTopicTagsQuery = { readonly __typename: 'Query', readonly topicTags: ReadonlyArray<{ readonly __typename: 'Tags', readonly name: string, readonly count: number }> };

export type UpdateTopicMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  tags: ReadonlyArray<Scalars['String']['input']> | Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type UpdateTopicMutation = { readonly __typename: 'Mutation', readonly updateTopic: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } };

export type CreateTopicForkMutationVariables = Exact<{
  title: Scalars['String']['input'];
  parent: Scalars['ID']['input'];
}>;


export type CreateTopicForkMutation = { readonly __typename: 'Mutation', readonly createTopicFork: { readonly __typename: 'TopicFork', readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean, readonly parent: { readonly __typename: 'TopicNormal', readonly tags: ReadonlyArray<string>, readonly text: string, readonly id: string, readonly title: string, readonly update: string, readonly date: string, readonly resCount: number, readonly active: boolean } } };

export type SubscribeTopicMutationVariables = Exact<{
  topic: Scalars['ID']['input'];
}>;


export type SubscribeTopicMutation = { readonly __typename: 'Mutation', readonly subscribeTopic?: boolean | null };

export type UnsubscribeTopicMutationVariables = Exact<{
  topic: Scalars['ID']['input'];
}>;


export type UnsubscribeTopicMutation = { readonly __typename: 'Mutation', readonly unsubscribeTopic?: boolean | null };

export type UserFragment = { readonly __typename: 'User', readonly id: string, readonly sn: string };

export type FindUserSnQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindUserSnQuery = { readonly __typename: 'Query', readonly userSN: string };

export type FindUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserQuery = { readonly __typename: 'Query', readonly user: { readonly __typename: 'User', readonly id: string, readonly sn: string } };

export type UpdateUserMutationVariables = Exact<{
  sn: Scalars['String']['input'];
  pass: Scalars['String']['input'];
  auth: AuthUser;
}>;


export type UpdateUserMutation = { readonly __typename: 'Mutation', readonly updateUser: { readonly __typename: 'UpdateUserResponse', readonly user: { readonly __typename: 'User', readonly id: string, readonly sn: string }, readonly token: { readonly __typename: 'TokenMaster', readonly id: string, readonly key: string, readonly date: string } } };

export type FindUserIdQueryVariables = Exact<{
  sn: Scalars['String']['input'];
}>;


export type FindUserIdQuery = { readonly __typename: 'Query', readonly userID: string };

export type CreateUserMutationVariables = Exact<{
  sn: Scalars['String']['input'];
  pass: Scalars['String']['input'];
  recaptcha: Scalars['String']['input'];
}>;


export type CreateUserMutation = { readonly __typename: 'Mutation', readonly createUser: { readonly __typename: 'CreateUserResponse', readonly user: { readonly __typename: 'User', readonly id: string, readonly sn: string }, readonly token: { readonly __typename: 'TokenMaster', readonly id: string, readonly key: string, readonly date: string } } };
