import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {categoriesQuery} from './queries.js';

const Sidebar = () => {
  const {loading, error, data} = useQuery(categoriesQuery);
  if (loading) {
    return <h3>Loading ...</h3>;
  }
  if (error) {
    return <h3>{error.message}</h3>
  }
  return (
    <div className="sidebar">

      <div className="sidebar-buttons">
        <button type="button" className="std-button">New products</button>
        <button type="button" className="std-button">Price Up</button>
      </div>

      {
        data.categories.map(category => (
          <div key={category.id} className="category">
            <input type="checkbox" name="scales"/>
            <label className="category-name" htmlFor="scales">{category.name}</label>
          </div>
        ))
      }
    </div>
  )
};

export default Sidebar;