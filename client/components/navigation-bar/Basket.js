import React from 'react'
import PropTypes from 'prop-types';
import BasketProduct from './BasketProduct'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faShoppingBasket, faTimes} from '@fortawesome/free-solid-svg-icons'

library.add(faShoppingBasket, faTimes);

class Basket extends React.Component {
  render() {
    return (
      <div className="btn-group dropleft dropdown">
        <button type="button" className="d-flex justify-content-between dropdown btn" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
          <FontAwesomeIcon icon='shopping-basket' size='2x' color="grey"/>
          <span className="input-group-text border-0 bg-light">
            {this.props.basket.length}
            </span>
        </button>
        <div className="dropdown-menu p-0 border-0">
          {this.props.basket.map(p =>
            <BasketProduct
              key={p.id}
              product={p}
              removeFromBasket={this.props.removeFromBasket}
            />)}
        </div>
      </div>
    );
  }
}

Basket.propTypes = {
  basket: PropTypes.array.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
};

export default Basket;
