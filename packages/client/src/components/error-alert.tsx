import { ApolloError } from "@apollo/client";
import { Alert } from "@mui/material";
import * as React from "react";

export interface ErrorAlertProps {
  error?: string | ApolloError | null;
}

function jsonToMsgs(json: unknown, msgs: string[]) {
  if (typeof json === "object" && json !== null) {
    if (Array.isArray(json)) {
      for (const v of json) {
        jsonToMsgs(v, msgs);
      }
    } else {
      for (const [key, value] of Object.entries(json)) {
        if (key === "message" && typeof value === "string") {
          msgs.push(value);
        } else {
          jsonToMsgs(value, msgs);
        }
      }
    }
  }
}

function apolloErrorToMsgs(error: ApolloError) {
  const msgs: string[] = [];
  for (const e of error.graphQLErrors) {
    jsonToMsgs(e.extensions, msgs);
  }
  return msgs;
}

export const ErrorAlert = ({ error }: ErrorAlertProps) => {
  return (
    <div>
      {typeof error === "string" ? (
        <Alert severity="error">{error}</Alert>
      ) : error instanceof ApolloError ? (
        <Alert severity="error">
          {error.message}
          {apolloErrorToMsgs(error).map((msg, i) => (
            <Alert severity="error" key={i}>
              {msg}
            </Alert>
          ))}
        </Alert>
      ) : null}
    </div>
  );
};
