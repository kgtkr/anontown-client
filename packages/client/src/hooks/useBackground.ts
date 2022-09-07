import useRouter from "use-react-router";
import * as H from "history";

export function useBackground(): H.Location {
  const { location } = useRouter<
    {},
    {},
    { background: H.Location } | undefined
  >();

  return location.state?.background ?? location;
}
