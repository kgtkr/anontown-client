import * as routes from "@anontown-frontend/routes";
import {
  Checkbox,
  Icon,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useRouter from "use-react-router";
import { Page, TagsInput, TopicListItem } from "../components";
import * as G from "../generated/graphql";
import { useUserContext } from "../hooks";
import { Card } from "../styled/card";
import { Sto } from "../domains/entities";
import { useDebouncedCallback } from "use-debounce";
import { useOnChnageUrlSearch } from "../hooks/use-on-change-url-search";

interface Query {
  title: string;
  tags: ReadonlyArray<string>;
  dead: boolean;
}

interface State {
  query: Query;
  input: Query;
}

type Action =
  | { type: "UPDATE_INPUT_TITLE"; title: string }
  | { type: "UPDATE_INPUT_TAGS"; tags: ReadonlyArray<string> }
  | { type: "UPDATE_INPUT_DEAD"; dead: boolean }
  | { type: "UPDATE_URL_QUERY"; query: Query }
  | { type: "COMPLETE_INPUT" };

export const TopicSearchPage = (_props: {}) => {
  const { history } = useRouter();

  const init = useOnChnageUrlSearch(
    (query) => routes.topicSearch.parseQuery(query),
    (query) => {
      dispatch({ type: "UPDATE_URL_QUERY", query: query });
    }
  );

  const [state, dispatch] = React.useReducer(
    (prev: State, action: Action): State => {
      switch (action.type) {
        case "UPDATE_INPUT_TITLE": {
          return {
            ...prev,
            input: {
              ...prev.input,
              title: action.title,
            },
          };
        }
        case "UPDATE_INPUT_TAGS": {
          return {
            ...prev,
            input: {
              ...prev.input,
              tags: action.tags,
            },
          };
        }
        case "UPDATE_INPUT_DEAD": {
          return {
            ...prev,
            input: {
              ...prev.input,
              dead: action.dead,
            },
          };
        }
        case "COMPLETE_INPUT": {
          return {
            ...prev,
            query: prev.input,
          };
        }
        case "UPDATE_URL_QUERY": {
          return {
            ...prev,
            input: action.query,
            query: action.query,
          };
        }
      }
    },
    {
      input: init,
      query: init,
    }
  );

  const [onInput] = useDebouncedCallback(() => {
    dispatch({ type: "COMPLETE_INPUT" });
    history.push(
      routes.topicSearch.to(
        {},
        {
          query: {
            title: state.input.title,
            dead: state.input.dead,
            tags: state.input.tags,
          },
        }
      )
    );
  }, 500);

  const user = useUserContext();
  const limit = 100;

  const topics = G.useFindTopicsQuery({
    variables: {
      query: {
        title: state.query.title,
        tags: state.query.tags,
        activeOnly: !state.query.dead,
      },
      limit,
    },
  });

  return (
    <Page>
      <Helmet title="検索" />
      <Card>
        {user.value !== null ? (
          <IconButton
            onClick={() => {
              if (user.value === null) {
                return;
              }
              const storage = user.value.storage;
              user.update({
                ...user.value,
                storage: (Sto.isTagsFavo(state.query.tags)(storage)
                  ? Sto.unfavoTags
                  : Sto.favoTags)(state.query.tags)(storage),
              });
            }}
          >
            {Sto.isTagsFavo(state.query.tags)(user.value.storage) ? (
              <Icon>star</Icon>
            ) : (
              <Icon>star_border</Icon>
            )}
          </IconButton>
        ) : null}
        <div>
          <TagsInput
            fullWidth={true}
            value={state.input.tags}
            onChange={(v) => {
              dispatch({ type: "UPDATE_INPUT_TAGS", tags: v });
              onInput();
            }}
          />
          <TextField
            fullWidth={true}
            placeholder="タイトル"
            value={state.input.title}
            onChange={(evt) => {
              dispatch({ type: "UPDATE_INPUT_TITLE", title: evt.target.value });
              onInput();
            }}
          />
          過去ログも
          <Checkbox
            checked={state.input.dead}
            onChange={(evt) => {
              dispatch({ type: "UPDATE_INPUT_DEAD", dead: evt.target.checked });
              onInput();
            }}
          />
        </div>
      </Card>
      <div>
        {user.value !== null ? (
          <IconButton component={Link} to={routes.topicCreate.to({})}>
            <Icon>edit</Icon>
          </IconButton>
        ) : null}
        <IconButton onClick={() => topics.refetch()}>
          <Icon>refresh</Icon>
        </IconButton>
      </div>
      <div>
        {topics.data !== undefined
          ? topics.data.topics.map((t) => (
              <TopicListItem key={t.id} topic={t} detail={true} />
            ))
          : null}
      </div>
      <div>
        <Button
          onClick={() => {
            topics.fetchMore({
              variables: {
                skip: topics.data !== undefined ? topics.data.topics.length : 0,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prev;
                }
                return {
                  ...prev,
                  msgs: [...prev.topics, ...fetchMoreResult.topics],
                };
              },
            });
          }}
          variant="contained"
        >
          もっと
        </Button>
      </div>
    </Page>
  );
};
