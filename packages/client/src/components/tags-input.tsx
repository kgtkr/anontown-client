import { Chip, TextField, Autocomplete, Icon } from "@mui/material";
import * as React from "react";
import * as GA from "../generated/graphql-apollo";
import { Snack } from "./snack";
import {
  useDeleteStorage,
  useSetStorage,
  useStorageCollection,
} from "../domains/entities/storage/StorageCollectionHooks";
import { FavoriteTags } from "../domains/entities/storage/FavoriteTags";

export interface TagsInputProps {
  value: ReadonlyArray<string>;
  onChange?: (value: ReadonlyArray<string>) => void;
  fullWidth?: boolean;
}

export function TagsInput({ value, onChange, fullWidth }: TagsInputProps) {
  const favoTags = useStorageCollection(FavoriteTags);
  const tagsSet = React.useMemo(() => {
    return new Set<string>([...favoTags.map((t) => t.tag)]);
  }, [favoTags]);
  const [deleteTag] = useDeleteStorage(FavoriteTags);
  const [setTag] = useSetStorage(FavoriteTags);

  return (
    <GA.FindTopicTagsComponent>
      {({ loading, error, data }) => {
        if (loading) {
          return <span>Loading...</span>;
        }
        if (error || !data) {
          return <Snack msg="タグ候補取得に失敗しました" />;
        }

        return (
          <Autocomplete<string, true, undefined, true>
            fullWidth={fullWidth}
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
                  icon={
                    tagsSet.has(option) ? (
                      <Icon>star</Icon>
                    ) : (
                      <Icon>star_border</Icon>
                    )
                  }
                  onClick={() => {
                    if (tagsSet.has(option)) {
                      deleteTag({ tag: option });
                    } else {
                      setTag({ tag: option, createdAt: Date.now() });
                    }
                  }}
                />
              ))
            }
            value={[...value]}
            onChange={(_e, v) => {
              onChange?.(v);
            }}
          />
        );
      }}
    </GA.FindTopicTagsComponent>
  );
}
