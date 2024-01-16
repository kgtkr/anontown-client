import * as routes from "@anontown-frontend/routes";
import { Paper, Button, TextField } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";
import { ErrorAlert, Page } from "../components";
import * as GA from "../generated/graphql-apollo";
import { useUserContext } from "../hooks";
import { createUserData } from "../effects";

interface LoginPageProps {}

export const LoginPage = (_props: LoginPageProps) => {
  const [sn, setSn] = React.useState("");
  const [pass, setPass] = React.useState("");

  const userContext = useUserContext();
  const [submit, { error }] = GA.useCreateTokenMasterMutation();

  return (
    <Page>
      <Helmet title="ログイン" />
      {userContext.value !== null ? (
        <Redirect to={routes.home.to({})} />
      ) : (
        <Paper>
          <ErrorAlert error={error} />
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
                        token.data.createTokenMaster as GA.TokenMasterFragment,
                      ),
                    );
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
