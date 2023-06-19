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
import { Image } from '@chakra-ui/react'
import {useInterval} from "@/utils/hooks";
import {Log} from "@/services/logs.service";
import {ImageJson} from "@/services/images.service";
import {BeatLoader} from "react-spinners";
import {CustomPlaceholder} from "react-placeholder-image";

const Logs = () => {
    const [logs, setLogs] = useState<Log[]>([
      {timestamp: "Date", action: "Action", description: "Desc"}]);
    const [images, setImages] = useState<string[]>();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch('api/logs', {method: 'GET'}).then((response) => response.json()).then(
          async (logs: Log[]) => {
            setLogs(logs);
            let promises = [];
            let imgs = Array<string>(logs.length);
            for (let i = 0; i < logs.length; i++) {
                if (logs[i].image != undefined) {
                    await fetch(`api/image/${logs[i].image}`, {method: 'GET'})
                        .then((res) => res.json())
                        .then((img : ImageJson) => {
                            imgs[i] = img.imagedata;
                        })
                }
            }
              setImages(imgs)
        })
        .catch(error => {
            console.log(error.message)
        })
    }, [refresh]);

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
                      <GridItem borderRadius='lg'>
                          {(log.image && images) ?
                              <>
                              {images[index] ?
                                <Image src={images[index]} fit={'contain'} alt={'Image of a car\'s license plate'}
                                       borderRadius={'inherit'} fallback={
                                    <CustomPlaceholder
                                      width={500}
                                      height={500}
                                      backgroundColor="#dedede"
                                      textColor="#ffffff"
                                      text="License plate image"
                                      style={{borderRadius: 'inherit'}}
                                    />}/>
                                  :
                                  <BeatLoader />
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