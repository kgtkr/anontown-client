import * as routes from "@anontown-frontend/routes";
import { Link } from "react-router-dom";
import * as style from "./tags-link.module.scss";

export interface TagsLinkProps {
  tags: ReadonlyArray<string>;
  mini?: boolean;
}

export function TagsLink(props: TagsLinkProps) {
  return (
    <Link
      className={props.mini ? style.mini : undefined}
      to={routes.topicSearch.to(
        {},
        {
          query: {
            tags: props.tags,
          },
        },
      )}
    >
      {props.tags.length !== 0 ? props.tags.join(",") : "(なし)"}
    </Link>
  );
}
