import {render, fireEvent} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import "@babel/polyfill"
import {Router} from 'react-router-dom';
import {createBrowserHistory} from "history";

import AdminPanel from "../components/menu/AdminPanel.js";
import {IntlProvider} from 'react-intl';
import messages from '../constants/messages.js';

const history = createBrowserHistory();

describe('AdminPanel', () => {
  test('should open admin panel', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <IntlProvider locale={'en'} messages={messages['en']}>
          <AdminPanel setAdminMod={() => {
          }} adminMod={false}/>
        </IntlProvider>
      </Router>
    );

    fireEvent.click(getByTestId('panel-toggle'));

  });

  test('should open ProductWindow', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <IntlProvider locale={'en'} messages={messages['en']}>
          <AdminPanel
            setAdminMod={() => {
            }}
            adminMod={false}/>
        </IntlProvider>
      </Router>
    );
    fireEvent.click(getByTestId('panel-toggle'));
    fireEvent.click(getByTestId('add-product-button'));
    expect(location.pathname).toBe('/addProduct');
  });

  test('should open CategoryWindow', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <IntlProvider locale={'en'} messages={messages['en']}>
          <AdminPanel
            setAdminMod={() => {
            }}
            adminMod={false}/>
        </IntlProvider>
      </Router>
    );

    fireEvent.click(getByTestId('panel-toggle'));
    fireEvent.click(getByTestId('add-category-button'));
    expect(location.pathname).toBe('/addCategory');
  });
});