import "../styles/globals.css";
import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from '@mantine/core';
import { errorLink } from "@/client/links/errorLink";
import { authLink } from "@/client/links/authLink";

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ApolloProvider client={client}>
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
