import {SET_BASKET} from "../actionTypes";
import axios from "axios/index";
import {getProducts} from "./products";

export function addToBasket(id, amount) {
  return (dispatch, getState) => {
    const basket = getState().basket;
    const products = getState().products;
    const basketProduct = basket.find(p => p.id === id);
    const product = products.find(p => p.id === id);

    if (basketProduct) {
      basketProduct.amount = Number(basketProduct.amount) + amount;
      basketProduct.price = Number(basketProduct.price) + amount * product.price;

    } else {
      basket.push({...product, amount: amount, price: (amount * product.price).toFixed(2)});

    }
    dispatch({type: SET_BASKET, basket: basket});
  }
}

export function removeFromBasket(id) {
  return (dispatch, getState) => {
    const basket = getState().basket;
    basket.splice(basket.findIndex(p => p.id === id), 1);
    dispatch({type: SET_BASKET, basket: basket});
  }
}

export function buy() {
  return (dispatch, getState) => {
    const {lastFilterConfig, pageNum, basket} = getState();
    axios.put(getState().routes.buy, JSON.stringify(basket), {headers: {'Content-Type': 'application/json',}})
      .then(() => {
        alert('Payment completed successfully');
        dispatch(getProducts(lastFilterConfig, pageNum));
        dispatch({type: SET_BASKET, basket: []});
      })
      .catch((err) => alert(err));
  }
}