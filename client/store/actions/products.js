import queryString from 'query-string';
import {SET_LAST_FILTER_CONFIG, SET_PAGE_NUM, SET_PRODUCTS, SET_PRODUCTS_AMOUNT} from "../actionTypes";
import axios from "axios";
import routes from '../../constants/routes.js';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

export function getProducts(filterConfig, page) {
  return (dispatch) => {
    dispatch({
      type: SET_LAST_FILTER_CONFIG,
      lastFilterConfig: filterConfig,
    });
    page = page || 0;
    axios.get(routes.products + '?' + queryString.stringify({...filterConfig,page}, {sort: false}))
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
        console.log(err);
      });
  }
}

export function removeProduct(id) {
  if (confirm('Are you sure?')) {
    return (dispatch, getState) => {
      axios.delete(routes.productById(id))
        .then((res) => {
          alert(res.data);
          dispatch(getProducts(getState().lastFilterConfig, getState().pageNum));
        })
        .catch(err => {
          alert('Error, check console');
          console.log(err);
        });
    }
  }
}

export function addProduct(product) {
  return (dispatch) => {
    axios.post(routes.products, JSON.stringify(product), {headers: {'Content-Type': 'application/json',}})
      .then((res) => {
        alert(res.data);
        history.goBack();
      })
      .catch(err => {
        alert('Error, check console');
        console.log(err);
      });
  }
}

export function editProduct(product) {
  return (dispatch, getState) => {
    axios.put(routes.productById(product.id), JSON.stringify(product), {headers: {'Content-Type': 'application/json',}})
      .then((res) => {
        alert(res.data);
        history.goBack();
        getProducts(getState().lastFilterConfig);
      })
      .catch(err => {
        alert('Error, check console');
        console.log(err);
      });
  }
}