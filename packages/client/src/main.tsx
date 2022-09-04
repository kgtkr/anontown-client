import { ApolloProvider } from "@apollo/react-common";
import "core-js";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal from "react-modal";
import { App } from "./components/app";
import { gqlClient } from "./effects";
import "./global.scss";
import { BrowserRouter } from "react-router-dom";

Modal.setAppElement("#root");

// Installing ServiceWorker
OfflinePluginRuntime.install();

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.querySelector("#root")
);
