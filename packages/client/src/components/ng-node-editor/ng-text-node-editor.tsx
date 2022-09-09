import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import * as React from "react";
import { ng } from "../../domains/entities";
import { Modal } from "../modal";
import { NGMatcherEditor } from "./ng-matcher-editor";

export interface NGTextNodeEditorProps {
  value: ng.NGNodeText;
  onChange: (node: ng.NGNodeText) => void;
  select: JSX.Element;
  rightIconButton?: React.ReactElement<any>;
  openDialog: boolean;
  changeOpenDialog: (v: boolean) => void;
}

export interface NGTextNodeEditorState {}

export class NGTextNodeEditor extends React.Component<
  NGTextNodeEditorProps,
  NGTextNodeEditorState
> {
  constructor(props: NGTextNodeEditorProps) {
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
            placeholder="本文"
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
          <ListItemText>Text:{this.props.value.matcher.source}</ListItemText>
          <ListItemSecondaryAction>
            {this.props.rightIconButton}
          </ListItemSecondaryAction>
        </ListItem>
      </>
    );
  }
}
