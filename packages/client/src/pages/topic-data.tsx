import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { Page, Snack, TopicData } from "../components";
import * as GA from "../generated/graphql-apollo";
import { withModal } from "../utils";

interface TopicDataBaseProps {
  zDepth?: number;
}

function TopicDataBase({ zDepth }: TopicDataBaseProps) {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = GA.useFindTopicsQuery({
    variables: { query: { id: [id] } },
  });

  return (
    <Paper elevation={zDepth}>
      {loading && <span>Loading...</span>}
      {error || !data || data.topics.length === 0 ? (
        <Snack msg="トピック取得に失敗しました" />
      ) : (
        <TopicData topic={data.topics[0]} />
      )}
    </Paper>
  );
}

export function TopicDataPage() {
  return (
    <Page>
      <TopicDataBase />
    </Page>
  );
}

export const TopicDataModal = withModal(
  () => <TopicDataBase zDepth={0} />,
  "トピック詳細"
);
