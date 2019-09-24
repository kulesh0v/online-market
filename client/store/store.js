import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {getCategories} from "./actions/categories";
import routes from '../constants/routes.js';
import {getProducts} from "./actions/products";

let basket = localStorage.getItem('omBasket');
try {
  basket = JSON.parse(basket);
  if (!Array.isArray(basket)) {
    throw new Error();
  }
} catch (e) {
  basket = [];
}

const storeInit = {
  categories: [],
  products: [],
  lastFilterConfig: undefined,
  basket: basket,
  productsAmount: 0,
  pageNum: 0,
  adminMode: false,
  visibilityAdminPanel: false,
  visibilitySidebar: true,
  locale: 'en',
  routes: routes,
};
const store = createStore(reducer, storeInit, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(getCategories());
store.dispatch(getProducts(storeInit.lastFilterConfig, storeInit.pageNum));
store.subscribe(() => {
  localStorage.setItem('omBasket', JSON.stringify(store.getState().basket));
});
export default store;