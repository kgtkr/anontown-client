import { Icon, IconButton } from "@mui/material";
import { useToggle } from "react-use";
import * as GA from "../generated/graphql-apollo";
import { UserData } from "../domains/entities";
import { ClientEditor } from "./client-editor";

interface ClientProps {
  client: GA.ClientFragment;
  onUpdate?: (client: GA.ClientFragment) => void;
  userData: UserData | null;
}

export function Client(props: ClientProps) {
  const [edit, toggleEdit] = useToggle(false);

  return (
    <div>
      <h2>{props.client.name}</h2>
      <span>{props.client.id}</span>
      <span>{props.client.url}</span>
      {props.client.self ? (
        <div>
          <IconButton type="button" onClick={() => toggleEdit()}>
            <Icon>edit</Icon>
          </IconButton>
          {edit && props.userData !== null ? (
            <ClientEditor
              client={props.client}
              onUpdate={props.onUpdate}
              userData={props.userData}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
