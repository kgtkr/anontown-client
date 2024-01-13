import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import { ng, Storage, UserData, Sto } from "../domains/entities";
import { Modal } from "./modal";
import { NGEditor } from "./ng-editor";

interface NGProps {
  userData: UserData;
  onChangeStorage: (user: Storage) => void;
}

export const NG: React.FC<NGProps> = ({ userData, onChangeStorage }) => {
  const [dialog, setDialog] = React.useState<string | null>(null);

  return (
    <div>
      <IconButton
        onClick={() =>
          onChangeStorage(
            Sto.addNG(ng.createDefaultNG())(userData.storage)
          )
        }
      >
        <Icon>add_circle</Icon>
      </IconButton>
      <List>
        {Sto.getNG(userData.storage).map((node) => (
          <ListItem
            onClick={() => setDialog(node.id)}
            key={node.id}
          >
            <Modal
              isOpen={dialog === node.id}
              onRequestClose={() => setDialog(null)}
            >
              <h1>{node.name}</h1>
              <NGEditor
                ng={node}
                onUpdate={(v) =>
                  onChangeStorage(
                    Sto.updateNG(v)(userData.storage)
                  )
                }
              />
            </Modal>
            <ListItemText>{node.name}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() =>
                  onChangeStorage(
                    Sto.removeNG(node.id)(userData.storage)
                  )
                }
              >
                <Icon>close</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
