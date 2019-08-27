import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';

import messages from './messages.js';

import Shop from './components/Shop.js'

ReactDOM.render((
    <BrowserRouter>
      <Shop messages={messages}/>
    </BrowserRouter>
  ),
  document.getElementById('root'));
