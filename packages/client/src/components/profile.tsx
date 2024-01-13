import * as GA from "../generated/graphql-apollo";
import { Md } from "./md";

export interface ProfileProps {
  profile: GA.ProfileFragment;
}

export function Profile(props: ProfileProps) {
  return (
    <div>
      {props.profile.name}@{props.profile.sn}
      <hr />
      <Md text={props.profile.text} />
    </div>
  );
}
