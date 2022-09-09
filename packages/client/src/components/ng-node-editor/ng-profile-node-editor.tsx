import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { ng } from "../../domains/entities";
import { Modal } from "../modal";

export interface NGProfileNodeEditorProps {
  value: ng.NGNodeProfile;
  onChange: (node: ng.NGNodeProfile) => void;
  select: JSX.Element;
  rightIconButton?: React.ReactElement<any>;
  openDialog: boolean;
  changeOpenDialog: (v: boolean) => void;
}

export interface NGProfileNodeEditorState {}

export class NGProfileNodeEditor extends React.Component<
  NGProfileNodeEditorProps,
  NGProfileNodeEditorState
> {
  constructor(props: NGProfileNodeEditorProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Modal
          isOpen={this.props.openDialog}
          onRequestClose={() => this.props.changeOpenDialog(false)}
        >
          {this.props.select}
          <TextField
            placeholder="ID"
            value={this.props.value.profile}
            onChange={(evt) => {
              this.props.onChange({
                ...this.props.value,
                profile: evt.target.value,
              });
            }}
          />
        </Modal>
        <ListItem onClick={() => this.props.changeOpenDialog(true)}>
          <ListItemText>Profile:{this.props.value.profile}</ListItemText>
          <ListItemSecondaryAction>
            {this.props.rightIconButton}
          </ListItemSecondaryAction>
        </ListItem>
      </>
    );
  }
}
