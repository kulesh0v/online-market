import React from 'react';
import {useState, useEffect} from 'react';

import axios from 'axios';
import axiosCancel from 'axios-cancel';
import {IntlProvider} from 'react-intl';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import NavigationBar from './NavigationBar.js';
import ProductList from './Products/ProductsList'
import Menu from './Menu/Menu.js';
import ProductWindow from './Windows/ProductWindow.js';
import CategoryWindow from './Windows/CategoryWindow.js';

axiosCancel(axios, {
  debug: false
});

const Shop = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adminMod, setAdminMod] = useState(false);
    const [windowIsOpen, setWindowIsOpen] = useState(false);
    const [windowObject, setWindowObject] = useState(undefined);
    const [lastFilterConfig, setLastFilterConfig] = useState({});
    const [windowType, setWindowType] = useState('');
    const [locale, setLocale] = useState('en');
    useEffect(() => {
      axios.get('/categories').then(res => {
        setCategories(res.data)
      });
      axios.get('/products').then(res => setProducts(res.data));
    }, []);

    const filterProducts = (filterConfig) => {
      let req = '/products?';
      req += queryString.stringify(filterConfig, {sort: false});
      axios.cancelAll();
      axios.get(req).then(res => {
        setProducts(res.data);
        setLastFilterConfig(filterConfig);
      });
    };

    const openWindow = (id, type) => {
      if (id) {
        switch (type) {
          case 'product':
            setWindowObject(products.find(p => p.id === id));
            break;
          case 'category':
            setWindowObject(categories.find(c => c.id === id));
        }
      }
      setWindowType(type);
      setWindowIsOpen(true);
    };

    const renderWindow = () => {
      if (windowIsOpen) {
        switch (windowType) {
          case 'product':
            return <ProductWindow
              object={windowObject}
              categories={categories}
              closeWindow={closeWindow}
              addProduct={addProduct}
              editProduct={editProduct}
            />;
          case 'category':
            return <CategoryWindow
              object={windowObject}
              closeWindow={closeWindow}
              addCategory={addCategory}
              editCategory={editCategory}
            />;
        }
      }
      return null;
    };

    const closeWindow = () => {
      setWindowType('');
      setWindowObject(undefined);
      setWindowIsOpen(false);
    };

    const renderProducts = () => {
      if (products && Array.isArray(products)) {
        return <ProductList
          products={products}
          adminMod={adminMod}
          openWindow={openWindow}
          removeProduct={removeProduct}/>;
      } else {
        return <h1 className={"m-auto text-black-50"}>{products}</h1>;
      }
    };

    const addProduct = (product) => {
      axios.post('/products', JSON.stringify(product), {headers: {'Content-Type': 'application/json',}})
        .then((res) => {
          alert(res.data);
          closeWindow();
          filterProducts(lastFilterConfig);
        })
        .catch(err => alert(err));
    };

    const editProduct = (id, product) => {
      axios.put(`/products/${id}`, JSON.stringify(product), {headers: {'Content-Type': 'application/json',}})
        .then((res) => {
          alert(res.data);
          closeWindow();
          filterProducts(lastFilterConfig);
        })
        .catch(err => alert(err));
    };

    const removeProduct = (id) => {
      if (confirm('Are you sure?')) {
        axios.delete(`/products/${id}`)
          .then((res) => {
            alert(res.data);
            filterProducts(lastFilterConfig);
          })
          .catch(err => alert(err));
      }
    };

    const updateCategories = () => {
      axios.get('/categories')
        .then(res => setCategories(res.data));
    };

    const addCategory = (category) => {
      axios.post(`/categories`, JSON.stringify(category), {headers: {'Content-Type': 'application/json',}})
        .then((res) =>{
          alert(res.data);
          updateCategories();
        })
        .then(() => closeWindow())
        .catch(err => alert(err));
    };

    const editCategory = (id, category) => {
      axios.put(`/categories/${id}`, JSON.stringify(category), {headers: {'Content-Type': 'application/json',}})
        .then((res) => {
          alert(res.data);
          updateCategories();
        })
        .then(() => closeWindow())
        .catch(err => alert(err));
    };

    const removeCategory = (id) => {
      if (confirm('If you delete a category, you will remove all products that it included\nAre you sure?')) {
        axios.delete(`/categories/${id}`)
          .then((res) => {
            alert(res.data);
            updateCategories();
          })
          .then(() => filterProducts(lastFilterConfig))
          .catch(err => alert(err));
      }
    };

    return (
      <IntlProvider locale={locale} messages={props.messages[locale]}>
        <div>
          <NavigationBar setLocale={setLocale}/>
          <div className={"d-inline-flex col-12"}>
            <Menu categories={categories} filter={filterProducts} setAdminMod={setAdminMod} adminMod={adminMod}
                  openWindow={openWindow} removeCategory={removeCategory}/>
            {
              windowIsOpen && renderWindow() ||
              renderProducts()
            }
          </div>
        </div>
      </IntlProvider>
    );
  }
;

Shop.propTypes = {
  messages: PropTypes.object.isRequired,
};

export default Shop;
