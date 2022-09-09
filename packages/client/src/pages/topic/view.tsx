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
} from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";
import { useTitle } from "react-use";
import useRouter from "use-react-router";
import { Modal, NG, Page, Res, ResWrite, TopicFavo } from "../../components";
import * as G from "../../generated/graphql";
import { useUserContext } from "../../hooks";
import * as style from "./style.module.scss";
import { RA } from "../../prelude";
import { Sto } from "../../domains/entities";
import { InfiniteScroll } from "../../components/infinite-scroll";
import { useReducerWithObservable } from "../../hooks/use-reducer-with-observable";
import { reducer } from "./reducer";
import { State } from "./state";
import { epic } from "./epic";
import { useBackground } from "../../hooks/useBackground";

// TODO:NGのtransparent

export const TopicPage = (_props: {}) => {
  const { match } = useRouter<{ id: string }>();
  const user = useUserContext();
  const apolloClient = useApolloClient();
  const background = useBackground();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [state, dispatch] = useReducerWithObservable(
    reducer,
    State({ userData: user.value, topicId: match.params.id }),
    epic,
    { apolloClient: apolloClient, updateUserData: (ud) => user.update(ud) }
  );

  React.useEffect(() => {
    dispatch({ type: "UPDATE_USER_DATA", userData: user.value });
  }, [user.value]);

  React.useEffect(() => {
    dispatch({ type: "INIT", topicId: match.params.id, now: new Date() });
  }, [match.params.id]);

  const isFavo =
    state.userData !== null &&
    Sto.isTopicFavo(state.topicId)(state.userData.storage);

  useTitle(state.topic?.title ?? "トピック");

  const reversedReses = React.useMemo(
    () => (state.reses !== null ? RA.reverse(state.reses) : null),
    [state.reses]
  );

  const handleUpdateRes = React.useCallback((res: G.ResFragment) => {
    dispatch({ type: "UPDATE_RES", res });
  }, []);

  return (
    <Page
      disableScroll={true}
      sidebar={
        state.userData !== null ? (
          <TopicFavo detail={false} userData={state.userData} />
        ) : undefined
      }
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
          {state.userData !== null ? (
            <Modal
              isOpen={state.isNGDialog}
              onRequestClose={() => dispatch({ type: "CLICK_CLOSE_NG_MODAL" })}
            >
              <h1>NG</h1>
              <NG
                userData={state.userData}
                onChangeStorage={(v) => {
                  dispatch({ type: "UPDATE_NG", storage: v });
                }}
              />
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
                {state.userData !== null ? (
                  <IconButton
                    onClick={() => {
                      dispatch({ type: "TOGGLE_FAVO" });
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
                  state.userData !== null ? (
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
            <InfiniteScroll<G.ResFragment>
              itemToKey={(res) => res.id}
              renderItem={(res) => <Res res={res} update={handleUpdateRes} />}
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
            {state.userData !== null ? (
              <Paper className={style.resWrite}>
                <ResWrite
                  topic={state.topic.id}
                  reply={null}
                  userData={state.userData}
                  changeStorage={(storage) => {
                    dispatch({ type: "SUBMIT_RES", storage });
                  }}
                />
              </Paper>
            ) : null}
          </div>
        </>
      ) : null}
    </Page>
  );
};
