import React from 'react'
import PropTypes from 'prop-types';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

library.add(faCheck);

const Product = (props) => {
  const [userWish, setUserWish] = useState(0);

  const increaseAmount = () => {
    if (userWish < props.product.amount) {
      setUserWish(userWish + 1);
    }
  };

  const reduceAmount = () => {
    if (userWish > 0) {
      setUserWish(userWish - 1);
    }
  };

  return (
    <div className="card mt-2">
      <div className="card-body">
        <img className="card-img-top" alt="product" src={props.product.url}/>
        <div className="cards-title detail-title">{props.product.name}</div>
        <div className="card-text text-danger">${props.product.price}</div>
        <div className="card-text">In stock: {props.product.amount}</div>
        <form className="d-flex justify-content-between">
            <span className="input-group">
              <button type="button" className="btn btn-default bg-light" onClick={reduceAmount}>-</button>
              <span className="input-group-text border-0 bg-light">
                {userWish}
                </span>
              <button type="button" className="btn btn-default bg-light" onClick={increaseAmount}>+</button>
            </span>
          <button type="button" className="btn btn-default bg-light" title="Add to the basket">
            {(userWish && <FontAwesomeIcon icon="check" color="green"/>) || <FontAwesomeIcon icon="check" color="grey"/> }
          </button>
        </form>
      </div>
    </div>
  )
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
export default Product;