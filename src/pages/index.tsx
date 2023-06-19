import RootLayout from "@/components/Layout";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/tabs";
import {Card, CardBody, ChakraProvider, extendTheme} from "@chakra-ui/react";
import Status from "@/components/Status";
import Logs from "@/components/Logs";
import Database from "@/components/Database";
import 'overlayscrollbars/overlayscrollbars.css';
import {accordionTheme} from "@/style/PlateAccordion";
import {useEffect, useState} from "react";

export const theme = extendTheme({
  components: { Accordion: accordionTheme },
})

const IndexPage = () => {
  const [activeTabI, setActiveTabI] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("tab") === "status")
      setActiveTabI(0);
    if (sessionStorage.getItem("tab") === "database")
      setActiveTabI(1);
    if (sessionStorage.getItem("tab") === "logs")
      setActiveTabI(2);
  }, []);

  const handleChangeTab = (index: number) => {
    if (index === 0)
      sessionStorage.setItem("tab", "status");
    if (index === 1)
      sessionStorage.setItem("tab", "database");
    if (index === 2)
      sessionStorage.setItem("tab", "logs");
    setActiveTabI(index);
  }

  return (
    <ChakraProvider theme={theme}>
      <RootLayout>
        <Card size={"lg"} m={4} maxW={"2xl"} width={"2xl"}>
          <CardBody>
            <Tabs align={"center"} size={"lg"} variant='enclosed' index={activeTabI}
                  onChange={(index) => handleChangeTab(index)} isFitted>
              <TabList>
                <Tab>Status</Tab>
                <Tab>Database</Tab>
                <Tab>Logs</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Status />
                </TabPanel>
                <TabPanel>
                  <Database />
                </TabPanel>
                <TabPanel>
                  <Logs/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </RootLayout>
    </ChakraProvider>
  );
}

export default IndexPage;