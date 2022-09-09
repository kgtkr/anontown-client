import * as React from "react";
import { useHistory, useLocation } from "react-router";

export function useOnChnageUrlSearch<A>(
  parse: (query: string) => A,
  onChange: (x: A) => void
): A {
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    return history.listen((e, action) => {
      if (action === "POP") {
        onChange(parse(e.search));
      }
    });
  }, []);

  const init = React.useMemo(() => parse(location.search), []);
  return init;
}
