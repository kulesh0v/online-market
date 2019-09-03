import React from 'react';
import {useState, useEffect} from 'react';

import {Router, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from "history";

import axios from 'axios';
import axiosCancel from 'axios-cancel';
import {IntlProvider} from 'react-intl';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import NavigationBar from './Header/NavigationBar.js';
import ProductList from './Products/ProductsList'
import Sidebar from './Menu/Sidebar.js';
import ProductWindow from './Windows/ProductWindow.js';
import CategoryWindow from './Windows/CategoryWindow.js';
import Paginate from './Paginate.js';

import {Layout} from 'antd'

const {Content, Footer} = Layout;


const history = createBrowserHistory();

axiosCancel(axios, {
  debug: false
});

const Shop = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adminMod, setAdminMod] = useState(false);
    const [lastFilterConfig, setLastFilterConfig] = useState(undefined);
    const [locale, setLocale] = useState('en');
    const [productsAmount, setProductsAmount] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    const [pageIsActual, setPageIsActual] = useState(true);
    const [basket, setBasket] = useState([]);

    useEffect(() => {
      updateCategories();
      const lsBasket = JSON.parse(localStorage.getItem('omBasket'));
      if (lsBasket && Array.isArray(lsBasket)) {
        setBasket(lsBasket);
      }
    }, []);

    useEffect(() => {
      setPageIsActual(true);
    },);

    const addToBasket = (id, amount) => {
      const basketProduct = basket.find(p => p.id === id);
      const product = products.find(p => p.id === id);
      if (basketProduct) {
        basketProduct.amount = Number(basketProduct.amount) + amount;
        basketProduct.price = Number(basketProduct.price) + amount * product.price;

      } else {
        basket.push({...product, amount: amount, price: (amount * product.price).toFixed(2)});

      }
      setBasket(basket);
      localStorage.setItem('omBasket', JSON.stringify(basket));
    };

    const removeFromBasket = (id) => {
      basket.splice(basket.findIndex(p => p.id === id), 1);
      setBasket(basket);
      localStorage.setItem('omBasket', JSON.stringify(basket));
    };

    const getProducts = (filterConfig, page) => {
      if (!lastFilterConfig || queryString.stringify(filterConfig) !== queryString.stringify(lastFilterConfig)) {
        setLastFilterConfig(filterConfig);
        page = page || 0;
        let req = '/products?';
        req += queryString.stringify(filterConfig, {sort: false});
        req += `&page=${page}`;
        axios.cancelAll();
        axios.get(req)
          .then(res => {
            setPageNum(page);
            setProductsAmount(res.data.productsAmount);
            setProducts(res.data.products);
          })
          .catch(err => {
            alert('Error, check console');
            console.log(err.response.data);
          });
      }
    };


    const closeWindow = () => {
      setPageIsActual(false);
      history.goBack();
    };

    const addProduct = (product) => {
      axios.post('/products', JSON.stringify(product), {headers: {'Content-Type': 'application/json',}})
        .then((res) => {
          alert(res.data);
          closeWindow();
        })
        .catch(err => {
          alert('Error, check console');
          console.log(err.response.data);
        });
    };

    const editProduct = (id, product) => {
      axios.put(`/products/${id}`, JSON.stringify(product), {headers: {'Content-Type': 'application/json',}})
        .then((res) => {
          alert(res.data);
          closeWindow();
          getProducts(lastFilterConfig);
        })
        .catch(err => {
          alert('Error, check console');
          console.log(err.response.data);
        });
    };

    const removeProduct = (id) => {
      if (confirm('Are you sure?')) {
        axios.delete(`/products/${id}`)
          .then((res) => {
            alert(res.data);
            setPageIsActual(false);
          })
          .catch(err => {
            alert('Error, check console');
            console.log(err.response.data);
          });
      }
    };

    const updateCategories = () => {
      axios.get('/categories')
        .then(res => setCategories(res.data));
    };

    const addCategory = (category) => {
      axios.post(`/categories`, JSON.stringify(category), {headers: {'Content-Type': 'application/json',}})
        .then((res) => {
          alert(res.data);
          updateCategories();
        })
        .then(() => closeWindow())
        .catch(err => {
          alert('Error, check console');
          console.log(err.response.data);
        });
    };

    const editCategory = (id, category) => {
      axios.put(`/categories/${id}`, JSON.stringify(category), {headers: {'Content-Type': 'application/json',}})
        .then((res) => {
          alert(res.data);
          updateCategories();
        })
        .then(() => closeWindow())
        .catch(err => {
          alert('Error, check console');
          console.log(err.response.data);
        });
    };

    const removeCategory = (id) => {
      if (confirm('If you delete a category, you will remove all products that it included\nAre you sure?')) {
        axios.delete(`/categories/${id}`)
          .then((res) => {
            alert(res.data);
            updateCategories();
          })
          .then(() => setPageIsActual(false))
          .catch(err => {
            alert('Error, check console');
            console.log(err.response.data);
          });
      }
    };

    const renderProducts = () => {
      if (Array.isArray(products) && products.length) {
        return (
          <ProductList
            products={products}
            adminMod={adminMod}
            removeProduct={removeProduct}
            addToBasket={addToBasket}
            basket={basket}
          />
        )
      } else {
        return <h1 className={"m-auto text-black-50"}>Products not found</h1>;
      }
    };

    return (
      <Router history={history}>
        <IntlProvider locale={locale} messages={props.messages[locale]}>
          {!pageIsActual && <Redirect to={`/${location.search}`}/>}

          <Layout>

            <Layout>
              <NavigationBar setLocale={setLocale} basket={basket} removeFromBasket={removeFromBasket}/>
            </Layout>

            <Layout>

              <Sidebar
                categories={categories}
                setAdminMod={setAdminMod}
                adminMod={adminMod}
                removeCategory={removeCategory}
              />

              <Content>
                < Route
                  exact path={'/'}
                  component={({location}) => {
                    const params = queryString.parse(location.search);
                    const page = --params.page;
                    delete params.page;
                    getProducts(params, page);
                    return renderProducts();
                  }}/>

                <Route
                  exact path={'/addProduct'}
                  component={() =>
                    <ProductWindow
                      addProduct={addProduct}
                      closeWindow={closeWindow}
                      editProduct={editProduct}
                    />
                  }/>

                <Route
                  exact path={'/addCategory'}
                  component={() =>
                    <CategoryWindow
                      closeWindow={closeWindow}
                      addCategory={addCategory}
                      editCategory={editCategory}
                    />
                  }/>

                <Route
                  exact path={'/editProduct/:productId'}
                  component={({match}) => {
                    const {productId} = match.params;
                    return <ProductWindow
                      addProduct={addProduct}
                      closeWindow={closeWindow}
                      editProduct={editProduct}
                      productId={productId}
                    />
                  }
                  }/>

                <Route
                  exact path={'/editCategory/:categoryId'}
                  component={({match}) => {
                    const {categoryId} = match.params;
                    const windowObject = categories.find(c => c.id === Number(categoryId));
                    return <CategoryWindow
                      closeWindow={closeWindow}
                      addCategory={addCategory}
                      editCategory={editCategory}
                      object={windowObject}
                    />
                  }
                  }/>

              </Content>
            </Layout>

            <Route
              exact path={'/'}
              component={() =>
                <Layout>
                  <Footer>
                    <Paginate
                      pageNum={pageNum}
                      productsAmount={productsAmount}
                      lastFilterConfig={lastFilterConfig}
                    />
                  </Footer>
                </Layout>
              }
            />
          </Layout>
        </IntlProvider>
      </Router>
    );
  }
;

Shop.propTypes = {
  messages: PropTypes.object.isRequired,
};

export default Shop;
