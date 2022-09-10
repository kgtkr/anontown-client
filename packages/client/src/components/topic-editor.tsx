import { Button, TextField } from "@mui/material";
import * as React from "react";
import * as G from "../generated/graphql";
import { UserData } from "../domains/entities";
import { Errors } from "./errors";
import { MdEditor } from "./md-editor";
import { TagsInput } from "./tags-input";

interface TopicEditorProps {
  topic: G.TopicNormalFragment;
  onUpdate?: (topic: G.TopicNormalFragment) => void;
  userData: UserData;
}

interface TopicEditorState {
  title: string;
  tags: ReadonlyArray<string>;
  text: string;
}

export class TopicEditor extends React.Component<
  TopicEditorProps,
  TopicEditorState
> {
  constructor(props: TopicEditorProps) {
    super(props);
    this.state = {
      title: this.props.topic.title,
      tags: this.props.topic.tags,
      text: this.props.topic.text,
    };
  }

  render() {
    return (
      <G.UpdateTopicComponent
        variables={{
          id: this.props.topic.id,
          title: this.state.title,
          text: this.state.text,
          tags: this.state.tags,
        }}
        onCompleted={(data) => {
          this.props.onUpdate?.(data.updateTopic);
        }}
      >
        {(submit, { error }) => {
          return (
            <form>
              {error && <Errors errors={[String(error)]} />}
              <TextField
                fullWidth={true}
                placeholder="タイトル"
                value={this.state.title}
                onChange={(evt) => this.setState({ title: evt.target.value })}
              />
              <TagsInput
                value={this.state.tags}
                onChange={(v) => this.setState({ tags: v })}
                fullWidth={true}
              />
              <MdEditor
                fullWidth={true}
                value={this.state.text}
                onChange={(v) => this.setState({ text: v })}
              />
              <Button onClick={() => submit()} variant="contained">
                OK
              </Button>
            </form>
          );
        }}
      </G.UpdateTopicComponent>
    );
  }
}
