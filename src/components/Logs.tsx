import {
    Grid,
    GridItem,
    Accordion,
    AccordionPanel,
    AccordionButton,
    AccordionItem,
    AccordionIcon,
    Spinner
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Image from "next/image";
import {useInterval} from "@/utils/hooks";
import {Log} from "@/services/logs.service";

const Logs = () => {
    const [logs, setLogs] = useState<Log[]>([
      {timestamp: "Date", action: "Action", description: "Desc"}]);
    const [images, setImages] = useState<string[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch('api/logs', {method: 'GET'}).then((response) => response.json()).then(
          (logs: Log[]) => {
            setLogs(logs);
            let promises = [];
            let imgs = Array<string>(logs.length);
            for (let i = 0; i < logs.length; i++) {
                if (logs[i].image != undefined) {
                    promises.push(fetch(`api/image/${logs[i].image}`, {method: 'GET'}).then((res) => res.json()).then((img:string) => {
                        imgs[i] = img;
                    }));
                }
            }
            Promise.all(promises).then(() => setImages(imgs));
        })
            .catch(error => {
                console.log(error.message)
            })
    }, []);

    // useInterval(() => {
    //     setRefresh(!refresh);
    // }, 5000);

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
                          {log.image ?
                              <>
                              {images[index] ?
                                  <Image src={`data:image/jpeg;base64, ${images[index]}`} alt={'Log Image'}/>
                                  :
                                  <Spinner/>
                              }
                              </>
                              :
                              <></>}
                      </GridItem>
                  </Grid>
              </AccordionPanel>
          </AccordionItem>
      )}
  </Accordion>
)};

export default Logs;