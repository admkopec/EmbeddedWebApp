import {Button, Container, Flex, Grid, GridItem, Input, List, ListItem, Text} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import React, {useEffect} from "react";
import Plate from "@/components/Plate";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";
import {fetchPlates, Plate} from "@/services/plates.service";

export default function Database(){
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [platesData, setPlatesData] = React.useState<Plate[]>([
    {plate: "LPU42534"},
    {plate: "LPU43534"},
    {plate: "LPU44534"},
    {plate: "LPU45534"},
    {plate: "LPU49534"},
    {plate: "LPU43434"},
    {plate: "LPU43124"},
    {plate: "LPU45354"},
    {plate: "LPU41224"},
    {plate: "LPU46044"}
  ]);

  useEffect(() => {
    fetchPlates().then((plates: Plate[]) => {
      setPlatesData(plates);
    })
        .catch(error => {
          console.log(error.message)
        })
  });

  return (
    <Grid gap={4} templateAreas={`"plates search_plate"
                                  "plates add_plate"
                                  "plates null"`}>
      <GridItem area={"plates"}>
        <Container borderWidth='1px' borderRadius='lg' p={2}>
          <Text m={1}>Authorized license plates</Text>
          <OverlayScrollbarsComponent element={"div"}
                                      options={{ scrollbars: { autoHide: 'scroll' } }}
                                      defer>
            <Container overflow={"auto"} maxH={"sm"}>
              <List>
                {platesData.map((plate: string, index: number) => (
                  <ListItem key={index+1}>
                    <Plate licensePlate={plate}/>
                  </ListItem>
                ))}
              </List>
            </Container>
          </OverlayScrollbarsComponent>
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
            <Input m={1} placeholder='Enter plate number' variant={"filled"}/>
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