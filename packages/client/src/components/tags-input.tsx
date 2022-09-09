import { Chip, TextField } from "@material-ui/core";
import * as React from "react";
import * as G from "../generated/graphql";
import { Snack } from "./snack";
import { Autocomplete } from "@material-ui/lab";

export interface TagsInputProps {
  value: ReadonlyArray<string>;
  onChange?: (value: ReadonlyArray<string>) => void;
  fullWidth?: boolean;
}

interface TagsInputState {}

export class TagsInput extends React.Component<TagsInputProps, TagsInputState> {
  constructor(props: TagsInputProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <G.FindTopicTagsComponent>
          {({ loading, error, data }) => {
            if (loading) {
              return <span>Loading...</span>;
            }
            if (error || !data) {
              return <Snack msg="タグ候補取得に失敗しました" />;
            }

            return (
              <Autocomplete<string, true, undefined, true>
                fullWidth={this.props.fullWidth}
                placeholder="タグ"
                freeSolo
                multiple
                options={data.topicTags.map((t) => t.name)}
                renderInput={(params) => (
                  <TextField {...params} placeholder="tag" />
                )}
                renderTags={(value: string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={option}
                    />
                  ))
                }
                value={[...this.props.value]}
                onChange={(_e, v) => {
                  this.props.onChange?.(v);
                }}
              />
            );
          }}
        </G.FindTopicTagsComponent>
      </>
    );
  }
}
