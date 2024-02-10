import * as routes from "@anontown-frontend/routes";
import { Paper, Button, TextField } from "@mui/material";
import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";
import { ErrorAlert, Page } from "../components";
import { Env } from "../env";
import * as GA from "../generated/graphql-apollo";
import { createUserData } from "../effects";
import { useUserContext } from "../hooks";

export function SignupPage() {
  const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);
  const [sn, setSn] = React.useState("");
  const [pass, setPass] = React.useState("");

  const user = useUserContext();
  const [submit, { error }] = GA.useCreateUserMutation();

  return (
    <Page>
      <Helmet title="登録" />
      {user.value !== null ? (
        <Redirect to={routes.home.to({})} />
      ) : (
        <Paper>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const recaptcha = await recaptchaRef.current!.executeAsync();
              await submit({
                variables: {
                  sn,
                  pass,
                  recaptcha: recaptcha!,
                },
                onError: () => {
                  recaptchaRef.current!.reset();
                },
                onCompleted: async (x) => {
                  user.update(
                    await createUserData(
                      x.createUser.token as GA.TokenMasterFragment
                    )
                  );
                },
              });
            }}
          >
            <div>
              <TextField
                placeholder="ID"
                value={sn}
                onChange={(evt) => setSn(evt.target.value)}
                autoComplete="username"
              />
            </div>
            <div>
              <TextField
                placeholder="パスワード"
                value={pass}
                onChange={(evt) => setPass(evt.target.value)}
                type="password"
                autoComplete="new-password"
              />
            </div>
            <ReCAPTCHA
              sitekey={Env.recaptcha.siteKey}
              ref={recaptchaRef}
              size="invisible"
            />
            <div>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                target="_blank"
                href="https://document.anontown.com/terms.html"
              >
                利用規約(10行くらいしかないから読んでね)
              </a>
            </div>
            <div>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                target="_blank"
                href="https://document.anontown.com/privacy-policy.html"
              >
                プライバシーポリシー
              </a>
            </div>
            <div>
              <ErrorAlert error={error} />
              <Button variant="contained" type="submit">
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
