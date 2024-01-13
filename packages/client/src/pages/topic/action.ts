import * as GA from "../../generated/graphql-apollo";
import { Sto, UserData } from "../../domains/entities";

export type Action =
  | { type: "INIT"; topicId: string; now: Date }
  | { type: "FETCH_TOPIC_REQUEST" }
  | {
      type: "FETCH_TOPIC_SUCCESS";
      topic: GA.TopicFragment & { subscribe?: boolean | null };
    }
  | { type: "FETCH_TOPIC_FAILURE" }
  | { type: "FETCH_INIT_RES_REQUEST" }
  | {
      type: "FETCH_INIT_RES_SUCCESS";
      afterReses: ReadonlyArray<GA.ResFragment>;
      beforeReses: ReadonlyArray<GA.ResFragment>;
    }
  | { type: "FETCH_INIT_RES_FAILURE" }
  | { type: "SCROLL_TO_FIRST" }
  | { type: "FETCH_NEW_RES_REQUEST" }
  | { type: "FETCH_NEW_RES_SUCCESS"; reses: ReadonlyArray<GA.ResFragment> }
  | { type: "FETCH_NEW_RES_FAILURE" }
  | { type: "SCROLL_TO_LAST" }
  | { type: "FETCH_OLD_RES_REQUEST" }
  | { type: "FETCH_OLD_RES_SUCCESS"; reses: ReadonlyArray<GA.ResFragment> }
  | { type: "FETCH_OLD_RES_FAILURE" }
  | { type: "CLICK_OPEN_AUTO_SCROLL_MODAL" }
  | { type: "CLICK_CLOSE_AUTO_SCROLL_MODAL" }
  | { type: "CHANGE_ENABLE_AUTO_SCROLL"; value: boolean }
  | { type: "CHANGE_AUTO_SCROLL_SPEED"; value: number }
  | { type: "CLICK_OPEN_NG_MODAL" }
  | { type: "CLICK_CLOSE_NG_MODAL" }
  | { type: "UPDATE_NG"; storage: Sto.Storage }
  | { type: "CLICK_OPEN_JUMP_MODAL" }
  | { type: "CLICK_CLOSE_JUMP_MODAL" }
  | { type: "CHANGE_JUMP_VALUE"; value: number }
  | { type: "CLICK_JUMP" }
  | { type: "TOGGLE_FAVO" }
  | { type: "CHANGE_CURRENT_RES"; res: GA.ResFragment | null }
  | { type: "SUBMIT_RES"; storage: Sto.Storage }
  | { type: "UPDATE_USER_DATA"; userData: UserData | null }
  | { type: "RECEIVE_NEW_RES"; res: GA.ResFragment; count: number }
  | { type: "UPDATE_RES"; res: GA.ResFragment }
  | { type: "RESET_JUMP_RES" }
  | { type: "CHANGE_TOPIC_SUBSCRIBE"; value: boolean };
