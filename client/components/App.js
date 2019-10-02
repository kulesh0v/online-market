import React from 'react';
import {FormattedMessage, IntlProvider} from 'react-intl';
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import messages from '../constants/messages.js';
import {Layout} from 'antd'
import queryString from 'query-string';
import NavigationBar from "./header/NavigationBar.js";
import CategoryWindow from './windows/CategoryWindow.js';
import {addCategory as actionAddCategory, editCategory as actionEditCategory} from "../store/actions/categories";
import {getProducts as actionGetProducts} from "../store/actions/products.js";
import Sidebar from './menu/Sidebar.js';
import {useDispatch, useSelector} from 'react-redux'
import ProductList from "./products/ProductsList";
import Paginate from './Paginate.js';
import ProductWindow from './windows/ProductWindow.js';
import {addProduct as actionAddProduct, editProduct as actionEditProduct} from "../store/actions/products";
import Loader from "./learn.loader/Loader.js";
import Category from "./learn.loader/Category.js";
import Spinner from "./learn.loader/Spinner";
import LoadingError from './learn.loader/LoadingError.js';

const {Content, Footer} = Layout;
const history = createBrowserHistory();
const App = () => {
  const dispatch = useDispatch();
  const locale = useSelector(state => state.locale);
  const routes = useSelector(state => state.routes);

  const addCategory = (category) => {
    dispatch(actionAddCategory(category));
  };
  const editCategory = (id, category) => {
    dispatch(actionEditCategory(id, category));
  };
  const addProduct = (product) => {
    dispatch(actionAddProduct(product));
  };
  const editProduct = (product) => {
    dispatch(actionEditProduct(product))
  };
  const closeWindow = () => {
    history.goBack();
  };
  const getProducts = (filterConfig, page) => {
    dispatch(actionGetProducts(filterConfig, page));
  };

  return (
    <Router history={history}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Layout>

          <Sidebar/>

          <Layout>

            <NavigationBar/>

            <Content>

              <Route
                exact path={'/'}
                component={({location}) => {
                  const params = queryString.parse(location.search);
                  const page = --params.page;
                  delete params.page;
                  getProducts(params, page);
                  return <ProductList/>;
                }}
              />

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
                exact path={'/editCategory/:categoryId'}
                component={({match}) => {
                  const {categoryId} = match.params;
                  return <CategoryWindow
                    closeWindow={closeWindow}
                    addCategory={addCategory}
                    editCategory={editCategory}
                    categoryURL={routes.categoryById(categoryId)}
                  />
                }
                }/>

              <Route
                exact path={'/addProduct'}
                component={() =>
                  <ProductWindow
                    addProduct={addProduct}
                    closeWindow={closeWindow}
                    editProduct={editProduct}
                    categoriesURL={routes.categories}
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
                    productURL={routes.productById(productId)}
                    categoriesURL={routes.categories}
                  />
                }
                }/>

              <Route
                exact path={'/loader'}
                component={() =>
                  <Loader url={routes.categories}>
                    {
                      ({data, isLoading, error}) => {
                        if (isLoading) {
                          return (
                            <Spinner isLoading={isLoading}/>
                          );
                        }
                        if (data) {
                          return data.map(category => {
                              return <Loader key={category.id}
                                             url={routes.products + `/?categoryId=${category.id}&page=0`}>
                                {
                                  ({data, isLoading, error}) => {
                                    if (isLoading) {
                                      return (
                                        <div>
                                          <Category category={category} products={[]}/>
                                          <Spinner isLoading={isLoading}/>
                                        </div>
                                      )
                                    }
                                    if (data) {
                                      return (
                                        <Category
                                          key={category.id}
                                          category={category}
                                          products={data.products}
                                        />
                                      )
                                    }
                                    if (error) {
                                      return <LoadingError/>;
                                    }
                                  }
                                }
                              </Loader>
                            }
                          )
                        }
                        if (error) {
                          return <LoadingError/>;
                        }
                      }
                    }
                  </Loader>
                }/>
            </Content>

            < Route
              exact path={'/'}
              component={() =>
                <Layout>
                  <Footer>
                    <Paginate/>
                  </Footer>
                </Layout>
              }
            />

          </Layout>

        </Layout>
      </IntlProvider>
    </Router>
  )
};


export default App;
