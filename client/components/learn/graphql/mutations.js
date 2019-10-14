import {gql} from 'apollo-boost';

export const addRatingMutation = gql`
mutation($rating: Int, $productId: ID){
  addRating(rating: $rating, productId: $productId){
    id
    productId
    rating
  }
}
`;