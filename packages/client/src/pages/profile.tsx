import { option } from "fp-ts";
import { Paper } from "@mui/material";
import { useTitle } from "react-use";
import { Page, Profile, Snack } from "../components";
import * as GA from "../generated/graphql-apollo";
import { withModal } from "../utils";
import { pipe, RA } from "../prelude";
import { useParams } from "react-router";

interface ProfileBaseProps {
  zDepth?: number;
}

function ProfileBase(props: ProfileBaseProps) {
  const params = useParams<{ id: string }>();
  useTitle("プロフィール");
  const profilesResult = GA.useFindProfilesQuery({
    variables: { query: { id: [params.id] } },
  });
  useTitle(
    pipe(
      profilesResult.data,
      option.fromNullable,
      option.map((x) => x.profiles),
      option.chain(RA.head),
      option.map((x) => `@${x.sn}`),
      option.getOrElse(() => "プロフィール")
    )
  );

  return (
    <div>
      {profilesResult.loading ? <span>Loading...</span> : null}
      {profilesResult.error ? (
        <Snack msg="プロフィール取得に失敗しました" />
      ) : null}
      {profilesResult.data !== undefined
        ? pipe(
            profilesResult.data.profiles,
            RA.head,
            option.map((p) => (
              <Paper elevation={props.zDepth} key={p.id}>
                <Profile profile={p} />
              </Paper>
            )),
            option.getOrElse(() => <Snack msg="プロフィールが存在しません" />)
          )
        : undefined}
    </div>
  );
}

export function ProfilePage() {
  return (
    <Page>
      <ProfileBase />
    </Page>
  );
}

export const ProfileModal = withModal(
  () => <ProfileBase zDepth={0} />,
  "プロフィール"
);
