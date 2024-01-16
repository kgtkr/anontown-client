import * as routes from "@anontown-frontend/routes";
import { Icon, IconButton, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import * as GA from "../generated/graphql-apollo";
import { Snack } from "./snack";
import { TopicListItem } from "./topic-list-item";
import { RA, pipe, OrdT } from "../prelude";
import {
  usePrefixedStorageCollection,
  useStorage,
} from "../domains/entities/storage/StorageCollectionHooks";
import { FavoriteTopics } from "../domains/entities/storage/FavoriteTopics";
import { TopicReads } from "../domains/entities/storage/TopicReads";

interface TopicFavoProps {
  detail: boolean;
}

export function TopicFavo({ detail }: TopicFavoProps) {
  const favoTopics = usePrefixedStorageCollection(FavoriteTopics);
  const topicReads = useStorage(
    TopicReads,
    favoTopics.map((topic) => ({ topicId: topic.topicId })),
    null,
  );

  const { loading, error, data, refetch } = GA.useFindTopicsQuery({
    variables: {
      query: {
        id: favoTopics.map((t) => t.topicId),
      },
    },
  });

  return (
    <div>
      <IconButton onClick={() => refetch()}>
        <Icon>refresh</Icon>
      </IconButton>
      {loading && "Loading..."}
      {error || !data ? (
        <Snack msg="トピック取得に失敗しました" />
      ) : (
        <div>
          {data.topics.length !== 0 ? (
            pipe(
              data.topics,
              RA.sortBy([
                OrdT.contramap((x: GA.TopicFragment) =>
                  new Date(x.update).valueOf(),
                )(OrdT.ordNumber),
              ]),
              RA.reverse,
            ).map((topic) => (
              <TopicListItem
                key={topic.id}
                topic={topic}
                detail={detail}
                topicRead={topicReads({ topicId: topic.id })}
              />
            ))
          ) : (
            <Paper>
              お気に入りトピックがありません。
              <br />
              <Link to={routes.topicSearch.to({})}>トピック一覧</Link>
            </Paper>
          )}
        </div>
      )}
    </div>
  );
}
