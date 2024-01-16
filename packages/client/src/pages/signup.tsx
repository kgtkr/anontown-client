import * as routes from "@anontown-frontend/routes";
import { Paper, Button, TextField } from "@mui/material";
import * as React from "react";
import Recaptcha from "react-google-recaptcha";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";
import { ErrorAlert, Page } from "../components";
import { Env } from "../env";
import * as GA from "../generated/graphql-apollo";
import { createUserData } from "../effects";
import { useUserContext } from "../hooks";

export function SignupPage() {
  const recaptchaRef = React.useRef<any>(null);
  const [sn, setSn] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [recaptcha, setRecaptcha] = React.useState<string | null>(null);

  const user = useUserContext();
  const [submit, { error }] = GA.useCreateUserMutation({
    onError: () => {
      const rc = recaptchaRef.current;
      if (rc) {
        rc.reset();
      }
    },
    onCompleted: async (x) => {
      user.update(
        await createUserData(x.createUser.token as GA.TokenMasterFragment),
      );
    },
    variables: {
      sn,
      pass,
      recaptcha: recaptcha!,
    },
  });

  return (
    <Page>
      <Helmet title="登録" />
      {user.value !== null ? (
        <Redirect to={routes.home.to({})} />
      ) : (
        <Paper>
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
            <Recaptcha
              sitekey={Env.recaptcha.siteKey}
              ref={recaptchaRef}
              onChange={(v: string) => setRecaptcha(v)}
            />
            <div>
              <a
                target="_blank"
                href="https://document.anontown.com/terms.html"
                rel="noopener noreferrer"
              >
                利用規約(10行くらいしかないから読んでね)
              </a>
            </div>
            <div>
              <ErrorAlert error={error} />
              <Button onClick={() => submit()} variant="contained">
                利用規約に同意して登録
              </Button>
            </div>
            <Link to={routes.login.to({})}>ログイン</Link>
          </form>
        </Paper>
      )}
    </Page>
  );
}
