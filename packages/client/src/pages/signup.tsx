import * as routes from "@anontown-frontend/routes";
import { Paper, Button, TextField } from "@mui/material";
import * as React from "react";
import Recaptcha from "react-google-recaptcha";
import { Helmet } from "react-helmet-async";
import { Link, Redirect } from "react-router-dom";
import { Errors, Page } from "../components";
import { Env } from "../env";
import * as G from "../generated/graphql";
import { UserContext } from "../hooks";
import { createUserData } from "../effects";

interface SignupPageState {
  sn: string;
  pass: string;
  errors?: Array<string>;
  recaptcha: string | null;
}

export const SignupPage = class extends React.Component<{}, SignupPageState> {
  recaptchaRef = React.createRef<any>();

  constructor(props: {}) {
    super(props);
    this.state = {
      sn: "",
      pass: "",
      recaptcha: null,
    };
  }

  render() {
    return (
      <Page>
        <Helmet title="登録" />
        <UserContext.Consumer>
          {(user) =>
            user.value !== null ? (
              <Redirect to={routes.home.to({})} />
            ) : (
              <Paper>
                <form>
                  <Errors errors={this.state.errors} />
                  <div>
                    <TextField
                      placeholder="ID"
                      value={this.state.sn}
                      onChange={(evt) =>
                        this.setState({ sn: evt.target.value })
                      }
                    />
                  </div>
                  <div>
                    <TextField
                      placeholder="パスワード"
                      value={this.state.pass}
                      onChange={(evt) =>
                        this.setState({ pass: evt.target.value })
                      }
                      type="password"
                    />
                  </div>
                  <Recaptcha
                    sitekey={Env.recaptcha.siteKey}
                    ref={this.recaptchaRef}
                    onChange={(v: string) => this.setState({ recaptcha: v })}
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

                  <G.CreateUserComponent
                    onError={() => {
                      const rc = this.recaptchaRef.current;
                      if (rc) {
                        rc.reset();
                      }
                      this.setState({
                        errors: ["アカウント作成に失敗しました"],
                      });
                    }}
                    onCompleted={async (x) => {
                      user.update(
                        await createUserData(
                          x.createUser.token as G.TokenMasterFragment
                        )
                      );
                    }}
                    variables={{
                      sn: this.state.sn,
                      pass: this.state.pass,
                      recaptcha: this.state.recaptcha!,
                    }}
                  >
                    {(create) => (
                      <div>
                        <Button onClick={() => create()} variant="contained">
                          利用規約に同意して登録
                        </Button>
                      </div>
                    )}
                  </G.CreateUserComponent>
                  <Link to={routes.login.to({})}>ログイン</Link>
                </form>
              </Paper>
            )
          }
        </UserContext.Consumer>
      </Page>
    );
  }
};
