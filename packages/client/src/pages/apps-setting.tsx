import { Icon, IconButton, Paper } from "@mui/material";
import * as React from "react";
import { useTitle } from "react-use";
import { ErrorAlert, Page, Snack } from "../components";
import * as GA from "../generated/graphql-apollo";
import { userSwitch, UserSwitchProps } from "../utils";

type AppsSettingPageProps = UserSwitchProps;

export const AppsSettingPage = userSwitch((_props: AppsSettingPageProps) => {
  const [snackMsg, setSnackMsg] = React.useState<string | null>(null);
  const tokens = GA.useFindTokensQuery({ variables: {} });
  const variables: GA.FindClientsQueryVariables = {
    query: {
      id:
        tokens.data !== undefined
          ? Array.from(
              new Set(
                tokens.data.tokens
                  .filter(
                    (x): x is GA.TokenGeneralFragment =>
                      x.__typename === "TokenGeneral",
                  )
                  .map((x) => x.client.id),
              ),
            )
          : [],
    },
  };
  const clients = GA.useFindClientsQuery({
    skip: tokens.data === undefined,
    variables,
  });
  const [delToken] = GA.useDelTokenClientMutation();

  useTitle("連携アプリ管理");

  return (
    <Page>
      <div>
        <Snack msg={snackMsg} onHide={() => setSnackMsg(null)} />
        <ErrorAlert error={tokens.error} />
        <ErrorAlert error={clients.error} />
        {tokens.loading || clients.loading ? <div>loading</div> : null}
        {clients.data !== undefined
          ? clients.data.clients.map((c) => (
              <Paper key={c.id}>
                {c.name}
                <IconButton
                  type="button"
                  onClick={async () => {
                    try {
                      await delToken({
                        variables: { client: c.id },
                        update: (cache) => {
                          const cs = cache.readQuery<
                            GA.FindClientsQuery,
                            GA.FindClientsQueryVariables
                          >({
                            query: GA.FindClientsDocument,
                            variables,
                          });
                          if (cs !== null) {
                            cache.writeQuery<
                              GA.FindClientsQuery,
                              GA.FindClientsQueryVariables
                            >({
                              query: GA.FindClientsDocument,
                              variables,
                              data: {
                                __typename: "Query",
                                clients: cs.clients.filter(
                                  (x) => x.id !== c.id,
                                ),
                              },
                            });
                          }
                        },
                      });
                    } catch {
                      setSnackMsg("削除に失敗しました");
                    }
                  }}
                >
                  <Icon>delete</Icon>
                </IconButton>
              </Paper>
            ))
          : null}
      </div>
    </Page>
  );
});
