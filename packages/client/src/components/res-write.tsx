import { Icon, IconButton } from "@mui/material";

import { useCounter, useDebounce } from "react-use";
import * as GA from "../generated/graphql-apollo";
import { CheckBox } from "./check-box";
import { ErrorAlert } from "./error-alert";
import { MdEditor } from "./md-editor";
import { Select } from "./select";
import { TextField } from "./text-field";
import {
  useSetStorage,
  useSingleStorage,
} from "../domains/entities/storage/StorageCollectionHooks";
import { WriteResConfigs } from "../domains/entities/storage/WriteResConfigs";
import { ResDrafts } from "../domains/entities/storage/ResDrafts";
import React from "react";

interface ResWriteProps {
  onSubmit?: (value: GA.ResNormalFragment) => void;
  topic: string;
  reply: string | null;
}

export const ResWrite = (props: ResWriteProps) => {
  const resDraft = useSingleStorage(
    ResDrafts,
    { topicId: props.topic, replyResId: props.reply ?? undefined },
    null
  );
  const writeResConfig = useSingleStorage(
    WriteResConfigs,
    { topicId: props.topic },
    null
  );

  const [setResDraft] = useSetStorage(ResDrafts);
  const [setWriteResConfig] = useSetStorage(WriteResConfigs);

  const [text, setText] = React.useState(resDraft?.text ?? "");
  const [name, setName] = React.useState(writeResConfig?.name ?? "");
  const [profileId, setProfileId] = React.useState(
    writeResConfig?.profileId ?? null
  );
  const [age, setAge] = React.useState(writeResConfig?.age ?? true);

  useDebounce(
    () => {
      setResDraft({
        topicId: props.topic,
        replyResId: props.reply ?? undefined,
        text,
      });
    },
    5000,
    [text]
  );
  useDebounce(
    () => {
      setWriteResConfig({
        topicId: props.topic,
        name,
        profileId: profileId ?? undefined,
        age,
      });
    },
    5000,
    [name, profileId, age]
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
      name,
      text,
      reply: props.reply,
      profile: profileId,
      age,
    },
  });

  const submit = () => {
    mutation().then((x) => {
      if (x.data) {
        props.onSubmit?.(x.data.createRes);
      }
      setText("");
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
      {focusCounter !== 0 || text.length !== 0 ? (
        <>
          <TextField
            style={{
              marginRight: "3px",
            }}
            placeholder="名前"
            value={name}
            onChange={(v) => setName(v)}
          />
          {profiles.data !== undefined ? (
            <Select
              style={{
                marginRight: "3px",
                backgroundColor: "#fff",
              }}
              value={profileId ?? ""}
              onChange={(v) => {
                setProfileId(v.length === 0 ? null : v);
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
          <CheckBox value={age} onChange={(v) => setAge(v)} label="Age" />
        </>
      ) : null}

      <MdEditor
        value={text}
        onChange={(v) => setText(v)}
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
