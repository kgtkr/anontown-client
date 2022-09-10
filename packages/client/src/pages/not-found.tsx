import { Paper } from "@mui/material";
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
