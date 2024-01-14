import * as routes from "@anontown-frontend/routes";
import * as React from "react";
import { Link } from "react-router-dom";
import { UserData, Sto } from "../domains/entities";
import { TextTitle } from "../styled/text";
import { TagsLink } from "./tags-link";
import { RA, OrdT } from "../prelude";
import { Paper } from "@mui/material";

interface TagFavoProps {
  userData: UserData;
}

export function TagFavo({ userData }: TagFavoProps) {
  const tagsFavo = Sto.getTagsFavo(userData.storage);

  return tagsFavo.length !== 0 ? (
    tagsFavo.map((tags) => {
      const sortedTags = RA.sort(OrdT.ordString)(tags);
      return (
        <Paper sx={{ p: 1 }} key={sortedTags.join(",")}>
          <TextTitle>
            <TagsLink tags={sortedTags} />
          </TextTitle>
        </Paper>
      );
    })
  ) : (
    <Paper sx={{ p: 1 }}>
      お気に入りタグがありません。
      <br />
      <Link to={routes.topicSearch.to({})}>検索</Link>
    </Paper>
  );
}
