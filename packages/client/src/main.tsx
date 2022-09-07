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
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

Modal.setAppElement("#root");

const theme = createTheme({});
const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </ApolloProvider>,
  document.querySelector("#root")
);
