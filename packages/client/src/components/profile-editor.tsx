import { Button, TextField } from "@material-ui/core";
import * as React from "react";
import * as G from "../generated/graphql";
import { UserData } from "../domains/entities";
import { Card } from "../styled/card";
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
    <Card style={props.style}>
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
              .catch((_e) => {
                setErrors(["エラーが発生しました"]);
              })
          }
          variant="contained"
        >
          OK
        </Button>
      </form>
    </Card>
  );
};
