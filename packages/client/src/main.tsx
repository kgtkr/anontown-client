import { ApolloProvider } from "@apollo/client";
import * as ReactDOM from "react-dom";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/app";
import { gqlClient } from "./effects";
import "./main.scss";
import { HelmetProvider } from "react-helmet-async";
import CssBaseline from "@mui/material/CssBaseline";

Modal.setAppElement("#root");

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <HelmetProvider>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </ApolloProvider>,
  document.querySelector("#root")
);
