import { Checkbox, TextField } from "@material-ui/core";
import * as React from "react";
import { ng } from "../../domains/entities";

export interface NGMatcherEditorProps {
  matcher: ng.NGNodeTextMatcher;
  onChange: (text: ng.NGNodeTextMatcher) => void;
  placeholder?: string;
}
export function NGMatcherEditor(
  props: NGMatcherEditorProps
): React.ReactElement<any> {
  return (
    <div>
      正規表現
      <Checkbox
        checked={props.matcher.type === "reg"}
        onChange={(evt) => {
          if (evt.target.checked) {
            props.onChange({
              ...props.matcher,
              type: "reg",
            });
          } else {
            props.onChange({
              ...props.matcher,
              type: "text",
            });
          }
        }}
      />
      大小文字区別しない
      <Checkbox
        checked={props.matcher.i}
        onChange={(evt) => {
          props.onChange({
            ...props.matcher,
            i: evt.target.checked,
          });
        }}
      />
      <TextField
        multiline={true}
        placeholder={props.placeholder}
        value={props.matcher.source}
        onChange={(evt) => {
          props.onChange({
            ...props.matcher,
            source: evt.target.value,
          });
        }}
      />
    </div>
  );
}
