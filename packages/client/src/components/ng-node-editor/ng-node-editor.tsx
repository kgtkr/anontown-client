import {
  Icon,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  List,
  ListItemText,
  Select,
} from "@mui/material";
import * as React from "react";
import { ng } from "../../domains/entities";
import { Modal } from "../modal";
import { NGHashNodeEditor } from "./ng-hash-node-editor";
import { NGNameNodeEditor } from "./ng-name-node-editor";
import { NGProfileNodeEditor } from "./ng-profile-node-editor";
import { NGTextNodeEditor } from "./ng-text-node-editor";
import { NGVoteNodeEditor } from "./ng-vote-node-editor";
import { RA, ReadonlyArrayExtra } from "../../prelude";

export interface NGNodesEditorState {}
export interface NGNodesEditorProps {
  values: ReadonlyArray<ng.NGNode>;
  onChange: (nodes: ReadonlyArray<ng.NGNode>) => void;
  select: React.ReactNode;
  primaryText: React.ReactNode;
  rightIconButton?: React.ReactElement<any>;
  openDialog: boolean;
  changeOpenDialog: (v: boolean) => void;
}
export class NGNodesEditor extends React.Component<
  NGNodesEditorProps,
  NGNodesEditorState
> {
  constructor(props: NGNodesEditorProps) {
    super(props);
    this.state = {};
  }

  handleDialogClose = () => {
    this.props.changeOpenDialog(false);
  };

  handleDialogOpen = () => {
    this.props.changeOpenDialog(true);
  };

  handleAddNode = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    this.props.onChange(RA.cons(ng.createDefaultNode(), this.props.values));
  };

  handleChangeNode = (x: ng.NGNode) => {
    this.props.onChange(ReadonlyArrayExtra.update(x)(this.props.values));
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.props.openDialog}
          onRequestClose={this.handleDialogClose}
        >
          {this.props.select}
        </Modal>
        <ListItem onClick={this.handleDialogOpen}>
          <List>
            <ListItemText>
              <a onClick={this.handleAddNode}>[+]</a>
              {this.props.primaryText}
            </ListItemText>
            {this.props.values.map((value) => (
              <NGNodeEditor
                key={value.id}
                value={value}
                onChange={this.handleChangeNode}
                rightIconButton={
                  <IconButton
                    onClick={() =>
                      this.props.onChange(
                        this.props.values.filter((x) => x.id !== value.id)
                      )
                    }
                  >
                    <Icon>close</Icon>
                  </IconButton>
                }
              />
            ))}
          </List>
          <ListItemSecondaryAction>
            {this.props.rightIconButton}
          </ListItemSecondaryAction>
        </ListItem>
      </>
    );
  }
}

export interface NGNodeEditorState {
  openDialog: boolean;
}

export interface NGNodeEditorProps {
  value: ng.NGNode;
  onChange: (node: ng.NGNode) => void;
  rightIconButton?: React.ReactElement<any>;
}

export class NGNodeEditor extends React.Component<
  NGNodeEditorProps,
  NGNodeEditorState
> {
  constructor(props: NGNodeEditorProps) {
    super(props);
    this.state = {
      openDialog: false,
    };
  }

  handleChangeOpenDialog = (v: boolean) => {
    this.setState({ openDialog: v });
  };

  render(): React.ReactNode {
    const select = (
      <Select
        label="タイプ"
        value={this.props.value.type}
        onChange={(evt) => {
          const type = evt.target.value as ng.NGNode["type"];
          switch (type) {
            case "profile":
              this.props.onChange({
                id: this.props.value.id,
                type: "profile",
                profile: "",
              });
              break;
            case "hash":
              this.props.onChange({
                id: this.props.value.id,
                type: "hash",
                hash: "",
              });
              break;
            case "text":
              this.props.onChange({
                id: this.props.value.id,
                type: "text",
                matcher: {
                  type: "text",
                  i: false,
                  source: "",
                },
              });
              break;
            case "name":
              this.props.onChange({
                id: this.props.value.id,
                type: "name",
                matcher: {
                  type: "text",
                  i: false,
                  source: "",
                },
              });
              break;
            case "vote":
              this.props.onChange({
                id: this.props.value.id,
                type: "vote",
                value: -5,
              });
              break;
          }
        }}
      >
        <MenuItem value={"profile"}>profile</MenuItem>
        <MenuItem value={"hash"}>hash</MenuItem>
        <MenuItem value={"text"}>text</MenuItem>
        <MenuItem value={"name"}>name</MenuItem>
        <MenuItem value={"vote"}>vote</MenuItem>
      </Select>
    );
    return this.props.value.type === "profile" ? (
      <NGProfileNodeEditor
        rightIconButton={this.props.rightIconButton}
        select={select}
        openDialog={this.state.openDialog}
        changeOpenDialog={this.handleChangeOpenDialog}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    ) : this.props.value.type === "hash" ? (
      <NGHashNodeEditor
        rightIconButton={this.props.rightIconButton}
        select={select}
        openDialog={this.state.openDialog}
        changeOpenDialog={this.handleChangeOpenDialog}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    ) : this.props.value.type === "text" ? (
      <NGTextNodeEditor
        rightIconButton={this.props.rightIconButton}
        openDialog={this.state.openDialog}
        changeOpenDialog={this.handleChangeOpenDialog}
        select={select}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    ) : this.props.value.type === "name" ? (
      <NGNameNodeEditor
        rightIconButton={this.props.rightIconButton}
        openDialog={this.state.openDialog}
        changeOpenDialog={this.handleChangeOpenDialog}
        select={select}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    ) : this.props.value.type === "vote" ? (
      <NGVoteNodeEditor
        rightIconButton={this.props.rightIconButton}
        select={select}
        openDialog={this.state.openDialog}
        changeOpenDialog={this.handleChangeOpenDialog}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    ) : null;
  }
}
