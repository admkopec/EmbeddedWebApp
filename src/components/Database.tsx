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
import * as querystring from "querystring";

export interface PlateModification {
  action?: Action;
  plate?: Plate;
}

export default function Database(){
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [platesData, setPlatesData] = useState<Plate[]>();
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
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
        console.log("Plates were fetched.");
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

  const handleAddPlate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const plate: Plate = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    ) as unknown as Plate;
    console.log(plate);
    fetch('api/plate', {method: 'POST', body: JSON.stringify({plate: plate})}).then((res) => {
      console.log("Plate was added: " + res.status);
    }).catch((error: Error) => {
      console.error(error.message);
    });
    setIsLoading(false);
    location.reload();
  }

  useEffect(() => {
    // handleSearch(searchQuery || '');
  }, [searchQuery])

  const handleSearch = (query: string) => {
    fetch(`api/plate/${query}`, {method: 'GET'}).then((res) => {
      if (res.ok)
        return res.json();
      return new Error(res.status.toString());
    }).then((resJson: Plate[]) => {
      console.log("Plates were fetched by query.");
      setPlatesData(resJson);
    }).catch((error: Error) => {
      console.error(error.message);
    });
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
            <Input m={1} placeholder='Search' variant={"filled"} onChange={(e) => setSearchQuery(e.target.value)}
                   value={searchQuery}/>
          </Flex>
        </Container>
      </GridItem>
      <GridItem area={"add_plate"}>
        <Container borderWidth='1px' borderRadius='lg' p={2}>
          <Flex direction={"column"} wrap={"nowrap"} alignItems={"center"} justifyContent={"center"}>
            <Text m={1}>Add new license plate</Text>
            <form id={"add-plate-form"} onSubmit={handleAddPlate}>
              <Input m={1} id={"plate-number"} name={"plate"} placeholder='Enter new plate number' type="text" variant={"filled"}/>
              <Input m={1} id={"expire-date"} name={"expireDate"} placeholder="Set expiry date" type="datetime-local" variant={"filled"}/>
              <Button
                m={1}
                isLoading={isLoading}
                colorScheme='blue'
                type={"submit"}
                spinner={<BeatLoader size={6} color='white' />}
                alignSelf={"end"}
              >
                Add
              </Button>
            </form>
          </Flex>
        </Container>
      </GridItem>
    </Grid>
  );
}