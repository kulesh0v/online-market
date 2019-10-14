import React from 'react'
import {useQuery} from '@apollo/react-hooks';
import {productsQuery} from './queries.js';
import Ratings from './Ratings.js';

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
            <li key={product.id} className="product">

              <img className="product-img" src={product.url}/>

              <div className="product-info">
                <h4>{product.name}</h4>
                <span className="product-category-name">{product.category.name}</span>
                <span className="product-price">${product.price}</span>
                <span>In stock: {product.amount}</span>
              </div>
              <Ratings ratings={product.ratings} id={product.id}/>
            </li>
          ))
        }
      </ul>
    );
  }
};

export default Products;