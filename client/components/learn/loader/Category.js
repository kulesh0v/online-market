import React from 'react';
import PropTypes from 'prop-types';

const Category = ({category, products}) => {
  return (
    <div style={{marginLeft: 24}}>

      <div style={{width: 150}}>
        <h1>{category.name}</h1>
      </div>

      <div style={{marginLeft: 12}}>
        {
          products.map(product => {
            return (
              <div key={product.id} style={{width: 120, display: 'inline-block', margin: 6}}>
                <img width={100} src={product.url} alt='product image'/>
                <h5>{product.name}</h5>
                <div style={{color: 'red'}}>{product.price}$</div>
                <div>In stock: {product.amount}</div>
              </div>
            );
          })
        }
      </div>

    </div>
  )
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};
export default Category;