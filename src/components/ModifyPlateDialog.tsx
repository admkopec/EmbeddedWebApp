import {
  AlertDialog, AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay, AlertDialogProps
} from "@chakra-ui/modal";
import {Box, Button, Input, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {Plate} from "@/services/plates.service";
import {PlateModification} from "@/components/Database";

export enum Action {
  UpdateLP=1,
  DeleteLP,
  AddLP
}

type DialogAction = {
  title: string,
  description: string,
  callback: (plateID: string, closeDialog: AlertDialogProps["onClose"], newPlate?: Plate) => void,
  buttonText?: string
}

const actions : DialogAction[] = [
  {
    title: "Update details of license plate",
    description: "Insert new data for the chosen license plate into the fields below and confirm.",
    callback: (plateID, closeDialog, plate) => {
    },
    buttonText: "Update"
  },
  {
    title: "Delete license plate",
    description: "This license plate data will be permanently deleted from the database and become unauthorised Do you" +
      " want to proceed?.",
    callback: (plateID, closeDialog) => {
    },
    buttonText: "Delete"
  }
]

interface ModifyPlateDialogProps {
  isOpen: AlertDialogProps["isOpen"];
  onClose: AlertDialogProps["onClose"];
}

export default function ModifyPlateDialog(props: ModifyPlateDialogProps & PlateModification){
  const {isOpen, onClose, action, plate} = props;
  const [newPlate, setNewPlate] = useState<Plate | undefined>(plate);
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          {action && actions[action-1].title}
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text>
            {action && actions[action-1].description}
          </Text>
          <Box>
            <Input defaultValue={plate?.plate} m={1} placeholder='Plate number' type={'text'}/>
            <Input defaultValue={plate?.expireDate} m={1} placeholder='Expiry date' type="datetime-local"/>
          </Box>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button ml={3} onClick={() => {
            if (action && plate)
              actions[action-1].callback(plate.plate, onClose, newPlate)
          }}>
            {action ? actions[action-1].buttonText : "Confirm"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}