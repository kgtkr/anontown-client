export * from "./actions";
export * from "./epics";
export * from "./reducers";
export * from "./state";

import { applyMiddleware, createStore, Middleware, Store } from "redux";
import { RootAction } from "./actions";
import { epics } from "./epics";
import { createRootReducer } from "./reducers";
import { RootState } from "./state";

import { createEpicMiddleware } from "redux-observable";

export function configureStore(): Store<RootState, RootAction> & {
  dispatch: unknown;
} {
  const middlewares: Array<Middleware> = [];
  const epicMiddleware = createEpicMiddleware<
    RootAction,
    RootAction,
    RootState,
    unknown
  >();

  middlewares.push(epicMiddleware);

  const store = createStore<RootState, RootAction, unknown, unknown>(
    createRootReducer(),
    applyMiddleware(...middlewares)
  );

  epicMiddleware.run(epics);
  return store;
}
