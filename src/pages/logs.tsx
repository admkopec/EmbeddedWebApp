import RootLayout from "@/components/Layout";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/tabs";
import {Card, CardBody, ChakraProvider, extendTheme} from "@chakra-ui/react";
import Status from "@/components/Status";
import Logs from "@/components/Logs";
import Database from "@/components/Database";
import 'overlayscrollbars/overlayscrollbars.css';
import {accordionTheme} from "@/style/PlateAccordion";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export const theme = extendTheme({
    components: { Accordion: accordionTheme },
})

const LogsPage = () => {
    const router = useRouter();

    const handleChangeTab = (index: number) => {
        if (index === 0)
            router.push("/");
        if (index === 1)
            router.push("/plates");
    }

    return (
        <ChakraProvider theme={theme}>
            <RootLayout>
                <Card size={"lg"} m={4} maxW={"2xl"} width={"2xl"}>
                    <CardBody>
                        <Tabs align={"center"} size={"lg"} variant='enclosed' index={2}
                              onChange={(index) => handleChangeTab(index)} isFitted>
                            <TabList>
                                <Tab>Status</Tab>
                                <Tab>Database</Tab>
                                <Tab>Logs</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <></>
                                </TabPanel>
                                <TabPanel>
                                    <></>
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

export default LogsPage;