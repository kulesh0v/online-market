import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers/allReducers.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {getCategories} from "./actions/categories";
import routes from './constants/routes.js';
import {getProducts} from "./actions/products";

const storeInit = {
  global: {
    locale: 'en',
    categories: [],
    products: [],
    lastFilterConfig: undefined,
    basket: [],
    productsAmount: 0,
    pageNum: 0,
    routes: routes,

  },
  sidebar: {
    adminMode: false,
    visibilityAdminPanel: false,
    visibilitySidebar: true,
  }

};
const store = createStore(reducers, storeInit, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(getCategories());
store.dispatch(getProducts(storeInit.global.lastFilterConfig, storeInit.global.pageNum));
store.subscribe(() => {
  console.log(store.getState());
});
export default store;