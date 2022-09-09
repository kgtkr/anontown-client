import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Page, ProfileEditor } from "../components";
import * as G from "../generated/graphql";
import { userSwitch, UserSwitchProps } from "../utils";
import { pipe, O, RA } from "../prelude";
import { useParams } from "react-router";
type ProfileEditPageProps = UserSwitchProps;

export const ProfileEditPage = userSwitch((props: ProfileEditPageProps) => {
  const params = useParams<{ id: string }>();
  const profiles = G.useFindProfilesQuery({
    variables: {
      query: {
        id: [params.id],
      },
    },
  });

  const profile = pipe(
    O.fromNullable(profiles.data),
    O.map((x) => x.profiles),
    O.chain(RA.head),
    O.toUndefined
  );

  return (
    <Page>
      <Helmet title="プロフィール管理" />
      {profile !== undefined ? (
        <ProfileEditor
          style={{ marginBottom: 10 }}
          key={profile.id}
          profile={profile}
          userData={props.userData}
        />
      ) : null}
    </Page>
  );
});
