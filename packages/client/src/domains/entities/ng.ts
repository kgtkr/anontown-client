import { isNullish } from "../../utils/isNullish";
import * as uuid from "uuid";
import * as GA from "../../generated/graphql-apollo";
import * as ngJson from "./storage/classic-storage-json/ng-json";

export function createDefaultNode(): NGNode {
  return {
    id: uuid.v4(),
    type: "text",
    matcher: { type: "text", source: "", i: false },
  };
}

export function createDefaultNG(): NG {
  return {
    id: uuid.v4(),
    name: "新規設定",
    topic: null,
    date: new Date(),
    expirationDate: null,
    node: createDefaultNode(),
  };
}

// TODO:chain
export function isNG(ng: NG, res: GA.ResFragment) {
  if (ng.topic !== null && ng.topic !== res.topic.id) {
    return false;
  }

  if (
    ng.expirationDate !== null &&
    ng.expirationDate.valueOf() < new Date(res.date).valueOf()
  ) {
    return false;
  }

  return !!isNodeNG(ng.node, res);
}

function isNodeNG(node: NGNode, res: GA.ResFragment): boolean | null {
  switch (node.type) {
    case "profile": {
      return (
        res.__typename === "ResNormal" &&
        !isNullish(res.profile) &&
        node.profile === res.profile.id
      );
    }
    case "hash": {
      return res.hash === node.hash;
    }
    case "text": {
      return (
        res.__typename === "ResNormal" &&
        textMatcherTest(node.matcher, res.text)
      );
    }
    case "name": {
      return (
        res.__typename === "ResNormal" &&
        !isNullish(res.name) &&
        textMatcherTest(node.matcher, res.name)
      );
    }
    case "vote": {
      return res.uv - res.dv < node.value;
    }
  }
}

function textMatcherTest(
  matcher: NGNodeTextMatcher,
  text: string
): boolean | null {
  if (matcher.source.length === 0) {
    return null;
  }
  switch (matcher.type) {
    case "reg":
      try {
        return new RegExp(matcher.source, [matcher.i ? "i" : ""].join("")).test(
          text
        );
      } catch {
        return null;
      }
    case "text":
      if (matcher.i) {
        return text.toLowerCase().includes(matcher.source.toLowerCase());
      } else {
        return text.includes(matcher.source);
      }
  }
}

export function toJSON(ng: NG): ngJson.NGJson {
  return {
    name: ng.name,
    topic: ng.topic,
    node: toJSONNode(ng.node),
    expirationDate:
      ng.expirationDate !== null ? ng.expirationDate.toISOString() : null,
    date: ng.date.toISOString(),
    chain: 1,
    transparent: false,
  };
}

function toJSONMatcher(
  matcher: NGNodeTextMatcher
): ngJson.NGNodeTextMatcherJson {
  switch (matcher.type) {
    case "reg":
      return matcher;
    case "text":
      return matcher;
  }
}

function toJSONNode(node: NGNode): ngJson.NGNodeJson {
  switch (node.type) {
    case "profile":
      return node;
    case "hash":
      return node;
    case "text":
      return { type: "text", matcher: toJSONMatcher(node.matcher) };
    case "name":
      return { type: "name", matcher: toJSONMatcher(node.matcher) };
    case "vote":
      return node;
  }
}

export function fromJSON(json: ngJson.NGJson): NG | null {
  const node = fromJSONNode(json.node);
  if (node === null) {
    return null;
  }
  return {
    id: uuid.v4(),
    ...json,
    node,
    expirationDate:
      json.expirationDate !== null ? new Date(json.expirationDate) : null,
    date: new Date(json.date),
  };
}

function fromJSONTextMatcher(
  matcher: ngJson.NGNodeTextMatcherJson
): NGNodeTextMatcher {
  switch (matcher.type) {
    case "reg":
      return matcher;
    case "text":
      return matcher;
  }
}

function fromJSONNode(node: ngJson.NGNodeJson): NGNode | null {
  switch (node.type) {
    case "profile":
      return { id: uuid.v4(), ...node };
    case "hash":
      return { id: uuid.v4(), ...node };
    case "text":
      return {
        id: uuid.v4(),
        type: "text",
        matcher: fromJSONTextMatcher(node.matcher),
      };
    case "name":
      return {
        id: uuid.v4(),
        type: "name",
        matcher: fromJSONTextMatcher(node.matcher),
      };
    case "vote":
      return { id: uuid.v4(), ...node };
    default:
      return null;
  }
}

export interface NG {
  readonly id: string;
  readonly name: string;
  readonly topic: string | null;
  readonly date: Date;
  readonly expirationDate: Date | null;
  readonly node: NGNode;
}

export type NGNode =
  | NGNodeProfile
  | NGNodeHash
  | NGNodeText
  | NGNodeName
  | NGNodeVote;

export interface NGNodeProfile {
  readonly id: string;
  readonly type: "profile";
  readonly profile: string;
}

export interface NGNodeHash {
  readonly id: string;
  readonly type: "hash";
  readonly hash: string;
}

export type NGNodeTextMatcher = NGNodeTextMatcherReg | NGNodeTextMatcherText;
export interface NGNodeTextMatcherReg {
  readonly type: "reg";
  readonly source: string;
  readonly i: boolean;
}

export interface NGNodeTextMatcherText {
  readonly type: "text";
  readonly source: string;
  readonly i: boolean;
}

export interface NGNodeText {
  readonly id: string;
  readonly type: "text";
  readonly matcher: NGNodeTextMatcher;
}

export interface NGNodeName {
  readonly id: string;
  readonly type: "name";
  readonly matcher: NGNodeTextMatcher;
}

export interface NGNodeVote {
  readonly id: string;
  readonly type: "vote";
  readonly value: number;
}
