import {combineReducers} from 'redux';
import global from './global.js';
import sidebar from './sidebar.js';

export default combineReducers({
  global,
  sidebar,
})