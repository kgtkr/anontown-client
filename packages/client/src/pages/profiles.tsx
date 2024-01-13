import * as routes from "@anontown-frontend/routes";
import { Paper } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Page } from "../components";
import * as GA from "../generated/graphql-apollo";
import { userSwitch, UserSwitchProps } from "../utils";

type ProfilesPageProps = UserSwitchProps;

export const ProfilesPage = userSwitch((_props: ProfilesPageProps) => {
  const profiles = GA.useFindProfilesQuery({
    variables: {
      query: {
        self: true,
      },
    },
  });

  return (
    <Page>
      <Helmet title="プロフィール管理" />
      <Paper style={{ padding: 10 }}>
        <Link to={routes.profileCreate.to({})}>作成</Link>
      </Paper>
      {profiles.data !== undefined
        ? profiles.data.profiles.map((p) => (
            <Paper key={p.id} style={{ padding: 10 }}>
              <Link to={routes.profileEdit.to({ id: p.id })}>@{p.sn}</Link>
            </Paper>
          ))
        : null}
    </Page>
  );
});
