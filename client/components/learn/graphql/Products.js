import React from 'react'
import {useQuery} from '@apollo/react-hooks';
import {productsQuery} from './queries.js';

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
      <div>
        <ul className="products">
          {
            data.productsList.products.map(product => (
              <li key={product.id} className="product">
                <div className="product-name">{product.name}</div>
                <img className="product-img" src={product.url}/>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
};

export default Products;