import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import axiosCancel from 'axios-cancel';
import NavigationBar from './NavigationBar.js';
import ProductList from './Products/ProductsList'
import Menu from './Menu/Menu.js';
import ProductWindow from './ProductWindow.js';

axiosCancel(axios, {
  debug: false
});

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adminMod, setAdminMod] = useState(false);
    const [windowIsOpen, setWindowIsOpen] = useState(false);
    const [windowProduct, setWindowProduct] = useState(undefined);
    useEffect(() => {
      axios.get('/categories').then(res => setCategories(res.data));
      axios.get('/products').then(res => setProducts(res.data));
    }, []);

    const filter = (filterConfig) => {

      let req = '/products?';
      filterConfig.choosesCategories.forEach(id => {
        req += `&categoryId=${id}`;
      });
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

    const openWindow = (id) => {
      if (!windowIsOpen) {
        if (id) {
          setWindowProduct(products.find(p => p.id === id));
          setWindowIsOpen(true);
        } else {
          setWindowIsOpen(true);
        }
      }
    };

    const renderWindow = () => {
      if (windowIsOpen) {
        return <ProductWindow product={windowProduct} closeWindow={closeWindow} categories={categories}/>
      }
      return null;
    };

    const closeWindow = () => {
      setWindowProduct(undefined);
      setWindowIsOpen(false);
    };

    const renderProducts = () => {
      if (!windowIsOpen) {
        if (products && Array.isArray(products)) {
          return <ProductList products={products} adminMod={adminMod} openWindow={openWindow}/>;
        } else {
          return <h1 className={"m-auto text-black-50"}>{products}</h1>;
        }
      }
    };

    return (
      <div>
        <NavigationBar/>
        <div className={"d-inline-flex col-12"}>
          <Menu categories={categories} filter={filter} setAdminMod={setAdminMod} adminMod={adminMod}
                openWindow={openWindow}/>
          {renderWindow()}
          {renderProducts()}
        </div>
      </div>
    );
  }
;
export default Shop;