import * as routes from "@anontown-frontend/routes";
import * as t from "io-ts";
import {
  Icon,
  IconButton,
  MenuItem,
  Toolbar,
  AppBar,
  Typography,
  Menu,
  CircularProgress,
} from "@mui/material";

import * as React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { UserData } from "../domains/entities";
import { Env } from "../env";
import * as GA from "../generated/graphql-apollo";
import * as pages from "../pages";
import {
  createHeaders,
  createUserData,
  getServerStatus,
  gqlClient,
} from "../effects";
import { User } from "../utils";
import * as style from "./app.module.scss";
import * as H from "history";
import { useRegisterSW } from "virtual:pwa-register/react";

declare const gtag: any;

export function App(): JSX.Element {
  const location = useLocation<{ background: H.Location } | undefined>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [initUserData, setInitUserData] = React.useState<
    UserData | undefined | null
  >(undefined);
  const [serverStatus, setServerStatus] = React.useState(true);
  const [resisterPushSubscription] = GA.useResisterPushSubscriptionMutation();

  const [registration, setRegistration] = React.useState<
    ServiceWorkerRegistration | undefined
  >(undefined);

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      setRegistration(registration);
    },
  });

  const isLogin = initUserData !== undefined && initUserData !== null;

  React.useEffect(() => {
    if (
      typeof Notification === "undefined" ||
      Notification.permission !== "granted" ||
      !isLogin ||
      registration === undefined
    ) {
      return;
    }

    // 本当はswでpushsubscriptionchangeイベントなどを使ってやるべきだが再ログインなどを考えるとめんどくさいので毎回やる
    void (async () => {
      try {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: Env.vapid.publicKey,
        });
        const subscriptionJson = subscription.toJSON();
        await resisterPushSubscription({
          variables: {
            endpoint: subscriptionJson.endpoint!,
            p256dh: subscriptionJson.keys!.p256dh,
            auth: subscriptionJson.keys!.auth,
          },
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [isLogin, registration, resisterPushSubscription]);

  React.useEffect(() => {
    if (Env.ga !== null) {
      gtag("config", Env.ga.id, {
        page_path: location.pathname,
      });
    }
  }, [location.pathname]);

  React.useEffect(() => {
    void getServerStatus().then((serverStatus) => {
      setServerStatus(serverStatus);
    });
  }, []);

  React.useEffect(() => {
    void (async () => {
      try {
        const tokenStr = localStorage.getItem("token");
        let token;
        if (tokenStr !== null) {
          const tokenType = t.strict({
            id: t.string,
            key: t.string,
          });
          token = JSON.parse(tokenStr) as unknown;
          if (!tokenType.is(token)) {
            throw Error();
          }
        } else {
          throw Error();
        }
        const res = await gqlClient.query<GA.FindTokenQuery>({
          query: GA.FindTokenDocument,
          context: {
            headers: createHeaders(token.id, token.key),
          },
        });
        if (res.data.token.__typename === "TokenGeneral") {
          throw Error();
        }
        setInitUserData(
          await createUserData(
            res.data.token as GA.TokenMasterFragment, // TODO: ここのキャストおかしい
          ),
        );
      } catch {
        setInitUserData(null);
      }
    })();
  }, []);

  return serverStatus ? (
    initUserData !== undefined ? (
      <User initUserData={initUserData}>
        {(user) => {
          return (
            <div className={style.container}>
              <AppBar position="static">
                <Toolbar>
                  <Typography
                    style={{
                      flexGrow: 1,
                    }}
                  >
                    Anontown
                  </Typography>
                  <IconButton to={routes.home.to({})} component={Link}>
                    <Icon>home</Icon>
                  </IconButton>
                  <IconButton component={Link} to={routes.topicSearch.to({})}>
                    <Icon>search</Icon>
                  </IconButton>
                  {user.value !== null ? (
                    <IconButton
                      to={routes.notifications.to({})}
                      component={Link}
                    >
                      <Icon>notifications</Icon>
                    </IconButton>
                  ) : null}
                  <IconButton onClick={(evt) => setAnchorEl(evt.currentTarget)}>
                    <Icon>people</Icon>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    {user.value !== null ? (
                      [
                        <MenuItem
                          to={routes.profiles.to({})}
                          component={Link}
                          onClick={() => setAnchorEl(null)}
                          key="profile"
                        >
                          プロフ管理
                        </MenuItem>,
                        <MenuItem
                          to={routes.settings.to({})}
                          component={Link}
                          onClick={() => setAnchorEl(null)}
                          key="settings"
                        >
                          設定
                        </MenuItem>,
                        <MenuItem
                          onClick={() => {
                            setAnchorEl(null);
                            user.update(null);
                          }}
                          key="logout"
                        >
                          ログアウト
                        </MenuItem>,
                      ]
                    ) : (
                      <MenuItem
                        onClick={() => setAnchorEl(null)}
                        to={routes.login.to({})}
                        component={Link}
                      >
                        ログイン
                      </MenuItem>
                    )}
                  </Menu>
                  {needRefresh && (
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        updateServiceWorker(true);
                      }}
                    >
                      <Icon>upgrade</Icon>
                    </IconButton>
                  )}
                </Toolbar>
              </AppBar>
              <div className={style.main}>
                <React.Suspense fallback={<CircularProgress />}>
                  <Switch location={location.state?.background ?? location}>
                    <Route
                      exact={true}
                      path={routes.home.matcher()}
                      component={pages.HomePage}
                    />
                    <Route
                      exact={true}
                      path={routes.res.matcher()}
                      component={pages.ResPage}
                    />
                    <Route
                      exact={true}
                      path={routes.resReply.matcher()}
                      component={pages.ResReplyPage}
                    />
                    <Route
                      exact={true}
                      path={routes.hash.matcher()}
                      component={pages.ResHashPage}
                    />
                    <Route
                      exact={true}
                      path={routes.topicSearch.matcher()}
                      component={pages.TopicSearchPage}
                    />
                    <Route
                      exact={true}
                      path={routes.topicCreate.matcher()}
                      component={pages.TopicCreatePage}
                    />
                    <Route
                      exact={true}
                      path={routes.topic.matcher()}
                      component={pages.TopicPage}
                    />
                    <Route
                      exact={true}
                      path={routes.topicData.matcher()}
                      component={pages.TopicDataPage}
                    />
                    <Route
                      exact={true}
                      path={routes.topicFork.matcher()}
                      component={pages.TopicForkPage}
                    />
                    <Route
                      exact={true}
                      path={routes.topicEdit.matcher()}
                      component={pages.TopicEditPage}
                    />
                    <Route
                      exact={true}
                      path={routes.profiles.matcher()}
                      component={pages.ProfilesPage}
                    />
                    <Route
                      exact={true}
                      path={routes.profileEdit.matcher()}
                      component={pages.ProfileEditPage}
                    />
                    <Route
                      exact={true}
                      path={routes.profileCreate.matcher()}
                      component={pages.ProfileCreatePage}
                    />
                    <Route
                      exact={true}
                      path={routes.notifications.matcher()}
                      component={pages.NotificationsPage}
                    />
                    <Route
                      exact={true}
                      path={routes.signup.matcher()}
                      component={pages.SignupPage}
                    />
                    <Route
                      exact={true}
                      path={routes.login.matcher()}
                      component={pages.LoginPage}
                    />
                    <Route
                      exact={true}
                      path={routes.auth.matcher()}
                      component={pages.AuthPage}
                    />
                    <Route
                      exact={true}
                      path={routes.settings.matcher()}
                      component={pages.SettingsPage}
                    />
                    <Route
                      exact={true}
                      path={routes.accountSetting.matcher()}
                      component={pages.AccountSettingPage}
                    />
                    <Route
                      exact={true}
                      path={routes.appsSetting.matcher()}
                      component={pages.AppsSettingPage}
                    />
                    <Route
                      exact={true}
                      path={routes.devSetting.matcher()}
                      component={pages.DevSettingPage}
                    />
                    <Route
                      exact={true}
                      path={routes.profile.matcher()}
                      component={pages.ProfilePage}
                    />
                    <Route component={pages.NotFoundPage} />
                  </Switch>
                </React.Suspense>
                {location.state?.background ? (
                  <Route
                    path={routes.res.matcher()}
                    component={pages.ResModal}
                  />
                ) : null}
                {location.state?.background ? (
                  <Route
                    path={routes.resReply.matcher()}
                    component={pages.ResReplyModal}
                  />
                ) : null}
                {location.state?.background ? (
                  <Route
                    path={routes.profile.matcher()}
                    component={pages.ProfileModal}
                  />
                ) : null}
                {location.state?.background ? (
                  <Route
                    path={routes.topicData.matcher()}
                    component={pages.TopicDataModal}
                  />
                ) : null}
                {location.state?.background ? (
                  <Route
                    path={routes.topicFork.matcher()}
                    component={pages.TopicForkModal}
                  />
                ) : null}
                {location.state?.background ? (
                  <Route
                    path={routes.topicEdit.matcher()}
                    component={pages.TopicEditModal}
                  />
                ) : null}
                {location.state?.background ? (
                  <Route
                    path={routes.hash.matcher()}
                    component={pages.ResHashModal}
                  />
                ) : null}
              </div>
            </div>
          );
        }}
      </User>
    ) : (
      <></>
    )
  ) : (
    <div>
      <p>
        サーバーに障害が発生しているかメンテナンス中です。最新情報は
        <a href="https://twitter.com/anontown_bbs">Twitter</a>
        をご覧ください。
      </p>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="anontown_bbs"
        options={{ height: "60vh" }}
      />
    </div>
  );
}
