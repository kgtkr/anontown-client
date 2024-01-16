import {
  Button,
  Checkbox,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NG, NGs } from "../domains/entities/storage/NGs";
import React from "react";
import { useSetStorage } from "../domains/entities/storage/StorageCollectionHooks";

export interface NGEditorProps {
  initNG: NG;
}
/*
TODO:expirationDate
textMatcherのignoreCaseやregexpを編集可能に
topicIdやprofileIdをidでなく名前で指定できるように
*/
export function NGEditor(props: NGEditorProps) {
  const [ng, setNG] = React.useState(props.initNG);
  const [setNGStorage] = useSetStorage(NGs);

  return (
    <Stack
      spacing={2}
      component="form"
      onSubmit={(e) => {
        setNGStorage(ng);
        e.preventDefault();
      }}
    >
      <TextField
        placeholder="名前"
        value={ng.name}
        onChange={(evt) => setNG({ ...ng, name: evt.target.value })}
      />
      {ng.topicId !== undefined ? (
        <Typography variant="caption">topic: {ng.topicId}</Typography>
      ) : undefined}
      <TextField
        placeholder="プロフィールID"
        value={ng.condition.profileId ?? ""}
        onChange={(evt) =>
          setNG({
            ...ng,
            condition: {
              ...ng.condition,
              profileId:
                evt.target.value.length === 0 ? undefined : evt.target.value,
            },
          })
        }
      />
      <TextField
        placeholder="HASH"
        value={ng.condition.hash ?? ""}
        onChange={(evt) =>
          setNG({
            ...ng,
            condition: {
              ...ng.condition,
              hash:
                evt.target.value.length === 0 ? undefined : evt.target.value,
            },
          })
        }
      />
      <TextField
        placeholder="名前"
        value={ng.condition.name?.text ?? ""}
        onChange={(evt) =>
          setNG({
            ...ng,
            condition: {
              ...ng.condition,
              name:
                evt.target.value.length === 0
                  ? undefined
                  : {
                      text: evt.target.value,
                      ignoreCase: true,
                      regExp: false,
                    },
            },
          })
        }
      />
      <TextField
        placeholder="本文"
        value={ng.condition.content?.text ?? ""}
        onChange={(evt) =>
          setNG({
            ...ng,
            condition: {
              ...ng.condition,
              content:
                evt.target.value.length === 0
                  ? undefined
                  : {
                      text: evt.target.value,
                      ignoreCase: true,
                      regExp: false,
                    },
            },
          })
        }
      />
      <div>
        投票値が{ng.condition.vote ?? 0}以下:
        <Checkbox
          checked={ng.condition.vote !== undefined}
          onChange={(evt) =>
            setNG({
              ...ng,
              condition: {
                ...ng.condition,
                vote: evt.target.checked ? 0 : undefined,
              },
            })
          }
        />
        <Slider
          value={ng.condition.vote ?? 0}
          disabled={ng.condition.vote === undefined}
          min={-10}
          max={10}
          step={1}
          onChange={(_evt, value) =>
            setNG({
              ...ng,
              condition: {
                ...ng.condition,
                vote: value as number,
              },
            })
          }
        />
      </div>
      <Button type="submit" variant="contained">
        保存
      </Button>
    </Stack>
  );
}
