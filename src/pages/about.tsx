import RootLayout from "@/components/Layout";
import {ChakraProvider, Text} from "@chakra-ui/react";
import React from "react";

const AboutPage = () => (
  <ChakraProvider>
    <RootLayout>
        <Text>
            Here goes README
        </Text>
    </RootLayout>
  </ChakraProvider>
);

export default AboutPage;