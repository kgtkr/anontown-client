import { ApolloProvider } from "@apollo/client";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/app";
import { configureStore } from "./domains";
import { gqlClient } from "./effects";
import "./main.scss";

Modal.setAppElement("#root");

const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.querySelector("#root")
);
