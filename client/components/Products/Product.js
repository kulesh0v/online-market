import React from 'react'
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

library.add(faCheck);

class Product extends React.Component {

  state = {
    userWish: 0,
  };

  addToBasket = () => {
    if (this.state.userWish) {
      this.props.addToBasket(this.state.userWish, this.props.product.id);
      this.setState({
        userWish: 0,
      });
    }
  };

  reduceAmount = () => {
    if (this.state.userWish > 0) {
      this.setState({
        userWish: this.state.userWish - 1,
      });
    }
  };

  renderAddButton = () => {
    if (this.state.userWish) {
      return <FontAwesomeIcon icon="check" color="green"/>
    }
    return <FontAwesomeIcon icon="check" color="grey"/>
  };

  increaseAmount = () => {
    if (this.state.userWish < this.props.product.amount) {
      this.setState({
        userWish: this.state.userWish + 1,
      });
    }
  };

  render() {
    return (
      <div className="card mt-2">
        <div className="card-body">
          <img className="card-img-top" alt="product" src={this.props.product.url}/>
          <div className="cards-title detail-title">{this.props.product.name}</div>
          <div className="card-text text-danger">${this.props.product.price}</div>
          <div className="card-text">In stock: {this.props.product.amount}</div>
          <form className="d-flex justify-content-between">
            <span className="input-group">
              <button type="button" className="btn btn-default bg-light" onClick={this.reduceAmount}>-</button>
              <span className="input-group-text border-0 bg-light">
                {this.state.userWish}
                </span>
              <button type="button" className="btn btn-default bg-light" onClick={this.increaseAmount}>+</button>
            </span>
            <button type="button" className="btn btn-default bg-light" title="Add to the basket">
              {this.renderAddButton()}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
export default Product;