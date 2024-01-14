import * as routes from "@anontown-frontend/routes";
import { Icon, IconButton, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import * as GA from "../generated/graphql-apollo";
import { UserData, Sto } from "../domains/entities";
import { Snack } from "./snack";
import { TopicListItem } from "./topic-list-item";
import { RA, pipe, OrdT } from "../prelude";

interface TopicFavoProps {
  userData: UserData;
  detail: boolean;
}

export function TopicFavo({ userData, detail }: TopicFavoProps) {
  const { loading, error, data, refetch } = GA.useFindTopicsQuery({
    variables: {
      query: {
        id: Sto.getTopicFavo(userData.storage),
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
                  new Date(x.update).valueOf()
                )(OrdT.ordNumber),
              ]),
              RA.reverse
            ).map((topic) => (
              <TopicListItem key={topic.id} topic={topic} detail={detail} />
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
