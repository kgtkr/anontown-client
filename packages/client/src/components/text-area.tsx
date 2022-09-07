import * as React from "react";
import * as style from "./text-area.module.scss";

interface TextAreaProps {
  value: string;
  onChange: (v: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  rows?: number;
  rowsMax?: number;
  onKeyDown?: React.KeyboardEventHandler<{}>;
  onKeyUp?: React.KeyboardEventHandler<{}>;
  onKeyPress?: React.KeyboardEventHandler<{}>;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function TextArea(props: TextAreaProps) {
  return (
    <textarea
      className={style.textarea}
      style={props.style}
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      onKeyPress={props.onKeyPress}
      rows={Math.max(
        props.rows ?? 1,
        Math.min(props.value.split("\n").length, props.rowsMax ?? Infinity)
      )}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  );
}
