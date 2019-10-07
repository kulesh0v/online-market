import {gql} from 'apollo-boost';

export const productsQuery = gql`
  query {
    productsList{
      products{
       id
       name
       price
       url
      }
    }
  }
`;