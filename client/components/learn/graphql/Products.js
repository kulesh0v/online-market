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
        {
          data.productsList.products.map(product => (
            <div key={product.id} className={'product'}>
              <div>{product.name}</div>
              <img width={200} src={product.url}/>
            </div>
          ))
        }
      </div>
    );
  }
};

export default Products;