import {Grid, GridItem, Accordion, AccordionPanel, Box, AccordionButton, AccordionItem, AccordionIcon} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Image from "next/image";
import {useInterval} from "@/utils/hooks";
import {Log, fetchLogs} from "@/services/logs.service";

const Logs = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetchLogs().then((logs: Log[]) => {
            setLogs(logs);
        })
            .catch(error => {
                console.log(error.message)
            })
    });

    useInterval(() => {
        setRefresh(!refresh);
    }, 5000);

    return (
  <Accordion allowToggle>
      {logs.map( (log, index) =>
          <AccordionItem key={index+1}>
              <h2>
                  <AccordionButton>
                      <Grid width='100%' templateColumns='repeat(2, 1fr)'>
                          <GridItem fontWeight="600" textAlign='left'>
                              {log.action}
                          </GridItem>
                          <GridItem fontWeight="400" color="rgba(0,0,0,0.5)">
                              {log.timestamp}
                          </GridItem>
                      </Grid>
                      <AccordionIcon />
                  </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                  <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                      <GridItem>
                          {log.description}
                      </GridItem>
                      <GridItem>
                          {log.image ? <Image src={`/image/${log.image}`} alt={'Log Image'} /> : <></>}
                      </GridItem>
                  </Grid>
              </AccordionPanel>
          </AccordionItem>
      )}
  </Accordion>
)};

export default Logs;