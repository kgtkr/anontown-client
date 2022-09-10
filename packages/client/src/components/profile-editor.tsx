import { Button, TextField, Paper } from "@mui/material";
import * as React from "react";
import * as G from "../generated/graphql";
import { UserData } from "../domains/entities";
import { Errors } from "./errors";
import { MdEditor } from "./md-editor";

interface ProfileEditorProps {
  profile: G.ProfileFragment;
  onUpdate?: (profile: G.ProfileFragment) => void;
  userData: UserData;
  style?: React.CSSProperties;
}

export const ProfileEditor = (props: ProfileEditorProps) => {
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [sn, setSn] = React.useState(props.profile.sn);
  const [name, setName] = React.useState(props.profile.name);
  const [text, setText] = React.useState(props.profile.text);
  const [submit] = G.useUpdateProfileMutation({
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
        <Errors errors={errors} />
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
            submit()
              .then((data) => {
                props.onUpdate?.(data.data!.updateProfile);
                setErrors([]);
              })
              .catch((e) => {
                setErrors([String(e)]);
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
