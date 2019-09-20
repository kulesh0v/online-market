import {
  SET_LOCALE,
  SET_CATEGORIES,
  SET_LAST_FILTER_CONFIG,
  SET_PRODUCTS,
  SET_PAGE_NUM,
  SET_PRODUCTS_AMOUNT
} from "../constants/actionTypes";

export default function (state = {}, action) {
  switch (action.type) {
    case SET_LOCALE:
      return {...state, locale: action.locale};
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
    default:
      return state;
  }
}