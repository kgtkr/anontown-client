import * as React from "react";
import { useHistory } from "react-router";
import { Modal } from "../components";
import { CircularProgress } from "@mui/material";

export const withModal = <P extends {}>(
  Page: React.ComponentType<P>,
  title: string
) => {
  return (props: P): JSX.Element => {
    const history = useHistory();
    const goBack = React.useMemo(
      () => () => {
        history.goBack();
      },
      [history]
    );

    return (
      <Modal isOpen={true} onRequestClose={goBack}>
        <h1>{title}</h1>
        <React.Suspense fallback={<CircularProgress />}>
          {React.createElement(Page, props)}
        </React.Suspense>
      </Modal>
    );
  };
};
