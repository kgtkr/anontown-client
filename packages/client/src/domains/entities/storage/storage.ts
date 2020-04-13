import * as Im from "immutable";
import * as N from "../ng";
import { StorageJSONLatest } from "./storage-json";
export * from "./storage-json";
import { Newtype, iso } from "newtype-ts";
import { list } from "../../../utils";
import { Option } from "fp-ts/lib/Option";
import { pipe, O, RA } from "../../../prelude";
import { Lens } from "monocle-ts";

interface TopicWriteA {
  name: string;
  profile: string | null;
  text: string;
  replyText: Im.Map<string, string>;
  age: boolean;
}

export interface TopicWrite
  extends Newtype<{ readonly TopicWrite: unique symbol }, TopicWriteA> {}

const isoTopicWrite = iso<TopicWrite>();

const initTopicWrite = isoTopicWrite.wrap({
  name: "",
  profile: null,
  text: "",
  replyText: Im.Map<string, string>(),
  age: true,
});

export function getTopicWriteTextLens(
  reply: string | null,
): Lens<TopicWrite, string> {
  return isoTopicWrite.asLens().compose<string>(
    new Lens(
      ({ text, replyText }) => {
        if (reply === null) {
          return text;
        } else {
          return replyText.get(reply, "");
        }
      },
      text => topicWrite => {
        if (reply === null) {
          return {
            ...topicWrite,
            text,
          };
        } else {
          return {
            ...topicWrite,
            replyText: topicWrite.replyText.set(reply, text),
          };
        }
      },
    ),
  );
}

export const topicWriteNameLens: Lens<
  TopicWrite,
  string
> = isoTopicWrite.asLens().compose<string>(
  new Lens(
    ({ name }) => name,
    name => topicWrite => ({ ...topicWrite, name }),
  ),
);

export const topicWriteProfileLens: Lens<
  TopicWrite,
  string | null
> = isoTopicWrite.asLens().compose<string | null>(
  new Lens(
    ({ profile }) => profile,
    profile => topicWrite => ({ ...topicWrite, profile }),
  ),
);

export const topicWriteAgeLens: Lens<
  TopicWrite,
  boolean
> = isoTopicWrite.asLens().compose<boolean>(
  new Lens(
    ({ age }) => age,
    age => topicWrite => ({ ...topicWrite, age }),
  ),
);

interface TopicReadA {
  date: string;
  count: number;
}

export interface TopicRead
  extends Newtype<{ readonly TopicRead: unique symbol }, TopicReadA> {}

const isoTopicRead = iso<TopicRead>();

export const topicReadDateLens: Lens<
  TopicRead,
  string
> = isoTopicRead.asLens().compose<string>(
  new Lens(
    ({ date }) => date,
    date => topicRead => ({ ...topicRead, date }),
  ),
);

export const topicReadCountLens: Lens<
  TopicRead,
  number
> = isoTopicRead.asLens().compose<number>(
  new Lens(
    ({ count }) => count,
    count => topicRead => ({ ...topicRead, count }),
  ),
);

interface StorageA {
  readonly topicFavo: Im.Set<string>;
  readonly tagsFavo: Im.Set<Im.Set<string>>;
  readonly topicRead: Im.Map<string, TopicReadA>;
  readonly topicWrite: Im.Map<string, TopicWriteA>;
  readonly ng: ReadonlyArray<N.NG>;
}

export interface Storage
  extends Newtype<{ readonly Storage: unique symbol }, StorageA> {}

const isoStorage = iso<Storage>();

export function getTagsFavo(
  storage: Storage,
): ReadonlyArray<ReadonlyArray<string>> {
  const { tagsFavo } = isoStorage.unwrap(storage);
  return tagsFavo.toArray().map(x => x.toArray());
}

export function getTopicFavo(storage: Storage): ReadonlyArray<string> {
  const { topicFavo } = isoStorage.unwrap(storage);
  return topicFavo.toArray();
}

export function addNG(ng: N.NG) {
  return isoStorage.modify(storage => ({
    ...storage,
    ng: RA.cons(ng, storage.ng),
  }));
}

export function getNG(storage: Storage): ReadonlyArray<N.NG> {
  const { ng } = isoStorage.unwrap(storage);
  return ng;
}

export function removeNG(id: string) {
  return isoStorage.modify(storage => ({
    ...storage,
    ng: storage.ng.filter(x => x.id !== id),
  }));
}

export function updateNG(ng: N.NG) {
  return isoStorage.modify(storage => ({
    ...storage,
    ng: list.update(storage.ng, ng),
  }));
}

export function getTopicRead(id: string) {
  return (storage: Storage): Option<TopicRead> => {
    return pipe(
      isoStorage.unwrap(storage).topicRead.get(id),
      O.fromNullable,
      O.map(isoTopicRead.wrap),
    );
  };
}

export function setTopicRead(id: string, value: TopicRead) {
  return isoStorage.modify(storage => ({
    ...storage,
    topicRead: storage.topicRead.set(id, isoTopicRead.unwrap(value)),
  }));
}

export function makeTopicRead(data: {
  date: string;
  count: number;
}): TopicRead {
  return isoTopicRead.wrap(data);
}

export function modifyTopicRead(
  id: string,
  f: (value: Option<TopicRead>) => TopicRead,
) {
  return (storage: Storage): Storage => {
    return setTopicRead(id, f(getTopicRead(id)(storage)))(storage);
  };
}

export function getTopicWrite(id: string) {
  return (storage: Storage): TopicWrite => {
    return pipe(
      isoStorage.unwrap(storage).topicWrite.get(id),
      O.fromNullable,
      O.map(isoTopicWrite.wrap),
      O.getOrElse(() => initTopicWrite),
    );
  };
}

export function setTopicWrite(id: string, value: TopicWrite) {
  return isoStorage.modify(storage => ({
    ...storage,
    topicWrite: storage.topicWrite.set(id, isoTopicWrite.unwrap(value)),
  }));
}

export function modifyTopicWrite(
  id: string,
  f: (value: TopicWrite) => TopicWrite,
) {
  return (storage: Storage): Storage => {
    return setTopicWrite(id, f(getTopicWrite(id)(storage)))(storage);
  };
}

export function isTopicFavo(id: string) {
  return (storage: Storage): boolean => {
    return isoStorage.unwrap(storage).topicFavo.has(id);
  };
}

export function favoTopic(id: string) {
  return isoStorage.modify(storage => ({
    ...storage,
    topicFavo: storage.topicFavo.add(id),
  }));
}

export function unfavoTopic(id: string) {
  return isoStorage.modify(storage => ({
    ...storage,
    topicFavo: storage.topicFavo.delete(id),
  }));
}

export function isTagsFavo(tags: ReadonlyArray<string>) {
  return (storage: Storage): boolean => {
    return isoStorage.unwrap(storage).tagsFavo.has(Im.Set(tags));
  };
}

export function favoTags(tags: ReadonlyArray<string>) {
  return isoStorage.modify(storage => ({
    ...storage,
    tagsFavo: storage.tagsFavo.add(Im.Set(tags)),
  }));
}

export function unfavoTags(tags: ReadonlyArray<string>) {
  return isoStorage.modify(storage => ({
    ...storage,
    tagsFavo: storage.tagsFavo.delete(Im.Set(tags)),
  }));
}

export function toStorage(json: StorageJSONLatest): Storage {
  return isoStorage.wrap({
    topicFavo: Im.Set(json.topicFavo),
    tagsFavo: Im.Set(json.tagsFavo.map(tags => Im.Set(tags))),
    topicRead: Im.Map(json.topicRead),
    topicWrite: Im.Map(json.topicWrite).map(x => ({
      ...x,
      replyText: Im.Map(x.replyText),
    })),
    ng: json.ng.map(x => N.fromJSON(x)),
  });
}

export function toJSON(storage: Storage): StorageJSONLatest {
  const { topicFavo, tagsFavo, topicRead, topicWrite, ng } = isoStorage.unwrap(
    storage,
  );
  return {
    ver: "9",
    topicFavo: topicFavo.toArray(),
    tagsFavo: tagsFavo.map(tags => tags.toArray()).toArray(),
    topicRead: topicRead.toObject(),
    topicWrite: topicWrite
      .map(x => ({ ...x, replyText: x.replyText.toObject() }))
      .toObject(),
    ng: ng.map(x => N.toJSON(x)),
  };
}
