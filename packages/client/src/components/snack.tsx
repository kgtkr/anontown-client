import { Snackbar } from "@material-ui/core";
import * as React from "react";

export function Snack(props: { msg: string | null; onHide?: () => void }) {
  return (
    <Snackbar
      open={props.msg !== null}
      message={props.msg ?? ""}
      autoHideDuration={5000}
      onClose={() => {
        props.onHide?.();
      }}
    />
  );
}
