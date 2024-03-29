import * as routes from "@anontown-frontend/routes";
import { Tab, Tabs, Paper, CircularProgress } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Page, TagFavo, TopicFavo } from "../components";
import { useUserContext } from "../hooks";

interface HomePageProps {}

export const HomePage = (_props: HomePageProps) => {
  const userContext = useUserContext();
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <Page>
      <Helmet title="Anontown" />
      {userContext.value !== null ? (
        <div>
          <Tabs value={tabIndex} onChange={(_e, v) => setTabIndex(v)}>
            <Tab label="トピック" />
            <Tab label="タグ" />
          </Tabs>
          <React.Suspense fallback={<CircularProgress />}>
            {tabIndex === 0 ? <TopicFavo detail={true} /> : null}
            {tabIndex === 1 ? <TagFavo /> : null}
          </React.Suspense>
        </div>
      ) : (
        <Paper sx={{ p: 1 }}>
          <h1>匿名掲示板Anontownへようこそ</h1>
          <ul>
            <li>
              <Link to={routes.topicSearch.to({})}>トピック一覧</Link>
            </li>
            <li>
              <a
                href="https://document.anontown.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                説明書
              </a>
            </li>
          </ul>
        </Paper>
      )}
    </Page>
  );
};
