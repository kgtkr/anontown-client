import { Icon, IconButton, Paper } from "@mui/material";
import * as React from "react";
import { useTitle } from "react-use";
import { Errors, Page, Snack } from "../components";
import * as G from "../generated/graphql";
import { userSwitch, UserSwitchProps } from "../utils";

type AppsSettingPageProps = UserSwitchProps;

export const AppsSettingPage = userSwitch((_props: AppsSettingPageProps) => {
  const [snackMsg, setSnackMsg] = React.useState<string | null>(null);
  const tokens = G.useFindTokensQuery({ variables: {} });
  const variables: G.FindClientsQueryVariables = {
    query: {
      id:
        tokens.data !== undefined
          ? Array.from(
              new Set(
                tokens.data.tokens
                  .filter(
                    (x): x is G.TokenGeneralFragment =>
                      x.__typename === "TokenGeneral"
                  )
                  .map((x) => x.client.id)
              )
            )
          : [],
    },
  };
  const clients = G.useFindClientsQuery({
    skip: tokens.data === undefined,
    variables,
  });
  const [delToken] = G.useDelTokenClientMutation();

  useTitle("連携アプリ管理");

  return (
    <Page>
      <div>
        <Snack msg={snackMsg} onHide={() => setSnackMsg(null)} />
        {tokens.error !== undefined || clients.error !== undefined ? (
          <Errors errors={[String(tokens.error), String(clients.error)]} />
        ) : null}
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
                            G.FindClientsQuery,
                            G.FindClientsQueryVariables
                          >({
                            query: G.FindClientsDocument,
                            variables,
                          });
                          if (cs !== null) {
                            cache.writeQuery<
                              G.FindClientsQuery,
                              G.FindClientsQueryVariables
                            >({
                              query: G.FindClientsDocument,
                              variables,
                              data: {
                                __typename: "Query",
                                clients: cs.clients.filter(
                                  (x) => x.id !== c.id
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
