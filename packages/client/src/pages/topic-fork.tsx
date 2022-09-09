import * as routes from "@anontown-frontend/routes";
import { Paper } from "@material-ui/core";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import useRouter from "use-react-router";
import { Page, TopicFork } from "../components";
import * as G from "../generated/graphql";
import { userSwitch, UserSwitchProps, withModal } from "../utils";

type TopicForkBaseProps = UserSwitchProps & {
  zDepth?: number;
};

const TopicForkBase = userSwitch((props: TopicForkBaseProps) => {
  const { match, history } = useRouter<{ id: string }>();
  const topics = G.useFindTopicsQuery({
    variables: {
      query: {
        id: [match.params.id],
      },
    },
  });
  const topic = topics.data !== undefined ? topics.data.topics[0] : null;

  return (
    <Paper elevation={props.zDepth}>
      <Helmet title="派生トピック" />
      {topic !== null && topic.__typename === "TopicNormal" ? (
        <TopicFork
          topic={topic}
          onCreate={(x) => {
            history.push(routes.topic.to({ id: x.id }));
          }}
        />
      ) : null}
    </Paper>
  );
});

export function TopicForkPage() {
  return (
    <Page>
      <TopicForkBase />
    </Page>
  );
}

export const TopicForkModal = withModal(
  () => <TopicForkBase zDepth={0} />,
  "派生トピック"
);
