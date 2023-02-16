import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import * as GlobalStyled from './GlobalStyle'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: process.env.REACT_APP_DOMAIN,
  cache: new InMemoryCache()
})

root.render(
  <ApolloProvider client={client}>
    <GlobalStyled.Root />
      <App />
  </ApolloProvider>
);

reportWebVitals();
