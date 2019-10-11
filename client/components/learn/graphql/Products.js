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
      <div>
        <ul className="products">
          {
            data.productsList.products.map(product => (
              <li key={product.id} className="product">

                <img className="product-img" src={product.url}/>

                <div className="product-name">
                  <h4>{product.name}</h4>
                  <p>{product.category.name}</p>
                </div>

                <div className="product-info-container">

                  <ul className="product-info">
                    <li key="price" className="product-price">${product.price}</li>
                    <li key="amount">In stock: {product.amount}</li>
                  </ul>

                  <Ratings ratings={{amount: 2000, score: 4.5}}/>

                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
};

export default Products;