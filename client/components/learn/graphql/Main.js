import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import Products from './Products.js';
import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import {Route} from 'react-router-dom';

const client = new ApolloClient({
  url: '/graphql',
});

const Main = () => {
  return (
    <ApolloProvider client={client}>

      <Route
        exact path={'/gql'}
        component={() => (
         <div>

           <Navbar/>

           <div className="sidebar-container">
             <Sidebar/>
           </div>

           <div className="content-container">
             <div className="products-container">
               <Products/>
             </div>
           </div>

         </div>
        )}
      />

    </ApolloProvider>
  );
};

export default Main;