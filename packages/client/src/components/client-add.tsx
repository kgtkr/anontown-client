import { MutationUpdaterFn } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import * as React from "react";
import * as G from "../generated/graphql";
import { UserData } from "../domains/entities";
import { Errors } from "./errors";

interface ClientAddProps {
  onAddUpdate?: MutationUpdaterFn<G.CreateClientMutation>;
  userData: UserData;
}

export const ClientAdd = (props: ClientAddProps) => {
  const [url, setUrl] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState<any>(null);

  const [submit] = G.useCreateClientMutation({
    variables: {
      name,
      url,
    },
    update: props.onAddUpdate,
  });

  return (
    <form>
      {error && <Errors errors={["作成に失敗"]} />}
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
      <Button
        onClick={() => submit().catch((e) => setError(e))}
        variant="contained"
      >
        OK
      </Button>
    </form>
  );
};
