import { Icon, Menu, IconButton, MenuItem } from "@mui/material";
import * as React from "react";
import { imgur } from "../effects";
import { ErrorAlert } from "./error-alert";
import { Md } from "./md";
import { Modal } from "./modal";
import { Oekaki } from "./oekaki";
import { TextArea } from "./text-area";
import { rx, rxOps } from "../prelude";

export interface MdEditorProps {
  value: string;
  maxRows?: number;
  minRows?: number;
  onChange?: (newValue: string) => void;
  fullWidth?: boolean;
  onKeyPress?: React.KeyboardEventHandler<{}>;
  onKeyDown?: React.KeyboardEventHandler<{}>;
  actions?: React.ReactNode;
  onChangeFocus?: (isFocus: boolean) => void;
}

const defaultMinRows = 5;

export function MdEditor(props: MdEditorProps) {
  const [showOekaki, setShowOekaki] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);

  const [imageError, setImageError] = React.useState<string | undefined>(
    undefined
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const upload = (datas: Array<FormData>) => {
    rx.of(...datas)
      .pipe(
        rxOps.mergeMap((form) => imgur.upload(form)),
        rxOps.map((url) => `![](${url})`),
        rxOps.reduce((tags, tag) => tags + tag + "\n", "")
      )
      .subscribe(
        (tags) => {
          setImageError(undefined);
          props.onChange?.(props.value + tags);
        },
        () => {
          setImageError("アップロードに失敗しました");
        }
      );
  };

  return (
    <div
      onPaste={(e) => {
        const items = e.clipboardData.items;
        const datas = Array.from(items)
          .filter((x) => x.type.includes("image"))
          .map((x) => x.getAsFile())
          .filter<File>((x): x is File => x !== null)
          .map((x) => {
            const data = new FormData();
            data.append("image", x, "image.png");
            return data;
          });
        upload(datas);
      }}
    >
      <Modal isOpen={showOekaki} onRequestClose={() => setShowOekaki(false)}>
        <h1>お絵かき</h1>
        <ErrorAlert error={imageError} />
        <Oekaki size={{ x: 320, y: 240 }} onSubmit={(data) => upload([data])} />
      </Modal>
      <Modal isOpen={showImage} onRequestClose={() => setShowImage(false)}>
        <h1>画像アップロード</h1>
        <ErrorAlert error={imageError} />
        <input
          type="file"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            const files = target.files;
            if (files !== null) {
              const datas = Array.from(files).map((file) => {
                const formData = new FormData();
                formData.append("image", file);
                return formData;
              });
              upload(datas);
            }
          }}
        />
      </Modal>
      <Modal isOpen={showPreview} onRequestClose={() => setShowPreview(false)}>
        <h1>プレビュー</h1>
        <Md text={props.value} />
      </Modal>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={(evt) => setAnchorEl(evt.currentTarget)}>
            <Icon>menu</Icon>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setShowPreview(!showPreview);
              }}
            >
              プレビュー
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setShowImage(!showImage);
              }}
            >
              画像
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setShowOekaki(!showOekaki);
              }}
            >
              お絵かき
            </MenuItem>
          </Menu>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextArea
            rows={props.minRows || defaultMinRows}
            rowsMax={props.maxRows || defaultMinRows}
            value={props.value}
            onChange={(v) => {
              if (props.onChange) {
                props.onChange(v);
              }
            }}
            onKeyPress={props.onKeyPress}
            onKeyDown={props.onKeyDown}
            style={{
              backgroundColor: "#fff",
              outline: "none",
              resize: "none",
              border: "solid 1px #ccc",
            }}
            onFocus={() => {
              if (props.onChangeFocus) {
                props.onChangeFocus(true);
              }
            }}
            onBlur={() => {
              if (props.onChangeFocus) {
                props.onChangeFocus(false);
              }
            }}
          />
        </div>
        {props.actions !== undefined ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {props.actions}
          </div>
        ) : null}
      </div>
    </div>
  );
}
