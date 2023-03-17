import "../styles/globals.css";
import { ApolloClient, ApolloProvider, from, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from '@mantine/core'
import { errorLink } from "@/client/links/errorLink";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

export const uploadClient = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  link: from([errorLink]),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ApolloProvider client={uploadClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <Head>
          <title>UINLOVE</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </ApolloProvider>
  );
}
