import React from 'react';
import PropTypes from 'prop-types';
import CategoriesList from './products/CategoriesList'
import Navbar from './navigation-bar/Navbar'

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      products: props.products,
      minPrice: Math.min.apply(null, props.products.map(p => p.price)),
      maxPrice: Math.max.apply(null, props.products.map(p => p.price)),
    };
  }

  handleFilterTextChange = (filterText) =>
    this.setState({
      filterText: filterText
    });

  handleMinPriceChange = (minPrice) =>
    this.setState({
      minPrice: minPrice,
    });

  handleMaxPriceChange = (maxPrice) =>
    this.setState({
      maxPrice: maxPrice,
    });

  addToBasket = (userWish, id) => {
    const products = this.state.products;
    const product = products.find(p => p.id === id);
    product.amount -= userWish;
    product.inBasket += userWish;
    this.setState({products});

  };

  removeFromBasket = ({id}) => {
    const products = this.state.products;
    const product = products.find(p => p.id === id);
    product.amount += product.inBasket;
    product.inBasket = 0;
    this.setState({products});
  };


  render() {
    return (
      <div>
        <Navbar
          basket={this.state.products.filter(p => p.inBasket)}
          filterText={this.state.filterText}
          minPrice={this.state.minPrice}
          maxPrice={this.state.maxPrice}
          onFilterTextChange={this.handleFilterTextChange}
          onMinPriceChange={this.handleMinPriceChange}
          onMaxPriceChange={this.handleMaxPriceChange}
          removeFromBasket={this.removeFromBasket}
        />
        <CategoriesList
          products={this.state.products}
          filterText={this.state.filterText.toLowerCase()}
          minPrice={this.state.minPrice}
          maxPrice={this.state.maxPrice}
          addToBasket={this.addToBasket}
        />
      </div>
    );
  }
}

Shop.propTypes = {
  products: PropTypes.array.isRequired,
};
export default Shop;