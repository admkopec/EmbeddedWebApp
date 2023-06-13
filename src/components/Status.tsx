import {Box, Container, FormControl, FormLabel, Grid, GridItem, Spinner, Stack, Switch, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {fetchCurrentImage} from "@/services/images.service";
import { Image } from '@chakra-ui/react'
import {CustomPlaceholder} from "react-placeholder-image";

const Status = () => {
  const [currentImage, setCurrentImage] = useState<string>();
  useEffect(() => {
    fetchCurrentImage().then((img) => setCurrentImage(img)).catch((e: Error) => {
      console.error("Could not fetch image. Reason: " + e.message);
    });
  })
  // TODO: Add actors to switches
  return (
      <Grid gap={4} templateAreas={`"act" 
                                    "image"`}>
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
            <Image src={`data:image/jpeg;base64,${currentImage}`} fit={'contain'} alt={'Image of a car\'s license plate'}
                   borderRadius={'inherit'} fallback={
              <CustomPlaceholder
              width={500}
              height={500}
              backgroundColor="#dedede"
              textColor="#ffffff"
              text="License plate image"
              style={{borderRadius: 'inherit'}}
              />}/>
          </Container>
        </GridItem>
      </Grid>
  )
};

export default Status;