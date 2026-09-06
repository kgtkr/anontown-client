/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
};

export type AuthUser = {
  id?: InputMaybe<Scalars['String']['input']>;
  pass: Scalars['String']['input'];
  sn?: InputMaybe<Scalars['String']['input']>;
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
  __typename: 'Client';
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  self?: Maybe<Scalars['Boolean']['output']>;
  update: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type ClientQuery = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  self?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateClientResponse = Client | CreateClientResponseError;

export type CreateClientResponseError = {
  __typename: 'CreateClientResponseError';
  name: ValidateData;
  url: Scalars['Boolean']['output'];
};

export type CreateTokenGeneralResponse = {
  __typename: 'CreateTokenGeneralResponse';
  req: TokenReq;
  token: TokenGeneral;
};

export type CreateUserResponse = {
  __typename: 'CreateUserResponse';
  token: TokenMaster;
  user: User;
};

export type DateQuery = {
  date: Scalars['DateTime']['input'];
  type: DateType;
};

export type DateType =
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte';

export type History = {
  __typename: 'History';
  date: Scalars['DateTime']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  self?: Maybe<Scalars['Boolean']['output']>;
  tags: Array<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topic: TopicNormal;
};

export type HistoryQuery = {
  date?: InputMaybe<DateQuery>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  topic?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Mutation = {
  __typename: 'Mutation';
  authTokenReq: TokenGeneral;
  createClient: Client;
  createProfile: Profile;
  createRes: ResNormal;
  createTokenGeneral: CreateTokenGeneralResponse;
  createTokenMaster: TokenMaster;
  createTokenReq: TokenReq;
  createTopicFork: TopicFork;
  createTopicNormal: TopicNormal;
  createTopicOne: TopicOne;
  createUser: CreateUserResponse;
  delRes: ResDelete;
  delStorage?: Maybe<Scalars['Boolean']['output']>;
  delTokenClient?: Maybe<Scalars['Boolean']['output']>;
  resisterPushSubscription?: Maybe<Scalars['Boolean']['output']>;
  setStorages: SetStoragesPayload;
  subscribeTopic?: Maybe<Scalars['Boolean']['output']>;
  unsubscribeTopic?: Maybe<Scalars['Boolean']['output']>;
  updateClient: Client;
  updateProfile: Profile;
  updateTopic: TopicNormal;
  updateUser: UpdateUserResponse;
  voteRes: Res;
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
  tags: Array<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateTopicOneArgs = {
  tags: Array<Scalars['String']['input']>;
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
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
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
  __typename: 'Profile';
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  self?: Maybe<Scalars['Boolean']['output']>;
  sn: Scalars['String']['output'];
  text: Scalars['String']['output'];
  update: Scalars['DateTime']['output'];
};

export type ProfileQuery = {
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  self?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  __typename: 'Query';
  clients: Array<Client>;
  histories: Array<History>;
  profiles: Array<Profile>;
  query: Query;
  reses: Array<Res>;
  storages: Array<Storage>;
  token: Token;
  tokens: Array<Token>;
  topicTags: Array<Tags>;
  topics: Array<Topic>;
  user: User;
  userID: Scalars['ID']['output'];
  userSN: Scalars['String']['output'];
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
  date: Scalars['DateTime']['output'];
  dv: Scalars['Int']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  replyCount: Scalars['Int']['output'];
  self?: Maybe<Scalars['Boolean']['output']>;
  topic: Topic;
  uv: Scalars['Int']['output'];
  voteFlag?: Maybe<VoteFlag>;
};

export type ResDelete = Res & {
  __typename: 'ResDelete';
  date: Scalars['DateTime']['output'];
  dv: Scalars['Int']['output'];
  flag: ResDeleteFlag;
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  replyCount: Scalars['Int']['output'];
  self?: Maybe<Scalars['Boolean']['output']>;
  topic: Topic;
  uv: Scalars['Int']['output'];
  voteFlag?: Maybe<VoteFlag>;
};

export type ResDeleteFlag =
  | 'freeze'
  | 'self';

export type ResFork = Res & {
  __typename: 'ResFork';
  date: Scalars['DateTime']['output'];
  dv: Scalars['Int']['output'];
  fork: TopicFork;
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  replyCount: Scalars['Int']['output'];
  self?: Maybe<Scalars['Boolean']['output']>;
  topic: Topic;
  uv: Scalars['Int']['output'];
  voteFlag?: Maybe<VoteFlag>;
};

export type ResHistory = Res & {
  __typename: 'ResHistory';
  date: Scalars['DateTime']['output'];
  dv: Scalars['Int']['output'];
  hash: Scalars['String']['output'];
  history: History;
  id: Scalars['ID']['output'];
  replyCount: Scalars['Int']['output'];
  self?: Maybe<Scalars['Boolean']['output']>;
  topic: Topic;
  uv: Scalars['Int']['output'];
  voteFlag?: Maybe<VoteFlag>;
};

export type ResNormal = Res & {
  __typename: 'ResNormal';
  date: Scalars['DateTime']['output'];
  dv: Scalars['Int']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isReply?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  reply?: Maybe<Res>;
  replyCount: Scalars['Int']['output'];
  self?: Maybe<Scalars['Boolean']['output']>;
  text: Scalars['String']['output'];
  topic: Topic;
  uv: Scalars['Int']['output'];
  voteFlag?: Maybe<VoteFlag>;
};

export type ResQuery = {
  date?: InputMaybe<DateQuery>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  notice?: InputMaybe<Scalars['Boolean']['input']>;
  profile?: InputMaybe<Scalars['ID']['input']>;
  reply?: InputMaybe<Scalars['ID']['input']>;
  self?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['ID']['input']>;
};

export type ResSubscript = {
  __typename: 'ResSubscript';
  count: Scalars['Int']['output'];
  res: Res;
};

export type ResTopic = Res & {
  __typename: 'ResTopic';
  date: Scalars['DateTime']['output'];
  dv: Scalars['Int']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  replyCount: Scalars['Int']['output'];
  self?: Maybe<Scalars['Boolean']['output']>;
  topic: Topic;
  uv: Scalars['Int']['output'];
  voteFlag?: Maybe<VoteFlag>;
};

export type SetStoragesInput = {
  storages: Array<StorageInput>;
};

export type SetStoragesPayload = {
  __typename: 'SetStoragesPayload';
  storages: Array<Storage>;
};

export type Storage = {
  __typename: 'Storage';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type StorageInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type StorageQuery = {
  key?: InputMaybe<Array<Scalars['String']['input']>>;
  keyPrefix?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename: 'Subscription';
  resAdded: ResSubscript;
};


export type SubscriptionResAddedArgs = {
  topic: Scalars['ID']['input'];
};

export type Tags = {
  __typename: 'Tags';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Token = {
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
};

export type TokenGeneral = Token & {
  __typename: 'TokenGeneral';
  client: Client;
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
};

export type TokenMaster = Token & {
  __typename: 'TokenMaster';
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
};

export type TokenReq = {
  __typename: 'TokenReq';
  key: Scalars['String']['output'];
  token: Scalars['ID']['output'];
};

export type Topic = {
  active: Scalars['Boolean']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  resCount: Scalars['Int']['output'];
  subscribe?: Maybe<Scalars['Boolean']['output']>;
  title: Scalars['String']['output'];
  update: Scalars['DateTime']['output'];
};

export type TopicFork = Topic & {
  __typename: 'TopicFork';
  active: Scalars['Boolean']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  parent: TopicNormal;
  resCount: Scalars['Int']['output'];
  subscribe?: Maybe<Scalars['Boolean']['output']>;
  title: Scalars['String']['output'];
  update: Scalars['DateTime']['output'];
};

export type TopicNormal = Topic & TopicSearch & {
  __typename: 'TopicNormal';
  active: Scalars['Boolean']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  resCount: Scalars['Int']['output'];
  subscribe?: Maybe<Scalars['Boolean']['output']>;
  tags: Array<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  update: Scalars['DateTime']['output'];
};

export type TopicOne = Topic & TopicSearch & {
  __typename: 'TopicOne';
  active: Scalars['Boolean']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  resCount: Scalars['Int']['output'];
  subscribe?: Maybe<Scalars['Boolean']['output']>;
  tags: Array<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  update: Scalars['DateTime']['output'];
};

export type TopicQuery = {
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TopicSearch = {
  active: Scalars['Boolean']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  resCount: Scalars['Int']['output'];
  subscribe?: Maybe<Scalars['Boolean']['output']>;
  tags: Array<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  update: Scalars['DateTime']['output'];
};

export type UpdateUserResponse = {
  __typename: 'UpdateUserResponse';
  token: TokenMaster;
  user: User;
};

export type User = {
  __typename: 'User';
  id: Scalars['ID']['output'];
  sn: Scalars['String']['output'];
};

export type ValidateData = {
  __typename: 'ValidateData';
  char?: Maybe<Array<Maybe<CharType>>>;
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
};

export type VoteFlag =
  | 'dv'
  | 'not'
  | 'uv';

export type VoteType =
  | 'cv'
  | 'dv'
  | 'uv';

export type StorageCollectionHooks_PrefixedStorageQueryQueryVariables = Exact<{
  prefix: Scalars['String']['input'];
}>;


export type StorageCollectionHooks_PrefixedStorageQueryQuery = { __typename: 'Query', storages: Array<{ __typename: 'Storage', key: string, value: string }> };

export type StorageCollectionHooks_StorageQueryQueryVariables = Exact<{
  keys: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type StorageCollectionHooks_StorageQueryQuery = { __typename: 'Query', storages: Array<{ __typename: 'Storage', key: string, value: string }> };

export type StorageCollectionHooks_SetStoragesMutationMutationVariables = Exact<{
  input: SetStoragesInput;
}>;


export type StorageCollectionHooks_SetStoragesMutationMutation = { __typename: 'Mutation', setStorages: { __typename: 'SetStoragesPayload', storages: Array<{ __typename: 'Storage', key: string, value: string }> } };

export type StorageCollectionHooks_DeleteStorageMutationMutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type StorageCollectionHooks_DeleteStorageMutationMutation = { __typename: 'Mutation', delStorage?: boolean | null };

export type ClientFragment = { __typename: 'Client', id: string, name: string, url: string, self?: boolean | null, date: string, update: string } & { ' $fragmentName'?: 'ClientFragment' };

export type FindClientsQueryVariables = Exact<{
  query: ClientQuery;
}>;


export type FindClientsQuery = { __typename: 'Query', clients: Array<(
    { __typename: 'Client' }
    & { ' $fragmentRefs'?: { 'ClientFragment': ClientFragment } }
  )> };

export type CreateClientMutationVariables = Exact<{
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
}>;


export type CreateClientMutation = { __typename: 'Mutation', createClient: (
    { __typename: 'Client' }
    & { ' $fragmentRefs'?: { 'ClientFragment': ClientFragment } }
  ) };

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
}>;


export type UpdateClientMutation = { __typename: 'Mutation', updateClient: (
    { __typename: 'Client' }
    & { ' $fragmentRefs'?: { 'ClientFragment': ClientFragment } }
  ) };

export type HistoryFragment = { __typename: 'History', id: string, title: string, tags: Array<string>, text: string, date: string, hash: string, self?: boolean | null, topic: (
    { __typename: 'TopicNormal' }
    & { ' $fragmentRefs'?: { 'TopicNormalFragment': TopicNormalFragment } }
  ) } & { ' $fragmentName'?: 'HistoryFragment' };

export type ProfileFragment = { __typename: 'Profile', id: string, self?: boolean | null, name: string, text: string, date: string, update: string, sn: string } & { ' $fragmentName'?: 'ProfileFragment' };

export type FindProfilesQueryVariables = Exact<{
  query: ProfileQuery;
}>;


export type FindProfilesQuery = { __typename: 'Query', profiles: Array<(
    { __typename: 'Profile' }
    & { ' $fragmentRefs'?: { 'ProfileFragment': ProfileFragment } }
  )> };

export type CreateProfileMutationVariables = Exact<{
  name: Scalars['String']['input'];
  text: Scalars['String']['input'];
  sn: Scalars['String']['input'];
}>;


export type CreateProfileMutation = { __typename: 'Mutation', createProfile: (
    { __typename: 'Profile' }
    & { ' $fragmentRefs'?: { 'ProfileFragment': ProfileFragment } }
  ) };

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  sn?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProfileMutation = { __typename: 'Mutation', updateProfile: (
    { __typename: 'Profile' }
    & { ' $fragmentRefs'?: { 'ProfileFragment': ProfileFragment } }
  ) };

export type ResisterPushSubscriptionMutationVariables = Exact<{
  endpoint: Scalars['String']['input'];
  p256dh: Scalars['String']['input'];
  auth: Scalars['String']['input'];
}>;


export type ResisterPushSubscriptionMutation = { __typename: 'Mutation', resisterPushSubscription?: boolean | null };

type Res_ResDelete_Fragment = (
  { __typename: 'ResDelete' }
  & { ' $fragmentRefs'?: { 'ResDeleteFragment': ResDeleteFragment } }
) & { ' $fragmentName'?: 'Res_ResDelete_Fragment' };

type Res_ResFork_Fragment = (
  { __typename: 'ResFork' }
  & { ' $fragmentRefs'?: { 'ResForkFragment': ResForkFragment } }
) & { ' $fragmentName'?: 'Res_ResFork_Fragment' };

type Res_ResHistory_Fragment = (
  { __typename: 'ResHistory' }
  & { ' $fragmentRefs'?: { 'ResHistoryFragment': ResHistoryFragment } }
) & { ' $fragmentName'?: 'Res_ResHistory_Fragment' };

type Res_ResNormal_Fragment = (
  { __typename: 'ResNormal' }
  & { ' $fragmentRefs'?: { 'ResNormalFragment': ResNormalFragment } }
) & { ' $fragmentName'?: 'Res_ResNormal_Fragment' };

type Res_ResTopic_Fragment = (
  { __typename: 'ResTopic' }
  & { ' $fragmentRefs'?: { 'ResTopicFragment': ResTopicFragment } }
) & { ' $fragmentName'?: 'Res_ResTopic_Fragment' };

export type ResFragment = Res_ResDelete_Fragment | Res_ResFork_Fragment | Res_ResHistory_Fragment | Res_ResNormal_Fragment | Res_ResTopic_Fragment;

type ResBase_ResDelete_Fragment = { __typename: 'ResDelete', id: string, date: string, self?: boolean | null, uv: number, dv: number, hash: string, replyCount: number, voteFlag?: VoteFlag | null, topic: (
    { __typename: 'TopicFork' }
    & { ' $fragmentRefs'?: { 'Topic_TopicFork_Fragment': Topic_TopicFork_Fragment } }
  ) | (
    { __typename: 'TopicNormal' }
    & { ' $fragmentRefs'?: { 'Topic_TopicNormal_Fragment': Topic_TopicNormal_Fragment } }
  ) | (
    { __typename: 'TopicOne' }
    & { ' $fragmentRefs'?: { 'Topic_TopicOne_Fragment': Topic_TopicOne_Fragment } }
  ) } & { ' $fragmentName'?: 'ResBase_ResDelete_Fragment' };

type ResBase_ResFork_Fragment = { __typename: 'ResFork', id: string, date: string, self?: boolean | null, uv: number, dv: number, hash: string, replyCount: number, voteFlag?: VoteFlag | null, topic: (
    { __typename: 'TopicFork' }
    & { ' $fragmentRefs'?: { 'Topic_TopicFork_Fragment': Topic_TopicFork_Fragment } }
  ) | (
    { __typename: 'TopicNormal' }
    & { ' $fragmentRefs'?: { 'Topic_TopicNormal_Fragment': Topic_TopicNormal_Fragment } }
  ) | (
    { __typename: 'TopicOne' }
    & { ' $fragmentRefs'?: { 'Topic_TopicOne_Fragment': Topic_TopicOne_Fragment } }
  ) } & { ' $fragmentName'?: 'ResBase_ResFork_Fragment' };

type ResBase_ResHistory_Fragment = { __typename: 'ResHistory', id: string, date: string, self?: boolean | null, uv: number, dv: number, hash: string, replyCount: number, voteFlag?: VoteFlag | null, topic: (
    { __typename: 'TopicFork' }
    & { ' $fragmentRefs'?: { 'Topic_TopicFork_Fragment': Topic_TopicFork_Fragment } }
  ) | (
    { __typename: 'TopicNormal' }
    & { ' $fragmentRefs'?: { 'Topic_TopicNormal_Fragment': Topic_TopicNormal_Fragment } }
  ) | (
    { __typename: 'TopicOne' }
    & { ' $fragmentRefs'?: { 'Topic_TopicOne_Fragment': Topic_TopicOne_Fragment } }
  ) } & { ' $fragmentName'?: 'ResBase_ResHistory_Fragment' };

type ResBase_ResNormal_Fragment = { __typename: 'ResNormal', id: string, date: string, self?: boolean | null, uv: number, dv: number, hash: string, replyCount: number, voteFlag?: VoteFlag | null, topic: (
    { __typename: 'TopicFork' }
    & { ' $fragmentRefs'?: { 'Topic_TopicFork_Fragment': Topic_TopicFork_Fragment } }
  ) | (
    { __typename: 'TopicNormal' }
    & { ' $fragmentRefs'?: { 'Topic_TopicNormal_Fragment': Topic_TopicNormal_Fragment } }
  ) | (
    { __typename: 'TopicOne' }
    & { ' $fragmentRefs'?: { 'Topic_TopicOne_Fragment': Topic_TopicOne_Fragment } }
  ) } & { ' $fragmentName'?: 'ResBase_ResNormal_Fragment' };

type ResBase_ResTopic_Fragment = { __typename: 'ResTopic', id: string, date: string, self?: boolean | null, uv: number, dv: number, hash: string, replyCount: number, voteFlag?: VoteFlag | null, topic: (
    { __typename: 'TopicFork' }
    & { ' $fragmentRefs'?: { 'Topic_TopicFork_Fragment': Topic_TopicFork_Fragment } }
  ) | (
    { __typename: 'TopicNormal' }
    & { ' $fragmentRefs'?: { 'Topic_TopicNormal_Fragment': Topic_TopicNormal_Fragment } }
  ) | (
    { __typename: 'TopicOne' }
    & { ' $fragmentRefs'?: { 'Topic_TopicOne_Fragment': Topic_TopicOne_Fragment } }
  ) } & { ' $fragmentName'?: 'ResBase_ResTopic_Fragment' };

export type ResBaseFragment = ResBase_ResDelete_Fragment | ResBase_ResFork_Fragment | ResBase_ResHistory_Fragment | ResBase_ResNormal_Fragment | ResBase_ResTopic_Fragment;

export type ResNormalFragment = (
  { __typename: 'ResNormal', name?: string | null, text: string, isReply?: boolean | null, reply?: { __typename: 'ResDelete', id: string } | { __typename: 'ResFork', id: string } | { __typename: 'ResHistory', id: string } | { __typename: 'ResNormal', id: string } | { __typename: 'ResTopic', id: string } | null, profile?: (
    { __typename: 'Profile' }
    & { ' $fragmentRefs'?: { 'ProfileFragment': ProfileFragment } }
  ) | null }
  & { ' $fragmentRefs'?: { 'ResBase_ResNormal_Fragment': ResBase_ResNormal_Fragment } }
) & { ' $fragmentName'?: 'ResNormalFragment' };

export type ResHistoryFragment = (
  { __typename: 'ResHistory', history: (
    { __typename: 'History' }
    & { ' $fragmentRefs'?: { 'HistoryFragment': HistoryFragment } }
  ) }
  & { ' $fragmentRefs'?: { 'ResBase_ResHistory_Fragment': ResBase_ResHistory_Fragment } }
) & { ' $fragmentName'?: 'ResHistoryFragment' };

export type ResTopicFragment = (
  { __typename: 'ResTopic' }
  & { ' $fragmentRefs'?: { 'ResBase_ResTopic_Fragment': ResBase_ResTopic_Fragment } }
) & { ' $fragmentName'?: 'ResTopicFragment' };

export type ResForkFragment = (
  { __typename: 'ResFork', fork: (
    { __typename: 'TopicFork' }
    & { ' $fragmentRefs'?: { 'TopicForkFragment': TopicForkFragment } }
  ) }
  & { ' $fragmentRefs'?: { 'ResBase_ResFork_Fragment': ResBase_ResFork_Fragment } }
) & { ' $fragmentName'?: 'ResForkFragment' };

export type ResDeleteFragment = (
  { __typename: 'ResDelete', flag: ResDeleteFlag }
  & { ' $fragmentRefs'?: { 'ResBase_ResDelete_Fragment': ResBase_ResDelete_Fragment } }
) & { ' $fragmentName'?: 'ResDeleteFragment' };

export type FindResesQueryVariables = Exact<{
  query: ResQuery;
}>;


export type FindResesQuery = { __typename: 'Query', reses: Array<(
    { __typename: 'ResDelete' }
    & { ' $fragmentRefs'?: { 'Res_ResDelete_Fragment': Res_ResDelete_Fragment } }
  ) | (
    { __typename: 'ResFork' }
    & { ' $fragmentRefs'?: { 'Res_ResFork_Fragment': Res_ResFork_Fragment } }
  ) | (
    { __typename: 'ResHistory' }
    & { ' $fragmentRefs'?: { 'Res_ResHistory_Fragment': Res_ResHistory_Fragment } }
  ) | (
    { __typename: 'ResNormal' }
    & { ' $fragmentRefs'?: { 'Res_ResNormal_Fragment': Res_ResNormal_Fragment } }
  ) | (
    { __typename: 'ResTopic' }
    & { ' $fragmentRefs'?: { 'Res_ResTopic_Fragment': Res_ResTopic_Fragment } }
  )> };

export type VoteResMutationVariables = Exact<{
  res: Scalars['ID']['input'];
  type: VoteType;
}>;


export type VoteResMutation = { __typename: 'Mutation', voteRes: (
    { __typename: 'ResDelete' }
    & { ' $fragmentRefs'?: { 'Res_ResDelete_Fragment': Res_ResDelete_Fragment } }
  ) | (
    { __typename: 'ResFork' }
    & { ' $fragmentRefs'?: { 'Res_ResFork_Fragment': Res_ResFork_Fragment } }
  ) | (
    { __typename: 'ResHistory' }
    & { ' $fragmentRefs'?: { 'Res_ResHistory_Fragment': Res_ResHistory_Fragment } }
  ) | (
    { __typename: 'ResNormal' }
    & { ' $fragmentRefs'?: { 'Res_ResNormal_Fragment': Res_ResNormal_Fragment } }
  ) | (
    { __typename: 'ResTopic' }
    & { ' $fragmentRefs'?: { 'Res_ResTopic_Fragment': Res_ResTopic_Fragment } }
  ) };

export type DelResMutationVariables = Exact<{
  res: Scalars['ID']['input'];
}>;


export type DelResMutation = { __typename: 'Mutation', delRes: (
    { __typename: 'ResDelete' }
    & { ' $fragmentRefs'?: { 'Res_ResDelete_Fragment': Res_ResDelete_Fragment } }
  ) };

export type CreateResMutationVariables = Exact<{
  topic: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  reply?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<Scalars['String']['input']>;
  age: Scalars['Boolean']['input'];
}>;


export type CreateResMutation = { __typename: 'Mutation', createRes: (
    { __typename: 'ResNormal' }
    & { ' $fragmentRefs'?: { 'ResNormalFragment': ResNormalFragment } }
  ) };

export type ResAddedSubscriptionVariables = Exact<{
  topic: Scalars['ID']['input'];
}>;


export type ResAddedSubscription = { __typename: 'Subscription', resAdded: { __typename: 'ResSubscript', count: number, res: (
      { __typename: 'ResDelete' }
      & { ' $fragmentRefs'?: { 'Res_ResDelete_Fragment': Res_ResDelete_Fragment } }
    ) | (
      { __typename: 'ResFork' }
      & { ' $fragmentRefs'?: { 'Res_ResFork_Fragment': Res_ResFork_Fragment } }
    ) | (
      { __typename: 'ResHistory' }
      & { ' $fragmentRefs'?: { 'Res_ResHistory_Fragment': Res_ResHistory_Fragment } }
    ) | (
      { __typename: 'ResNormal' }
      & { ' $fragmentRefs'?: { 'Res_ResNormal_Fragment': Res_ResNormal_Fragment } }
    ) | (
      { __typename: 'ResTopic' }
      & { ' $fragmentRefs'?: { 'Res_ResTopic_Fragment': Res_ResTopic_Fragment } }
    ) } };

export type StorageFragment = { __typename: 'Storage', key: string, value: string } & { ' $fragmentName'?: 'StorageFragment' };

export type FindStoragesQueryVariables = Exact<{
  query: StorageQuery;
}>;


export type FindStoragesQuery = { __typename: 'Query', storages: Array<(
    { __typename: 'Storage' }
    & { ' $fragmentRefs'?: { 'StorageFragment': StorageFragment } }
  )> };

export type SetStoragesMutationVariables = Exact<{
  input: SetStoragesInput;
}>;


export type SetStoragesMutation = { __typename: 'Mutation', setStorages: { __typename: 'SetStoragesPayload', storages: Array<(
      { __typename: 'Storage' }
      & { ' $fragmentRefs'?: { 'StorageFragment': StorageFragment } }
    )> } };

export type TokenReqFragment = { __typename: 'TokenReq', token: string, key: string } & { ' $fragmentName'?: 'TokenReqFragment' };

type Token_TokenGeneral_Fragment = (
  { __typename: 'TokenGeneral' }
  & { ' $fragmentRefs'?: { 'TokenGeneralFragment': TokenGeneralFragment } }
) & { ' $fragmentName'?: 'Token_TokenGeneral_Fragment' };

type Token_TokenMaster_Fragment = (
  { __typename: 'TokenMaster' }
  & { ' $fragmentRefs'?: { 'TokenMasterFragment': TokenMasterFragment } }
) & { ' $fragmentName'?: 'Token_TokenMaster_Fragment' };

export type TokenFragment = Token_TokenGeneral_Fragment | Token_TokenMaster_Fragment;

type TokenBase_TokenGeneral_Fragment = { __typename: 'TokenGeneral', id: string, key: string, date: string } & { ' $fragmentName'?: 'TokenBase_TokenGeneral_Fragment' };

type TokenBase_TokenMaster_Fragment = { __typename: 'TokenMaster', id: string, key: string, date: string } & { ' $fragmentName'?: 'TokenBase_TokenMaster_Fragment' };

export type TokenBaseFragment = TokenBase_TokenGeneral_Fragment | TokenBase_TokenMaster_Fragment;

export type TokenMasterFragment = (
  { __typename: 'TokenMaster' }
  & { ' $fragmentRefs'?: { 'TokenBase_TokenMaster_Fragment': TokenBase_TokenMaster_Fragment } }
) & { ' $fragmentName'?: 'TokenMasterFragment' };

export type TokenGeneralFragment = (
  { __typename: 'TokenGeneral', client: (
    { __typename: 'Client' }
    & { ' $fragmentRefs'?: { 'ClientFragment': ClientFragment } }
  ) }
  & { ' $fragmentRefs'?: { 'TokenBase_TokenGeneral_Fragment': TokenBase_TokenGeneral_Fragment } }
) & { ' $fragmentName'?: 'TokenGeneralFragment' };

export type FindTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type FindTokenQuery = { __typename: 'Query', token: { __typename: 'TokenGeneral' } | { __typename: 'TokenMaster', id: string, key: string } };

export type FindTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type FindTokensQuery = { __typename: 'Query', tokens: Array<(
    { __typename: 'TokenGeneral' }
    & { ' $fragmentRefs'?: { 'TokenGeneralFragment': TokenGeneralFragment } }
  ) | (
    { __typename: 'TokenMaster' }
    & { ' $fragmentRefs'?: { 'TokenMasterFragment': TokenMasterFragment } }
  )> };

export type CreateTokenMasterMutationVariables = Exact<{
  auth: AuthUser;
}>;


export type CreateTokenMasterMutation = { __typename: 'Mutation', createTokenMaster: (
    { __typename: 'TokenMaster' }
    & { ' $fragmentRefs'?: { 'Token_TokenMaster_Fragment': Token_TokenMaster_Fragment } }
  ) };

export type DelTokenClientMutationVariables = Exact<{
  client: Scalars['ID']['input'];
}>;


export type DelTokenClientMutation = { __typename: 'Mutation', delTokenClient?: boolean | null };

export type CreateTokenGeneralMutationVariables = Exact<{
  client: Scalars['ID']['input'];
}>;


export type CreateTokenGeneralMutation = { __typename: 'Mutation', createTokenGeneral: { __typename: 'CreateTokenGeneralResponse', token: (
      { __typename: 'TokenGeneral' }
      & { ' $fragmentRefs'?: { 'TokenGeneralFragment': TokenGeneralFragment } }
    ), req: (
      { __typename: 'TokenReq' }
      & { ' $fragmentRefs'?: { 'TokenReqFragment': TokenReqFragment } }
    ) } };

type TopicSearch_TopicNormal_Fragment = (
  { __typename: 'TopicNormal' }
  & { ' $fragmentRefs'?: { 'TopicNormalFragment': TopicNormalFragment } }
) & { ' $fragmentName'?: 'TopicSearch_TopicNormal_Fragment' };

type TopicSearch_TopicOne_Fragment = (
  { __typename: 'TopicOne' }
  & { ' $fragmentRefs'?: { 'TopicOneFragment': TopicOneFragment } }
) & { ' $fragmentName'?: 'TopicSearch_TopicOne_Fragment' };

export type TopicSearchFragment = TopicSearch_TopicNormal_Fragment | TopicSearch_TopicOne_Fragment;

type TopicBase_TopicFork_Fragment = { __typename: 'TopicFork', id: string, title: string, update: string, date: string, resCount: number, active: boolean } & { ' $fragmentName'?: 'TopicBase_TopicFork_Fragment' };

type TopicBase_TopicNormal_Fragment = { __typename: 'TopicNormal', id: string, title: string, update: string, date: string, resCount: number, active: boolean } & { ' $fragmentName'?: 'TopicBase_TopicNormal_Fragment' };

type TopicBase_TopicOne_Fragment = { __typename: 'TopicOne', id: string, title: string, update: string, date: string, resCount: number, active: boolean } & { ' $fragmentName'?: 'TopicBase_TopicOne_Fragment' };

export type TopicBaseFragment = TopicBase_TopicFork_Fragment | TopicBase_TopicNormal_Fragment | TopicBase_TopicOne_Fragment;

type TopicSearchBase_TopicNormal_Fragment = (
  { __typename: 'TopicNormal', tags: Array<string>, text: string }
  & { ' $fragmentRefs'?: { 'TopicBase_TopicNormal_Fragment': TopicBase_TopicNormal_Fragment } }
) & { ' $fragmentName'?: 'TopicSearchBase_TopicNormal_Fragment' };

type TopicSearchBase_TopicOne_Fragment = (
  { __typename: 'TopicOne', tags: Array<string>, text: string }
  & { ' $fragmentRefs'?: { 'TopicBase_TopicOne_Fragment': TopicBase_TopicOne_Fragment } }
) & { ' $fragmentName'?: 'TopicSearchBase_TopicOne_Fragment' };

export type TopicSearchBaseFragment = TopicSearchBase_TopicNormal_Fragment | TopicSearchBase_TopicOne_Fragment;

export type TopicNormalFragment = (
  { __typename: 'TopicNormal' }
  & { ' $fragmentRefs'?: { 'TopicSearchBase_TopicNormal_Fragment': TopicSearchBase_TopicNormal_Fragment } }
) & { ' $fragmentName'?: 'TopicNormalFragment' };

export type TopicOneFragment = (
  { __typename: 'TopicOne' }
  & { ' $fragmentRefs'?: { 'TopicSearchBase_TopicOne_Fragment': TopicSearchBase_TopicOne_Fragment } }
) & { ' $fragmentName'?: 'TopicOneFragment' };

export type TopicForkFragment = (
  { __typename: 'TopicFork', parent: (
    { __typename: 'TopicNormal' }
    & { ' $fragmentRefs'?: { 'TopicSearch_TopicNormal_Fragment': TopicSearch_TopicNormal_Fragment } }
  ) }
  & { ' $fragmentRefs'?: { 'TopicBase_TopicFork_Fragment': TopicBase_TopicFork_Fragment } }
) & { ' $fragmentName'?: 'TopicForkFragment' };

type Topic_TopicFork_Fragment = (
  { __typename: 'TopicFork' }
  & { ' $fragmentRefs'?: { 'TopicForkFragment': TopicForkFragment } }
) & { ' $fragmentName'?: 'Topic_TopicFork_Fragment' };

type Topic_TopicNormal_Fragment = (
  { __typename: 'TopicNormal' }
  & { ' $fragmentRefs'?: { 'TopicNormalFragment': TopicNormalFragment } }
) & { ' $fragmentName'?: 'Topic_TopicNormal_Fragment' };

type Topic_TopicOne_Fragment = (
  { __typename: 'TopicOne' }
  & { ' $fragmentRefs'?: { 'TopicOneFragment': TopicOneFragment } }
) & { ' $fragmentName'?: 'Topic_TopicOne_Fragment' };

export type TopicFragment = Topic_TopicFork_Fragment | Topic_TopicNormal_Fragment | Topic_TopicOne_Fragment;

export type CreateTopicNormalMutationVariables = Exact<{
  title: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type CreateTopicNormalMutation = { __typename: 'Mutation', createTopicNormal: (
    { __typename: 'TopicNormal' }
    & { ' $fragmentRefs'?: { 'Topic_TopicNormal_Fragment': Topic_TopicNormal_Fragment } }
  ) };

export type CreateTopicOneMutationVariables = Exact<{
  title: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type CreateTopicOneMutation = { __typename: 'Mutation', createTopicOne: (
    { __typename: 'TopicOne' }
    & { ' $fragmentRefs'?: { 'Topic_TopicOne_Fragment': Topic_TopicOne_Fragment } }
  ) };

export type FindTopicsQueryVariables = Exact<{
  query: TopicQuery;
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  includeSubscribe?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type FindTopicsQuery = { __typename: 'Query', topics: Array<(
    { __typename: 'TopicFork', subscribe?: boolean | null }
    & { ' $fragmentRefs'?: { 'Topic_TopicFork_Fragment': Topic_TopicFork_Fragment } }
  ) | (
    { __typename: 'TopicNormal', subscribe?: boolean | null }
    & { ' $fragmentRefs'?: { 'Topic_TopicNormal_Fragment': Topic_TopicNormal_Fragment } }
  ) | (
    { __typename: 'TopicOne', subscribe?: boolean | null }
    & { ' $fragmentRefs'?: { 'Topic_TopicOne_Fragment': Topic_TopicOne_Fragment } }
  )> };

export type FindTopicTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindTopicTagsQuery = { __typename: 'Query', topicTags: Array<{ __typename: 'Tags', name: string, count: number }> };

export type UpdateTopicMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type UpdateTopicMutation = { __typename: 'Mutation', updateTopic: (
    { __typename: 'TopicNormal' }
    & { ' $fragmentRefs'?: { 'TopicNormalFragment': TopicNormalFragment } }
  ) };

export type CreateTopicForkMutationVariables = Exact<{
  title: Scalars['String']['input'];
  parent: Scalars['ID']['input'];
}>;


export type CreateTopicForkMutation = { __typename: 'Mutation', createTopicFork: (
    { __typename: 'TopicFork' }
    & { ' $fragmentRefs'?: { 'TopicForkFragment': TopicForkFragment } }
  ) };

export type SubscribeTopicMutationVariables = Exact<{
  topic: Scalars['ID']['input'];
}>;


export type SubscribeTopicMutation = { __typename: 'Mutation', subscribeTopic?: boolean | null };

export type UnsubscribeTopicMutationVariables = Exact<{
  topic: Scalars['ID']['input'];
}>;


export type UnsubscribeTopicMutation = { __typename: 'Mutation', unsubscribeTopic?: boolean | null };

export type UserFragment = { __typename: 'User', id: string, sn: string } & { ' $fragmentName'?: 'UserFragment' };

export type FindUserSnQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindUserSnQuery = { __typename: 'Query', userSN: string };

export type FindUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserQuery = { __typename: 'Query', user: (
    { __typename: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
  ) };

export type UpdateUserMutationVariables = Exact<{
  sn: Scalars['String']['input'];
  pass: Scalars['String']['input'];
  auth: AuthUser;
}>;


export type UpdateUserMutation = { __typename: 'Mutation', updateUser: { __typename: 'UpdateUserResponse', user: (
      { __typename: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
    ), token: (
      { __typename: 'TokenMaster' }
      & { ' $fragmentRefs'?: { 'TokenMasterFragment': TokenMasterFragment } }
    ) } };

export type FindUserIdQueryVariables = Exact<{
  sn: Scalars['String']['input'];
}>;


export type FindUserIdQuery = { __typename: 'Query', userID: string };

export type CreateUserMutationVariables = Exact<{
  sn: Scalars['String']['input'];
  pass: Scalars['String']['input'];
  recaptcha: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename: 'Mutation', createUser: { __typename: 'CreateUserResponse', user: (
      { __typename: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragment': UserFragment } }
    ), token: (
      { __typename: 'TokenMaster' }
      & { ' $fragmentRefs'?: { 'TokenMasterFragment': TokenMasterFragment } }
    ) } };

export const ProfileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}}]} as unknown as DocumentNode<ProfileFragment, unknown>;
export const TopicBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]} as unknown as DocumentNode<TopicBaseFragment, unknown>;
export const TopicSearchBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]} as unknown as DocumentNode<TopicSearchBaseFragment, unknown>;
export const TopicOneFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}}]} as unknown as DocumentNode<TopicOneFragment, unknown>;
export const TopicNormalFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}}]} as unknown as DocumentNode<TopicNormalFragment, unknown>;
export const TopicSearchFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}}]} as unknown as DocumentNode<TopicSearchFragment, unknown>;
export const TopicForkFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}}]} as unknown as DocumentNode<TopicForkFragment, unknown>;
export const TopicFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}}]} as unknown as DocumentNode<TopicFragment, unknown>;
export const ResBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}}]} as unknown as DocumentNode<ResBaseFragment, unknown>;
export const ResNormalFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"profile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}}]} as unknown as DocumentNode<ResNormalFragment, unknown>;
export const HistoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"history"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"History"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"self"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}}]} as unknown as DocumentNode<HistoryFragment, unknown>;
export const ResHistoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resHistory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"history"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"history"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"History"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"self"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}}]} as unknown as DocumentNode<ResHistoryFragment, unknown>;
export const ResForkFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fork"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}}]} as unknown as DocumentNode<ResForkFragment, unknown>;
export const ResDeleteFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resDelete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResDelete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}}]} as unknown as DocumentNode<ResDeleteFragment, unknown>;
export const ResTopicFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resTopic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResTopic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}}]} as unknown as DocumentNode<ResTopicFragment, unknown>;
export const ResFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"res"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resHistory"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resFork"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resDelete"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resTopic"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"history"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"History"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"self"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"profile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resHistory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"history"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fork"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resDelete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResDelete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resTopic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResTopic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}}]} as unknown as DocumentNode<ResFragment, unknown>;
export const StorageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"storage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Storage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<StorageFragment, unknown>;
export const TokenReqFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenReq"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenReq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]} as unknown as DocumentNode<TokenReqFragment, unknown>;
export const TokenBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]} as unknown as DocumentNode<TokenBaseFragment, unknown>;
export const TokenMasterFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenMaster"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenMaster"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]} as unknown as DocumentNode<TokenMasterFragment, unknown>;
export const ClientFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}}]}}]} as unknown as DocumentNode<ClientFragment, unknown>;
export const TokenGeneralFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenGeneral"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenGeneral"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"client"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]} as unknown as DocumentNode<TokenGeneralFragment, unknown>;
export const TokenFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenMaster"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenGeneral"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenMaster"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenMaster"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenGeneral"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenGeneral"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"client"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}}]} as unknown as DocumentNode<TokenFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const StorageCollectionHooks_PrefixedStorageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StorageCollectionHooks_prefixedStorageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prefix"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"keyPrefix"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prefix"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<StorageCollectionHooks_PrefixedStorageQueryQuery, StorageCollectionHooks_PrefixedStorageQueryQueryVariables>;
export const StorageCollectionHooks_StorageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StorageCollectionHooks_storageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keys"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keys"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<StorageCollectionHooks_StorageQueryQuery, StorageCollectionHooks_StorageQueryQueryVariables>;
export const StorageCollectionHooks_SetStoragesMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StorageCollectionHooks_setStoragesMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetStoragesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setStorages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<StorageCollectionHooks_SetStoragesMutationMutation, StorageCollectionHooks_SetStoragesMutationMutationVariables>;
export const StorageCollectionHooks_DeleteStorageMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StorageCollectionHooks_deleteStorageMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delStorage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}]}]}}]} as unknown as DocumentNode<StorageCollectionHooks_DeleteStorageMutationMutation, StorageCollectionHooks_DeleteStorageMutationMutationVariables>;
export const FindClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findClients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientQuery"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"client"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}}]}}]} as unknown as DocumentNode<FindClientsQuery, FindClientsQueryVariables>;
export const CreateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"client"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}}]}}]} as unknown as DocumentNode<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"client"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}}]}}]} as unknown as DocumentNode<UpdateClientMutation, UpdateClientMutationVariables>;
export const FindProfilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findProfiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileQuery"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"profile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}}]} as unknown as DocumentNode<FindProfilesQuery, FindProfilesQueryVariables>;
export const CreateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"sn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sn"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"profile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}}]} as unknown as DocumentNode<CreateProfileMutation, CreateProfileMutationVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sn"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"sn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sn"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"profile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const ResisterPushSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resisterPushSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endpoint"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"p256dh"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"auth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resisterPushSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"endpoint"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endpoint"}}},{"kind":"Argument","name":{"kind":"Name","value":"p256dh"},"value":{"kind":"Variable","name":{"kind":"Name","value":"p256dh"}}},{"kind":"Argument","name":{"kind":"Name","value":"auth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auth"}}}]}]}}]} as unknown as DocumentNode<ResisterPushSubscriptionMutation, ResisterPushSubscriptionMutationVariables>;
export const FindResesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findReses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResQuery"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"res"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"profile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"history"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"History"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"self"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resHistory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"history"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fork"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resDelete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResDelete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resTopic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResTopic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"res"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resHistory"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resFork"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resDelete"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resTopic"}}]}}]} as unknown as DocumentNode<FindResesQuery, FindResesQueryVariables>;
export const VoteResDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"voteRes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"res"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VoteType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voteRes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"res"},"value":{"kind":"Variable","name":{"kind":"Name","value":"res"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"res"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"profile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"history"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"History"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"self"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resHistory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"history"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fork"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resDelete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResDelete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resTopic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResTopic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"res"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resHistory"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resFork"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resDelete"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resTopic"}}]}}]} as unknown as DocumentNode<VoteResMutation, VoteResMutationVariables>;
export const DelResDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"delRes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"res"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delRes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"res"},"value":{"kind":"Variable","name":{"kind":"Name","value":"res"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"res"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"profile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"history"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"History"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"self"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resHistory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"history"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fork"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resDelete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResDelete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resTopic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResTopic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"res"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resHistory"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resFork"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resDelete"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resTopic"}}]}}]} as unknown as DocumentNode<DelResMutation, DelResMutationVariables>;
export const CreateResDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reply"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profile"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"age"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topic"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"reply"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reply"}}},{"kind":"Argument","name":{"kind":"Name","value":"profile"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profile"}}},{"kind":"Argument","name":{"kind":"Name","value":"age"},"value":{"kind":"Variable","name":{"kind":"Name","value":"age"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resNormal"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"profile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}}]} as unknown as DocumentNode<CreateResMutation, CreateResMutationVariables>;
export const ResAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"resAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topic"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"res"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"res"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"profile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"uv"}},{"kind":"Field","name":{"kind":"Name","value":"dv"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteFlag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"profile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"history"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"History"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"self"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resHistory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"history"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fork"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resDelete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResDelete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"resTopic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResTopic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"res"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Res"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"resNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resHistory"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resFork"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resDelete"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"resTopic"}}]}}]} as unknown as DocumentNode<ResAddedSubscription, ResAddedSubscriptionVariables>;
export const FindStoragesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findStorages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StorageQuery"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"storage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"storage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Storage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<FindStoragesQuery, FindStoragesQueryVariables>;
export const SetStoragesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setStorages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetStoragesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setStorages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"storage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"storage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Storage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<SetStoragesMutation, SetStoragesMutationVariables>;
export const FindTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenMaster"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]}}]} as unknown as DocumentNode<FindTokenQuery, FindTokenQueryVariables>;
export const FindTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenMaster"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenMaster"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenGeneral"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenGeneral"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenMaster"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenMaster"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenGeneral"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenGeneral"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"client"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}}]} as unknown as DocumentNode<FindTokensQuery, FindTokensQueryVariables>;
export const CreateTokenMasterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTokenMaster"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"auth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthUser"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTokenMaster"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"auth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auth"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"token"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenMaster"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenMaster"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenGeneral"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenGeneral"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"client"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"token"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenMaster"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenGeneral"}}]}}]} as unknown as DocumentNode<CreateTokenMasterMutation, CreateTokenMasterMutationVariables>;
export const DelTokenClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"delTokenClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"client"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delTokenClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"client"},"value":{"kind":"Variable","name":{"kind":"Name","value":"client"}}}]}]}}]} as unknown as DocumentNode<DelTokenClientMutation, DelTokenClientMutationVariables>;
export const CreateTokenGeneralDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTokenGeneral"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"client"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTokenGeneral"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"client"},"value":{"kind":"Variable","name":{"kind":"Name","value":"client"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenGeneral"}}]}},{"kind":"Field","name":{"kind":"Name","value":"req"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenReq"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"self"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"update"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenGeneral"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenGeneral"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"client"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenReq"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenReq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]} as unknown as DocumentNode<CreateTokenGeneralMutation, CreateTokenGeneralMutationVariables>;
export const CreateTopicNormalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTopicNormal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTopicNormal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}}]} as unknown as DocumentNode<CreateTopicNormalMutation, CreateTopicNormalMutationVariables>;
export const CreateTopicOneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTopicOne"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTopicOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}}]} as unknown as DocumentNode<CreateTopicOneMutation, CreateTopicOneMutationVariables>;
export const FindTopicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findTopics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TopicQuery"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includeSubscribe"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"subscribe"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includeSubscribe"}}}]}]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topic"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}}]} as unknown as DocumentNode<FindTopicsQuery, FindTopicsQueryVariables>;
export const FindTopicTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findTopicTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topicTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<FindTopicTagsQuery, FindTopicTagsQueryVariables>;
export const UpdateTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}}]} as unknown as DocumentNode<UpdateTopicMutation, UpdateTopicMutationVariables>;
export const CreateTopicForkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTopicFork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTopicFork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"parent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicFork"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Topic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"resCount"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearchBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicNormal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicNormal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicOne"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicOne"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearchBase"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicSearch"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicNormal"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicOne"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"topicFork"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TopicFork"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicSearch"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"topicBase"}}]}}]} as unknown as DocumentNode<CreateTopicForkMutation, CreateTopicForkMutationVariables>;
export const SubscribeTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"subscribeTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribeTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topic"}}}]}]}}]} as unknown as DocumentNode<SubscribeTopicMutation, SubscribeTopicMutationVariables>;
export const UnsubscribeTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unsubscribeTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unsubscribeTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topic"}}}]}]}}]} as unknown as DocumentNode<UnsubscribeTopicMutation, UnsubscribeTopicMutationVariables>;
export const FindUserSnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUserSN"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSN"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<FindUserSnQuery, FindUserSnQueryVariables>;
export const FindUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}}]} as unknown as DocumentNode<FindUserQuery, FindUserQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pass"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"auth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthUser"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sn"}}},{"kind":"Argument","name":{"kind":"Name","value":"pass"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pass"}}},{"kind":"Argument","name":{"kind":"Name","value":"auth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auth"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenMaster"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenMaster"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenMaster"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const FindUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUserID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sn"}}}]}]}}]} as unknown as DocumentNode<FindUserIdQuery, FindUserIdQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pass"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recaptcha"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sn"}}},{"kind":"Argument","name":{"kind":"Name","value":"pass"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pass"}}},{"kind":"Argument","name":{"kind":"Name","value":"recaptcha"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recaptcha"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenMaster"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sn"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tokenMaster"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenMaster"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tokenBase"}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;