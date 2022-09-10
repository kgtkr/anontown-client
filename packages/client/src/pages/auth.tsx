import * as routes from "@anontown-frontend/routes";
import { Button } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router";
import { useTitle } from "react-use";
import { ErrorAlert, Page, Snack } from "../components";
import * as G from "../generated/graphql";
import { userSwitch, UserSwitchProps } from "../utils";

type AuthPageProps = UserSwitchProps;

export const AuthPage = userSwitch((_props: AuthPageProps) => {
  const location = useLocation();
  const [snackMsg, setSnackMsg] = React.useState<string | null>(null);
  const query = routes.auth.parseQuery(location.search);
  const clients = G.useFindClientsQuery({
    skip: query.id === undefined,
    variables: { query: { id: query.id !== undefined ? [query.id] : [] } },
  });
  const [submit, { error }] = G.useCreateTokenGeneralMutation();

  useTitle("アプリ認証");

  return (
    <Page>
      <Snack msg={snackMsg} onHide={() => setSnackMsg(null)} />
      {clients.loading ? <div>loading</div> : null}
      {query.id === undefined ? <div>パラメーターが不正です</div> : null}
      {clients.error !== undefined ? (
        <ErrorAlert error="クライアント取得に失敗しました。" />
      ) : null}
      <ErrorAlert error={error} />
      {clients.data !== undefined ? (
        <div>
          認証しますか？
          <Button
            type="button"
            onClick={async () => {
              if (clients.data !== undefined) {
                const client = clients.data.clients[0];
                const data = await submit({
                  variables: { client: client.id },
                });
                if (data.data) {
                  window.location.href =
                    client.url +
                    "?" +
                    "id=" +
                    data.data.createTokenGeneral.req.token +
                    "&key=" +
                    encodeURI(data.data.createTokenGeneral.req.key);
                }
              }
            }}
            variant="contained"
          >
            OK
          </Button>
        </div>
      ) : null}
    </Page>
  );
});
