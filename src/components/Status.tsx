import {Container, FormControl, FormLabel, Grid, GridItem, Stack, Switch, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import { Image } from '@chakra-ui/react'
import {CustomPlaceholder} from "react-placeholder-image";
import {ImageJson} from "@/services/images.service";

const Status = () => {
  const [currentImage, setCurrentImage] = useState<ImageJson>();

  useEffect(() => {
    fetch('api/image', {method: 'GET'}).then((res) => {
      return res.json();
    }).then((data: ImageJson) => setCurrentImage(data));
  }, []);

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
            <Image src={currentImage?.imagedata} fit={'contain'} alt={'Image of a car\'s license plate'}
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