import * as React from "react";
import * as style from "./check-box.module.scss";

interface CheckBoxProps {
  value: boolean;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  checkBoxStyle?: React.CSSProperties;
  onChange: (v: boolean) => void;
  label: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function CheckBox(props: CheckBoxProps) {
  return (
    <label style={props.style}>
      <input
        type="checkbox"
        checked={props.value}
        style={props.checkBoxStyle}
        className={style.checkbox}
        onChange={(e) => props.onChange(e.target.checked)}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
      <span style={props.labelStyle}>{props.label}</span>
    </label>
  );
}
