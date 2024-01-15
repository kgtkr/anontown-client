import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import { Modal } from "./modal";
import { NGEditor } from "./ng-editor";
import {
  useDeleteStorage,
  useSetStorage,
  usePrefixedStorageCollection,
} from "../domains/entities/storage/StorageCollectionHooks";
import { NGs } from "../domains/entities/storage/NGs";
import * as uuid from "uuid";

interface NGProps {}

// TODO: topicIdによるフィルタリング
export const NG: React.FC<NGProps> = () => {
  const [dialog, setDialog] = React.useState<string | null>(null);
  const ngs = usePrefixedStorageCollection(NGs);
  const [addNG] = useSetStorage(NGs);
  const [deleteNG] = useDeleteStorage(NGs);
  const dialogNG = ngs.find((ng) => ng.id === dialog);

  return (
    <div>
      <IconButton
        onClick={() =>
          addNG({
            id: uuid.v4(),
            name: "無名のNG",
            createdAt: Date.now(),
            condition: {},
          })
        }
      >
        <Icon>add_circle</Icon>
      </IconButton>
      <List>
        {ngs.map((ng) => (
          <ListItem
            onClick={() => {
              setDialog(ng.id);
            }}
            key={ng.id}
          >
            <ListItemText>{ng.name}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={() => deleteNG(ng)}>
                <Icon>close</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Modal
        isOpen={dialogNG !== undefined}
        onRequestClose={() => {
          setDialog(null);
        }}
      >
        {dialogNG && (
          <>
            <h1>{dialogNG.name}</h1>
            <NGEditor initNG={dialogNG} />
          </>
        )}
      </Modal>
    </div>
  );
};
