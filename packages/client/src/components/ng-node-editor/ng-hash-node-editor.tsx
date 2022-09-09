import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@mui/material";
import * as React from "react";
import { ng } from "../../domains/entities";
import { Modal } from "../modal";

export interface NGHashNodeEditorProps {
  value: ng.NGNodeHash;
  onChange: (node: ng.NGNodeHash) => void;
  select: JSX.Element;
  rightIconButton?: React.ReactElement<any>;
  openDialog: boolean;
  changeOpenDialog: (v: boolean) => void;
}

export interface NGHashNodeEditorState {}

export class NGHashNodeEditor extends React.Component<
  NGHashNodeEditorProps,
  NGHashNodeEditorState
> {
  constructor(props: NGHashNodeEditorProps) {
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
            placeholder="HASH"
            value={this.props.value.hash}
            onChange={(evt) => {
              this.props.onChange({
                ...this.props.value,
                hash: evt.target.value,
              });
            }}
          />
        </Modal>
        <ListItem onClick={() => this.props.changeOpenDialog(true)}>
          <ListItemText>HASH:{this.props.value.hash}</ListItemText>
          <ListItemSecondaryAction>
            {this.props.rightIconButton}
          </ListItemSecondaryAction>
        </ListItem>
      </>
    );
  }
}
