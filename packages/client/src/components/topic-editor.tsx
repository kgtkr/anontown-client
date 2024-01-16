import { Button, TextField } from "@mui/material";
import React from "react";
import * as GA from "../generated/graphql-apollo";
import { UserData } from "../domains/entities";
import { ErrorAlert } from "./error-alert";
import { MdEditor } from "./md-editor";
import { TagsInput } from "./tags-input";

interface TopicEditorProps {
  topic: GA.TopicNormalFragment;
  onUpdate?: (topic: GA.TopicNormalFragment) => void;
}

export function TopicEditor({ topic, onUpdate }: TopicEditorProps) {
  const [title, setTitle] = React.useState(topic.title);
  const [tags, setTags] = React.useState(topic.tags);
  const [text, setText] = React.useState(topic.text);

  const [submit, { error }] = GA.useUpdateTopicMutation({
    variables: {
      id: topic.id,
      title,
      text,
      tags,
    },
    onCompleted: (data) => {
      onUpdate?.(data.updateTopic);
    },
  });

  return (
    <form>
      <ErrorAlert error={error} />
      <TextField
        fullWidth={true}
        placeholder="タイトル"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
      />
      <TagsInput value={tags} onChange={(v) => setTags(v)} fullWidth={true} />
      <MdEditor fullWidth={true} value={text} onChange={(v) => setText(v)} />
      <Button onClick={() => submit()} variant="contained">
        OK
      </Button>
    </form>
  );
}
