import {render, wait, fireEvent} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import "@babel/polyfill"
import axios from 'axios';

import messages from '../messages.js';
import routes from '../routes.js';
import Shop from "../components/Shop";

describe('Shop', () => {
  for (let propertyName in routes) {
    if (typeof(routes[propertyName]) !== 'function')
      routes[propertyName] = 'http://localhost:3000' + routes[propertyName];
  }

  test('should add products to basket', async () => {
    const {getByTestId} = await render(<Shop messages={messages} routes={routes}/>);

    let products;
    await axios.get(routes.products + '?page=0').then(res => {
      products = res.data.products;
    }).catch(() => {
      console.log('WRONG TEST');
    });
    console.table(products);

    await wait(() => {
      getByTestId(`increase-button-${products[0].id}`);
    });

    for (let i = 0; i < products[0].amount; i++) {
      fireEvent.click(getByTestId(`increase-button-${products[0].id}`));
    }
    for (let i = 0; i < products[1].amount; i++) {
      fireEvent.click(getByTestId(`increase-button-${products[1].id}`));
    }
    fireEvent.click(getByTestId(`add-button-${products[0].id}`));
    fireEvent.click(getByTestId(`add-button-${products[1].id}`));
    fireEvent.click(getByTestId('open-basket'));

    expect(getByTestId('total-price').innerHTML)
      .toBe(`$${(products[0].price * products[0].amount + products[1].price * products[1].amount).toFixed(2)}`)
  });

  test('should delete products from basket', async () => {
    const {getByTestId} = await render(<Shop messages={messages} routes={routes}/>);

    let products;
    await axios.get(routes.products + '?page=0').then(res => {
      products = res.data.products;
    }).catch(() => {
      console.log('WRONG TEST');
    });
    console.table(products);

    fireEvent.click(getByTestId('open-basket'));
    fireEvent.click(getByTestId(`delete-from-basket-button-${products[0].id}`));
    fireEvent.click(getByTestId('open-basket'));
    expect(getByTestId('total-price').innerHTML).toBe(`$${(products[1].price * products[1].amount).toFixed(2)}`);
    fireEvent.click(getByTestId(`delete-from-basket-button-${products[1].id}`));
    fireEvent.click(getByTestId('open-basket'));
    expect(getByTestId('empty-basket') !== null);

  });
});