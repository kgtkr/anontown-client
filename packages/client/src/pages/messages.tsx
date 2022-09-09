import { Paper, Button } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Md, Page } from "../components";
import * as G from "../generated/graphql";
import { dateFormat, userSwitch, UserSwitchProps } from "../utils";
import { RA, O } from "../prelude";

type MessagesPageProps = UserSwitchProps;

export const MessagesPage = userSwitch((_props: MessagesPageProps) => {
  const now = React.useRef(new Date().toISOString());
  const msgs = G.useFindMsgsQuery({
    variables: {
      query: {
        date: {
          date: now.current,
          type: "lte",
        },
      },
    },
  });

  return (
    <Page>
      <Helmet title="お知らせ" />
      <div>
        <div>
          <Button
            onClick={async () => {
              if (msgs.data === undefined) {
                return;
              }
              const first = RA.head(msgs.data.msgs);
              if (O.isNone(first)) {
                await msgs.refetch();
              } else {
                msgs.fetchMore({
                  variables: {
                    query: {
                      date: {
                        date: first.value.date,
                        type: "gt",
                      },
                    },
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                      return prev;
                    }
                    return {
                      ...prev,
                      msgs: [...fetchMoreResult.msgs, ...prev.msgs],
                    };
                  },
                });
              }
            }}
            variant="contained"
          >
            最新
          </Button>
        </div>
        <div>
          {msgs.data !== undefined
            ? msgs.data.msgs.map((m) => (
                <Paper key={m.id}>
                  <div>{dateFormat.format(m.date)}</div>
                  <Md text={m.text} />
                </Paper>
              ))
            : null}
        </div>
        <div>
          <Button
            onClick={async () => {
              if (msgs.data === undefined) {
                return;
              }

              const last = RA.last(msgs.data.msgs);
              if (O.isNone(last)) {
                await msgs.refetch();
              } else {
                msgs.fetchMore({
                  variables: {
                    query: {
                      date: {
                        date: last.value.date,
                        type: "lt",
                      },
                    },
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                      return prev;
                    }
                    return {
                      ...prev,
                      msgs: [...prev.msgs, ...fetchMoreResult.msgs],
                    };
                  },
                });
              }
            }}
            variant="contained"
          >
            前
          </Button>
        </div>
      </div>
    </Page>
  );
});
