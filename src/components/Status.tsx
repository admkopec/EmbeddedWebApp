import {Container, FormControl, FormLabel, Grid, GridItem, Stack, Switch, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import { Image } from '@chakra-ui/react'
import {CustomPlaceholder} from "react-placeholder-image";
import {ImageJson} from "@/services/images.service";
import {Actuators} from "@/services/actuators.service";

const Status = () => {
  const [lightOn, setLightOn] = useState(false);
  const [lightDisabled, setLightDisabled] = useState(false);
  const [barOpen, setBarOpen] = useState(false);
  const [barDisabled, setBarDisabled] = useState(false);
  const [currentImage, setCurrentImage] = useState<ImageJson>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {

  }, []);

  useEffect(() => {
    fetch('api/actors', {method: 'GET'}).then((res) => {
      return res.json();
    }).then((info: Actuators) => {
      setLightOn(info.light === 1);
      setBarOpen(info.bar === 1);
    }).then(() => {
      fetch('api/image', {method: 'GET'}).then((res) => {
        return res.json();
      }).then((data: ImageJson) => setCurrentImage(data));
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
                <Switch id='light' isDisabled={lightDisabled} isChecked={lightOn} onChange={(e) => {
                  console.log(e.target.checked);
                  setLightDisabled(true);
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
                  setLightDisabled(false);
                }}/>
              </FormControl>
              <FormControl display='flex' justifyContent={"center"}>
                <FormLabel htmlFor='bar' mb='0'>
                  Bar
                </FormLabel>
                <Switch id='bar' isDisabled={barDisabled} isChecked={barOpen} onChange={(e) => {
                  console.log(e.target.checked);
                  setBarDisabled(true);
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
                  });
                  setBarDisabled(false);
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
            <Text>Current image</Text>
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