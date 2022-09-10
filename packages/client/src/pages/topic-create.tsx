import * as routes from "@anontown-frontend/routes";
import { Mutation } from "@apollo/client/react/components";
import { MenuItem, Select } from "@mui/material";
import { Paper, Button, TextField } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Errors, MdEditor, Modal, Page, TagsInput } from "../components";
import * as G from "../generated/graphql";
import { userSwitch, UserSwitchProps } from "../utils";

type TopicCreatePageProps = RouteComponentProps<{}> & UserSwitchProps;

export interface TopicCreatePageState {
  title: string;
  tags: ReadonlyArray<string>;
  text: string;
  type: "TopicNormal" | "TopicOne";
  openDialog: boolean;
}

export const TopicCreatePage = userSwitch(
  withRouter(
    class extends React.Component<TopicCreatePageProps, TopicCreatePageState> {
      constructor(props: TopicCreatePageProps) {
        super(props);
        this.state = {
          title: "",
          tags: [],
          text: "",
          type: "TopicOne",
          openDialog: false,
        };
      }

      render() {
        return (
          <Page>
            <Helmet title="トピック作成" />
            <Paper>
              <Mutation<
                G.CreateTopicNormalMutation | G.CreateTopicOneMutation,
                | G.CreateTopicNormalMutationVariables
                | G.CreateTopicOneMutationVariables
              >
                mutation={
                  this.state.type === "TopicNormal"
                    ? G.CreateTopicNormalDocument
                    : G.CreateTopicOneDocument
                }
                variables={{
                  title: this.state.title,
                  tags: this.state.tags,
                  text: this.state.text,
                }}
                onCompleted={(x) => {
                  this.props.history.push(
                    routes.topic.to({
                      id: ("createTopicNormal" in x
                        ? x.createTopicNormal
                        : x.createTopicOne
                      ).id,
                    })
                  );
                }}
              >
                {(submit, { error }) => {
                  return (
                    <form>
                      <Modal
                        isOpen={this.state.openDialog}
                        onRequestClose={() =>
                          this.setState({ openDialog: false })
                        }
                      >
                        <h1>確認</h1>
                        ニュース・ネタ・実況などは単発トピックで建てて下さい。
                        <br />
                        本当に建てますか？
                        <Button
                          onClick={() => {
                            this.setState({ openDialog: false });
                            submit();
                          }}
                          variant="contained"
                        >
                          はい
                        </Button>
                        <Button
                          onClick={() => this.setState({ openDialog: false })}
                          variant="contained"
                        >
                          いいえ
                        </Button>
                      </Modal>
                      {error && <Errors errors={[String(error)]} />}
                      <div>
                        <Select
                          label="種類"
                          value={this.state.type}
                          onChange={(evt) =>
                            this.setState({
                              type: evt.target.value as
                                | "TopicNormal"
                                | "TopicOne",
                            })
                          }
                        >
                          <MenuItem value="TopicOne">単発</MenuItem>
                          <MenuItem value="TopicNormal">通常</MenuItem>
                        </Select>
                      </div>
                      <div>
                        <TextField
                          placeholder="タイトル"
                          value={this.state.title}
                          onChange={(evt) =>
                            this.setState({ title: evt.target.value })
                          }
                        />
                      </div>
                      <div>
                        <TagsInput
                          value={this.state.tags}
                          onChange={(v) => this.setState({ tags: v })}
                        />
                      </div>
                      <MdEditor
                        value={this.state.text}
                        onChange={(v) => this.setState({ text: v })}
                      />
                      <div>
                        <Button
                          onClick={() => {
                            if (this.state.type === "TopicNormal") {
                              this.setState({ openDialog: true });
                            } else {
                              submit();
                            }
                          }}
                        >
                          トピック作成
                        </Button>
                      </div>
                    </form>
                  );
                }}
              </Mutation>
            </Paper>
          </Page>
        );
      }
    }
  )
);
