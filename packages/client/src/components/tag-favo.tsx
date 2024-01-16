import * as routes from "@anontown-frontend/routes";
import { Link } from "react-router-dom";
import { TextTitle } from "../styled/text";
import { TagsLink } from "./tags-link";
import { Paper } from "@mui/material";
import { usePrefixedStorageCollection } from "../domains/entities/storage/StorageCollectionHooks";
import { FavoriteTags } from "../domains/entities/storage/FavoriteTags";

interface TagFavoProps {}

export function TagFavo(_props: TagFavoProps) {
  const favoTags = usePrefixedStorageCollection(FavoriteTags);

  return favoTags.length !== 0 ? (
    <>
      {favoTags.map((tags) => {
        return (
          <Paper sx={{ p: 1 }} key={tags.tag}>
            <TextTitle>
              <TagsLink tags={[tags.tag]} />
            </TextTitle>
          </Paper>
        );
      })}
    </>
  ) : (
    <Paper sx={{ p: 1 }}>
      お気に入りタグがありません。
      <br />
      <Link to={routes.topicSearch.to({})}>検索</Link>
    </Paper>
  );
}
