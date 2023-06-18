import {Container, FormControl, FormLabel, Grid, GridItem, Stack, Switch, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import { Image } from '@chakra-ui/react'
import {CustomPlaceholder} from "react-placeholder-image";
import {ImageJson} from "@/services/images.service";
import {Actuators} from "@/services/actuators.service";

const Status = () => {
  const [lightOn, setLightOn] = useState(false);
  const [barOpen, setBarOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<ImageJson>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch('api/image', {method: 'GET'}).then((res) => {
      return res.json();
    }).then((data: ImageJson) => setCurrentImage(data));
  }, []);

  useEffect(() => {
    fetch('api/actors', {method: 'GET'}).then((res) => {
      return res.json();
    }).then((info: Actuators) => {
      setLightOn(info.light === 1);
      setBarOpen(info.bar === 1);
    })
  }, [refresh]);

  // useInterval(() => {
  //     setRefresh(!refresh);
  // }, 30000);

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
                <Switch id='light' isChecked={lightOn} onChange={(e) => {
                  console.log(e.target.checked);
                  let innerLightOn = e.target.checked ? 1 : 0;
                  fetch('api/actors', {method: 'POST', body: JSON.stringify({
                      light: innerLightOn,
                      bar: barOpen ? 1 : 0
                  })}).then((res) => {
                    console.log("Light status was changed: " + res.status);
                    setLightOn(e.target.checked);
                    setRefresh(!refresh);
                  }).catch((error: Error) => {
                    console.error(error.message);
                  })
                }}/>
              </FormControl>
              <FormControl display='flex' justifyContent={"center"}>
                <FormLabel htmlFor='bar' mb='0'>
                  Bar
                </FormLabel>
                <Switch id='bar' isChecked={barOpen} onChange={(e) => {
                  console.log(e.target.checked);
                  let innerBarOpen = e.target.checked ? 1 : 0;
                  fetch('api/actors', {method: 'POST', body: JSON.stringify({
                      bar: innerBarOpen,
                      light: lightOn ? 1 : 0
                  })}).then((res) => {
                    console.log("Bar status was changed: " + res.status);
                    setBarOpen(e.target.checked);
                    setRefresh(!refresh);
                  }).catch((error: Error) => {
                    console.error(error.message);
                  })
                }}/>
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