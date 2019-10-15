import React from 'react'
import {useQuery} from '@apollo/react-hooks';
import {productsQuery} from './queries.js';
import Product from "./Product.js";

const Products = () => {
  const {loading, error, data} = useQuery(productsQuery);
  if (loading) {
    return <h5>Loading ...</h5>;
  }
  if (error) {
    return <h5>{error.message}</h5>
  }
  if (data) {
    return (
      <ul className="products">
        {
          data.productsList.products.map(product => (
            <li key={product.id}>
              <Product product={product}/>
            </li>
          ))
        }
      </ul>
    );
  }
};

export default Products;