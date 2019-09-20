import React from 'react';
import {useState, useEffect} from 'react';

import {Router, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from "history";

import axios from 'axios';
import axiosCancel from 'axios-cancel';
import {IntlProvider} from 'react-intl';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import NavigationBar from './header/NavigationBar.js';
import ProductList from './products/ProductsList'
import Sidebar from './menu/Sidebar.js';
import ProductWindow from './windows/ProductWindow.js';
import CategoryWindow from './windows/CategoryWindow.js';
import Paginate from './Paginate.js';

import {Layout} from 'antd'
import routes from "../constants/routes";

const {Content, Footer} = Layout;


const history = createBrowserHistory();

axiosCancel(axios, {
  debug: false
});

const Shop = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adminMode, setAdminMode] = useState(false);
    const [lastFilterConfig, setLastFilterConfig] = useState(undefined);
    const [locale, setLocale] = useState('en');
    const [productsAmount, setProductsAmount] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    const [basket, setBasket] = useState([]);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
      updateCategories();
      const lsBasket = JSON.parse(localStorage.getItem('omBasket'));
      if (lsBasket && Array.isArray(lsBasket)) {
        setBasket(lsBasket);
      }
    }, []);

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

    const buy = () => {
      axios.put(props.routes.buy, JSON.stringify(basket), {headers: {'Content-Type': 'application/json',}})
        .then(() => {
          alert('Payment completed successfully');
          updateProducts(lastFilterConfig, pageNum);
          setBasket([]);
          localStorage.setItem('omBasket', JSON.stringify([]));
        })
        .catch((err) => alert(err));
    };

    function updateProducts(filterConfig, page) {
      page = page || 0;
      let req = props.routes.products + '?';
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

    const getProducts = (filterConfig, page) => {
      if (!lastFilterConfig || queryString.stringify(filterConfig) !== queryString.stringify(lastFilterConfig)) {
        setLastFilterConfig(filterConfig);
        updateProducts(filterConfig, page);
      }
    };


    const closeWindow = () => {
      updateProducts(lastFilterConfig, pageNum);
      history.goBack();
    };

    const addProduct = (product) => {
      axios.post(props.routes.products, JSON.stringify(product), {headers: {'Content-Type': 'application/json',}})
        .then((res) => {
          alert(res.data);
          closeWindow();
        })
        .catch(err => {
          alert('Error, check console');
          console.log(err.response.data);
        });
    };

    const editProduct = (product) => {
      axios.put(props.routes.productById(product.id), JSON.stringify(product), {headers: {'Content-Type': 'application/json',}})
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
        axios.delete(props.routes.productById(id))
          .then((res) => {
            alert(res.data);
            updateProducts(lastFilterConfig, pageNum);
          })
          .catch(err => {
            alert('Error, check console');
            console.log(err.response.data);
          });
      }
    };

    const updateCategories = () => {
      axios.get(props.routes.categories)
        .then(res => setCategories(res.data));
    };

    const addCategory = (category) => {
      axios.post(props.routes.categories, JSON.stringify(category), {headers: {'Content-Type': 'application/json',}})
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
      axios.put(routes.categoryById(id), JSON.stringify(category), {headers: {'Content-Type': 'application/json',}})
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
        axios.delete(props.categoryById(id))
          .then((res) => {
            alert(res.data);
            updateCategories();
          })
          .then(() => updateProducts(lastFilterConfig, pageNum))
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
            adminMod={adminMode}
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

          <Layout>

            <Sidebar/>

            <Layout>

              <NavigationBar
                setLocale={setLocale}
                basket={basket}
                removeFromBasket={removeFromBasket}
                buy={buy}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
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
                      categoriesURL={props.routes.categories}
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
                      productURL={props.routes.productById(productId)}
                      categoriesURL={props.routes.categories}
                    />
                  }
                  }/>

                <Route
                  exact path={'/editCategory/:categoryId'}
                  component={({match}) => {
                    const {categoryId} = match.params;
                    return <CategoryWindow
                      closeWindow={closeWindow}
                      addCategory={addCategory}
                      editCategory={editCategory}
                      categoryURL={props.routes.categoryById(categoryId)}
                    />
                  }
                  }/>

              </Content>

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
          </Layout>
        </IntlProvider>
      </Router>
    );
  }
;

Shop.propTypes = {
  messages: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
};

export default Shop;
