import * as routes from "@anontown-frontend/routes";
import { useApolloClient } from "@apollo/client";
import {
  Icon,
  Paper,
  IconButton,
  Button,
  Slider,
  MenuItem,
  Menu,
  ToggleButton,
  CircularProgress,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useTitle } from "react-use";
import { Modal, NG, Page, Res, ResWrite, TopicFavo } from "../../components";
import * as GA from "../../generated/graphql-apollo";
import { useUserContext } from "../../hooks";
import * as style from "./style.module.scss";
import { RA } from "../../prelude";
import { InfiniteScroll } from "../../components/infinite-scroll";
import { useReducerWithObservable } from "../../hooks/use-reducer-with-observable";
import { reducer } from "./reducer";
import { State } from "./state";
import { epic } from "./epic";
import { useBackground } from "../../hooks/useBackground";
import {
  useDeleteStorage,
  usePrefixedStorageCollection,
  useSetStorage,
  useSingleStorage,
} from "../../domains/entities/storage/StorageCollectionHooks";
import { FavoriteTopics } from "../../domains/entities/storage/FavoriteTopics";
import { TopicReads } from "../../domains/entities/storage/TopicReads";
import { NGs } from "../../domains/entities/storage/NGs";

export const TopicPage = (_props: {}) => {
  const params = useParams<{ id: string }>();

  const topicRead = useSingleStorage(
    TopicReads,
    {
      topicId: params.id,
    },
    null
  );
  const [setTopicRead] = useSetStorage(TopicReads);
  const user = useUserContext();
  const apolloClient = useApolloClient();
  const background = useBackground();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [subscribeTopic] = GA.useSubscribeTopicMutation();
  const [unsubscribeTopic] = GA.useUnsubscribeTopicMutation();

  const [state, dispatch] = useReducerWithObservable(
    reducer,
    State({ topicId: params.id }),
    epic,
    {
      apolloClient: apolloClient,
      setTopicRead,
      initTopicDate: topicRead?.resCreatedAt,
    }
  );
  const ngs = usePrefixedStorageCollection(NGs);

  React.useEffect(() => {
    dispatch({
      type: "INIT",
      topicId: params.id,
      now: new Date(),
      date: topicRead?.resCreatedAt ? new Date(topicRead.resCreatedAt) : null,
    });
  }, [params.id]);

  const favo = useSingleStorage(FavoriteTopics, { topicId: params.id }, null);
  const isFavo = favo !== null;
  const [setFavo] = useSetStorage(FavoriteTopics);
  const [deleteFavo] = useDeleteStorage(FavoriteTopics);

  useTitle(state.topic?.title ?? "トピック");

  const reversedReses = React.useMemo(
    () => (state.reses !== null ? RA.reverse(state.reses) : null),
    [state.reses]
  );

  const handleUpdateRes = React.useCallback((res: GA.ResFragment) => {
    dispatch({ type: "UPDATE_RES", res });
  }, []);

  return (
    <Page
      disableScroll={true}
      sidebar={user.value !== null ? <TopicFavo detail={false} /> : undefined}
    >
      {state.topic !== null &&
      reversedReses !== null &&
      state.now !== null &&
      state.jumpValue !== null ? (
        <>
          <Modal
            isOpen={state.isAutoScrollDialog}
            onRequestClose={() =>
              dispatch({ type: "CLICK_CLOSE_AUTO_SCROLL_MODAL" })
            }
          >
            <h1>自動スクロール</h1>
            <ToggleButton
              selected={state.isAutoScroll}
              onChange={() =>
                dispatch({
                  type: "CHANGE_ENABLE_AUTO_SCROLL",
                  value: !state.isAutoScroll,
                })
              }
              value="check"
            >
              自動スクロール
            </ToggleButton>
            <Slider
              max={30}
              value={state.autoScrollSpeed}
              onChange={(_e, v) => {
                if (typeof v === "number") {
                  dispatch({ type: "CHANGE_AUTO_SCROLL_SPEED", value: v });
                }
              }}
            />
          </Modal>
          {user.value !== null ? (
            <Modal
              isOpen={state.isNGDialog}
              onRequestClose={() => dispatch({ type: "CLICK_CLOSE_NG_MODAL" })}
            >
              <h1>NG</h1>
              <React.Suspense fallback={<CircularProgress />}>
                <NG />
              </React.Suspense>
            </Modal>
          ) : null}
          <Modal
            isOpen={state.isJumpDialog}
            onRequestClose={() => dispatch({ type: "CLICK_CLOSE_JUMP_MODAL" })}
          >
            <h1>ジャンプ</h1>
            <Slider
              min={new Date(state.topic.date).valueOf()}
              max={state.now.valueOf()}
              value={state.jumpValue}
              onChange={(_e, v) => {
                if (typeof v === "number") {
                  dispatch({ type: "CHANGE_JUMP_VALUE", value: v });
                }
              }}
            />
            <div>{moment(new Date(state.jumpValue)).format("YYYY-MM-DD")}</div>
            <div>
              <Button
                onClick={() => {
                  dispatch({ type: "CLICK_JUMP" });
                }}
              >
                ジャンプ
              </Button>
            </div>
          </Modal>
          <div className={style.main}>
            <Paper className={style.header}>
              <div className={style.subject}>
                {state.topic.__typename === "TopicFork" ? (
                  <Icon>call_split</Icon>
                ) : null}
                {state.topic.__typename === "TopicOne" ? (
                  <Icon>looks_one</Icon>
                ) : null}
                {state.topic.title}
              </div>
              <div className={style.toolbar}>
                {user.value !== null ? (
                  <IconButton
                    onClick={() => {
                      if (isFavo) {
                        deleteFavo({ topicId: params.id });
                      } else {
                        setFavo({ topicId: params.id, createdAt: Date.now() });
                      }
                    }}
                  >
                    <Icon>{isFavo ? "star" : "star_border"}</Icon>
                  </IconButton>
                ) : null}
                <IconButton onClick={(evt) => setAnchorEl(evt.currentTarget)}>
                  <Icon>more_vert</Icon>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    component={Link}
                    onClick={() => setAnchorEl(null)}
                    to={routes.topicData.to(
                      {
                        id: state.topicId,
                      },
                      { state: { background } }
                    )}
                  >
                    詳細データ
                  </MenuItem>
                  {state.topic.__typename === "TopicNormal" &&
                  user.value !== null ? (
                    <MenuItem
                      component={Link}
                      onClick={() => setAnchorEl(null)}
                      to={routes.topicEdit.to(
                        {
                          id: state.topicId,
                        },
                        { state: { background } }
                      )}
                    >
                      トピック編集
                    </MenuItem>
                  ) : null}
                  {state.topic.__typename === "TopicNormal" ? (
                    <MenuItem
                      component={Link}
                      onClick={() => setAnchorEl(null)}
                      to={routes.topicFork.to(
                        {
                          id: state.topicId,
                        },
                        { state: { background } }
                      )}
                    >
                      派生トピック
                    </MenuItem>
                  ) : null}
                  {user.value !== null ? (
                    typeof Notification !== "undefined" &&
                    Notification.permission === "granted" ? (
                      <MenuItem
                        onClick={async () => {
                          const topic = state.topic;
                          if (topic === null) {
                            return;
                          }
                          setAnchorEl(null);
                          if (topic.subscribe) {
                            await unsubscribeTopic({
                              variables: {
                                topic: state.topicId,
                              },
                            });
                            dispatch({
                              type: "CHANGE_TOPIC_SUBSCRIBE",
                              value: false,
                            });
                          } else {
                            await subscribeTopic({
                              variables: {
                                topic: state.topicId,
                              },
                            });
                            dispatch({
                              type: "CHANGE_TOPIC_SUBSCRIBE",
                              value: true,
                            });
                          }
                        }}
                      >
                        トピックの通知を
                        {state.topic.subscribe ? "無効化" : "有効化"}
                      </MenuItem>
                    ) : (
                      <MenuItem
                        onClick={() => {
                          setAnchorEl(null);
                        }}
                        to={routes.notifications.to({})}
                        component={Link}
                      >
                        ブラウザ通知設定
                      </MenuItem>
                    )
                  ) : null}

                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      dispatch({ type: "CLICK_OPEN_AUTO_SCROLL_MODAL" });
                    }}
                  >
                    自動スクロール
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      dispatch({ type: "CLICK_OPEN_JUMP_MODAL" });
                    }}
                  >
                    ジャンプ
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      dispatch({ type: "CLICK_OPEN_NG_MODAL" });
                    }}
                  >
                    NG
                  </MenuItem>
                </Menu>
              </div>
            </Paper>
            <InfiniteScroll<GA.ResFragment>
              itemToKey={(res) => res.id}
              renderItem={(res) => (
                <Res res={res} update={handleUpdateRes} ngs={ngs} />
              )}
              className={style.reses}
              items={reversedReses}
              jumpItemKey={state.jumpResId}
              onResetJumpItemKey={() => {
                dispatch({ type: "RESET_JUMP_RES" });
              }}
              onChangeCurrentItem={(res) =>
                dispatch({ type: "CHANGE_CURRENT_RES", res })
              }
              onScrollTop={() => dispatch({ type: "SCROLL_TO_LAST" })}
              onScrollBottom={() => dispatch({ type: "SCROLL_TO_FIRST" })}
              currentItemBase="bottom"
              autoScroll={
                state.isAutoScroll
                  ? { interval: 100, speed: state.autoScrollSpeed }
                  : undefined
              }
            />
            {state.existUnread ? (
              <div
                style={{
                  boxShadow: "0px 0px 5px 3px rgba(255, 0, 255, 0.7)",
                  zIndex: 2,
                }}
              />
            ) : null}
            {user.value !== null ? (
              <Paper className={style.resWrite}>
                <ResWrite topic={state.topic.id} reply={null} />
              </Paper>
            ) : null}
          </div>
        </>
      ) : null}
    </Page>
  );
};
