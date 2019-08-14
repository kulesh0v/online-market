import React from 'react'
import PropTypes from 'prop-types';
import Category from './Category'

const CategoriesList = (props) => {
  let categories = [];
  props.products.forEach(product => {
    if (!categories.includes(product.category))
      categories.push(product.category);
  });
  let products = props.products.filter(product =>
    product.name.toLowerCase().includes(props.filterText) &&
    (product.price <= props.maxPrice || !props.maxPrice) &&
    product.price >= props.minPrice);
  return (
    <div className="mt-5 pt-5">
      {categories.map(categories => (
        <Category
          key = {categories}
          name={categories}
          products={products.filter(product =>
            product.category === categories)}
          addToBasket={props.addToBasket}
        />))
      }
    </div>
  );
};

CategoriesList.propTypes = {
  products: PropTypes.array.isRequired,
};
export default CategoriesList;