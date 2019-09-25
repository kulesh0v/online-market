import {render, fireEvent} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import "@babel/polyfill"

import Basket from "../components/header/Basket";

const basketProducts = [
  {
    id: 8,
    categoryId: 2,
    price: 399.99,
    amount: 2,
    name: "iPhone 5",
    url: "https://www.akoda.com.au/image/cache/catalog/Product%20Photos/Apple/iPhone/5/iphone-5-silver-600x600.jpg",
  },
  {
    id: 9,
    categoryId: 4,
    price: 199.99,
    amount: 6,
    name: "Nexus 7",
    url: "https://mytechnics.ru/image/cache/data/articles2/0095a6dbae41c14e43733b0cea009835_1000x1000-600x600.jpg",
  },
];

describe('Basket', () => {
  test('should display products names and amount', () => {
    const {getByTestId} = render(
      <Basket
        basket={basketProducts}
        removeFromBasket={() => {
        }}
        buy={() => {
        }}
      />
    );

    fireEvent.click(getByTestId('open-basket'));

    basketProducts.forEach(p => {
      expect(getByTestId(`name-amount-${p.id}`).innerHTML).toBe(`${p.name} x ${p.amount}`);
    });
  });

  test('should display products prices', () => {
    const {getByTestId} = render(
      <Basket
        basket={basketProducts}
        removeFromBasket={() => {
        }}
        buy={() => {
        }}
      />
    );

    fireEvent.click(getByTestId('open-basket'));

    basketProducts.forEach(p => {
      expect(getByTestId(`price-${p.price}`).innerHTML).toBe(`$${p.price}`);
    });
  });

  test('should check total price', () => {
    const {getByTestId} = render(
      <Basket
        basket={basketProducts}
        removeFromBasket={() => {
        }}
        buy={() => {
        }}
      />
    );

    let totalPrice = 0;
    basketProducts.forEach(p => totalPrice += p.price);
    totalPrice = '$' + totalPrice.toFixed(2);


    fireEvent.click(getByTestId('open-basket'));
    expect(getByTestId('total-price').innerHTML).toBe(totalPrice);
  })
});