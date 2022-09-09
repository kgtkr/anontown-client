import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import * as React from "react";
import { ng } from "../../domains/entities";
import { Modal } from "../modal";
import { NGMatcherEditor } from "./ng-matcher-editor";

export interface NGNameNodeEditorProps {
  value: ng.NGNodeName;
  onChange: (node: ng.NGNodeName) => void;
  select: JSX.Element;
  rightIconButton?: React.ReactElement<any>;
  openDialog: boolean;
  changeOpenDialog: (v: boolean) => void;
}

export interface NGNameNodeEditorState {}

export class NGNameNodeEditor extends React.Component<
  NGNameNodeEditorProps,
  NGNameNodeEditorState
> {
  constructor(props: NGNameNodeEditorProps) {
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
          <NGMatcherEditor
            placeholder="名前"
            matcher={this.props.value.matcher}
            onChange={(v) => {
              this.props.onChange({
                ...this.props.value,
                matcher: v,
              });
            }}
          />
        </Modal>
        <ListItem onClick={() => this.props.changeOpenDialog(true)}>
          <ListItemText>NAME:{this.props.value.matcher.source}</ListItemText>
          <ListItemSecondaryAction>
            {this.props.rightIconButton}
          </ListItemSecondaryAction>
        </ListItem>
      </>
    );
  }
}
