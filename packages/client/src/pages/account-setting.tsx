import { Paper, Button, TextField } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { ErrorAlert, Page, Snack } from "../components";
import * as GA from "../generated/graphql-apollo";
import { userSwitch, UserSwitchProps } from "../utils";

type AccountSettingPageProps = UserSwitchProps;

export const AccountSettingPage = userSwitch(
  (props: AccountSettingPageProps) => {
    const [snackMsg, setSnackMsg] = React.useState<string | null>(null);
    const [newPass, setNewPass] = React.useState("");
    const [oldPass, setOldPass] = React.useState("");

    const user = GA.useFindUserQuery();

    const [sn, setSn] = React.useState(
      user.data !== undefined ? user.data.user.sn : "",
    );
    const [updateUserSubmit] = GA.useUpdateUserMutation();
    const [createTokenMasterSubmit] = GA.useCreateTokenMasterMutation();

    return (
      <Page>
        <Paper>
          <Helmet title="アカウント設定" />
          <Snack msg={snackMsg} onHide={() => setSnackMsg(null)} />
          {user.error !== undefined ? (
            <ErrorAlert error="ユーザー情報取得に失敗しました" />
          ) : null}
          {user.loading ? <div>loading</div> : null}
          {user.data !== undefined ? (
            <form>
              <TextField
                placeholder="ID"
                value={sn}
                onChange={(evt) => setSn(evt.target.value)}
              />
              <TextField
                placeholder="新しいパスワード"
                value={newPass}
                onChange={(evt) => setNewPass(evt.target.value)}
              />
              <TextField
                placeholder="現在のパスワード"
                value={oldPass}
                onChange={(evt) => setOldPass(evt.target.value)}
              />
              <Button
                onClick={async () => {
                  if (user.data !== undefined) {
                    try {
                      await updateUserSubmit({
                        variables: {
                          sn,
                          pass: newPass,
                          auth: { id: user.data.user.id, pass: oldPass },
                        },
                      });
                      const token = await createTokenMasterSubmit({
                        variables: {
                          auth: { id: user.data.user.id, pass: newPass },
                        },
                      });
                      if (token.data) {
                        props.updateUserData({
                          ...props.userData,
                          token: token.data
                            .createTokenMaster as GA.TokenMasterFragment,
                        });
                      }
                    } catch (e) {
                      setSnackMsg(String(e));
                    }
                  }
                }}
                variant="contained"
              >
                OK
              </Button>
            </form>
          ) : null}
        </Paper>
      </Page>
    );
  },
);
