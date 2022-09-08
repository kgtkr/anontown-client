import * as routes from "@anontown-frontend/routes";
import { Paper, Button, TextField } from "@material-ui/core";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";
import { Errors, Page } from "../components";
import * as G from "../generated/graphql";
import { useUserContext } from "../hooks";
import { createUserData } from "../effects";

interface LoginPageProps {}

export const LoginPage = (_props: LoginPageProps) => {
  const [sn, setSn] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [errors, setErrors] = React.useState<Array<string> | undefined>(
    undefined
  );
  const userContext = useUserContext();
  const [submit] = G.useCreateTokenMasterMutation();

  return (
    <Page>
      <Helmet title="ログイン" />
      {userContext.value !== null ? (
        <Redirect to={routes.home.to({})} />
      ) : (
        <Paper>
          <Errors errors={errors} />
          <form>
            <div>
              <TextField
                placeholder="ID"
                value={sn}
                onChange={(evt) => setSn(evt.target.value)}
              />
            </div>
            <div>
              <TextField
                placeholder="パスワード"
                value={pass}
                onChange={(evt) => setPass(evt.target.value)}
                type="password"
              />
            </div>
            <div>
              <Button
                onClick={async () => {
                  try {
                    const token = await submit({
                      variables: {
                        auth: {
                          sn,
                          pass,
                        },
                      },
                    });
                    if (token.data) {
                      userContext.update(
                        await createUserData(
                          token.data.createTokenMaster as G.TokenMasterFragment
                        )
                      );
                    }
                  } catch {
                    setErrors(["ログインに失敗しました。"]);
                  }
                }}
                variant="contained"
              >
                ログイン
              </Button>
            </div>
            <Link to={routes.signup.to({})}>登録</Link>
          </form>
        </Paper>
      )}
    </Page>
  );
};
