import { Paper } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { RouteComponentProps } from "react-router-dom";
import { ClientAdd, ClientEditor, ErrorAlert, Page } from "../components";
import * as GA from "../generated/graphql-apollo";
import { userSwitch, UserSwitchProps } from "../utils";
import { isNullish } from "../utils/isNullish";

type DevSettingPageProps = RouteComponentProps<{}> & UserSwitchProps;

export const DevSettingPage = userSwitch((props: DevSettingPageProps) => {
  const variables: GA.FindClientsQueryVariables = { query: { self: true } };
  const clients = GA.useFindClientsQuery({ variables });

  return (
    <Page>
      <Paper>
        <Helmet title="開発者向け" />
        <Paper>クライアント管理</Paper>
        <ClientAdd
          onAddUpdate={(cache, data) => {
            const cs = cache.readQuery<
              GA.FindClientsQuery,
              GA.FindClientsQueryVariables
            >({
              query: GA.FindClientsDocument,
              variables,
            });
            if (cs !== null && !isNullish(data.data)) {
              cache.writeQuery<GA.FindClientsQuery, GA.FindClientsQueryVariables>(
                {
                  query: GA.FindClientsDocument,
                  variables,
                  data: {
                    __typename: "Query",
                    clients: cs.clients.concat([data.data.createClient]),
                  },
                }
              );
            }
          }}
          userData={props.userData}
        />
        {clients.error !== undefined ? (
          <ErrorAlert error="クライアント取得に失敗しました。" />
        ) : null}
        {clients.loading ? <div>loading</div> : null}
        {clients.data !== undefined ? (
          <>
            {clients.data.clients.length === 0 ? (
              <Paper>クライアントがありません</Paper>
            ) : null}
            {clients.data.clients.map((c) => (
              <ClientEditor key={c.id} client={c} userData={props.userData} />
            ))}
          </>
        ) : null}
      </Paper>
    </Page>
  );
});
