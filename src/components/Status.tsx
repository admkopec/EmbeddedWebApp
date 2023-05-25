import {Container, FormControl, FormLabel, Grid, GridItem, Stack, Switch, Text} from "@chakra-ui/react";

const Status = () => (
  <Grid gap={4} templateAreas={`"act image"`}>
    <GridItem area={'act'}>
      <Container borderWidth='1px' borderRadius='lg' p={2}>
        <Text>Actuators status</Text>
        <Stack align={"center"} direction={"row"} alignItems={"center"}>
          <FormControl display='flex' justifyContent={"center"}>
            <FormLabel htmlFor='light' mb='0'>
              Light
            </FormLabel>
            <Switch id='light' />
          </FormControl>
          <FormControl display='flex' justifyContent={"center"}>
            <FormLabel htmlFor='bar' mb='0'>
              Bar
            </FormLabel>
            <Switch id='bar' />
          </FormControl>
        </Stack>
        <Text>
          Click on the switches to change the current status of an actuator.
        </Text>
      </Container>
    </GridItem>
    <GridItem area={'image'}>
      <Container borderWidth='1px' borderRadius='lg' p={2}>
        Current image go here
      </Container>
    </GridItem>
  </Grid>
);

export default Status;