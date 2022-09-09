import { Paper } from "@material-ui/core";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Page } from "../components";

export const NotFoundPage = (_props: {}) => {
  return (
    <Page>
      <Helmet title="NotFound" />
      <Paper>ページが見つかりません</Paper>
    </Page>
  );
};
