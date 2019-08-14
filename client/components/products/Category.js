import React from 'react'
import PropTypes from 'prop-types';
import Product from './Product'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons'

library.add(faAngleUp, faAngleDown);

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };
  }

  renderProductList = () => {
    if (this.props.products.length) {
      return this.props.products
        .map(product =>
          (<div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <Product
                product={product}
                addToBasket={this.props.addToBasket}
              />
            </div>
          )
        );
    }
    return <div className="m-auto font-weight-light p-2">Products not found</div>;
  };

  toggle = () =>
    this.setState({
      isHidden: !this.state.isHidden,
    });


  render() {
    return (
      <div className="panel panel-default col-xl-10 col-lg-10 col-md-12 col-sm-12 m-auto bg-light">
        <div className="panel-heading d-flex justify-content-between">
          <h4 className="panel-title text-secondary">
            {this.props.name}
          </h4>
          <button type="button" className="btn btn-default btn-lg" onClick={this.toggle}>
            {
              this.state.isHidden ?
                <FontAwesomeIcon icon={'angle-down'} color='grey'/> :
                <FontAwesomeIcon icon={'angle-up'} color='grey'/>
            }
          </button>
        </div>
        {
          !this.state.isHidden &&
          <div className="panel-body">
            <div className="row">
              {this.renderProductList()}
            </div>
          </div>
        }
      </div>
    );
  }
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default Category;