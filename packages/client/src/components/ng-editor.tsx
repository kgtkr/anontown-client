import { List, TextField } from "@mui/material";
import { ng } from "../domains/entities";
import { NGNodeEditor } from "./ng-node-editor";

export interface NGEditorProps {
  ng: ng.NG;
  onUpdate: (ng: ng.NG) => void;
}
// TODO:expirationDate
export function NGEditor(props: NGEditorProps) {
  return (
    <div>
      <TextField
        placeholder="名前"
        value={props.ng.name}
        onChange={(evt) =>
          props.onUpdate({ ...props.ng, name: evt.target.value })
        }
      />
      <TextField
        placeholder="トピック"
        value={props.ng.topic || ""}
        onChange={(evt) =>
          props.onUpdate({ ...props.ng, topic: evt.target.value || null })
        }
      />
      <List>
        <NGNodeEditor
          value={props.ng.node}
          onChange={(v) => props.onUpdate({ ...props.ng, node: v })}
        />
      </List>
    </div>
  );
}
