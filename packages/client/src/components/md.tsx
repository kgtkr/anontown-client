import { FontIcon, IconButton } from "material-ui";
import * as React from "react";
import { Rnd } from "react-rnd";
import { Link } from "react-router-dom";
import { mdParser, safeURL } from "../utils";
import { camo } from "../effects";

import * as style from "./md.module.scss";
import { Modal } from "./modal";
import { Env } from "../env";
import rehypeReact from "rehype-react";

type URLType =
  | { type: "normal"; url: string }
  | { type: "router"; path: string }
  | { type: "youtube"; videoID: string }
  | { type: "image"; url: string };

export interface MdProps {
  text: string;
}

function reactProcessor() {
  return mdParser.rehypeProcessor().use(rehypeReact, {
    createElement: React.createElement,
    components: {
      a: MdLink as any,
      img: MdImg as any,
    },
  });
}

export function Md(props: MdProps): JSX.Element {
  const node = React.useMemo(
    () => reactProcessor().processSync(props.text).result,
    [props.text]
  );

  return (
    <div style={{ padding: "2px" }} className={style.md}>
      {node}
    </div>
  );
}

interface MdYouTubeProps {
  title?: string;
  videoID: string;
}

function MdYouTube(props: MdYouTubeProps) {
  const [slow, setSlow] = React.useState(false);

  return (
    <>
      <img
        className={style.preview}
        src={`https://i.ytimg.com/vi/${props.videoID}/maxresdefault.jpg`}
        title={props.title || undefined}
        onClick={() => setSlow(true)}
      />
      {slow ? (
        <Rnd
          default={{
            x: 0,
            y: 0,
            width: (window.innerWidth / 3) * 2,
            height: window.innerWidth / 3,
          }}
          style={{
            backgroundColor: "#555",
          }}
        >
          <IconButton type="button" onClick={() => setSlow(false)}>
            <FontIcon className="material-icons">close</FontIcon>
          </IconButton>
          <div className={style.youtube}>
            <iframe
              src={`https://www.youtube.com/embed/${props.videoID}`}
              frameBorder="0"
            />
          </div>
        </Rnd>
      ) : null}
    </>
  );
}

function urlEnum(url: string): URLType {
  const reg = /(youtube\.com\/watch\?v=|youtu\.be\/)([a-z0-9_]+)/i.exec(url);
  if (reg) {
    return { type: "youtube", videoID: reg[2] };
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return {
      type: "router",
      path: url,
    };
  }

  if (url.startsWith(Env.client.origin)) {
    return {
      type: "router",
      path: url.substring(Env.client.origin.length),
    };
  }

  if (/\.(jpg|jpeg|png|gif|bmp|tif|tiff|svg)$/i.test(url)) {
    return { type: "image", url };
  }

  return { type: "normal", url };
}

function MdLink({
  href,
  children,
  title,
}: {
  href: string;
  children: JSX.Element;
  title?: string;
}) {
  const link = urlEnum(href);
  switch (link.type) {
    case "normal":
      return (
        <a
          href={safeURL(href)}
          target="_blank"
          title={title}
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    case "image":
      return <MdImg url={safeURL(href)} title={title} />;
    case "youtube":
      return <MdYouTube videoID={link.videoID} title={title} />;
    case "router":
      return <Link to={link.path}>{children}</Link>;
  }
}

interface MdImgProps {
  url: string;
  title?: string;
  alt?: string;
}

function MdImg(props: MdImgProps) {
  const [dialog, setDialog] = React.useState(false);

  return (
    <>
      <img
        className={style.preview}
        src={camo.getCamoUrl(props.url)}
        title={props.title}
        alt={props.alt}
        onClick={() => setDialog(true)}
      />
      <Modal isOpen={dialog} onRequestClose={() => setDialog(false)}>
        <img
          style={{
            width: "50vw",
            height: "auto",
          }}
          src={camo.getCamoUrl(props.url)}
          title={props.title}
          alt={props.alt}
          onClick={() => setDialog(true)}
        />
      </Modal>
    </>
  );
}
