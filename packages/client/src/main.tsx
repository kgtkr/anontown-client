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
import { HelmetProvider } from "react-helmet-async";
import CssBaseline from "@mui/material/CssBaseline";

Modal.setAppElement("#root");

const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </ApolloProvider>,
  document.querySelector("#root")
);
