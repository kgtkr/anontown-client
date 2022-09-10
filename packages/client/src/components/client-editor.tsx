import { Button, TextField } from "@mui/material";
import * as React from "react";
import * as G from "../generated/graphql";
import { UserData } from "../domains/entities";
import { ErrorAlert } from "./error-alert";

interface ClientEditorProps {
  client: G.ClientFragment;
  onUpdate?: (client: G.ClientFragment) => void;
  userData: UserData;
}

export function ClientEditor(props: ClientEditorProps) {
  const [url, setUrl] = React.useState(props.client.url);
  const [name, setName] = React.useState(props.client.name);
  const [submit, data] = G.useUpdateClientMutation();

  return (
    <form>
      <ErrorAlert error={data.error} />
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
        onClick={async () => {
          const result = await submit({
            variables: {
              id: props.client.id,
              name,
              url,
            },
          });
          if (result.data) {
            props.onUpdate?.(result.data.updateClient);
          }
        }}
        variant="contained"
      >
        OK
      </Button>
    </form>
  );
}
