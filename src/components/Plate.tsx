import React from "react";
import {Flex, Input} from "@chakra-ui/react";
import {ButtonGroup, IconButton} from "@chakra-ui/button";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";
import {Editable, useEditableControls, EditablePreview, EditableInput} from "@chakra-ui/editable";
import {Plate} from "@/services/plates.service";

// TODO: add expiry date

interface PlateProps {
  plate: Plate
}

export default function Plate(props: PlateProps) {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label={"submit button"}/>
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} aria-label={"close button"}/>
      </ButtonGroup>
    ) : (
      <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} aria-label={"edit-button"}/>
    )
  }

  return (

    <Editable
      textAlign='center'
      defaultValue={props.plate.plate ?? "Number"}
      fontSize='xl'
      isPreviewFocusable={false}
      p={1}
      width={"100%"}
    >
      <Flex justifyContent='center' flexFlow={"row nowrap"} justifyItems={"center"} alignItems={"center"}>
        <EditablePreview px={2}/>
        <Input as={EditableInput} />
        <EditableControls />
      </Flex>
    </Editable>
  )
}