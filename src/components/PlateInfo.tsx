import React, {useState} from "react";
import {
  AccordionButton, AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, Button, IconButton, Text
} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import {EditIcon, MinusIcon} from "@chakra-ui/icons";
import {Plate} from "@/services/plates.service";
import {Action} from "@/components/ModifyPlateDialog";

interface PlateInfoProps {
  plate: Plate;
  openDialog: (action: Action, plate: Plate) => void;
}

export default function PlateInfo(props: PlateInfoProps) {
  const [isModifying, setIsModifying] = useState<boolean[]>([false, false]);
  const {plate, openDialog} = props;

  return (
    <AccordionItem m={4}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {plate.plate}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text fontSize={'xs'} color={'gray.500'}>
          Expires on: {plate.expireDate}
        </Text>
        <Box display={'flex'} flexFlow={'row nowrap'} mt={2} justifyContent={'center'} alignItems={'center'} width={"100%"}>
          <IconButton
            m={1}
            isLoading={isModifying[0]}
            aria-label={"Modify"}
            colorScheme='blue'
            size={"xs"}
            spinner={<BeatLoader size={4} color='white' />}
            icon={<EditIcon />}
            onClick={() => openDialog(Action.UpdateLP, plate)}
          ></IconButton>
          <IconButton
            m={1}
            isLoading={isModifying[1]}
            colorScheme='red'
            aria-label={"Delete"}
            size={"xs"}
            spinner={<BeatLoader size={4} color='white' />}
            icon={<MinusIcon />}
            onClick={() => openDialog(Action.DeleteLP, plate)}
          >
          </IconButton>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  )
}