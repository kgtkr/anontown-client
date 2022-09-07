import { combineReducers } from "redux";
import { RootAction } from "../actions";
import { initialAppState, RootState } from "../state";
import { composeReducers } from "./compose-reducers";

export const appReducer = composeReducers(initialAppState, []);

export function createRootReducer() {
  return combineReducers<RootState, RootAction>({
    app: appReducer,
  });
}
