import * as routes from "@anontown-frontend/routes";
import { MenuItem, Select, Paper, Button, TextField } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { ErrorAlert, MdEditor, Modal, Page, TagsInput } from "../components";
import * as GA from "../generated/graphql-apollo";
import { userSwitch } from "../utils";
import { useMutation } from "@apollo/client";

export const TopicCreatePage = userSwitch(() => {
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState<ReadonlyArray<string>>([]);
  const [text, setText] = React.useState("");
  const [type, setType] = React.useState<"TopicNormal" | "TopicOne">(
    "TopicOne"
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const history = useHistory();
  const [submit, { error }] = useMutation<
    GA.CreateTopicNormalMutation | GA.CreateTopicOneMutation,
    GA.CreateTopicNormalMutationVariables | GA.CreateTopicOneMutationVariables
  >(
    type === "TopicNormal"
      ? GA.CreateTopicNormalDocument
      : GA.CreateTopicOneDocument,
    {
      variables: {
        title: title,
        tags: tags,
        text: text,
      },
      onCompleted: (x) => {
        history.push(
          routes.topic.to({
            id: ("createTopicNormal" in x
              ? x.createTopicNormal
              : x.createTopicOne
            ).id,
          })
        );
      },
    }
  );

  return (
    <Page>
      <Helmet title="トピック作成" />
      <Paper>
        <form>
          <Modal
            isOpen={openDialog}
            onRequestClose={() => setOpenDialog(false)}
          >
            <h1>確認</h1>
            ニュース・ネタ・実況などは単発トピックで建てて下さい。
            <br />
            本当に建てますか？
            <Button
              onClick={() => {
                setOpenDialog(false);
                submit();
              }}
              variant="contained"
            >
              はい
            </Button>
            <Button onClick={() => setOpenDialog(false)} variant="contained">
              いいえ
            </Button>
          </Modal>
          <ErrorAlert error={error} />
          <div>
            <Select
              label="種類"
              value={type}
              onChange={(evt) =>
                setType(evt.target.value as "TopicNormal" | "TopicOne")
              }
            >
              <MenuItem value="TopicOne">単発</MenuItem>
              <MenuItem value="TopicNormal">通常</MenuItem>
            </Select>
          </div>
          <div>
            <TextField
              placeholder="タイトル"
              value={title}
              onChange={(evt) => setTitle(evt.target.value)}
            />
          </div>
          <div>
            <TagsInput value={tags} onChange={(v) => setTags(v)} />
          </div>
          <MdEditor value={text} onChange={(v) => setText(v)} />
          <div>
            <Button
              onClick={() => {
                if (type === "TopicNormal") {
                  setOpenDialog(true);
                } else {
                  submit();
                }
              }}
            >
              トピック作成
            </Button>
          </div>
        </form>
      </Paper>
    </Page>
  );
});
