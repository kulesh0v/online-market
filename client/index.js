import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import messages from './messages.js';

import Shop from './components/Shop.js'

ReactDOM.render((<Shop messages={messages}/>), document.getElementById('root'));
