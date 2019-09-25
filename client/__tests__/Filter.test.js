import {render, fireEvent} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import "@babel/polyfill"
import {Router} from 'react-router-dom';
import {createBrowserHistory} from "history";

import Filter from '../components/menu/filter/Filter.js';
import {IntlProvider} from 'react-intl';
import messages from '../constants/messages.js';

const history = createBrowserHistory();
const categories = [
  {
    id: 1,
    name: '0_0',
  },
  {
    id: 2,
    name: '()_()',
  }
];

describe('Filter', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  });

  test('should change filter prices', () => {
    const minPrice = '220';
    const maxPrice = '400';
    const {getByTestId} = render(
      <Router history={history}>
        <IntlProvider locale={'en'} messages={messages['en']}>
          <Filter
            categories={categories}
            adminMode={false}
            removeCategory={() => {
            }}
          />
        </IntlProvider>
      </Router>
    );
    expect(getByTestId('minPrice').value).toBe('');
    expect(getByTestId('maxPrice').value).toBe('');

    fireEvent.input(getByTestId('minPrice'), {target: {value: minPrice}});
    fireEvent.input(getByTestId('maxPrice'), {target: {value: maxPrice}});

    expect(getByTestId('minPrice').value).toBe('220');
    expect(getByTestId('maxPrice').value).toBe('400');
    expect(location.search).toBe(`?maxPrice=${maxPrice}&minPrice=${minPrice}`);

  });

  test('should select categories', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <IntlProvider locale={'en'} messages={messages['en']}>
          <Filter
            categories={categories}
            adminMode={false}
            removeCategory={() => {
            }}
          />
        </IntlProvider>
      </Router>
    );

    fireEvent.click(getByTestId(`checkbox-${categories[0].id}`));
    expect(location.search).toBe(`?categoryId=${categories[0].id}`);

    fireEvent.click(getByTestId(`checkbox-${categories[1].id}`));
    expect(location.search)
      .toBe(`?categoryId=${categories[0].id}&categoryId=${categories[1].id}`);

    fireEvent.click(getByTestId(`checkbox-${categories[0].id}`));
    expect(location.search).toBe(`?categoryId=${categories[1].id}`);

    fireEvent.click(getByTestId(`checkbox-${categories[1].id}`));
    expect(location.search).toBe(``);

  });

  test('should change sort type', () => {
    const uprice = 'uprice';
    const dprice = 'dprice';
    const {getByTestId} = render(
      <Router history={history}>
        <IntlProvider locale={'en'} messages={messages['en']}>
          <Filter
            categories={categories}
            adminMode={false}
            removeCategory={() => {
            }}
          />
        </IntlProvider>
      </Router>
    );

    fireEvent.click(getByTestId('sort-type-price'));
    expect(location.search).toBe(`?sortType=${uprice}`);

    fireEvent.click(getByTestId('sort-type-price'));
    expect(location.search).toBe(`?sortType=${dprice}`);

    fireEvent.click(getByTestId('sort-type-new'));
    expect(location.search).toBe(`?sortType`);

  });

});