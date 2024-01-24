import { Chip, TextField, Autocomplete, Icon } from "@mui/material";
import * as React from "react";
import * as GA from "../generated/graphql-apollo";
import {
  useDeleteStorage,
  useSetStorage,
  usePrefixedStorageCollection,
} from "../domains/entities/storage/StorageCollectionHooks";
import { FavoriteTags } from "../domains/entities/storage/FavoriteTags";
import { useUserContext } from "../hooks";

export interface TagsInputProps {
  value: ReadonlyArray<string>;
  onChange?: (value: ReadonlyArray<string>) => void;
  fullWidth?: boolean;
}

export function TagsInput({ value, onChange, fullWidth }: TagsInputProps) {
  // TODO: Suspenseが起きる範囲を狭くする
  const favoTags = usePrefixedStorageCollection(FavoriteTags);
  const tagsSet = React.useMemo(() => {
    return new Set<string>([...favoTags.map((t) => t.tag)]);
  }, [favoTags]);
  const [deleteTag] = useDeleteStorage(FavoriteTags);
  const [setTag] = useSetStorage(FavoriteTags);
  const { data, loading } = GA.useFindTopicTagsQuery();
  const userContext = useUserContext();

  // TODO: `useFindTopicTagsQuery` error handling

  return (
    <Autocomplete<string, true, undefined, true>
      fullWidth={fullWidth}
      placeholder="タグ"
      freeSolo
      multiple
      options={data?.topicTags.map((t) => t.name) ?? []}
      renderInput={(params) => <TextField {...params} placeholder="tag" />}
      loading={loading}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            key={option}
            icon={
              userContext.value !== null ? (
                tagsSet.has(option) ? (
                  <Icon>star</Icon>
                ) : (
                  <Icon>star_border</Icon>
                )
              ) : undefined
            }
            onClick={() => {
              if (userContext.value === null) {
                return;
              }
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
}
