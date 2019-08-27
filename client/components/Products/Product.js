import React from 'react'
import PropTypes from 'prop-types';
import {useState} from 'react';

import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faEdit, faTrashAlt);

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

      {
        props.adminMod &&
        <div className={"text-right"}>

          <Link to={`/editProduct/${props.product.id}`}>
            <button type={"button"} className={"clear-button mr-2"}>
              <FontAwesomeIcon icon={"edit"} color={"grey"}/>
            </button>
          </Link>

          <button type={"button"} className={"clear-button mr-2"} onClick={() => props.removeProduct(props.product.id)}>
            <FontAwesomeIcon icon={"trash-alt"} color={"grey"}/>
          </button>

        </div>
      }

      <div className="card-body">

        <img className="card-img-top" alt="product" src={props.product.url}/>
        <div className="cards-title detail-title">{props.product.name}</div>
        <div className="card-text text-danger">${props.product.price}</div>

        <div className="card-text">
          <FormattedMessage id={'inStock'}/>: {props.product.amount}</div>

        <form className="d-flex justify-content-between">

            <span className="input-group">

              <button type="button" className="btn btn-default bg-light" onClick={reduceAmount}>-</button>

              <span className="input-group-text border-0 bg-light">{userWish}</span>

              <button type="button" className="btn btn-default bg-light" onClick={increaseAmount}>+</button>

            </span>

          <button type="button" className="btn btn-default bg-light" title="Add to the basket">
            {(userWish && <FontAwesomeIcon icon="check" color="green"/>) ||
            <FontAwesomeIcon icon="check" color="grey"/>}
          </button>

        </form>
      </div>
    </div>
  )
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  adminMod: PropTypes.bool.isRequired,
  removeProduct: PropTypes.func.isRequired,
};
export default Product;