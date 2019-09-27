import React from 'react';
import {Spin} from 'antd';

const Categories = ({categories}) => {
  if (categories && Array.isArray(categories))
    return (
      <ol>
        {
          categories.map(category => <li key={category.id}>{category.name}</li>)
        }
      </ol>
    );
  else
    return (
      <div style={{display: 'flex'}}>
        <div style={{margin: 'auto'}}>
          <Spin size="large"/>
        </div>
      </div>
    );
};

export default Categories;