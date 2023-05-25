import {Accordion, AccordionPanel, Box, AccordionButton, AccordionItem, AccordionIcon} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Image from "next/image";
import {useInterval} from "@/utils/hooks";

interface Log {
    timestamp: string,
    action: string,
    description: string,
    image: string | undefined
}

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch('/log', {
            method: `GET`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        }).then((logs: Log[]) => {
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
      {logs.map( (log) =>
          <AccordionItem key={log}>
              <h2>
                  <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                          {log.action}
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                  {log.action}
                  {log.description}
                  {log.timestamp}
                  {log.image ? <Image src={`/image/${log.image}`} alt={'Log Image'} /> : <></>}
              </AccordionPanel>
          </AccordionItem>
      )}
  </Accordion>
)};

export default Logs;