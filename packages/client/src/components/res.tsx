import * as routes from "@anontown-frontend/routes";
import { Icon, IconButton, Paper, MenuItem, Menu } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import * as uuid from "uuid";
import * as G from "../generated/graphql";
import { useUserContext } from "../hooks";
import { ng, Sto } from "../domains/entities";
import { color, fontSize } from "../styled/constant";
import { dateFormat } from "../utils";
import { Md } from "./md";
import { ResWrite } from "./res-write";
import { Snack } from "./snack";
import { isNullish } from "../utils/isNullish";
import { useBackground } from "../hooks/useBackground";

interface ResProps {
  res: G.ResFragment;
  update?: (res: G.ResFragment) => void;
}

export const Res = React.memo((props: ResProps) => {
  const [isReply, setIsReply] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState<string | null>(null);
  const [disableNG, setDisableNG] = React.useState(false);
  const user = useUserContext();
  const background = useBackground();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const small = {
    width: 36,
    height: 36,
    padding: 8,
  };

  const [submitVote] = G.useVoteResMutation();

  return user.value !== null &&
    !props.res.self &&
    !disableNG &&
    Sto.getNG(user.value.storage).some((x) => ng.isNG(x, props.res)) ? (
    <Paper>
      あぼーん<a onClick={() => setDisableNG(true)}>[見る]</a>
    </Paper>
  ) : (
    <Paper>
      <Snack msg={snackMsg} onHide={() => setSnackMsg(null)} />
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: 48,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton
            onClick={() => {
              submitVote({
                variables: {
                  res: props.res.id,
                  type: props.res.voteFlag === "uv" ? "cv" : "uv",
                },
              })
                .then(({ data }) => {
                  if (props.update !== undefined && data) {
                    props.update(data.voteRes);
                  }
                })
                .catch(() => {
                  setSnackMsg("投票に失敗しました");
                });
            }}
            disabled={props.res.self || user.value === null}
          >
            <Icon color={props.res.voteFlag === "uv" ? "primary" : undefined}>
              keyboard_arrow_up
            </Icon>
          </IconButton>
          <IconButton
            onClick={() => {
              submitVote({
                variables: {
                  res: props.res.id,
                  type: props.res.voteFlag === "dv" ? "cv" : "dv",
                },
              })
                .then(({ data }) => {
                  if (props.update !== undefined && data) {
                    props.update(data.voteRes);
                  }
                })
                .catch(() => {
                  setSnackMsg("投票に失敗しました");
                });
            }}
            disabled={props.res.self || user.value === null}
          >
            <Icon color={props.res.voteFlag === "dv" ? "primary" : undefined}>
              keyboard_arrow_down
            </Icon>
          </IconButton>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              backgroundColor: props.res.self
                ? color.primary
                : props.res.__typename === "ResNormal" && props.res.isReply
                ? color.secondary
                : undefined,
              fontSize: fontSize.sub,
            }}
          >
            <a onClick={() => setIsReply(!isReply)}>{">>"}</a>
            &nbsp;
            {props.res.__typename === "ResNormal" && props.res.name !== null ? (
              <span>{props.res.name}</span>
            ) : null}
            {props.res.__typename === "ResNormal" &&
            props.res.name === null &&
            props.res.profile === null ? (
              <span>名無しさん</span>
            ) : null}
            {props.res.__typename === "ResHistory" ? (
              <span>トピックデータ</span>
            ) : null}
            {(props.res.__typename as any) === "ResTopic" ? (
              <span>トピ主</span>
            ) : null}
            {props.res.__typename === "ResFork" ? (
              <span>派生トピック</span>
            ) : null}
            {props.res.__typename === "ResDelete" ? <span>削除</span> : null}
            {props.res.__typename === "ResNormal" &&
            !isNullish(props.res.profile) ? (
              <Link
                to={routes.profile.to(
                  { id: props.res.profile.id },
                  {
                    state: {
                      background,
                    },
                  }
                )}
              >
                @{props.res.profile.sn}
              </Link>
            ) : null}
            &nbsp;
            <Link
              to={routes.res.to(
                { id: props.res.id, topic: props.res.topic.id },
                { state: { background } }
              )}
            >
              {dateFormat.format(props.res.date)}
            </Link>
            &nbsp;
            <Link
              to={routes.hash.to(
                { hash: props.res.hash, topic: props.res.topic.id },
                {
                  state: {
                    background,
                  },
                }
              )}
            >
              #{props.res.hash.substr(0, 6)}
            </Link>
            &nbsp;
            <span>{props.res.uv - props.res.dv}vote</span>
            {user.value !== null ? (
              <>
                <IconButton
                  style={{ width: "32px", height: "32px", padding: "0px" }}
                  onClick={(evt) => setAnchorEl(evt.currentTarget)}
                >
                  <Icon style={{ fontSize: "10px" }}>keyboard_arrow_down</Icon>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  {props.res.self && props.res.__typename === "ResNormal" ? (
                    <G.DelResComponent
                      variables={{ res: props.res.id }}
                      onCompleted={(data) => {
                        if (props.update) {
                          props.update(data.delRes);
                        }
                      }}
                    >
                      {(submit, { error }) => {
                        return (
                          <>
                            {error && <Snack msg={"削除に失敗しました"} />}
                            <MenuItem
                              onClick={() => {
                                setAnchorEl(null);
                                submit();
                              }}
                            >
                              削除
                            </MenuItem>
                          </>
                        );
                      }}
                    </G.DelResComponent>
                  ) : null}
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      if (user.value !== null) {
                        user.update({
                          ...user.value,
                          storage: Sto.addNG({
                            id: uuid.v4(),
                            name: `HASH:${props.res.hash}`,
                            topic: props.res.topic.id,
                            date: new Date(),
                            expirationDate: null,
                            node: {
                              type: "hash",
                              id: uuid.v4(),
                              hash: props.res.hash,
                            },
                          })(user.value.storage),
                        });
                      }
                    }}
                  >
                    NG HASH
                  </MenuItem>
                  {props.res.__typename === "ResNormal" &&
                  props.res.profile !== null ? (
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        if (
                          user.value !== null &&
                          props.res.__typename === "ResNormal" &&
                          !isNullish(props.res.profile)
                        ) {
                          user.update({
                            ...user.value,
                            storage: Sto.addNG({
                              id: uuid.v4(),
                              name: `Profile:${props.res.profile.id}`,
                              topic: null,
                              date: new Date(),
                              expirationDate: null,
                              node: {
                                type: "profile",
                                id: uuid.v4(),
                                profile: props.res.profile.id,
                              },
                            })(user.value.storage),
                          });
                        }
                      }}
                    >
                      NG Profile
                    </MenuItem>
                  ) : null}
                </Menu>
              </>
            ) : null}
          </div>
          <div>
            <span>
              {props.res.__typename === "ResNormal" &&
              !isNullish(props.res.reply) ? (
                <IconButton
                  component={Link}
                  to={routes.res.to(
                    { id: props.res.reply.id, topic: props.res.topic.id },
                    { state: { background } }
                  )}
                  style={small}
                  size="small"
                >
                  <Icon>send</Icon>
                </IconButton>
              ) : null}
              {props.res.replyCount !== 0 ? (
                <span>
                  <IconButton
                    component={Link}
                    to={routes.resReply.to(
                      { id: props.res.id, topic: props.res.topic.id },
                      { state: { background } }
                    )}
                    style={small}
                    size="small"
                  >
                    <Icon>reply</Icon>
                  </IconButton>
                  {props.res.replyCount}
                </span>
              ) : null}
            </span>
            {props.res.__typename === "ResNormal" ? (
              <Md text={props.res.text} />
            ) : props.res.__typename === "ResHistory" ? (
              <Md text={props.res.history.text} />
            ) : (props.res.__typename as any) === "ResTopic" &&
              props.res.topic.__typename === "TopicOne" ? (
              <Md text={props.res.topic.text} />
            ) : null}
            {props.res.__typename === ("ResTopic" as any) &&
            props.res.topic.__typename === "TopicFork" ? (
              <div>
                <p>派生トピックが建ちました。</p>
              </div>
            ) : null}
            {props.res.__typename === "ResFork" ? (
              <div>
                <p>
                  派生トピック:
                  <Link to={routes.topic.to({ id: props.res.fork.id })}>
                    {props.res.fork.title}
                  </Link>
                </p>
              </div>
            ) : null}

            {props.res.__typename === "ResDelete" ? (
              <div>
                <p>
                  {props.res.flag === "self"
                    ? "投稿者により削除されました。"
                    : "管理人により削除されました。"}
                </p>
              </div>
            ) : null}
            {isReply && user.value !== null ? (
              <Paper>
                <ResWrite
                  topic={props.res.topic.id}
                  reply={props.res.id}
                  userData={user.value}
                  changeStorage={(x) => {
                    if (user.value !== null) {
                      user.update({
                        ...user.value,
                        storage: x,
                      });
                    }
                  }}
                />
              </Paper>
            ) : null}
          </div>
        </div>
      </div>
    </Paper>
  );
});
