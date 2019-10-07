import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import Products from './Products.js';

const client = new ApolloClient({
  url: '/graphql',
});

const Main = () => {
  return (
    <ApolloProvider client={client}>
      <Products/>
    </ApolloProvider>
  );
};

export default Main;