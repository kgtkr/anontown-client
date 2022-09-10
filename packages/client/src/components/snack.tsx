import { Snackbar } from "@mui/material";

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
