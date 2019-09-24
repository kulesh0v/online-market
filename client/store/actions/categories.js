import axios from 'axios';
import {SET_CATEGORIES} from '../actionTypes';
import routes from '../../constants/routes.js';
import {getProducts} from './products.js';

export function getCategories() {
  console.log('get categories');
  return dispatch =>
    axios.get(routes.categories)
      .then(res => {
        dispatch({
          type: SET_CATEGORIES,
          categories: res.data,
        });
      })
      .catch(() => {
        alert('Unexpected server error');
      });
}

export function addCategory(category) {
  console.log(category);
  return dispatch => {
    axios.post(routes.categories, JSON.stringify(category), {headers: {'Content-Type': 'application/json',}})
      .then((res) => {
        alert(res.data);
        dispatch(getCategories());
      })
      .then(() => history.back())
      .catch(err => {
        alert('Error, check console');
        console.log(err.response.data);
      });
  };
}

export function editCategory(id, category) {
  return dispatch=>{
    axios.put(routes.categoryById(id), JSON.stringify(category), {headers: {'Content-Type': 'application/json',}})
      .then((res) => {
        alert(res.data);
       dispatch(getCategories());
      })
      .then(() => history.back())
      .catch(err => {
        alert('Error, check console');
        console.log(err.response.data);
      });
  }
}

export function removeCategory(id) {
  if (confirm('If you delete a category, you will remove all products that it included\nAre you sure?')) {
    return (dispatch, getState) => axios.delete(routes.categoryById(id))
      .then((res) => {
        alert(res.data);
        dispatch(getCategories());
      })
      .then(() => getProducts(getState().lastFilterConfig, getState().pageNum))
      .catch(err => {
        alert('Error, check console');
        console.log(err.response.data);
      });
  }
}