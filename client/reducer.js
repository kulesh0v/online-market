import {
  TOGGLE_SIDEBAR,
  TOGGLE_ADMIN_PANEL,
  TOGGLE_ADMIN_MODE,
  SET_LOCALE,
  SET_ROUTES,
  SET_CATEGORIES,
  SET_LAST_FILTER_CONFIG,
  SET_PRODUCTS,
  SET_PAGE_NUM,
  SET_PRODUCTS_AMOUNT,
  SET_BASKET,
} from './constants/actionTypes.js';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {...state, categories: action.categories};
    case SET_PRODUCTS:
      return {...state, products: action.products};
    case SET_LAST_FILTER_CONFIG:
      return {...state, lastFilterConfig: action.lastFilterConfig};
    case SET_PAGE_NUM:
      return {...state, pageNum: action.pageNum};
    case SET_PRODUCTS_AMOUNT:
      return {...state, productsAmount: action.productsAmount};
    case SET_BASKET:
      return {...state, basket: action.basket};
    case TOGGLE_SIDEBAR:
      return {...state, visibilitySidebar: !state.visibilitySidebar};
    case TOGGLE_ADMIN_PANEL:
      return {...state, visibilityAdminPanel: !state.visibilityAdminPanel};
    case TOGGLE_ADMIN_MODE:
      return {...state, adminMode: !state.adminMode};
    case SET_LOCALE:
      return {...state, locale: action.locale};
    case SET_ROUTES:
      return {...state, routes: action.routes};
    default:
      return state;
  }
}