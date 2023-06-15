import {
  Accordion,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Input,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import PlateInfo from "@/components/PlateInfo";
import React, {useEffect, useState} from "react";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";
import {Plate} from "@/services/plates.service";
import ModifyPlateDialog, {Action} from "@/components/ModifyPlateDialog";

export interface PlateModification {
  action?: Action;
  plate?: Plate;
}

export default function Database(){
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [platesData, setPlatesData] = useState<Plate[]>(
    // [{plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "LPU42534", expireDate: "03.04.2026"},
    // {plate: "KU791XR", expireDate: "03.04.2026"}]
  );
  const [ currPlateInfo, setCurrPlateInfo ] = useState<PlateModification>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch('/api/plate', {method: 'GET'})
      .then((res) => {
        if (res.ok)
          return res.json();
        return new Error(res.status.toString());
      })
      .then((plates: Plate[]) => {
          setPlatesData(plates);
        });
  }, []);

  const handleOpenDialog = (action: Action, plate: Plate) => {
    setCurrPlateInfo({
      action: action,
      plate: plate
    });
    onOpen();
  }

  return (
    <Grid gap={4} templateAreas={`"plates search_plate"
                                  "plates add_plate"
                                  "plates null"`}>
      <GridItem area={"plates"} m={0} p={0}>
        <Container borderWidth='1px' borderRadius='lg' p={2} width={'100%'}>
          <Text m={1}>Authorized license plates</Text>
          <Container maxH={"sm"} style={{overflow: 'auto'}}>
            <OverlayScrollbarsComponent
              element={'div'}
              options={{ scrollbars: { autoHide: 'leave',
                pointers: ['mouse', 'touch', 'pen'] }, overflow: { x: 'hidden', y: 'scroll' } }}
              defer
              style={{maxHeight: '300px', width: 'auto'}}
            >
              <Accordion allowToggle={true} width={'100%'}>
                {platesData ? platesData.map((plate: Plate, index: number) => (
                  <PlateInfo plate={plate} openDialog={handleOpenDialog} key={index+1}/>
                )) : <BeatLoader size={10} color='grey' />}
              </Accordion>
            </OverlayScrollbarsComponent>
          </Container>
          <ModifyPlateDialog action={currPlateInfo?.action} plate={currPlateInfo?.plate} isOpen={isOpen} onClose={onClose}/>
        </Container>
      </GridItem>
      <GridItem area={"search_plate"}>
        <Container borderWidth='1px' borderRadius='lg' p={2}>
          <Flex direction={"column"} wrap={"nowrap"} alignItems={"center"} justifyContent={"center"}>
            <Text m={1}>Search for a license plate</Text>
            <Input m={1} placeholder='Search' variant={"filled"}/>
          </Flex>
        </Container>
      </GridItem>
      <GridItem area={"add_plate"}>
        <Container borderWidth='1px' borderRadius='lg' p={2}>
          <Flex direction={"column"} wrap={"nowrap"} alignItems={"center"} justifyContent={"center"}>
            <Text m={1}>Add new license plate</Text>
            <Input m={1} placeholder='Enter new plate number' type="text" variant={"filled"}/>
            <Input m={1} placeholder="Set expiry date" type="datetime-local" variant={"filled"}/>
            <Button
              m={1}
              isLoading={isLoading}
              colorScheme='blue'
              spinner={<BeatLoader size={6} color='white' />}
              alignSelf={"end"}
            >
              Add
            </Button>
          </Flex>
        </Container>
      </GridItem>
    </Grid>
  );
}