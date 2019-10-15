import React from 'react'
import {addRatingMutation} from "./mutations";
import {useState, useEffect} from 'react';
import {useMutation} from "@apollo/react-hooks";
import Ratings from './Ratings.js';


const Product = ({product}) => {
  const [addRating, ratingResult] = useMutation(addRatingMutation);
  const [ratings, setRatings] = useState(product.ratings);

  useEffect(() => {
    if (ratingResult.data) {
      const updatedRatings = ratings.concat({rating: ratingResult.data.addRating.rating});
      setRatings(updatedRatings);
    }
  }, [ratingResult.data]);

  return (
    <div className="product">

      <img className="product-img" src={product.url}/>

      <div className="product-info">
        <h4>{product.name}</h4>
        <span className="product-category-name">{product.category.name}</span>
        <span className="product-price">${product.price}</span>
        <span>In stock: {product.amount}</span>
      </div>

      <Ratings
        id={product.id}
        ratingResult={ratingResult}
        addRating={addRating}
        ratings={ratings}
      />
    </div>);
};

export default Product;