import {Container, Grid, GridItem} from "@chakra-ui/react";

const Status = () => (
  <Grid gap={4} templateAreas={`"act image"
                                "act_stat image"`}>
    <GridItem area={'act'}>
      <Container>
        Actuators go here
      </Container>
    </GridItem>
    <GridItem area={'act_stat'}>
      <Container>
        Setting their states
      </Container>
    </GridItem>
    <GridItem area={'image'}>
      <Container>
        Current image go here
      </Container>
    </GridItem>
  </Grid>
);

export default Status;