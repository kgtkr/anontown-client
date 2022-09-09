import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { ng } from "../../domains/entities";
import { Modal } from "../modal";

export interface NGVoteNodeEditorProps {
  value: ng.NGNodeVote;
  onChange: (node: ng.NGNodeVote) => void;
  select: JSX.Element;
  rightIconButton?: React.ReactElement<any>;
  openDialog: boolean;
  changeOpenDialog: (v: boolean) => void;
}

export interface NGVoteNodeEditorState {}

export class NGVoteNodeEditor extends React.Component<
  NGVoteNodeEditorProps,
  NGVoteNodeEditorState
> {
  constructor(props: NGVoteNodeEditorProps) {
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
            placeholder="しきい値"
            type="number"
            value={this.props.value.value.toString()}
            onChange={(evt) => {
              const newV = +evt.target.value;
              if (this.props.value.type === "vote" && !isNaN(newV)) {
                this.props.onChange({
                  ...this.props.value,
                  value: newV,
                });
              }
            }}
          />
        </Modal>
        <ListItem onClick={() => this.props.changeOpenDialog(true)}>
          <ListItemText>Vote:{this.props.value.value}</ListItemText>
          <ListItemSecondaryAction>
            {this.props.rightIconButton}
          </ListItemSecondaryAction>
        </ListItem>
      </>
    );
  }
}
