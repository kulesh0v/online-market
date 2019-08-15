import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import NavigationBar from './NavigationBar.js';
import Filter from './Filter/Filter.js';
import ProductList from './Products/ProductsList'


class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
    };

  }

  componentDidMount() {
    axios.get('/categories').then(res => this.setState({categories: res.data}));
    axios.get('/products').then(res => this.setState({products: res.data}));
  }

  filter = (filterConfig) => {
    let params = '';
    filterConfig.checkedIds.forEach(id => {
      params += `categoryId=${id}&`;
    });
    if (filterConfig.minPrice) {
      params += `&minPrice=${filterConfig.minPrice}`;
    }
    if (filterConfig.maxPrice) {
      params += `&maxPrice=${filterConfig.maxPrice}`;
    }
    axios.get('/products?' + params).then(res => this.setState({products: res.data}));
  };


  render() {
    return (
      <div>
        <NavigationBar/>
        <div className={"d-inline-flex"}>
          <Filter categories={this.state.categories} filter={this.filter}/>
          <ProductList products={this.state.products}/>
        </div>
      </div>
    );
  }
}

Shop.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};
export default Shop;