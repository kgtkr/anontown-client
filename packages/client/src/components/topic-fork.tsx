import { Button, TextField } from "@mui/material";
import * as React from "react";
import * as GA from "../generated/graphql-apollo";
import { useUserContext } from "../hooks";
import { ErrorAlert } from "./error-alert";
import { Snack } from "./snack";
import { TopicListItem } from "./topic-list-item";
import { useStorage } from "../domains/entities/storage/StorageCollectionHooks";
import { TopicReads } from "../domains/entities/storage/TopicReads";

interface TopicForkProps {
  topic: GA.TopicNormalFragment;
  onCreate?: (topic: GA.TopicForkFragment) => void;
}

export const TopicFork = (props: TopicForkProps) => {
  const [title, setTitle] = React.useState("");
  const user = useUserContext();
  const { loading, error, data } = GA.useFindTopicsQuery({
    variables: { query: { parent: props.topic.id } },
  });
  const topicReads = useStorage(
    TopicReads,
    data?.topics.map((t) => ({ topicId: t.id })) ?? [],
    null,
  );

  const [submit, { error: createTopicForkError }] =
    GA.useCreateTopicForkMutation({
      onCompleted: (data) => {
        props.onCreate?.(data.createTopicFork);
      },
      variables: {
        title,
        parent: props.topic.id,
      },
    });

  return (
    <div>
      {user.value !== null ? (
        <form>
          <ErrorAlert error={createTopicForkError} />
          <TextField
            placeholder="タイトル"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
          <Button onClick={() => submit()} variant="contained">
            新規作成
          </Button>
        </form>
      ) : null}
      <hr />
      {loading && <span>Loading...</span>}
      {error || !data ? (
        <Snack msg="派生トピック取得に失敗しました" />
      ) : (
        <div>
          {data.topics.map((t) => (
            <TopicListItem
              key={t.id}
              topic={t}
              detail={false}
              topicRead={topicReads({
                topicId: t.id,
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};
