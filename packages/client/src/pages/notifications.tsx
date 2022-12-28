import { Button } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { RouteComponentProps } from "react-router-dom";
import { Page, Res } from "../components";
import * as G from "../generated/graphql";
import { userSwitch, UserSwitchProps } from "../utils";
import { RA, O } from "../prelude";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Env } from "../env";
import { Snack } from "../components/snack";

type NotificationsPageProps = RouteComponentProps<{}> & UserSwitchProps;

export const NotificationsPage = userSwitch(
  (_props: NotificationsPageProps) => {
    const [registration, setRegistration] = React.useState<
      ServiceWorkerRegistration | undefined
    >(undefined);

    useRegisterSW({
      onRegistered(registration) {
        setRegistration(registration);
      },
    });

    const now = React.useRef(new Date().toISOString());
    const reses = G.useFindResesQuery({
      variables: {
        query: {
          date: {
            date: now.current,
            type: "lte",
          },
          notice: true,
        },
      },
    });

    const [snackMsg, setSnackMsg] = React.useState<string | null>(null);

    const [resisterPushSubscription] = G.useResisterPushSubscriptionMutation();

    return (
      <Page>
        <Helmet title="通知" />
        <Snack msg={snackMsg} onHide={() => setSnackMsg(null)} />
        <div>
          <Button
            disabled={
              typeof Notification === "undefined" ||
              Notification.permission === "granted" ||
              registration === undefined
            }
            onClick={async () => {
              if (registration === undefined) {
                return;
              }
              try {
                const permission = await Notification.requestPermission();
                if (permission !== "granted") {
                  setSnackMsg("通知権限を得られませんでした");
                  return;
                }

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

                new Notification("通知を有効にしました", {
                  body: "通知を受け取ることができます",
                });
              } catch (e) {
                setSnackMsg("通知の有効化に失敗しました。" + String(e));
              }
            }}
            variant="contained"
          >
            {typeof Notification === "undefined" || registration === undefined
              ? "このブラウザは通知をサポートしていません"
              : Notification.permission === "granted"
              ? "既に通知が有効です"
              : "通知を有効にする"}
          </Button>
          <div>
            <Button
              onClick={async () => {
                if (reses.data === undefined) {
                  return;
                }
                const first = RA.last(reses.data.reses);
                if (O.isNone(first)) {
                  await reses.refetch();
                } else {
                  reses.fetchMore({
                    variables: {
                      query: {
                        date: {
                          date: first.value.date,
                          type: "gt",
                        },
                        notice: true,
                      },
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) {
                        return prev;
                      }
                      return {
                        ...prev,
                        msgs: [...fetchMoreResult.reses, ...prev.reses],
                      };
                    },
                  });
                }
              }}
              variant="contained"
            >
              最新
            </Button>
          </div>
          <div>
            {reses.data !== undefined
              ? reses.data.reses.map((r) => <Res res={r} key={r.id} />)
              : null}
          </div>
          <div>
            <Button
              onClick={async () => {
                if (reses.data === undefined) {
                  return;
                }
                const last = RA.last(reses.data.reses);
                if (O.isNone(last)) {
                  await reses.refetch();
                } else {
                  reses.fetchMore({
                    variables: {
                      query: {
                        date: {
                          date: last.value.date,
                          type: "lt",
                        },
                        notice: true,
                      },
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) {
                        return prev;
                      }
                      return {
                        ...prev,
                        reses: [...prev.reses, ...fetchMoreResult.reses],
                      };
                    },
                  });
                }
              }}
              variant="contained"
            >
              前
            </Button>
          </div>
        </div>
      </Page>
    );
  }
);
