import {Button, Container, Flex, Grid, GridItem, Input, List, ListItem, Text} from "@chakra-ui/react";
import {BeatLoader} from "react-spinners";
import React from "react";
import Plate from "@/components/Plate";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";

export default function Database(){
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [platesData, setPlatesData] = React.useState<string[]>([
    "LPU42534",
    "LPU43534",
    "LPU44534",
    "LPU45534",
    "LPU49534",
    "LPU43434",
    "LPU43124",
    "LPU45354",
    "LPU41224",
    "LPU46044"
  ]);

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