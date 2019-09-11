import {render, wait} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import "@babel/polyfill"
import axios from 'axios';

import CategoryWindow from '../components/windows/CategoryWindow.js';
import {IntlProvider} from 'react-intl';
import messages from '../messages.js';

describe('CategoryWindow', () => {
  test('should display category name', async () => {
    let categories;
    await wait(() => axios.get('http://localhost:3000/categories')
      .then(res => {
        categories = res.data;
      })
      .catch(() => console.log('WRONG TEST')));

    const category = categories[0];

    const {getByTestId} = await render(
      <IntlProvider locale={'en'} messages={messages['en']}>
        <CategoryWindow
          closeWindow={() => {
          }}
          addCategory={() => {
          }}
          editCategory={() => {
          }}
          categoryURL={`http://localhost:3000/categories/${category.id}`}
        />
      </IntlProvider>);

    await wait(()=>{
      getByTestId('category-name');
    });

    expect(getByTestId('category-name').value).toBe(category.name);
  });

});