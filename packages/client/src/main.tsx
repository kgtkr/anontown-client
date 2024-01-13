import { ApolloProvider } from "@apollo/client";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/app";
import { gqlClient } from "./effects";
import "./main.scss";
import { HelmetProvider } from "react-helmet-async";
import CssBaseline from "@mui/material/CssBaseline";
import { createRoot } from "react-dom/client";

Modal.setAppElement("#root");

createRoot(document.querySelector("#root")!).render(
  <ApolloProvider client={gqlClient}>
    <HelmetProvider>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </ApolloProvider>
);
