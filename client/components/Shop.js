import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import axiosCancel from 'axios-cancel';
import NavigationBar from './NavigationBar.js';
import ProductList from './Products/ProductsList'
import Menu from './Menu/Menu.js';
import ProductWindow from './Windows/ProductWindow.js';
import CategoryWindow from './Windows/CategoryWindow.js';

axiosCancel(axios, {
  debug: false
});

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adminMod, setAdminMod] = useState(false);
    const [windowIsOpen, setWindowIsOpen] = useState(false);
    const [windowObject, setWindowObject] = useState(undefined);
    const [lastFilterConfig, setLastFilterConfig] = useState({});
    const [windowType, setWindowType] = useState('');
    useEffect(() => {
      axios.get('/categories').then(res => setCategories(res.data));
      axios.get('/products').then(res => setProducts(res.data));
    }, []);

    const filter = (filterConfig) => {
      let req = '/products?';
      if (filterConfig) {
        if (filterConfig.choosesCategories) {
          filterConfig.choosesCategories.forEach(id => {
            req += `&categoryId=${id}`;
          });
        }
        if (filterConfig.minPrice) {
          req += `&minPrice=${filterConfig.minPrice}`;
        }
        if (filterConfig.maxPrice) {
          req += `&maxPrice=${filterConfig.maxPrice}`;
        }
        if (filterConfig.sortType) {
          req += `&sortType=${filterConfig.sortType}`;
        }
      }
      axios.cancelAll();
      axios.get(req).then(res => {
        setProducts(res.data);
        setLastFilterConfig(filterConfig);
      });
    };

    const openWindow = (id, type) => {
      console.log(id);
      if (!windowIsOpen) {
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
      }
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
      filter(lastFilterConfig)
    };

    const renderProducts = () => {
      if (!windowIsOpen) {
        if (products && Array.isArray(products)) {
          return <ProductList
            products={products}
            adminMod={adminMod}
            openWindow={openWindow}
            removeProduct={removeProduct}/>;
        } else {
          return <h1 className={"m-auto text-black-50"}>{products}</h1>;
        }
      }
    };

    const addProduct = (product) => {
      axios.post('/products', JSON.stringify(product), {headers: {'Content-Type': 'application/json',}})
        .then(() => closeWindow())
        .catch(err => alert(err));
    };

    const editProduct = (id, product) => {
      axios.put(`/products/${id}`, JSON.stringify(product), {headers: {'Content-Type': 'application/json',}})
        .then(() => closeWindow())
        .catch(err => alert(err));
    };

    const removeProduct = (id) => {
      if (confirm('Are you sure?')) {
        axios.delete(`/products/${id}`)
          .then(() => filter(lastFilterConfig))
          .catch(err => alert(err));
      }
    };

    const addCategory = (category) => {
      axios.post(`/categories`, JSON.stringify(category), {headers: {'Content-Type': 'application/json',}})
        .then(() => axios.get('/categories')
          .then(res => setCategories(res.data)))
        .then(() => closeWindow())
        .catch(err => alert(err));
    };

    const editCategory = (id, category) => {
      axios.put(`/categories/${id}`, JSON.stringify(category), {headers: {'Content-Type': 'application/json',}})
        .then(() => axios.get('/categories')
          .then(res => setCategories(res.data)))
        .then(() => closeWindow())
        .catch(err => alert(err));
    };

    const removeCategory = (id) => {
      if (confirm('Are you sure?')) {
        axios.delete(`/categories/${id}`)
          .then(() => axios.get('/categories')
            .then(res => setCategories(res.data)))
          .then(() => filter())
          .catch(err => alert(err));
      }
    };

    return (
      <div>
        <NavigationBar/>
        <div className={"d-inline-flex col-12"}>
          <Menu categories={categories} filter={filter} setAdminMod={setAdminMod} adminMod={adminMod}
                openWindow={openWindow} removeCategory={removeCategory}/>
          {renderWindow()}
          {renderProducts()}
        </div>
      </div>
    );
  }
;
export default Shop;