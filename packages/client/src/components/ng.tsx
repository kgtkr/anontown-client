import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import { ng, Storage, UserData, Sto } from "../domains/entities";
import { Modal } from "./modal";
import { NGEditor } from "./ng-editor";

interface NGProps {
  userData: UserData;
  onChangeStorage: (user: Storage) => void;
}

interface NGState {
  dialog: string | null;
}

export class NG extends React.Component<NGProps, NGState> {
  constructor(props: NGProps) {
    super(props);
    this.state = {
      dialog: null,
    };
  }

  render() {
    return (
      <div>
        <IconButton
          onClick={() =>
            this.props.onChangeStorage(
              Sto.addNG(ng.createDefaultNG())(this.props.userData.storage)
            )
          }
        >
          <Icon>add_circle</Icon>
        </IconButton>
        <List>
          {Sto.getNG(this.props.userData.storage).map((node) => (
            <ListItem
              onClick={() => this.setState({ dialog: node.id })}
              key={node.id}
            >
              <Modal
                isOpen={this.state.dialog === node.id}
                onRequestClose={() => this.setState({ dialog: null })}
              >
                <h1>{node.name}</h1>
                <NGEditor
                  ng={node}
                  onUpdate={(v) =>
                    this.props.onChangeStorage(
                      Sto.updateNG(v)(this.props.userData.storage)
                    )
                  }
                />
              </Modal>
              <ListItemText>{node.name}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() =>
                    this.props.onChangeStorage(
                      Sto.removeNG(node.id)(this.props.userData.storage)
                    )
                  }
                >
                  <Icon>close</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
