import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {getCategories} from "./actions/categories";
import routes from './constants/routes.js';
import {getProducts} from "./actions/products";

const storeInit = {
    categories: [],
    products: [],
    lastFilterConfig: undefined,
    basket: [],
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
export default store;