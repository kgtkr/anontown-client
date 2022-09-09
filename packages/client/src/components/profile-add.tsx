import { Button, TextField } from "@mui/material";
import * as React from "react";
import * as G from "../generated/graphql";
import { UserData } from "../domains/entities";
import { Card } from "../styled/card";
import { Errors } from "./errors";
import { MdEditor } from "./md-editor";

interface ProfileAddProps {
  onAdd?: (profile: G.ProfileFragment) => void;
  userData: UserData;
  style?: React.CSSProperties;
}

export function ProfileAdd(props: ProfileAddProps) {
  const [sn, setSn] = React.useState("");
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");

  const [submit, { error }] = G.useCreateProfileMutation();

  return (
    <Card style={props.style}>
      <form>
        {error && <Errors errors={["エラーが発生しました"]} />}
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
          onClick={async () => {
            const result = await submit({
              variables: { name, text, sn },
            });
            if (result.data) {
              props.onAdd?.(result.data.createProfile);
            }
          }}
          variant="contained"
        >
          OK
        </Button>
      </form>
    </Card>
  );
}
