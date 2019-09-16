import {render, fireEvent} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import "@babel/polyfill"

import Product from '../components/products/Product.js';
import {IntlProvider} from 'react-intl';
import messages from '../messages.js';

const exampleProduct = {
  id: '8',
  categoryId: '2',
  price: 199.99,
  amount: 2,
  name: "iPhone 5",
  url: "https://www.akoda.com.au/image/cache/catalog/Product%20Photos/Apple/iPhone/5/iphone-5-silver-600x600.jpg",
};

describe('Product', () => {
  test('should check that product has name', () => {
    const {getByText} = render(<IntlProvider locale={'en'} messages={messages['en']}>
      <Product
        product={exampleProduct}
        addToBasket={() => {
        }}
        adminMod={false}
        basket={[]}
        removeProduct={() => {
        }}
      />
    </IntlProvider>);
    expect(getByText(exampleProduct.name) !== null).toBe(true);
  });

  test('should check that product has price', () => {
    const {getByText} = render(<IntlProvider locale={'en'} messages={messages['en']}>
      <Product
        product={exampleProduct}
        addToBasket={() => {
        }}
        adminMod={false}
        basket={[]}
        removeProduct={() => {
        }}
      />
    </IntlProvider>);
    expect(getByText(`$${exampleProduct.price}`) !== null).toBe(true);
  });

  test('should check that product has amount', () => {
    const {getByText} = render(<IntlProvider locale={'en'} messages={messages['en']}>
      <Product
        product={exampleProduct}
        addToBasket={() => {
        }}
        adminMod={false}
        basket={[]}
        removeProduct={() => {
        }}
      />
    </IntlProvider>);
    expect(getByText(`In stock: ${exampleProduct.amount}`) !== null).toBe(true);
  });

  test('should check that product has picture', () => {
    const {getByAltText} = render(<IntlProvider locale={'en'} messages={messages['en']}>
      <Product
        product={exampleProduct}
        addToBasket={() => {
        }}
        adminMod={false}
        basket={[]}
        removeProduct={() => {
        }}
      />
    </IntlProvider>);
    const img = getByAltText('product photo');
    expect(img !== null).toBe(true);
    expect(img.src).toBe(exampleProduct.url);
  });

  test('should increase and reduce value of user wish counter', () => {
    const {getByText, getByTestId} = render(<IntlProvider locale={'en'} messages={messages['en']}>
      <Product
        product={exampleProduct}
        addToBasket={() => {
        }}
        adminMod={false}
        basket={[]}
        removeProduct={() => {
        }}
      />
    </IntlProvider>);
    fireEvent.click(getByTestId(`increase-button-${exampleProduct.id}`));
    fireEvent.click(getByTestId(`increase-button-${exampleProduct.id}`));
    expect(getByText('Add 2 to basket') !== null).toBe(true);
    fireEvent.click(getByTestId(`increase-button-${exampleProduct.id}`));
    expect(getByText('Add 2 to basket') !== null).toBe(true);
    fireEvent.click(getByTestId(`reduce-button-${exampleProduct.id}`));
    expect(getByText('Add 1 to basket') !== null).toBe(true);
    fireEvent.click(getByTestId(`reduce-button-${exampleProduct.id}`));
    expect(getByText('Add 0 to basket') !== null).toBe(true);
    fireEvent.click(getByTestId(`reduce-button-${exampleProduct.id}`));
    expect(getByText('Add 0 to basket') !== null).toBe(true);
  });

  test('should add product to basket after increase', () => {
    const {getByText, getByTestId} = render(<IntlProvider locale={'en'} messages={messages['en']}>
      <Product
        product={exampleProduct}
        addToBasket={() => {
        }}
        adminMod={false}
        basket={[]}
        removeProduct={() => {
        }}
      />
    </IntlProvider>);
    fireEvent.click(getByTestId(`increase-button-${exampleProduct.id}`));
    fireEvent.click(getByTestId(`increase-button-${exampleProduct.id}`));
    fireEvent.click(getByText('Add 2 to basket'));
    expect(getByText('Add 0 to basket') !== null).toBe(true);
  });
});





