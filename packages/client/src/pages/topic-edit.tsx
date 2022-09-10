import { Paper } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Page, TopicEditor } from "../components";
import * as G from "../generated/graphql";
import { userSwitch, UserSwitchProps, withModal } from "../utils";

type TopicEditBaseProps = UserSwitchProps & {
  zDepth?: number;
};

const TopicEditBase = userSwitch((props: TopicEditBaseProps) => {
  const params = useParams<{ id: string }>();
  const topics = G.useFindTopicsQuery({
    variables: {
      query: {
        id: [params.id],
      },
    },
  });
  const topic = topics.data !== undefined ? topics.data.topics[0] : null;

  return (
    <Paper elevation={props.zDepth}>
      <Helmet title="トピック編集" />
      {topic !== null && topic.__typename === "TopicNormal" ? (
        <TopicEditor topic={topic} userData={props.userData} />
      ) : null}
    </Paper>
  );
});

export function TopicEditPage() {
  return (
    <Page>
      <TopicEditBase />
    </Page>
  );
}

export const TopicEditModal = withModal(
  () => <TopicEditBase zDepth={0} />,
  "トピック編集"
);
