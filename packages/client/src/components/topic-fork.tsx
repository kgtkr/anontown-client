import { Button, TextField } from "@mui/material";
import * as React from "react";
import * as GA from "../generated/graphql-apollo";
import { useUserContext } from "../hooks";
import { ErrorAlert } from "./error-alert";
import { Snack } from "./snack";
import { TopicListItem } from "./topic-list-item";

interface TopicForkProps {
  topic: GA.TopicNormalFragment;
  onCreate?: (topic: GA.TopicForkFragment) => void;
}

export const TopicFork = (props: TopicForkProps) => {
  const [title, setTitle] = React.useState("");
  const user = useUserContext();

  return (
    <div>
      {user.value !== null ? (
        <GA.CreateTopicForkComponent
          variables={{
            title,
            parent: props.topic.id,
          }}
          onCompleted={(data) => {
            props.onCreate?.(data.createTopicFork);
          }}
        >
          {(submit, { error }) => {
            return (
              <form>
                <ErrorAlert error={error} />
                <TextField
                  placeholder="タイトル"
                  value={title}
                  onChange={(evt) => setTitle(evt.target.value)}
                />
                <Button onClick={() => submit()} variant="contained">
                  新規作成
                </Button>
              </form>
            );
          }}
        </GA.CreateTopicForkComponent>
      ) : null}
      <hr />
      <GA.FindTopicsComponent variables={{ query: { parent: props.topic.id } }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <span>Loading...</span>;
          }
          if (error || !data) {
            return <Snack msg="派生トピック取得に失敗しました" />;
          }
          return (
            <div>
              {data.topics.map((t) => (
                <TopicListItem key={t.id} topic={t} detail={false} />
              ))}
            </div>
          );
        }}
      </GA.FindTopicsComponent>
    </div>
  );
};
