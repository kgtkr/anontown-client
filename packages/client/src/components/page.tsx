import { CircularProgress, Icon, IconButton } from "@mui/material";
import React, { useState } from "react";
import * as style from "./page.module.scss";

export interface PageProps {
  sidebar?: React.ReactNode;
  disableScroll?: boolean;
  children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({
  sidebar,
  disableScroll,
  children,
}) => {
  const [isLeft, setIsLeft] = useState(false);

  return (
    <div
      style={{
        height: "100%",
      }}
      className={sidebar !== undefined ? style.two : undefined}
    >
      {sidebar !== undefined ? (
        <aside
          style={{
            height: "100%",
            width: isLeft ? 256 : 50,
            maxWidth: "26vw",
          }}
        >
          <IconButton onClick={() => setIsLeft(!isLeft)}>
            <Icon>{isLeft ? "chevron_left" : "chevron_right"}</Icon>
          </IconButton>
          {isLeft ? (
            <React.Suspense fallback={<CircularProgress />}>
              {sidebar}
            </React.Suspense>
          ) : null}
        </aside>
      ) : null}
      <main
        style={{
          height: "100%",
        }}
        className={!disableScroll ? style.mainScroll : undefined}
      >
        <React.Suspense fallback={<CircularProgress />}>
          {children}
        </React.Suspense>
      </main>
    </div>
  );
};
