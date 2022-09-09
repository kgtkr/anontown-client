import { Icon } from "@mui/material";
import * as React from "react";

export interface ErrorsProps {
  errors?: Array<string>;
}

export const Errors = (props: ErrorsProps) => (
  <div>
    {props.errors
      ? props.errors.map((e, i) => (
          <div key={i.toString()}>
            <Icon>error</Icon> {e}
          </div>
        ))
      : null}
  </div>
);
