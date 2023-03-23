import "../styles/globals.css";
import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components/Layout/Layout";
import { ColorScheme, MantineProvider } from "@mantine/core";
import { errorLink } from "@/client/links/errorLink";
import { authLink } from "@/client/links/authLink";
import { useEffect, useState } from "react";
import { authorization } from "@/client/authorization";
import { Language } from "@/generated/operations";

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);


  const [colorScheme, setColorScheme] = useState<ColorScheme>(authorization.getCurrentTheme());
  const [language, setLanguage] = useState<Language>(authorization.getCurrentLanguage());


  return (
    <ApolloProvider client={client}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <Head>
          <title>UINLOVE</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {hydrated && (
          <Layout setColorScheme={setColorScheme} colorScheme={colorScheme} language={language} setLanguage={setLanguage}>
            <Component {...pageProps} />
          </Layout>
        )}
      </MantineProvider>
    </ApolloProvider>
  );
}
