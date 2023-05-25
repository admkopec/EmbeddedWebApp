import RootLayout from "@/components/Layout";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/tabs";
import {Card, CardBody, ChakraProvider} from "@chakra-ui/react";
import Status from "@/components/Status";
import Logs from "@/components/Logs";
import Database from "@/components/Database";

const IndexPage = () => (
    <ChakraProvider>
      <RootLayout>
        <Card size={"lg"} m={4} maxW={"xl"} width={"xl"}>
          <CardBody>
            <Tabs align={"center"} size={"lg"} variant='enclosed' isFitted>
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

export default IndexPage;