import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {Box} from "@chakra-ui/react";

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
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
        {children}
        <footer>
            {/*TODO: make some informational footer containing the authors*/}
        </footer>
    </Box>
)

export default Layout