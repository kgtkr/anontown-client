import * as GA from "../../generated/graphql-apollo";

export interface State {
  topicId: string;
  existUnread: boolean;
  isJumpDialog: boolean;
  isAutoScrollDialog: boolean;
  isNGDialog: boolean;
  autoScrollSpeed: number;
  isAutoScroll: boolean;
  jumpResId: string | null;
  // 以下の値が全てnullでなくなれば準備完了
  topic: (GA.TopicFragment & { subscribe?: boolean | null }) | null;
  now: Date | null;
  reses: ReadonlyArray<GA.ResFragment> | null;
  jumpValue: number | null;
  fetchingOld: boolean;
  fetchingNew: boolean;
}

export function State({ topicId }: { topicId: string }): State {
  return {
    topicId,
    now: null,
    existUnread: false,
    isJumpDialog: false,
    isAutoScrollDialog: false,
    isNGDialog: false,
    topic: null,
    reses: null,
    autoScrollSpeed: 15,
    isAutoScroll: false,
    jumpValue: null,
    jumpResId: null,
    fetchingOld: false,
    fetchingNew: false,
  };
}
