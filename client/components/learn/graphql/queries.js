import {gql} from 'apollo-boost';

console.log(typeof gql);

export const productsQuery = gql`
  query {
    productsList{
      products{
       id
       name
       price
       url
       amount
       category{
        name
       }
       ratings{
        rating
       }
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