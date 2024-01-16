import * as routes from "@anontown-frontend/routes";
import { Paper } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { Page, TopicFork } from "../components";
import * as GA from "../generated/graphql-apollo";
import { userSwitch, UserSwitchProps, withModal } from "../utils";

type TopicForkBaseProps = UserSwitchProps & {
  zDepth?: number;
};

const TopicForkBase = userSwitch((props: TopicForkBaseProps) => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const topics = GA.useFindTopicsQuery({
    variables: {
      query: {
        id: [params.id],
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
  "派生トピック",
);
