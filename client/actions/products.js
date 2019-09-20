import queryString from 'query-string';
import {SET_LAST_FILTER_CONFIG, SET_PAGE_NUM, SET_PRODUCTS, SET_PRODUCTS_AMOUNT} from "../constants/actionTypes";
import axios from "axios";

export function getProducts(filterConfig, page) {
  return (dispatch, getState) => {
    if (!getState().global.lastFilterConfig || queryString.stringify(filterConfig) !== queryString.stringify(getState().global.lastFilterConfig)) {
      dispatch({
        type: SET_LAST_FILTER_CONFIG,
        lastFilterConfig: filterConfig,
      });
      page = page || 0;
      let req = props.routes.products + '?';
      req += queryString.stringify(filterConfig, {sort: false});
      req += `&page=${page}`;
      axios.get(req)
        .then(res => {
          dispatch({
            type: SET_PAGE_NUM,
            pageNum: page
          });
          dispatch({
            type: SET_PRODUCTS_AMOUNT,
            productsAmount: res.data.productsAmount
          });
          dispatch({
            type: SET_PRODUCTS,
            products: res.data.products
          });
        })
        .catch(err => {
          alert('Error, check console');
          console.log(err.response.data);
        });
    }
  }
}