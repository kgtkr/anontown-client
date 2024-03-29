import { Button, TextField, Paper } from "@mui/material";
import * as React from "react";
import * as GA from "../generated/graphql-apollo";
import { UserData } from "../domains/entities";
import { ErrorAlert } from "./error-alert";
import { MdEditor } from "./md-editor";

interface ProfileEditorProps {
  profile: GA.ProfileFragment;
  onUpdate?: (profile: GA.ProfileFragment) => void;
  userData: UserData;
  style?: React.CSSProperties;
}

export const ProfileEditor = (props: ProfileEditorProps) => {
  const [sn, setSn] = React.useState(props.profile.sn);
  const [name, setName] = React.useState(props.profile.name);
  const [text, setText] = React.useState(props.profile.text);
  const [submit, { error }] = GA.useUpdateProfileMutation({
    variables: {
      id: props.profile.id,
      name,
      text,
      sn,
    },
  });

  return (
    <Paper sx={{ p: 1 }} style={props.style}>
      <form>
        <ErrorAlert error={error} />
        <TextField
          fullWidth={true}
          placeholder="ID"
          value={sn}
          onChange={(evt) => setSn(evt.target.value)}
        />
        <TextField
          fullWidth={true}
          placeholder="名前"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
        <MdEditor fullWidth={true} value={text} onChange={(v) => setText(v)} />
        <Button
          onClick={() =>
            submit().then((data) => {
              props.onUpdate?.(data.data!.updateProfile);
            })
          }
          variant="contained"
        >
          OK
        </Button>
      </form>
    </Paper>
  );
};
