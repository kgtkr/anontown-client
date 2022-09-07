import { ApolloProvider } from "@apollo/client";
import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { App } from "./components/app";
import { configureStore, history } from "./domains";
import { gqlClient } from "./effects";
import "./main.scss";

Modal.setAppElement("#root");

const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.querySelector("#root")
);
