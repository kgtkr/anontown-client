import * as H from "history";
import { useLocation } from "react-router";

export function useBackground(): H.Location {
  const location = useLocation<{ background: H.Location } | undefined>();

  return location.state?.background ?? location;
}
