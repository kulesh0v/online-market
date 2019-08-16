import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import axiosCancel from 'axios-cancel';
import NavigationBar from './NavigationBar.js';
import Filter from './Filter/Filter.js';
import ProductList from './Products/ProductsList'

axiosCancel(axios, {
  debug: false
});

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/categories').then(res => setCategories(res.data));
    axios.get('/products').then(res => setProducts(res.data));
  }, []);

  const filter = (filterConfig) => {
    let req = '/products?';
    filterConfig.checkedIds.forEach(id => {
      req += `&categoryId=${id}`;
    });
    console.log(req);
    if (filterConfig.minPrice) {
      req += `&minPrice=${filterConfig.minPrice}`;
    }
    if (filterConfig.maxPrice) {
      req += `&maxPrice=${filterConfig.maxPrice}`;
    }
    if (filterConfig.sortType) {
      req += `&sortType=${filterConfig.sortType}`;
    }
    axios.cancelAll();
    axios.get(req).then(res => setProducts(res.data));
  };


  return (
    <div>
      <NavigationBar/>
      <div className={"d-inline-flex col-12"}>
        <Filter categories={categories} filter={filter}/>
        {(products && Array.isArray(products) &&
          <ProductList products={products}/>)
        || <h1 className={"m-auto text-black-50"}>{products}</h1>
        }
      </div>
    </div>
  );
};

Shop.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};
export default Shop;