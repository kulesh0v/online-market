import React from 'react'
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash);

class BasketProduct extends React.Component {
  remove = () => {
    this.props.removeFromBasket(this.props.product);
  };

  render() {
    return (
      <div className="p-1 border-1">
        <div className="row no-gutters">
          <div className="col-3">
            <img
              src={this.props.product.url}
              className="card-img ml-1" alt="..."/>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>{this.props.product.name}</div>
              <button className="btn p-0" onClick={this.remove}>
                <FontAwesomeIcon icon="trash" color='grey'/>
              </button>
            </div>
            <div>Amount: {this.props.product.inBasket}</div>
            <div>Total price: <span
              className="text-danger">${(this.props.product.inBasket * this.props.product.price).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

BasketProduct.propTypes = {
  product: PropTypes.object.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
}
;

export default BasketProduct;