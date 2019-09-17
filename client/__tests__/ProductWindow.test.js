import {render, wait} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import "@babel/polyfill"
import axios from 'axios';

import ProductWindow from '../components/windows/ProductWindow.js';
import {IntlProvider} from 'react-intl';
import messages from '../constants/messages.js';
import routes from '../constants/routes.js';

describe('ProductWindow', () => {
  for (let propertyName in routes) {
    if(typeof(routes[propertyName])!== 'function')
      routes[propertyName] = 'http://localhost:3000' + routes[propertyName];
  }

  test('should check that productWindow has name', async () => {
    let product = {};

    await axios.get(routes.products)
      .then(res => {
        product = res.data.products[0];
      })
      .catch(() => console.log('WRONG TEST'));

    const component = await render(<IntlProvider locale={'en'} messages={messages['en']}>
      <ProductWindow
        closeWindow={() => {
        }}
        addProduct={() => {
        }}
        editProduct={() => {
        }}
        categoriesURL={routes.categories}
        productURL={routes.productById(product.id)}
      />
    </IntlProvider>);

    await wait(() => {
      component.getByText('Name');
    });

    expect(component.getByDisplayValue(product.name) !== null);
  });

  test('should check that productWindow has price', async () => {
    let product = {};

    await axios.get(routes.products)
      .then(res => {
        product = res.data.products[0];
      })
      .catch(() => console.log('WRONG TEST'));

    const component = await render(<IntlProvider locale={'en'} messages={messages['en']}>
      <ProductWindow
        closeWindow={() => {
        }}
        addProduct={() => {
        }}
        editProduct={() => {
        }}
        categoriesURL={routes.categories}
        productURL={routes.productById(product.id)}
      />
    </IntlProvider>);

    await wait(() => {
      component.getByText('Price $');
    });

    expect(component.getByDisplayValue(product.price) !== null);
  });

  test('should check that productWindow has amount', async () => {
    let product = {};

    await axios.get(routes.products)
      .then(res => {
        product = res.data.products[0];
      })
      .catch(() => console.log('WRONG TEST'));

    const component = await render(<IntlProvider locale={'en'} messages={messages['en']}>
      <ProductWindow
        closeWindow={() => {
        }}
        addProduct={() => {
        }}
        editProduct={() => {
        }}
        categoriesURL={routes.categories}
        productURL={routes.productById(product.id)}
      />
    </IntlProvider>);

    await wait(() => {
      component.getByText('Amount');
    });

    expect(component.getByDisplayValue(product.amount) !== null);
  });

  test('should check that productWindow has picture', async () => {
    let product = {};

    await axios.get(routes.products)
      .then(res => {
        product = res.data.products[0];
      })
      .catch(() => console.log('WRONG TEST'));

    const component = await render(<IntlProvider locale={'en'} messages={messages['en']}>
      <ProductWindow
        closeWindow={() => {
        }}
        addProduct={() => {
        }}
        editProduct={() => {
        }}
        categoriesURL={routes.categories}
        productURL={routes.productById(product.id)}
      />
    </IntlProvider>);

    await wait(() => {
      component.getByText('Amount');
    });

    expect(component.getByAltText('product photo').src).toBe(product.url);
    expect(component.getByDisplayValue(product.url) !== null);
  });
});