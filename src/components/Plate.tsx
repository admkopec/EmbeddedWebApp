import React from "react";
import {Flex, Input} from "@chakra-ui/react";
import {ButtonGroup, IconButton} from "@chakra-ui/button";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";
import {Editable, useEditableControls, EditablePreview, EditableInput} from "@chakra-ui/editable";

interface PlateProps{
  plateNumber?: string;
}

// TODO: add expiry date

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
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} aria-label={"edit-button"}/>
      </Flex>
    )
  }

  return (
    <Editable
      textAlign='center'
      defaultValue={props.plateNumber ?? "Number"}
      fontSize='xl'
      isPreviewFocusable={false}
    >
      <EditablePreview />
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
  )
}