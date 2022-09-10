import { MutationUpdaterFn } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import * as React from "react";
import * as G from "../generated/graphql";
import { UserData } from "../domains/entities";
import { ErrorAlert } from "./error-alert";

interface ClientAddProps {
  onAddUpdate?: MutationUpdaterFn<G.CreateClientMutation>;
  userData: UserData;
}

export const ClientAdd = (props: ClientAddProps) => {
  const [url, setUrl] = React.useState("");
  const [name, setName] = React.useState("");

  const [submit, { error }] = G.useCreateClientMutation({
    variables: {
      name,
      url,
    },
    update: props.onAddUpdate,
  });

  return (
    <form>
      <ErrorAlert error={error} />
      <TextField
        placeholder="名前"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
      <TextField
        placeholder="url"
        value={url}
        onChange={(evt) => setUrl(evt.target.value)}
      />
      <Button onClick={() => submit()} variant="contained">
        OK
      </Button>
    </form>
  );
};
