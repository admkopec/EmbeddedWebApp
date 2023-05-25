import React, { ReactNode } from 'react'
import Head from 'next/head'
import {Box, HStack, StackDivider, StackItem} from "@chakra-ui/react";
import {Link} from "@chakra-ui/next-js";

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
    <Box my={0} mx={"auto"} alignItems={"center"} display={"flex"} flexFlow={"column nowrap"}>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
            <nav>
              <HStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='center'
                p={4}
              >
                <StackItem>
                  <Link href="/">Home</Link>
                </StackItem>
                <StackItem>
                  <Link href="/about">About</Link>
                </StackItem>
              </HStack>
            </nav>
        </header>
        {children}
        <footer>
            {/*TODO: make some informational footer containing the authors*/}
        </footer>
    </Box>
)

export default Layout