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

export const categoriesQuery = gql `
  query {
    categories {
      name
      id
    }
  }
`;