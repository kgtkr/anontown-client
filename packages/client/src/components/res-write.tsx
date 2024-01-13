import { Icon, IconButton } from "@mui/material";

import { useCounter } from "react-use";
import * as GA from "../generated/graphql-apollo";
import { useInputCache } from "../hooks";
import { Storage, UserData, Sto } from "../domains/entities";
import { CheckBox } from "./check-box";
import { ErrorAlert } from "./error-alert";
import { MdEditor } from "./md-editor";
import { Select } from "./select";
import { TextField } from "./text-field";
import { pipe } from "../prelude";

interface ResWriteProps {
  onSubmit?: (value: GA.ResNormalFragment) => void;
  topic: string;
  reply: string | null;
  userData: UserData;
  changeStorage: (data: Storage) => void;
}

export const ResWrite = (props: ResWriteProps) => {
  function updateTopicWrite(f: (topicWrite: Sto.TopicWrite) => Sto.TopicWrite) {
    props.changeStorage(
      Sto.modifyTopicWrite(props.topic, f)(props.userData.storage)
    );
  }

  const data = Sto.getTopicWrite(props.topic)(props.userData.storage);

  const [textCache, setTextCache] = useInputCache(
    Sto.getTopicWriteTextLens(props.reply).get(data),
    (value) => {
      updateTopicWrite(Sto.getTopicWriteTextLens(props.reply).set(value));
    }
  );

  const profiles = GA.useFindProfilesQuery({
    variables: {
      query: {
        self: true,
      },
    },
  });

  const [mutation, { error }] = GA.useCreateResMutation({
    variables: {
      topic: props.topic,
      name: pipe(data, Sto.topicWriteNameLens.get, (name) =>
        name.length !== 0 ? name : null
      ),
      text: textCache,
      reply: props.reply,
      profile: Sto.topicWriteProfileLens.get(data),
      age: Sto.topicWriteAgeLens.get(data),
    },
  });

  const submit = () => {
    mutation().then((x) => {
      if (x.data) {
        props.onSubmit?.(x.data.createRes);
      }
      setTextCache("");
    });
  };

  const [focusCounter, { inc: incFocusCounter, dec: decFocusCounter }] =
    useCounter(0);

  return (
    <form
      onFocus={() => {
        incFocusCounter();
      }}
      onBlur={() => {
        setTimeout(() => {
          decFocusCounter();
        }, 100);
      }}
    >
      <ErrorAlert error={error} />
      {focusCounter !== 0 || textCache.length !== 0 ? (
        <>
          <TextField
            style={{
              marginRight: "3px",
            }}
            placeholder="名前"
            value={Sto.topicWriteNameLens.get(data)}
            onChange={(v) => updateTopicWrite(Sto.topicWriteNameLens.set(v))}
          />
          {profiles.data !== undefined ? (
            <Select
              style={{
                marginRight: "3px",
                backgroundColor: "#fff",
              }}
              value={pipe(Sto.topicWriteProfileLens.get(data), (x) => x ?? "")}
              onChange={(v) => {
                updateTopicWrite(
                  Sto.topicWriteProfileLens.set(v.length === 0 ? null : v)
                );
              }}
              options={[
                { value: "", text: "(プロフなし)" },
                ...profiles.data.profiles.map((p) => ({
                  value: p.id,
                  text: `@${p.sn} ${p.name}`,
                })),
              ]}
            />
          ) : null}
          <CheckBox
            value={Sto.topicWriteAgeLens.get(data)}
            onChange={(v) => updateTopicWrite(Sto.topicWriteAgeLens.set(v))}
            label="Age"
          />
        </>
      ) : null}

      <MdEditor
        value={textCache}
        onChange={(v) => setTextCache(v)}
        maxRows={5}
        minRows={1}
        onKeyDown={(e) => {
          if ((e.shiftKey || e.ctrlKey) && e.keyCode === 13) {
            e.preventDefault();
            submit();
          }
        }}
        fullWidth={true}
        actions={
          <IconButton type="button" onClick={submit}>
            <Icon>send</Icon>
          </IconButton>
        }
      />
    </form>
  );
};
