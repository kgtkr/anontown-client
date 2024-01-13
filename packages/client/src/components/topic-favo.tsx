import * as routes from "@anontown-frontend/routes";
import { Icon, IconButton, Paper } from "@mui/material";
import * as React from "react";
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

interface TopicFavoState {}

export class TopicFavo extends React.Component<TopicFavoProps, TopicFavoState> {
  constructor(props: TopicFavoProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <GA.FindTopicsComponent
          variables={{
            query: {
              id: Sto.getTopicFavo(this.props.userData.storage),
            },
          }}
        >
          {({ loading, error, data, refetch }) => {
            return (
              <>
                <IconButton onClick={() => refetch()}>
                  <Icon>refresh</Icon>
                </IconButton>
                {(() => {
                  if (loading) {
                    return "Loading...";
                  }
                  if (error || !data) {
                    return <Snack msg="トピック取得に失敗しました" />;
                  }

                  const topics = pipe(
                    data.topics,
                    RA.sortBy([
                      OrdT.contramap((x: GA.TopicFragment) =>
                        new Date(x.update).valueOf()
                      )(OrdT.ordNumber),
                    ]),
                    RA.reverse
                  );

                  return (
                    <div>
                      {topics.length !== 0 ? (
                        topics.map((topic) => (
                          <TopicListItem
                            key={topic.id}
                            topic={topic}
                            detail={this.props.detail}
                          />
                        ))
                      ) : (
                        <Paper>
                          お気に入りトピックがありません。
                          <br />
                          <Link to={routes.topicSearch.to({})}>
                            トピック一覧
                          </Link>
                        </Paper>
                      )}
                    </div>
                  );
                })()}
              </>
            );
          }}
        </GA.FindTopicsComponent>
      </div>
    );
  }
}
