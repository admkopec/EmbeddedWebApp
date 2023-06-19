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
    callback: async (plateID, closeDialog, plate) => {
      await fetch(`/api/plate/${plateID}`, {method: 'POST', body: JSON.stringify({newPlate: plate})})
        .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response;
      }).catch((e: Error) => {
        console.error("Could not modify plate: " + e.message);
      });
    },
    buttonText: "Update"
  },
  {
    title: "Delete license plate",
    description: "This license plate data will be permanently deleted from the database and become unauthorised. Do you" +
      " want to proceed?.",
    callback: async (plateID, closeDialog) => {
      await fetch(`/api/plate/${plateID}`, {method: 'DELETE'}).then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response;
      }).catch((e: Error) => {
        console.error("Could not delete plate. Reason: " + e.message);
      });
      closeDialog();
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

  const handleModifyPlate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const plate: Plate = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    ) as unknown as Plate;
    // TODO: fix date format
    if (action)
      actions[action - 1].callback(plate.plate, onClose, plate);
  }

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
          {action == Action.UpdateLP ? <form id={"modify-plate-form"} name={"modify-plate-form"} onSubmit={handleModifyPlate}>
            <Input defaultValue={plate?.plate} m={1} id={"plate-number"} name={"plate"} placeholder='Plate number' type={'text'}/>
            <Input defaultValue={plate?.expireDate && plate?.expireDate?.length > 19 ?
              plate?.expireDate?.substring(0, plate?.expireDate?.length-3) :
              plate?.expireDate} id={"expire-date"} name={"expireDate"} m={1}
                   placeholder='Expiry date' type="datetime-local"/>
          </form> :
            <></>}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button ml={3} onClick={(e) => {
            if (action && plate && action != Action.UpdateLP) {
              actions[action - 1].callback(plate.plate, onClose, newPlate);
            }
            onClose();
            location.reload();
          }} type={"submit"} form={"modify-plate-form"}>
            {action ? actions[action-1].buttonText : "Confirm"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}