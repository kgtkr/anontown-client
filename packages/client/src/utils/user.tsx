import * as React from "react";
import { rx } from "../prelude";
import { UserData } from "../domains/entities";
import * as GA from "../generated/graphql-apollo";
import { useEffectSkipN, UserContext, UserContextType } from "../hooks";

// TODO: 最悪な実装なのであとで何とかする
let _auth: GA.TokenMasterFragment | null = null;
function setAuth(auth: GA.TokenMasterFragment | null) {
  _auth = auth;
}

export function getAuth(): GA.TokenMasterFragment | null {
  return _auth;
}

export interface UserProps {
  children: (user: UserContextType) => React.ReactNode;
  initUserData: UserData | null;
}

export const User = (props: UserProps): JSX.Element => {
  const [userData, setUserData] = React.useState(props.initUserData);
  setAuth(props.initUserData !== null ? props.initUserData.token : null);
  const subjectRef = React.useRef(new rx.Subject<UserData | null>());
  useEffectSkipN(() => {
    subjectRef.current.next(userData);
  }, [userData]);

  useEffectSkipN(() => {
    if (userData !== null) {
      localStorage.setItem(
        "token",
        JSON.stringify({
          id: userData.token.id,
          key: userData.token.key,
        })
      );
    } else {
      localStorage.removeItem("token");
    }
  }, [userData !== null ? userData.token.id : null]);

  useEffectSkipN(() => {
    location.reload();
  }, [userData !== null ? userData.id : null]);

  const context: UserContextType = {
    value: userData,
    update: (x) => {
      setUserData(x);
      setAuth(x !== null ? x.token : null);
    },
  };

  return (
    <UserContext.Provider value={context}>
      {props.children(context)}
    </UserContext.Provider>
  );
};
