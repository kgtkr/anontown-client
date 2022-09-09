import { Icon, IconButton } from "@mui/material";
import * as React from "react";
import * as style from "./page.module.scss";

export interface PageProps {
  sidebar?: React.ReactNode;
  disableScroll?: boolean;
  children?: React.ReactNode;
}

interface PageState {
  isLeft: boolean;
}

export class Page extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      isLeft: false,
    };
  }
  render() {
    return (
      <div
        style={{
          height: "100%",
        }}
        className={this.props.sidebar !== undefined ? style.two : undefined}
      >
        {this.props.sidebar !== undefined ? (
          <aside
            style={{
              height: "100%",
              width: this.state.isLeft ? 256 : 50,
              maxWidth: "26vw",
            }}
          >
            <IconButton
              onClick={() => this.setState({ isLeft: !this.state.isLeft })}
            >
              <Icon>
                {this.state.isLeft ? "chevron_left" : "chevron_right"}
              </Icon>
            </IconButton>
            {this.state.isLeft ? this.props.sidebar : null}
          </aside>
        ) : null}
        <main
          style={{
            height: "100%",
          }}
          className={!this.props.disableScroll ? style.mainScroll : undefined}
        >
          {this.props.children}
        </main>
      </div>
    );
  }
}
