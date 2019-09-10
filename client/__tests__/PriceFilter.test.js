import {render} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import "@babel/polyfill"

import PriceFilter from '../components/menu/filter/PriceFilter.js';

describe('PriceFilter', () => {
  const minPrice = '220';
  const maxPrice = '400';

  test('should check that all categories are displayed', () => {
    const {getByTestId} = render(
      <PriceFilter
        changeMax={() => {
        }}
        changeMin={() => {
        }}
        maxPrice={maxPrice}
        minPrice={minPrice}
      />
    );

    expect(getByTestId('minPrice').value).toBe('220');
    expect(getByTestId('maxPrice').value).toBe('400');

  })
});