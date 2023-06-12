import {Container, FormControl, FormLabel, Grid, GridItem, Spinner, Stack, Switch, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {fetchCurrentImage} from "@/services/images.service";
import Image from "next/image";

const Status = () => {
  const [currentImage, setCurrentImage] = useState<string>();
  useEffect(() => {
    fetchCurrentImage().then((img) => setCurrentImage(img));
  })
  // TODO: Add actors to switches
  return (
      <Grid gap={4} templateAreas={`"act image"`}>
        <GridItem area={'act'}>
          <Container borderWidth='1px' borderRadius='lg' p={2}>
            <Text>Actuators status</Text>
            <Stack align={"center"} direction={"row"} alignItems={"center"}>
              <FormControl display='flex' justifyContent={"center"}>
                <FormLabel htmlFor='light' mb='0'>
                  Light
                </FormLabel>
                <Switch id='light'/>
              </FormControl>
              <FormControl display='flex' justifyContent={"center"}>
                <FormLabel htmlFor='bar' mb='0'>
                  Bar
                </FormLabel>
                <Switch id='bar'/>
              </FormControl>
            </Stack>
            <Text>
              Click on the switches to change the current status of an actuator.
            </Text>
          </Container>
        </GridItem>
        <GridItem area={'image'}>
          <Container borderWidth='1px' borderRadius='lg' p={2}>
            {currentImage ?
                <Image src={`data:image/jpeg;base64, ${currentImage}`} alt={'Log Image'}/>
                :
                <Spinner/>
            }
          </Container>
        </GridItem>
      </Grid>
  )
};

export default Status;