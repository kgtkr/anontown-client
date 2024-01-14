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
  useStorageCollection,
} from "../domains/entities/storage/StorageCollectionHooks";
import { NGs } from "../domains/entities/storage/NGs";
import * as uuid from "uuid";

interface NGProps {}

// TODO: topicIdによるフィルタリング
export const NG: React.FC<NGProps> = () => {
  const [dialog, setDialog] = React.useState<string | null>(null);
  const ngs = useStorageCollection(NGs);
  const [addNG] = useSetStorage(NGs);
  const [deleteNG] = useDeleteStorage(NGs);

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
          <ListItem onClick={() => setDialog(ng.id)} key={ng.id}>
            <Modal
              isOpen={dialog === ng.id}
              onRequestClose={() => setDialog(null)}
            >
              <h1>{ng.name}</h1>
              <NGEditor initNG={ng} />
            </Modal>
            <ListItemText>{ng.name}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={() => deleteNG(ng)}>
                <Icon>close</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
