import {render} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import "@babel/polyfill"

import CategoriesList from '../components/menu/filter/CategoriesList.js';

describe('CategoriesList', () => {

  const categories = [
    {
      id: '1',
      name: '0_0',
    },
    {
      id: '2',
      name: '()_()',
    }
  ];

  test('should check that all categories are displayed', () => {
    const {getByText} = render(<CategoriesList
      categories={categories}
      selectCategory={() => {
      }}
      removeCategory={() => {
      }}
      adminMod={false}
      uncheckDeleted={() => {
      }}
      selectedCategories={[]}/>);
    categories.forEach(category => {
      expect(getByText(category.name) !== null);
    });
  })
});